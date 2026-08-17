# Multi-Point Inspection Report — Chakra Token-Driven Component Library

_Inspected: 2026-08-17 · Technician: Claude Sonnet 5 (ds-inspection skill) · Previous inspection: first inspection_
_Vehicle profile: `ds-inspection/GARAGE.md` (checked in 2026-08-17)_

## The short version

This is a 7-week-old system with a genuinely excellent engine and a body that's only half-built. The token pipeline is the real standout: 134 Figma variables trace 1:1 through a clean 3-tier DTCG JSON structure to CSS/SCSS/TS output, and the bidirectional Figma↔code sync actually works — I verified a previously-documented drift (`button/bg/disabled`) is now resolved in the live file. But only 1 of the 5 code components (Button) has ever been built in Figma, so "design system" currently means "code library with one matching design counterpart." Accessibility has real, concrete gaps: Dialog has zero focus management (no trap, no initial focus, no restore), and computed contrast ratios show the default input/card border and focus ring fall just under WCAG's 3:1 non-text minimum — and none of it is caught automatically, because the installed a11y test tooling is explicitly set to non-blocking (`test: "todo"`) and never runs in CI anyway. Governance artifacts (CONTRIBUTING, templates, branch protection, changelog) don't exist yet, and a fully-triaged, fully-scoped issue for 7 npm vulnerabilities (4 critical) has sat open and unfixed for 9 days despite the fix being one non-breaking command. The single most important thing to do next: fix Dialog's focus trap and run `npm audit fix` — both are near-zero effort and close the two sharpest edges — then decide deliberately whether to build out the remaining 4 Figma components or formally scope this as code-first-with-Figma-lagging.

**Overall: 47/100** — a conversation starter, not a grade. Fix the reds, schedule the yellows, re-run on a cadence.

## Inspection sheet

|  # | Station                         | Quality      | Light |      Score |
|---:|:---------------------------------|:-------------|:-----:|-----------:|
|  1 | Coverage & gaps                  | Complete     |  🟡   |       4/10 |
|  2 | Best practices                   | Sound        |  🟡   |       7/10 |
|  3 | Accessibility                     | Sound        |  🔴   |       3/10 |
|  4 | Shared language                   | Sound        |  🟡   |       6/10 |
|  5 | Testing & validation               | Sound        |  🟡   |       5/10 |
|  6 | Orchestration                      | Synchronized |  🟡   |       6/10 |
|  7 | Governance & version control       | Extensible   |  🔴   |       3/10 |
|  8 | Feedback & adoption                | Extensible   |  🔴   |       2/10 |
|  9 | Machine-readable docs & context     | AI-Ready     |  🟡   |       5/10 |
| 10 | Agent access                       | AI-Ready     |  🟡   |       6/10 |
|    | **Overall**                        |              |       | **47/100** |

**Lights:** 🟢 0 green · 🟡 7 yellow · 🔴 3 red · 0 not inspected

**Key:** 🔴 Red (0–3) — broken or missing; the light is ON · 🟡 Yellow (4–7) — drift or gaps; schedule a fix · 🟢 Green (8–10) — healthy, no action needed · **N/I** — not inspected (no evidence access; never guessed)

## Evidence basis

- Access used this pass: **live** for every asset — Figma Desktop Bridge MCP (probed and confirmed responsive, 3ms latency) for the design library; direct repo file reads for code, tokens, and docs; `gh` CLI for issues/PRs/branch-protection/secrets; a locally-run OKLCH→WCAG contrast calculation script for Station 3; independent `npm audit` run to verify Station 7's vulnerability claim.
- Findings tagged `[verified]`: all findings this pass · `[reported]`: 0 — full live access on both the design and code legs meant nothing had to be taken on faith.
- This is unusually strong access for a first inspection — most of the value going forward is in acting on what was found, not in improving access.

## Station records

