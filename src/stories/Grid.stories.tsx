import type { Meta, StoryObj } from "@storybook/react-vite";
import { Grid } from "../components/Grid/Grid";

const Cell = ({ label }: { label: string }) => (
  <div
    style={{
      background: "var(--ds-color-action-primary-subtle)",
      border: "1px solid var(--ds-color-border-focus)",
      borderRadius: "var(--ds-border-radius-md)",
      padding: "var(--ds-space-4)",
      textAlign: "center",
      fontSize: "var(--ds-font-size-sm)",
      color: "var(--ds-color-action-primary)",
      fontWeight: "var(--ds-font-weight-medium)",
    }}
  >
    {label}
  </div>
);

const meta: Meta<typeof Grid> = {
  title: "Components/Grid",
  component: Grid,
};

export default meta;
type Story = StoryObj<typeof Grid>;

export const TwelveColumn: Story = {
  render: () => (
    <Grid columns={12} gap="md">
      {Array.from({ length: 12 }, (_, i) => (
        <Cell key={i} label={`Col ${i + 1}`} />
      ))}
    </Grid>
  ),
};

export const ThreeColumn: Story = {
  render: () => (
    <Grid columns={3} gap="md">
      {Array.from({ length: 6 }, (_, i) => (
        <Cell key={i} label={`Item ${i + 1}`} />
      ))}
    </Grid>
  ),
};

export const GapSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      {(["sm", "md", "lg"] as const).map((gap) => (
        <div key={gap}>
          <p style={{ margin: "0 0 8px", fontSize: "var(--ds-font-size-sm)", color: "var(--ds-color-text-secondary)" }}>
            gap="{gap}"
          </p>
          <Grid columns={4} gap={gap}>
            {Array.from({ length: 4 }, (_, i) => (
              <Cell key={i} label={`${i + 1}`} />
            ))}
          </Grid>
        </div>
      ))}
    </div>
  ),
};
