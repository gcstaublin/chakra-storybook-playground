# Work Order — Chakra Token-Driven Component Library

_From inspection: `reports/2026-08-17-inspection.md` · Written: 2026-08-17_

Reds get fixed now. Yellows get scheduled. Greens get left alone (and celebrated — though this pass has none yet). Every item cites its station and evidence — no vibes-based work items. The team owns prioritization; this is the technician's recommendation.

## 🔴 Fix now (reds)

### 1. Fix Dialog's missing focus management
- **Station:** 3, Accessibility · **Evidence:** `[verified]` — grep for `focus` in `src/components/Dialog/Dialog.tsx` returns zero matches; no focus trap, no initial focus on open, no focus restore on close. ARIA (`role="dialog"`, `aria-modal`, `aria-labelledby`) is otherwise correct.
- **Why it's first:** it's the one interactive overlay component in the system, it's small and self-contained, and it's a real keyboard-user-facing bug today, not a theoretical one.
- **First move:** add a focus trap (move focus to the dialog content on open, cycle Tab within it, restore focus to the trigger element on close). A small custom hook or a battle-tested primitive (e.g. `focus-trap-react`) both work — Chakra v3 doesn't ship this for free since Dialog here is a hand-rolled component, not Chakra's built-in.
- **AI assist:** have an agent draft the hook and the Dialog.tsx wiring; a human should manually tab through the result before merging — this is exactly the kind of behavior automated a11y scanners often miss.
- **Done when:** tabbing through an open Dialog never reaches the page behind it, focus lands inside the dialog on open, and focus returns to the trigger button on close.
- **Effort:** S

### 2. Run `npm audit fix` for the 4 critical / 3 high vulnerabilities
- **Station:** 7, Governance · **Evidence:** `[verified]` — issue #12 has a full, scoped, non-breaking fix path documented; independently reran `npm audit` today (2026-08-17) and confirmed all 7 vulnerabilities are still present, 9 days after the issue was filed.
- **Why it's first:** the fix is already scoped and non-breaking — this is the highest-leverage-to-effort item in the entire work order.
- **First move:** `npm audit fix`, then confirm `npm run build:tokens && npm run storybook` still work.
- **AI assist:** an agent can run the fix and the verification build; a human should skim the diff in `package-lock.json` before merging.
- **Done when:** `npm audit` reports 0 vulnerabilities and issue #12 is closed.
- **Effort:** S

### 3. Wire the installed a11y and test tooling into CI
- **Station:** 3 & 5, Accessibility / Testing · **Evidence:** `[verified]` — `@storybook/addon-a11y` is set to `test: "todo"` (non-blocking) in `preview.tsx`; `@storybook/addon-vitest` + Playwright is fully configured in `vite.config.ts` but there's no `test` npm script and CI never calls it.
- **Why it's first:** the infrastructure is already installed and paid for — this is activation, not new build. Every future component gets checked automatically the moment this lands.
- **First move:** add a `"test": "vitest run"` script to `package.json`, flip `a11y.test` from `"todo"` to `"error"` in `preview.tsx`, and add a `test` job to `.github/workflows/ci.yml`.
- **AI assist:** an agent can wire all three changes and confirm the pipeline runs green (or correctly red) locally before opening the PR.
- **Done when:** a PR that introduces an a11y violation or a failing interaction test fails CI.
- **Effort:** S

## 🟡 Schedule (yellows)

### 4. Fix the two real contrast failures in the token system
- **Station:** 3, Accessibility · **Evidence:** `[verified, computed]` — default input/card border (`neutral-200` on white) = 1.31:1 vs. 3:1 required; focus-ring color (`blue-400` on white) = 2.99:1, essentially failing the same bar; placeholder text (`neutral-400`) = 2.67:1 vs. 4.5:1 required.
- **First move:** darken `color-border-default` and `color-border-focus` slightly, and darken `color-text-placeholder` — fix at the token level so every component inherits the correction. · **Done when:** the contrast script (kept in `ds-inspection/` scratch or added as a real script) reports all three passing.
- **Suggested timing:** this sprint — it's a token-value change, not a rebuild.

