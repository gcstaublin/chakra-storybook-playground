# Chakra UI Token-Driven Component Library

A design token-driven component library built with Chakra UI v3, Style Dictionary, and Storybook. Tokens are authored in DTCG-spec JSON, built into CSS custom properties, and synced bidirectionally with Figma variables.

## Stack

| Layer | Tool |
| --- | --- |
| Components | Chakra UI v3 (recipe-based) |
| Token build | Style Dictionary v4 |
| Documentation | Storybook v10 |
| Token format | DTCG spec (3-layer: base → semantic → component) |
| Colors | OKLCH (authored) → hex (Figma sync) |
| CI | GitHub Actions |

## Quick start

```bash
npm install
npm run build:tokens   # required before starting Storybook
npm run storybook
```

## Token build

```bash
npm run build:tokens
```

Outputs to `build/` — CSS custom properties, SCSS variables, and a TypeScript module. The CSS file (`build/css/tokens.css`) is imported automatically by Storybook.

## Project structure

```
src/
├── tokens/
│   ├── base.json        # raw values (color, space, typography)
│   ├── semantic.json    # intent aliases (color-action-primary → color-blue-500)
│   └── component.json   # component-scoped tokens (button-bg-primary → ...)
├── components/
│   └── Button/
│       ├── recipe.ts    # defineRecipe — all styles reference var(--ds-*)
│       └── Button.tsx   # useRecipe({ key }) + chakra.* element
└── system.ts            # createSystem — registers recipes, --ds- prefix
```

## Documentation

All usage guides live in Storybook:

- **Documentation / Getting Started** — setup and workflow overview
- **Documentation / Design Tokens** — token layers and naming conventions
- **Documentation / Components** — how to add components and recipes
- **Documentation / Figma Sync** — pushing and pulling tokens with Figma
- **Documentation / Chromatic Setup** — activating visual regression CI

## CI

GitHub Actions runs on every push and PR to `main`:

1. `build-tokens` — builds the token artifacts
2. `build-storybook` — builds Storybook against the token artifact

Chromatic visual regression is wired up but requires a `CHROMATIC_PROJECT_TOKEN` secret. See **Documentation / Chromatic Setup** in Storybook for activation steps.
