import type { Meta, StoryObj } from "@storybook/react-vite";
import baseTokens from "../tokens/base.json";
import semanticTokens from "../tokens/semantic.json";
import componentTokens from "../tokens/component.json";

// ── Types ────────────────────────────────────────────────────────────────────

interface Token {
  $value: string | number;
  $type: string;
}

type TokenMap = Record<string, Token>;

// ── Helpers ──────────────────────────────────────────────────────────────────

function cssVar(name: string) {
  return `--ds-${name}`;
}

function resolveValue(value: string | number, allTokens: TokenMap): string {
  if (typeof value === "number") return String(value);
  const ref = value.match(/^\{(.+)\}$/);
  if (ref) {
    const referenced = allTokens[ref[1]];
    if (referenced) return resolveValue(referenced.$value, allTokens);
    return value;
  }
  return value;
}

const allTokens: TokenMap = {
  ...baseTokens,
  ...semanticTokens,
  ...componentTokens,
} as TokenMap;

// ── Sub-components ───────────────────────────────────────────────────────────

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontSize: "11px",
      fontWeight: 600,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: "#6b7280",
      margin: "40px 0 16px",
      paddingBottom: "8px",
      borderBottom: "1px solid #e5e7eb",
    }}>
      {children}
    </h2>
  );
}

function LayerBadge({ layer }: { layer: "base" | "semantic" | "component" }) {
  const colors: Record<string, { bg: string; text: string }> = {
    base:      { bg: "#eff6ff", text: "#1d4ed8" },
    semantic:  { bg: "#f0fdf4", text: "#15803d" },
    component: { bg: "#faf5ff", text: "#7e22ce" },
  };
  const { bg, text } = colors[layer];
  return (
    <span style={{
      display: "inline-block",
      fontSize: "10px",
      fontWeight: 600,
      padding: "1px 6px",
      borderRadius: "4px",
      background: bg,
      color: text,
      letterSpacing: "0.04em",
      textTransform: "uppercase",
    }}>
      {layer}
    </span>
  );
}

function ColorSwatch({ name, token, layer }: { name: string; token: Token; layer: "base" | "semantic" | "component" }) {
  const resolved = resolveValue(token.$value, allTokens);
  const varName = cssVar(name);
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "10px 0",
      borderBottom: "1px solid #f3f4f6",
    }}>
      <div style={{
        width: "40px",
        height: "40px",
        borderRadius: "8px",
        background: `var(${varName}, ${resolved})`,
        border: "1px solid rgba(0,0,0,0.08)",
        flexShrink: 0,
      }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "2px" }}>
          <code style={{ fontSize: "12px", fontWeight: 600, color: "#111827" }}>{varName}</code>
          <LayerBadge layer={layer} />
        </div>
        <div style={{ fontSize: "11px", color: "#6b7280", fontFamily: "monospace" }}>
          {String(token.$value)}
          {String(token.$value) !== resolved && (
            <span style={{ color: "#9ca3af" }}> → {resolved}</span>
          )}
        </div>
      </div>
    </div>
  );
}

function DimensionRow({ name, token, layer }: { name: string; token: Token; layer: "base" | "semantic" | "component" }) {
  const resolved = resolveValue(token.$value, allTokens);
  const px = resolved.endsWith("rem") ? parseFloat(resolved) * 16 : parseFloat(resolved);
  const maxPx = 64;
  const barWidth = Math.min((px / maxPx) * 100, 100);
  const varName = cssVar(name);
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "8px 0",
      borderBottom: "1px solid #f3f4f6",
    }}>
      <div style={{ width: "120px", flexShrink: 0 }}>
        <div style={{
          height: "8px",
          borderRadius: "4px",
          background: "#3b82f6",
          width: `${Math.max(barWidth, 2)}%`,
          opacity: 0.7,
        }} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "2px" }}>
          <code style={{ fontSize: "12px", fontWeight: 600, color: "#111827" }}>{varName}</code>
          <LayerBadge layer={layer} />
        </div>
        <div style={{ fontSize: "11px", color: "#6b7280", fontFamily: "monospace" }}>
          {String(token.$value)}
          {!isNaN(px) && <span style={{ color: "#9ca3af" }}> ({Math.round(px)}px)</span>}
        </div>
      </div>
    </div>
  );
}

function NumberRow({ name, token, layer }: { name: string; token: Token; layer: "base" | "semantic" | "component" }) {
  const varName = cssVar(name);
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "8px 0",
      borderBottom: "1px solid #f3f4f6",
    }}>
      <div style={{ width: "120px", flexShrink: 0 }}>
        <span style={{
          fontSize: "20px",
          fontWeight: 600,
          color: "#3b82f6",
          lineHeight: String(token.$value),
        }}>
          Ag
        </span>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "2px" }}>
          <code style={{ fontSize: "12px", fontWeight: 600, color: "#111827" }}>{varName}</code>
          <LayerBadge layer={layer} />
        </div>
        <div style={{ fontSize: "11px", color: "#6b7280", fontFamily: "monospace" }}>
          {String(token.$value)}
        </div>
      </div>
    </div>
  );
}

