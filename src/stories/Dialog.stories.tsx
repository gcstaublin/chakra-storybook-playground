import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Dialog } from "../components/Dialog/Dialog";
import { Button } from "../components/Button/Button";

const meta: Meta<typeof Dialog> = {
  title: "Components/Dialog",
  component: Dialog,
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Interactive: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Dialog</Button>
        <Dialog isOpen={open} onClose={() => setOpen(false)} title="Confirm action">
          <p style={{ margin: "0 0 24px", color: "var(--ds-color-text-secondary)" }}>
            Are you sure you want to proceed? This action cannot be undone.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={() => setOpen(false)}>Confirm</Button>
          </div>
        </Dialog>
      </>
    );
  },
};

export const NoTitle: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open (no title)</Button>
        <Dialog isOpen={open} onClose={() => setOpen(false)}>
          <p style={{ margin: "0 0 24px", color: "var(--ds-color-text-secondary)" }}>
            A dialog without a title — just body content and actions.
          </p>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </Dialog>
      </>
    );
  },
};