### Station 1 — Coverage & gaps: YELLOW (4/10)
- Inventory: 5 in code (Button, Card, Dialog, Grid, Input) · 1 in design (Button; 72 variants) + 1 unrelated stray ("Cool dude", 2 variants) · 5 documented (one Storybook story file per code component)
- Evidence level: live (Figma MCP + repo reads) for all assets
- Findings:
  - [verified] 4 of 5 code components (Card, Dialog, Grid, Input) have no Figma counterpart, despite full token bindings already existing in Figma's Component collection (`card/*`, `dialog/*`, `input/*`, `grid/*` all present in the 134-variable set) — the design side is ready to receive these components but nobody built them
  - [verified] Token system is genuinely tiered (base → semantic → component) and covers color, spacing, typography, radii, shadow, and z-index — but has no motion/duration tier; transitions are hardcoded `150ms ease` in Button and Input recipes
  - [verified] Only ~5 of the ~18 common staple components exist (no Link, Select/Checkbox/Radio, Table, Tabs, Accordion, Alert/Toast, Badge, Avatar, Pagination, Breadcrumb, Tooltip, form-field/label pattern) — expected for a 7-week-old system, not treated as a surprise finding
  - [verified] No published, versioned artifact: `package.json` is `"private": true`, still `v0.0.0`, no npm distribution, no git tags
- Not inspected: industry benchmark comparison against Material/Fluent/Carbon/etc. was done from general knowledge, not a connected design-systems knowledge MCP (none was connected this pass)
- Deviations noted: none claimed by the team for this station
- First move: decide and record, deliberately, whether Card/Dialog/Grid/Input get built in Figma next or whether this system is intentionally code-first with design lagging — right now the gap looks accidental, not chosen

### Station 2 — Best practices: YELLOW (7/10)
- Sampled: all 5 code components read in full; the one Figma component (Button, 72 variants) analyzed in full
- Evidence level: live for both design and code
- Findings:
  - [verified, format] The Button Figma component set is genuinely excellent craft: its state machine (Variant × Size × State, 72 combinations) maps 1:1 to the code's real CSS selectors (`:hover`, `:active`, `:focus-visible`, `:disabled`, `[aria-busy]`) — rare parity for a system this young
  - [verified, industry] Code is consistently well-formed across all 5 components: `forwardRef`, `useRecipe`, logical properties (`paddingInline`/`paddingBlock` — RTL-safe), no div-soup, no overstuffed prop APIs
  - [verified, org] The system violates its own documented rule ("No style values are ever hardcoded" — `Components.mdx`) in several places: Dialog's `maxWidth: "560px"`, `width: "90%"`, `zIndex: 1`, and hardcoded `150ms ease` transitions in Button/Input
  - [verified, format] A stray Figma component set, "Cool dude" (2 variants, one literally named "Variant2"), sits in the production library file with no code counterpart and no discernible purpose — file hygiene gap
- Not inspected: no other Figma files exist to check file-hierarchy separation (library vs. product vs. draft)
- Deviations noted: none
- First move: delete or relocate "Cool dude"; replace the four hardcoded Dialog values and the transition durations with tokens

