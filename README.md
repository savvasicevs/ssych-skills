# ssych skills

An agent skill that builds trading, crypto and fintech screens with the [ssych](https://ssych.com) component library.

Ask your coding agent for a trading screen, an order book, a candlestick chart, a portfolio or wallet dashboard, a KPI row or a positions table. The skill picks the matching @ssych parts, checks each slug against the live registry, installs them with the shadcn CLI, lays them out in a dense dark grid and runs the build.

<!-- Screenshot: a crypto trading screen built by the skill (candlestick, order book, depth chart, order ticket, positions). Add it as docs/screen.png and link it here. -->

## Install

```bash
npx skills add savvasicevs/ssych-skills
```

Works with Claude Code, Cursor, Codex, OpenCode and the other agents the `skills` CLI supports. Add `-g` to install it for every project.

## What it does

1. Maps the request to parts using a list of screens (terminal, swap, portfolio, wallet, screener, stock research, journal, KPI rows, payments, AI console).
2. Checks every slug with `scripts/parts.mjs`, which reads `https://ui.ssych.com/r/registry.json` and says free, paid or missing.
3. Installs with `npx shadcn@latest add @ssych/<slug>`. The source lands in your repo under `components/ui`.
4. Composes the screen by a short set of layout rules: black ground, fills instead of borders, one sided hairlines, colour only for up and down, tabular figures, wide low charts.
5. Builds the app and reports which parts it used and whether the screen shows real or sample data.

## Free and paid

- All 116 single components are free under MIT and install with no account.
- 17 full dashboard screens and landing pages are paid (for example `terminal-cex`, `portfolio-book`, `wallet-home`). They install only with a signed command from an ssych.com account that owns them. The skill labels them and builds from free parts unless you have one.

Counts are from November 2026. Run `node skills/ssych-trading-ui/scripts/parts.mjs --all` for the current list.

## What it does not do

- It does not include a market data feed. The parts render the data you pass them and ship with sample data until you do.
- It does not add a chart library. Every chart is SVG inside the component.

## Files

```
skills/ssych-trading-ui/
  SKILL.md                 the instructions the agent follows
  references/recipes.md    screens and the parts that build them
  references/catalog.md    every part with its description, free or paid
  scripts/parts.mjs        checks slugs against the live registry
```

Refresh the catalog after the registry changes:

```bash
node skills/ssych-trading-ui/scripts/parts.mjs --md > skills/ssych-trading-ui/references/catalog.md
```

## Links

- Components and previews: https://ssych.com/library
- Registry index: https://ui.ssych.com/r/registry.json
- Component source: https://github.com/savvasicevs/ssych-ui

## License

MIT