function GenericRow({ name, token, layer }: { name: string; token: Token; layer: "base" | "semantic" | "component" }) {
  const resolved = resolveValue(token.$value, allTokens);
  const varName = cssVar(name);
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "8px 0",
      borderBottom: "1px solid #f3f4f6",
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "2px" }}>
          <code style={{ fontSize: "12px", fontWeight: 600, color: "#111827" }}>{varName}</code>
          <LayerBadge layer={layer} />
        </div>
        <div style={{ fontSize: "11px", color: "#6b7280", fontFamily: "monospace" }}>
          {String(token.$value)}
          {String(token.$value) !== resolved && (
            <span style={{ color: "#9ca3af" }}> → {resolved}</span>
          )}
        </div>
      </div>
    </div>
  );
}

function TokenRow({ name, token, layer }: { name: string; token: Token; layer: "base" | "semantic" | "component" }) {
  if (token.$type === "color") return <ColorSwatch name={name} token={token} layer={layer} />;
  if (token.$type === "dimension") return <DimensionRow name={name} token={token} layer={layer} />;
  if (token.$type === "number") return <NumberRow name={name} token={token} layer={layer} />;
  return <GenericRow name={name} token={token} layer={layer} />;
}

function TokenGroup({
  label,
  tokens,
  layer,
  filter,
}: {
  label: string;
  tokens: TokenMap;
  layer: "base" | "semantic" | "component";
  filter: (name: string, token: Token) => boolean;
}) {
  const entries = Object.entries(tokens).filter(([name, token]) => filter(name, token));
  if (entries.length === 0) return null;
  return (
    <div style={{ marginBottom: "8px" }}>
      <SectionHeader>{label}</SectionHeader>
      {entries.map(([name, token]) => (
        <TokenRow key={name} name={name} token={token as Token} layer={layer} />
      ))}
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

function TokenDocsPage() {
  return (
    <div style={{
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      maxWidth: "860px",
      margin: "0 auto",
      padding: "32px 24px",
      color: "#111827",
    }}>
      <h1 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "4px" }}>Design Tokens</h1>
      <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "32px", marginTop: 0 }}>
        Three-layer DTCG token system. Base → Semantic → Component. All values are CSS custom properties prefixed with <code>--ds-</code>.
      </p>

      {/* Layer key */}
      <div style={{ display: "flex", gap: "16px", marginBottom: "32px" }}>
        {(["base", "semantic", "component"] as const).map((l) => (
          <div key={l} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <LayerBadge layer={l} />
            <span style={{ fontSize: "12px", color: "#6b7280" }}>
              {l === "base" ? "Raw values" : l === "semantic" ? "Intent aliases" : "Per-component"}
            </span>
          </div>
        ))}
      </div>

      {/* ── Base layer ── */}
      <TokenGroup label="Colors — Base" tokens={baseTokens as TokenMap} layer="base" filter={(_, t) => t.$type === "color"} />
      <TokenGroup label="Space" tokens={baseTokens as TokenMap} layer="base" filter={(n) => n.startsWith("space-")} />
      <TokenGroup label="Font Size" tokens={baseTokens as TokenMap} layer="base" filter={(n) => n.startsWith("font-size-")} />
      <TokenGroup label="Font Weight" tokens={baseTokens as TokenMap} layer="base" filter={(n) => n.startsWith("font-weight-")} />
      <TokenGroup label="Line Height" tokens={baseTokens as TokenMap} layer="base" filter={(n) => n.startsWith("line-height-")} />
      <TokenGroup label="Border Radius" tokens={baseTokens as TokenMap} layer="base" filter={(n) => n.startsWith("border-radius-")} />
      <TokenGroup label="Shadow" tokens={baseTokens as TokenMap} layer="base" filter={(n) => n.startsWith("shadow-")} />
      <TokenGroup label="Z-Index" tokens={baseTokens as TokenMap} layer="base" filter={(n) => n.startsWith("z-index-")} />

      {/* ── Semantic layer ── */}
      <TokenGroup label="Colors — Action" tokens={semanticTokens as TokenMap} layer="semantic" filter={(n) => n.startsWith("color-action-")} />
      <TokenGroup label="Colors — Feedback" tokens={semanticTokens as TokenMap} layer="semantic" filter={(n) => n.startsWith("color-danger") || n.startsWith("color-success")} />
      <TokenGroup label="Colors — Surface" tokens={semanticTokens as TokenMap} layer="semantic" filter={(n) => n.startsWith("color-surface-")} />
      <TokenGroup label="Colors — Border" tokens={semanticTokens as TokenMap} layer="semantic" filter={(n) => n.startsWith("color-border-")} />
      <TokenGroup label="Colors — Text" tokens={semanticTokens as TokenMap} layer="semantic" filter={(n) => n.startsWith("color-text-")} />

      {/* ── Component layer ── */}
      <TokenGroup label="Button" tokens={componentTokens as TokenMap} layer="component" filter={(n) => n.startsWith("button-")} />
      <TokenGroup label="Card" tokens={componentTokens as TokenMap} layer="component" filter={(n) => n.startsWith("card-")} />
      <TokenGroup label="Dialog" tokens={componentTokens as TokenMap} layer="component" filter={(n) => n.startsWith("dialog-")} />
      <TokenGroup label="Input" tokens={componentTokens as TokenMap} layer="component" filter={(n) => n.startsWith("input-")} />
      <TokenGroup label="Grid" tokens={componentTokens as TokenMap} layer="component" filter={(n) => n.startsWith("grid-")} />
    </div>
  );
}

// ── Story ────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "Design Tokens/Overview",
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    actions: { disable: true },
  },
};

export default meta;

export const AllTokens: StoryObj = {
  name: "All Tokens",
  render: () => <TokenDocsPage />,
};
