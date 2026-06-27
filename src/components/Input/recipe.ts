import { defineRecipe } from "@chakra-ui/react";

export const inputRecipe = defineRecipe({
  base: {
    display: "block",
    width: "100%",
    bg: "var(--ds-input-bg)",
    border: "1px solid var(--ds-input-border-color)",
    borderRadius: "var(--ds-input-border-radius)",
    px: "var(--ds-input-padding-x)",
    py: "var(--ds-input-padding-y)",
    fontSize: "var(--ds-input-font-size)",
    color: "var(--ds-input-color)",
    outline: "none",
    transition: "border-color 150ms ease, box-shadow 150ms ease",
    _placeholder: {
      color: "var(--ds-input-placeholder-color)",
    },
    _hover: {
      borderColor: "var(--ds-input-border-color-hover)",
    },
    _focusVisible: {
      borderColor: "var(--ds-input-border-color-focus)",
      boxShadow: "0 0 0 3px var(--ds-input-border-color-focus)",
    },
    _invalid: {
      borderColor: "var(--ds-input-border-color-danger)",
      _focusVisible: {
        boxShadow: "0 0 0 3px var(--ds-input-border-color-danger)",
      },
    },
    _disabled: {
      cursor: "not-allowed",
      opacity: 0.5,
    },
  },
});