### Station 3 — Accessibility: RED (3/10)
- Sampled: all 5 code components read for keyboard/ARIA/focus fundamentals; contrast computed for 11 token pairs actually used in components; CI and Storybook a11y config inspected
- Evidence level: live (repo reads + a locally-run OKLCH→sRGB→WCAG contrast calculation, computed from the actual token values, not estimated)
- Findings:
  - [verified] Dialog.tsx has zero focus management — grep for "focus" in the file returns no matches. No focus moves into the dialog on open, nothing traps Tab inside it, nothing restores focus to the trigger on close. ARIA is otherwise correct (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`) — the semantics are right, the keyboard behavior isn't
  - [verified, computed] Contrast failures found: default input/card border (`neutral-200` on white) = 1.31:1 against a 3:1 non-text minimum (WCAG 1.4.11); focus-ring color (`blue-400` on white) = 2.99:1, essentially failing the same 3:1 bar; placeholder/disabled text color (`neutral-400` on white) = 2.67:1 against a 4.5:1 text minimum
  - [verified, computed] Passes: button text on all colored backgrounds (4.74–7.59:1), body text-primary/secondary on white (7.12–19.67:1) — the core reading experience is sound
  - [verified] `@storybook/addon-a11y` is installed and configured, but `preview.tsx` sets `a11y: { test: "todo" }` — violations surface in a local panel only, never fail a test run
  - [verified] The Vitest browser-mode test infrastructure that would run those a11y checks (`storybookTest` plugin + Playwright, fully wired in `vite.config.ts`) never executes: no `test` script in `package.json`, and CI never invokes it
  - [verified] Zero per-component or org-level accessibility documentation anywhere in Storybook docs (checked Getting Started, Components, Design Tokens, The More You Know)
- Not inspected: no screen-reader (VoiceOver/NVDA) manual pass was run; dark mode / alternate theme contrast wasn't checked (no second mode exists in the token system — single "Default" mode confirmed via `figma_get_variables`)
- Deviations noted: none
- First move: add a focus trap + initial-focus + focus-restore to Dialog (small, well-scoped fix); flip `a11y.test` from `"todo"` to `"error"` and wire a `test` script into CI so it actually gates

### Station 4 — Shared language: YELLOW (6/10)
- Swept: all 5 component APIs (props/types), the full token naming scheme across all 3 tiers, Figma variant/property names for Button
- Evidence level: live for both design and code
- Findings:
  - [verified] Token naming algorithm is coherent and role-based at the semantic/component tiers (`color-action-primary`, not raw `blue-500`) and traces cleanly JSON → CSS custom property → Figma variable (slash-namespaced, e.g. `button/bg/primary`)
  - [verified] Boolean props follow one consistent pattern across components: `isLoading` (Button), `isInvalid` (Input), `isOpen` (Dialog) — no drift observed
  - [verified] Scale naming (`sm`/`md`/`lg`) is reused identically between Button's `size` and Grid's `gap` — real cross-component consistency
  - [verified] Figma's variant values are full-word Title Case ("Small", "Primary") while code uses lowercase abbreviations (`sm`, `primary`) — conceptually traceable but not string-identical; the mapping lives in people's heads, not a lookup
  - [verified] No naming-convention document exists anywhere, and no lint rule or validator catches drift — the scheme is followed by discipline, not enforcement
- Not inspected: only 5 components exist, so this sample is the full population, not a slice — can't yet assess how the scheme holds up at larger scale
- Deviations noted: none
- First move: write the naming algorithm down (even a short page) before the component count grows past what one person can hold in their head

### Station 5 — Testing & validation: YELLOW (5/10)
- Inspected: CI workflow config, `vite.config.ts` test wiring, all 6 story files for interaction (`play`) functions, Chromatic activation status (including confirming the repository secret exists)
- Evidence level: live — repo reads plus `gh secret list` to independently confirm Chromatic's token is actually configured, not just documented as configured
- Findings:
  - [verified] TypeScript typecheck (`tsc --noEmit`) runs in CI on every push/PR — a real, working gate
  - [verified] Chromatic visual regression is genuinely active: `CHROMATIC_PROJECT_TOKEN` confirmed present via `gh secret list`, job runs on every PR per the CI config
  - [verified] Visual regression doesn't block merges — `main` has no branch protection (confirmed via GitHub API, 404), so a red "UI Tests" check doesn't stop a merge. This is a documented, deliberate choice per `ChromaticSetup.mdx`, not an oversight
  - [verified] Zero unit or interaction tests exist: `@storybook/addon-vitest` + Playwright browser testing is fully installed and configured in `vite.config.ts`, but grep for actual `play:` function definitions across all story files returns zero matches, there's no `test` script in `package.json`, and CI never invokes it
  - [verified] `npm run lint` (oxlint) exists but is never run in CI
  - [verified] No eval or acceptance check exists for the AI-driven Figma↔code token sync workflow — per `FigmaSync.mdx`, verification is "check in Storybook that nothing looks broken," a manual eyeball step
- Not inspected: n/a — full access this pass
- Deviations noted: `npm install` instead of `npm ci` in CI is a documented, intentional workaround (see GARAGE.md) — not counted as a finding
- First move: write one interaction test for Dialog (open, Tab, Escape, close) and wire `test` + `lint` into CI — the infrastructure for the first is already installed and unused

### Station 6 — Orchestration: YELLOW (6/10)
- Diffed: token pipeline (JSON ↔ live Figma variables) for drift; the one shared component (Button) for design/code parity; docs against the actual mechanisms they describe
- Evidence level: live — pulled the *current* live Figma token export to check against a specific drift the team had self-documented
- Findings:
  - [verified] Real, working sync: I traced a drift the team logged in "The More You Know" (`button/bg/disabled` was found one shade off — aliased to `surface-subtle`/neutral-50 in Figma instead of neutral-100) and pulled the current live value — it now resolves to `semantic.color.surface.muted` (neutral-100), exactly matching code's `button-bg-disabled`. The documented gotcha has been fixed; the pipeline demonstrably works when watched
  - [verified] That sync is entirely manual/on-request — nothing runs on a schedule or in CI to catch this class of drift proactively; it was caught once by a person paying attention, not by a system
  - [verified] Component-level parity is excellent where it exists (Button, Station 2) but moot for the other 80% of the library — Card/Dialog/Grid/Input have no design counterpart to drift from or sync with in the first place
  - [verified] Docs accurately describe reality: `FigmaSync.mdx`'s example JSON structure matches the real `$extensions.figma` fields found in the token files; `Components.mdx`'s described authoring pattern matches the real structure of Button/Card/Input
- Not inspected: no second platform (iOS/Android) exists to check for cross-platform token drift — web is the only consumer
- Deviations noted: none
- First move: turn the manual drift-check into a scheduled or CI-triggered one — the detection method is already written down in "The More You Know," it just isn't automated

### Station 7 — Governance & version control: RED (3/10)
- Inspected: repo root and `.github/` for process artifacts; branch protection via GitHub API; full issue and PR history via `gh`; independently re-ran `npm audit`
- Evidence level: live — `gh` CLI access to the real GitHub repo, not just local files
- Findings:
  - [verified] No CONTRIBUTING guide, no PR/issue templates, no CHANGELOG, no CODEOWERS file, no git tags/releases (`package.json` still `v0.0.0`)
  - [verified] No branch protection on `main` — confirmed live via GitHub API (404, "Branch not protected")
  - [verified] Despite no formal template, practice is disciplined: every merged PR (14 total, 11 merged) has a clear, scoped title and a consistent branch-naming convention (`feat/`, `fix/`, `docs/`, `ci/`, `refactor/`) — governance-by-habit, not governance-by-document
  - [verified] Issue #12 ("Resolve 7 npm audit vulnerabilities, 4 critical, 3 high") is thoroughly triaged — package-by-package breakdown, affected ranges, confirms a non-breaking fix path exists — but has sat open and unfixed for 9 days as of this inspection. I independently reran `npm audit` and confirmed the same 7 vulnerabilities (4 critical, 3 high) are still present today
  - [verified] Issue tracker itself is healthy: only 2 open issues, no stale/duplicate backlog, and issue #9 shows real issue-to-PR traceability (opened, tracked, closed exactly when the corresponding PRs shipped)
- Not inspected: ownership structure beyond what's visible in commit/PR history — GARAGE.md reports a "small dedicated team" but the repo alone can't confirm a formal ownership model
- Deviations noted: none
- First move: run `npm audit fix` — the fix is already scoped and non-breaking, so this is minutes of work sitting open for over a week

### Station 8 — Feedback & adoption: RED (2/10)
- Measured: package distribution status, presence of consumer repos, feedback channels, and inspection cadence history
- Evidence level: live — confirmed via `package.json` (`"private": true`, no tags) and absence of any consumer references anywhere in the repo or GARAGE.md intake
- Findings:
  - [verified] No distributed artifact exists for anyone to adopt — the package is private, unpublished, and un-versioned (Station 1)
  - [verified] No consumer repos, no usage/adoption analytics, no feedback channel documented anywhere
  - [verified] This is the first recorded inspection — no `ds-inspection/` folder existed before this session, so no cadence has been established yet
- Not inspected: n/a — the absence itself is the finding, confirmed directly
- Deviations noted: this is expected and appropriate for a 7-week-old, pre-distribution system, not a sign of neglect — flagged as a gap to close once the component set matures (Station 1), not an urgent fire
- First move: nothing to fix here yet; the real first move is deciding when this system is ready to be published/consumed, since that's the actual prerequisite for this station to have anything to measure

### Station 9 — Machine-readable docs & context: YELLOW (5/10)
- Inventoried: token output formats, component type definitions, presence of `llms.txt`/agent-rules files, docs structure · Generation test: run (lightweight — composed a labeled form field mentally using only documented components)
- Evidence level: live — direct repo reads
- Findings:
  - [verified] Tokens ship in three machine-consumable formats simultaneously: DTCG JSON, CSS custom properties, and a TypeScript module (via Style Dictionary), plus live Figma Variables
  - [verified] Every component has a real, complete TypeScript interface (`ButtonProps`, `CardProps`, `DialogProps`, `InputProps`, `GridProps`) — parseable by any tool that reads TS
  - [verified] `FigmaSync.mdx` is unusually good: it's written as direct operating instructions for an AI agent ("Ask Claude to...", "Claude will: 1... 2... 3..."), not human-only prose
  - [verified] No `llms.txt`, no `CLAUDE.md`/`AGENTS.md`, no structured component metadata (purpose, anti-patterns, composition rules, a11y contract) anywhere
  - [verified, generation test] Attempted to compose a labeled input field using only the documented components and hit two real gaps: no `FormField`/label-pairing component or pattern exists or is documented anywhere, and nothing states where the design system's authority ends and raw Chakra UI primitives become fair game for an agent to reach for
- Not inspected: no full live agent build-a-composition test was run against the actual codebase (only the lightweight reasoning-level version above)
- Deviations noted: none
- First move: write a short `llms.txt` or `AGENTS.md` that states the DS/Chakra boundary explicitly and lists what doesn't exist yet (so agents stop guessing at a FormField pattern that isn't there)

### Station 10 — Agent access: YELLOW (6/10)
- Surfaces mapped: Figma Console MCP (Desktop Bridge) · Live test: run implicitly throughout this entire inspection (every design-side finding in Stations 1, 2, 6 came from live, successful MCP calls)
- Evidence level: live — this station's own evidence chain, built over the whole session, is the proof
- Findings:
  - [verified] A real, working MCP surface is connected and was used successfully dozens of times this session: component search, variant/state-machine analysis, live variable export, drift verification — all returned accurate, correct data, not guesses
  - [verified] It's documented and discoverable: `FigmaSync.mdx` tells contributors exactly how to connect it and what it's for
  - [verified] No Figma Code Connect or equivalent formal design-to-code mapping exists
  - [verified] The only documented agent workflow is token push/pull — there's no agent-runnable workflow for "scaffold a new component" or "rebuild this page," and `Components.mdx`'s authoring guide is written for a human, not phrased as agent instructions
  - [verified] Since only Button exists in Figma, an agent querying the design library for Card/Dialog/Input/Grid's design intent finds nothing there — the access surface works, but for 80% of the library there's nothing on the other end
- Not inspected: no evidence of use by more than the one documented token-sync workflow — can't confirm habitual, team-wide agent use beyond that
- Deviations noted: none
- First move: extend the documented "ask Claude to..." pattern from token-sync to component scaffolding — the MCP surface and the precedent both already exist

## Next service

- Work order: `ds-inspection/work-orders/2026-08-17-work-order.md`
- Recommended cadence: deep inspection quarterly (next: **2026-11-17**); wire Stations 3 (a11y) and 5 (testing) checks into CI now — both already have the tooling installed, just not connected
- Re-inspect by: 2026-11-17