### 5. Build the missing 4 components in Figma (or formally scope as code-first)
- **Station:** 1 & 6, Coverage / Orchestration · **Evidence:** `[verified]` — Card, Dialog, Grid, and Input all have full token bindings ready in Figma's Component collection but no Figma component exists for any of them.
- **First move:** either build the four missing component sets in Figma using Button's 72-variant structure as the template (state machine, cssMapping, token binding), or write down explicitly that this system is code-first with design intentionally lagging — right now the gap reads as accidental.
- **Suggested timing:** this quarter.

### 6. Remove or relocate the "Cool dude" Figma component and clean up hardcoded values
- **Station:** 2, Best practices · **Evidence:** `[verified]` — stray 2-variant component set (one variant literally named "Variant2") in the production Figma file; Dialog's `560px`/`90%`/`z-index: 1` and Button/Input's hardcoded `150ms ease` transitions violate the system's own documented "no hardcoded values" rule.
- **First move:** delete or move "Cool dude" out of the library file; add the missing dialog dimensions and a motion/duration token tier, then replace the hardcoded values.
- **Suggested timing:** this sprint — small, contained cleanup.

### 7. Write down the naming algorithm
- **Station:** 4, Shared language · **Evidence:** `[verified]` — scheme is coherent and consistently followed (role-based tokens, `is-` prefixed booleans, shared `sm`/`md`/`lg` scale) but exists nowhere in writing, and Figma's Title Case variant values don't string-match code's lowercase ones.
- **First move:** a short page in Storybook docs stating the token-naming algorithm and the prop-naming conventions observed so far.
- **Suggested timing:** before next inspection — cheap now, expensive to reconstruct later once more components exist.

### 8. Automate the Figma↔code drift check
- **Station:** 6, Orchestration · **Evidence:** `[verified]` — the team caught and fixed a real drift (`button/bg/disabled`) once, manually, and documented the detection method, but nothing runs that check automatically.
- **First move:** turn the manual "pull live variable, diff against JSON" check documented in "The More You Know" into a scheduled job or a CI step.
- **Suggested timing:** this quarter.

### 9. Author an `AGENTS.md` / `llms.txt` stating the DS/Chakra boundary
- **Station:** 9, Machine-readable docs · **Evidence:** `[verified, generation test]` — no documented boundary exists between "use these 5 tokenized components" and "reach for raw Chakra primitives," and no `FormField`/label-pairing pattern exists despite being a near-certain agent need.
- **First move:** a short agent-facing file stating what exists, what doesn't yet, and where the system's authority ends.
- **Suggested timing:** before next inspection.

### 10. Extend the "ask Claude to..." pattern beyond token sync
- **Station:** 10, Agent access · **Evidence:** `[verified]` — the only documented agent-runnable workflow is token push/pull; no equivalent exists for component scaffolding or page composition, despite the MCP surface and the precedent both already existing.
- **First move:** write one more `FigmaSync.mdx`-style workflow doc for "scaffold a new on-system component."
- **Suggested timing:** this quarter.

## 🔧 Access upgrades (sharper next inspection)

None needed for design or code — both were fully live this pass. The one gap: no design-systems knowledge MCP (e.g. Southleft's) was connected, so Station 1's industry benchmark leaned on general knowledge rather than a queryable, citable source. Connecting one would sharpen that station specifically; everything else already had full live access.

## 🟢 Keeping the greens green

No green stations this pass — nothing to protect yet. The token pipeline (Stations 1, 6) is the closest thing to a green and is worth protecting as the system grows: keep the `$extensions.figma` ID-based mapping discipline as new tokens are added, and don't let a second, parallel token source creep in.

## Cadence

- Re-inspect (deep, all stations): 2026-11-17
- Everyday checks to wire into CI now: Station 3 (a11y test gate) and Station 5 (unit/interaction tests, lint) — both already have the tooling installed, this is activation not new build
- Owner of this work order: design system team (per GARAGE.md, small dedicated team) · Review: to be established — no recurring review ritual currently documented (see Station 7)
