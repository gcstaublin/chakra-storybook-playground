import type { Preview, Decorator } from "@storybook/react-vite";
import { ChakraProvider } from "@chakra-ui/react";
import { system } from "../src/system";
import "../build/css/tokens.css";

const withChakra: Decorator = (Story) => (
  <ChakraProvider value={system}>
    <Story />
  </ChakraProvider>
);

const preview: Preview = {
  decorators: [withChakra],
  parameters: {
    options: {
      storySort: {
        order: [
          "Documentation",
          ["Getting Started", "Design Tokens", "Components", "Figma Sync", "Chromatic Setup"],
          "Design Tokens",
          "Components",
        ],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
  },
};

export default preview;
