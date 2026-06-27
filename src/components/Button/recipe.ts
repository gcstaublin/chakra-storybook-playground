import { defineRecipe } from "@chakra-ui/react";

export const buttonRecipe = defineRecipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "var(--ds-space-2)",
    fontWeight: "var(--ds-button-font-weight)",
    borderRadius: "var(--ds-button-border-radius)",
    cursor: "pointer",
    border: "2px solid transparent",
    transition: "background 150ms ease, color 150ms ease, border-color 150ms ease, opacity 150ms ease",
    lineHeight: 1,
    _focusVisible: {
      outline: "2px solid var(--ds-button-focus-ring-color)",
      outlineOffset: "2px",
    },
    _disabled: {
      cursor: "not-allowed",
      bg: "var(--ds-button-bg-disabled)",
      color: "var(--ds-button-color-disabled)",
      borderColor: "transparent",
      _hover: {
        bg: "var(--ds-button-bg-disabled)",
        color: "var(--ds-button-color-disabled)",
      },
    },
  },
  variants: {
    variant: {
      primary: {
        bg: "var(--ds-button-bg-primary)",
        color: "var(--ds-button-color-primary)",
        _hover: { bg: "var(--ds-button-bg-primary-hover)" },
        _active: { bg: "var(--ds-button-bg-primary-active)" },
      },
      secondary: {
        bg: "transparent",
        color: "var(--ds-button-color-secondary)",
        borderColor: "var(--ds-button-border-secondary)",
        _hover: { bg: "var(--ds-color-action-primary-subtle)" },
        _active: { bg: "var(--ds-color-action-primary-subtle)", opacity: 0.8 },
      },
      ghost: {
        bg: "transparent",
        color: "var(--ds-button-color-ghost)",
        _hover: { bg: "var(--ds-color-action-primary-subtle)" },
        _active: { bg: "var(--ds-color-action-primary-subtle)", opacity: 0.8 },
      },
      danger: {
        bg: "var(--ds-button-bg-danger)",
        color: "var(--ds-button-color-danger)",
        _hover: { bg: "var(--ds-button-bg-danger-hover)" },
        _active: { opacity: 0.9 },
      },
    },
    size: {
      sm: {
        px: "var(--ds-button-padding-x-sm)",
        py: "var(--ds-button-padding-y-sm)",
        fontSize: "var(--ds-button-font-size-sm)",
      },
      md: {
        px: "var(--ds-button-padding-x-md)",
        py: "var(--ds-button-padding-y-md)",
        fontSize: "var(--ds-button-font-size-md)",
      },
      lg: {
        px: "var(--ds-button-padding-x-lg)",
        py: "var(--ds-button-padding-y-lg)",
        fontSize: "var(--ds-button-font-size-lg)",
      },
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});
