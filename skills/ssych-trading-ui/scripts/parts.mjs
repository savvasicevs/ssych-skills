#!/usr/bin/env node
// Checks ssych parts against the live registry before you install them.
//
//   node parts.mjs candlestick order-book     check these slugs: exists, free or paid, npm deps
//   node parts.mjs --all                      every part with its status
//   node parts.mjs --md                       the full catalog as markdown (references/catalog.md)
//
// A part is paid when its public registry item is a locked placeholder.
// Exit code 1 when any named slug does not exist or is paid.

const BASE = "https://ui.ssych.com/r";

async function getJson(url) {
  const res = await fetch(url);
  if (!res.ok) return null;
  return res.json();
}

async function item(slug) {
  const d = await getJson(`${BASE}/${slug}.json`);
  if (!d) return { slug, exists: false };
  return {
    slug,
    exists: true,
    paid: Boolean(d.locked),
    type: d.type,
    title: (d.title || slug).replace(/ \(locked\)$/, ""),
    deps: d.dependencies || [],
    needs: (d.registryDependencies || []).map((u) => u.split("/").pop().replace(/\.json$/, "")),
  };
}

async function pool(list, n, fn) {
  const out = new Array(list.length);
  let i = 0;
  await Promise.all(
    Array.from({ length: n }, async () => {
      while (i < list.length) {
        const k = i++;
        out[k] = await fn(list[k]);
      }
    }),
  );
  return out;
}

async function index() {
  const reg = await getJson(`${BASE}/registry.json`);
  if (!reg) throw new Error(`Could not read ${BASE}/registry.json`);
  const seen = new Map();
  for (const it of reg.items) if (!seen.has(it.name)) seen.set(it.name, it);
  return [...seen.values()];
}

const args = process.argv.slice(2);

if (args.includes("--md")) {
  const items = await index();
  const status = await pool(items.map((i) => i.name), 8, item);
  const byName = new Map(status.map((s) => [s.slug, s]));
  const groups = new Map();
  for (const it of items) {
    const s = byName.get(it.name);
    const key = s.paid ? "Paid screens and pages" : it.categories?.[0] || "other";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push({ ...it, ...s });
  }
  const order = ["charts", "data", "controls", "flows", "cards", "layout", "showcase", "effects", "dashboard", "landing-page", "Paid screens and pages"];
  const rank = (k) => (order.includes(k) ? order.indexOf(k) : 50);
  const keys = [...groups.keys()].sort((a, b) => rank(a) - rank(b));
  const free = status.filter((s) => !s.paid).length;
  const lines = [
    "# ssych parts catalog",
    "",
    `Generated from ${BASE}/registry.json on ${new Date().toISOString().slice(0, 10)}: ${status.length} parts, ${free} free (MIT), ${status.length - free} paid.`,
    "Regenerate with `node scripts/parts.mjs --md > references/catalog.md`. The live registry wins over this file; check slugs with `node scripts/parts.mjs <slug>` before installing.",
    "",
    "Free parts install with `npx shadcn@latest add @ssych/<slug>`. Paid parts need a signed in ssych.com account that owns them (see SKILL.md).",
    "",
  ];
  for (const k of keys) {
    lines.push(`## ${k}`, "");
    for (const p of groups.get(k).sort((a, b) => a.name.localeCompare(b.name))) {
      const desc = (p.description || "").replace(/\s+/g, " ").trim();
      lines.push(`- \`${p.name}\`${p.paid ? " (paid)" : ""}: ${desc}`);
    }
    lines.push("");
  }
  process.stdout.write(lines.join("\n"));
} else if (args.includes("--all")) {
  const items = await index();
  const status = await pool(items.map((i) => i.name), 8, item);
  for (const s of status) console.log(`${s.paid ? "paid" : "free"}  ${s.slug}`);
} else if (args.length) {
  const status = await pool(args, 8, item);
  let bad = 0;
  for (const s of status) {
    if (!s.exists) {
      bad++;
      console.log(`missing  ${s.slug}  (no such part; do not install it, pick another from references/catalog.md)`);
    } else if (s.paid) {
      bad++;
      console.log(`paid     ${s.slug}  ${s.title}: needs an ssych.com account that owns it, see https://ssych.com/library/${s.slug}`);
    } else {
      const extra = [s.deps.length ? `npm: ${s.deps.join(" ")}` : "", s.needs.length ? `pulls in: ${s.needs.join(" ")}` : ""].filter(Boolean).join("; ");
      console.log(`free     ${s.slug}  ${s.title}${extra ? `  (${extra})` : ""}`);
    }
  }
  const ok = status.filter((s) => s.exists && !s.paid).map((s) => `@ssych/${s.slug}`);
  if (ok.length) console.log(`\ninstall: npx shadcn@latest add ${ok.join(" ")} --yes`);
  process.exit(bad ? 1 : 0);
} else {
  console.log("usage: node parts.mjs <slug> [slug...] | --all | --md");
}
