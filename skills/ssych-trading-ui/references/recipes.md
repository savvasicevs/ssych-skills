# Screens and the parts that build them

Every slug here exists in the registry as of Nov 2026. All are free unless marked paid. Check them with `node scripts/parts.mjs <slugs>` before installing, since the registry can change.

## Crypto or stock trading terminal

Core:
- `candlestick`: OHLC candles with a volume pane, magnet crosshair, OHLC legend and buy or sell markers.
- `order-book`: bids and asks with depth bars and price grouping.
- `depth-chart`: bid and ask liquidity around the mid price. Pair it with the candlestick behind a `segmented-control` (Price | Depth).
- `order-ticket`: buy and sell, limit and market, price, amount and total kept in sync.
- `positions-table`: open futures or margin positions with entry, mark, liquidation price and unrealised P&L.

Add as needed:
- `trade-tape`: live time and sales. Often a tab next to the order book.
- `ticker-tape`: a scrolling price strip across the top.
- `leverage-ticket`: perpetual futures ticket with long or short and a leverage slider. Use instead of `order-ticket` for perps.
- `execution-controls`: hold to confirm order button with working, filled or rejected states.
- `fills-blotter`: streaming executions for a broker or desk view.
- `volume-profile`, `tape-flow`: volume by price, and the last trades as bars by side.
- `segmented-control`: intervals (1m, 1h, 1d) and view switches.

Paid ready made screen: `terminal-cex`.

## DEX or swap screen

- `swap-ticket`: token swap with amount, flip and token picker.
- `cross-chain-swap`: bridge between networks.
- `swap-confirm`: the confirmation step with rate and minimum received.
- `crypto-fiat`: an amount input switching fiat and token units.
- `amount-slider`: 25, 50, 75, 100 percent presets.
- `top-coins`, `market-shelf`: prices with sparklines around the swap.

## Portfolio or wealth dashboard

- `balance-header`: the total with the 24h move and a privacy toggle. The one number to read first.
- `total-balance` or `performance-chart`: balance over time, or against a benchmark.
- `holdings-table`: holdings with value, price, return and weight.
- `donut-chart`, `allocation-treemap`, `sectors-donut`: allocation. Pick one.
- `returns-calendar`: monthly returns heatmap.
- `equity-drawdown`: equity curve with a synced drawdown pane.
- `graph-comparison`: up to four assets indexed to one start.

Paid ready made screens: `portfolio-book`, `portfolio-allocation`, `portfolio-tiers`, `wealth-invest`.

## Crypto wallet

- `balance-header` or `assets-balance-card`: the wallet total.
- `balance-chart`: balance line coloured by trend.
- `top-coins`, `market-shelf`: coin rows or tiles with sparklines.
- `account-dropdown`: switch between wallet addresses.
- `wallet-drawer`: holdings, DeFi positions and activity in a drawer.
- `swap-ticket`: swap inside the wallet.

Paid ready made screen: `wallet-home`.

## Market overview or screener

- `ticker-tape`: price strip.
- `market-heatmap`: treemap sized by market cap (or volume) and tinted by the move.
- `watchlist-stack`: watchlist with intraday sparklines.
- `series-spotlight`: many assets on one chart, one highlighted.
- `scatter-plot`: risk against return.
- `event-feed`, `news-card`: market events and headlines.
- `flow-bars`: daily inflows and outflows (ETF, exchange, wallet).

Paid ready made screens: `discover-board`, `discover-screener`, `market-watchlist`.

## Stock research page

- `vitals-strip`: price, market cap, volume, P/E in one row.
- `price-scrubber` or `market-snapshot`: the price chart with periods.
- `sma-chart`: price with 20 and 50 day moving averages.
- `range-navigator`: long history with a range minimap.
- `historical-eps`, `price-target-fan`: earnings and analyst targets.
- `ratings-radar`, `analyst-radar`, `comb-rows`: analyst ratings, factor scores, peer comparison.
- `index-card`: S&P 500, Dow, Nasdaq, Russell.

Paid ready made screen: `asset-alerts` (one asset with its price alerts).

## Trading performance or journal

- `stat-tile`: net P&L, win rate, Sharpe as compact tiles with sparklines.
- `equity-drawdown`, `returns-calendar`: performance over time.
- `trade-journal-table`: trades settled to win or loss.
- `heat-calendar`: daily activity.

## KPI rows

Pick by domain, do not mix them in one row:
- `stat-tile`: trading metrics.
- `kpi-card-row`: SaaS, AI and API metrics (requests, uptime) over small area charts.
- `vitals-strip`: stock key stats.

## Business banking and payments

- `payment-card`, `flow-bars`, `sankey-flow`, `stacked-bars`, `approval-quorum`, `date-range-picker`.
- `amount`: shared formatters for currency and crypto amounts. Use it for every figure you format yourself.

Paid ready made screens: `business-balances`, `payout-balance`, `money-account`.

## AI or ops console

- `request-log`, `agent-run-timeline`, `tool-call-card`: API calls and agent runs.
- `model-comparison`: LLM quality, latency, cost and context.
- `uptime-bars`, `radial-gauge`, `kpi-card-row`: health and pass rates.
- `inbox`, `release-feed`, `alert-stack`: notifications and changelogs.

Paid ready made screen: `gpu-pods`.

## Shell and controls for any screen

- `sidebar`: collapsible navigation with a mobile drawer.
- `segmented-control`, `view-switch`: timeframes and view modes.
- `date-range-picker`, `inline-slider`, `amount-slider`: filters and inputs.
- `modal`, `dialog-stack`: confirmations such as cancelling orders.
- `empty-state`: one line and one action when there is no data.
