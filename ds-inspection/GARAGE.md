# GARAGE.md — Chakra Token-Driven Component Library
_Checked in: 2026-08-17 · Re-confirm at next inspection_

## Vehicle
- System: unnamed internal design system (repo: `chakra-storybook-playground`), built on Chakra UI v3
- Team: small dedicated team (design + eng mix not specified)
- Consumers: not specified — repo shows no downstream consumer references yet; appears early-stage
- Age: ~7 weeks old (first commit 2026-06-27, most recent 2026-08-08). No major rebuilds — still v0.0.0, single continuous build
- Reason for service: routine/exploratory check-in, no specific incident or complaint driving it

## Assets
- Design library: Figma, file "Chakra <> Github Sync" (fileKey `JEQSuTmseYtJdcAprgp0UA`). Design summary shows 2 component sets (Button, "Cool dude") and **0 registered tokens/variables** despite the token-sync docs describing a full Base/Semantic/Component variable pipeline
- Code library: Chakra UI v3 (recipe-based), React 19, single repo, private package (`chakra-storybook-playground`, unpublished — no npm distribution). Token pipeline: Style Dictionary v4, DTCG-spec JSON in `src/tokens/{base,semantic,component}.json` → `build/` (CSS custom properties, SCSS, TS module)
- Docs: Storybook v10, local dev only (no deployed URL found in repo/CI — build-storybook artifact uploaded to GitHub Actions with 3-day retention, not published to a hosted site). Covers Getting Started, Design Tokens, Components, Figma Sync, Chromatic Setup, Publishing, "The More You Know" (gotchas log)
- Process: GitHub Issues/PRs (repo uses PR numbers in commit messages). No CONTRIBUTING.md, no CODEOWNERS, no support channel documented in-repo
- AI surface: Figma Console MCP (Desktop Bridge) actively connected and used for bidirectional token sync, documented in `src/stories/FigmaSync.mdx`. No `llms.txt`, no CLAUDE.md, no Code Connect

## Evidence access map
| Asset | Access | Verified how |
|---|---|---|
| Design library | **live** | Figma Desktop Bridge connected (`figma_get_status` probe succeeded, 3ms latency); `figma_get_design_system_summary` returned real data for file "Chakra <> Github Sync" |
| Code library | **live** | Read `package.json`, `src/` tree, `src/tokens/*.json`, `src/system.ts`, component/recipe files directly from repo |
| Docs | **live** | Read all `src/stories/*.mdx` files directly from repo |
| Process | **live** (partial) | `git log` and `.github/workflows/ci.yml` read directly; no issue tracker API access, PR discussion content not fetched |

## Known symptoms
- None reported — team wants a baseline read, no pre-existing suspicion of specific reds

## Probable greens
- Not stated by team; token pipeline (DTCG, 3-layer, Style Dictionary) and CI (typecheck/token-build/Storybook-build/Chromatic) look structurally sound on first pass — to be verified per-station

## Intentional deviations
- CI jobs use `npm install` instead of `npm ci` deliberately (documented in `.github/workflows/ci.yml` comment and `src/stories/ChromaticSetup.mdx`) — `@napi-rs/wasm-runtime` optional-dep resolution issue across macOS/Linux. Respect this; not a finding.

## Scope & frame
- Stations this pass: all 10 (full inspection)
- Scoring frame: small dedicated team
- Out of scope: none specified
