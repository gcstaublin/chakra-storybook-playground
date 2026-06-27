import StyleDictionary from "style-dictionary";
import { converter, formatHex } from "culori";

// ── Custom transforms ────────────────────────────────────────────────────────

const toOklch = converter("oklch");

StyleDictionary.registerTransform({
  name: "color/oklch-to-hex",
  type: "value",
  filter: (token) => token.$type === "color" || token.type === "color",
  transform: (token) => {
    const raw = token.$value ?? token.value;
    if (typeof raw !== "string") return raw;
    try {
      const parsed = toOklch(raw);
      if (!parsed) return raw;
      return formatHex(parsed) ?? raw;
    } catch {
      return raw;
    }
  },
});

StyleDictionary.registerTransform({
  name: "dimension/rem-to-px",
  type: "value",
  filter: (token) =>
    (token.$type === "dimension" || token.type === "dimension") &&
    typeof (token.$value ?? token.value) === "string" &&
    String(token.$value ?? token.value).endsWith("rem"),
  transform: (token) => {
    const raw = String(token.$value ?? token.value);
    const remVal = parseFloat(raw);
    return `${Math.round(remVal * 16)}px`;
  },
});

// ── Config ───────────────────────────────────────────────────────────────────

/** @type {import("style-dictionary/types").Config} */
const config = {
  log: { warnings: "warn", verbosity: "default" },
  source: [
    "src/tokens/base.json",
    "src/tokens/semantic.json",
    "src/tokens/component.json",
  ],
  platforms: {
    css: {
      transformGroup: "css",
      prefix: "ds",
      buildPath: "build/css/",
      files: [
        {
          destination: "tokens.css",
          format: "css/variables",
          options: { outputReferences: true },
        },
      ],
    },
    "css-figma": {
      transforms: [
        "attribute/cti",
        "name/kebab",
        "color/oklch-to-hex",
        "dimension/rem-to-px",
      ],
      prefix: "ds",
      buildPath: "build/css/",
      files: [
        {
          destination: "tokens-hex.css",
          format: "css/variables",
          options: { outputReferences: false },
        },
      ],
    },
    scss: {
      transformGroup: "scss",
      prefix: "ds",
      buildPath: "build/scss/",
      files: [
        {
          destination: "_tokens.scss",
          format: "scss/variables",
          options: { outputReferences: true },
        },
      ],
    },
    ts: {
      transformGroup: "js",
      buildPath: "build/ts/",
      files: [
        {
          destination: "tokens.ts",
          format: "javascript/es6",
        },
      ],
    },
  },
};

export default config;
