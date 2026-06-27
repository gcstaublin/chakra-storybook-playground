import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "../components/Input/Input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  args: {
    placeholder: "Enter text…",
    disabled: false,
    isInvalid: false,
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { defaultValue: "Hello world" },
};

export const Disabled: Story = {
  args: { disabled: true, placeholder: "Disabled input" },
};

export const Invalid: Story = {
  args: { isInvalid: true, defaultValue: "bad@email" },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "320px" }}>
      <Input placeholder="Default" />
      <Input defaultValue="With value" />
      <Input disabled placeholder="Disabled" />
      <Input isInvalid defaultValue="Invalid value" />
    </div>
  ),
};
