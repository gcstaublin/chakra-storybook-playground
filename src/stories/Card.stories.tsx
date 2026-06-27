import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "../components/Card/Card";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  args: {
    variant: "elevated",
    children: "Card content goes here.",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["elevated", "outline", "subtle"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Elevated: Story = { args: { variant: "elevated" } };
export const Outline: Story = { args: { variant: "outline" } };
export const Subtle: Story = { args: { variant: "subtle" } };

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      {(["elevated", "outline", "subtle"] as const).map((v) => (
        <Card key={v} variant={v} style={{ minWidth: "180px" }}>
          <strong style={{ display: "block", marginBottom: "8px", textTransform: "capitalize" }}>{v}</strong>
          <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--ds-color-text-secondary)" }}>
            Card variant: {v}
          </p>
        </Card>
      ))}
    </div>
  ),
};

export const WithContent: Story = {
  render: () => (
    <Card style={{ maxWidth: "360px" }}>
      <h3 style={{ margin: "0 0 8px", fontSize: "var(--ds-font-size-lg)", fontWeight: "var(--ds-font-weight-semibold)" }}>
        Card Title
      </h3>
      <p style={{ margin: "0 0 16px", color: "var(--ds-color-text-secondary)", fontSize: "var(--ds-font-size-sm)" }}>
        This is some supporting text inside a card component styled entirely through design tokens.
      </p>
      <button
        style={{
          padding: "6px 16px",
          background: "var(--ds-button-bg-primary)",
          color: "var(--ds-button-color-primary)",
          border: "none",
          borderRadius: "var(--ds-button-border-radius)",
          cursor: "pointer",
          fontSize: "var(--ds-font-size-sm)",
          fontWeight: "var(--ds-font-weight-semibold)",
        }}
      >
        Action
      </button>
    </Card>
  ),
};
