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
    transition: "background-color 150ms ease, color 150ms ease, border-color 150ms ease, opacity 150ms ease",
    lineHeight: 1,
    textDecoration: "none",
    "&:focus-visible": {
      outline: "2px solid var(--ds-button-focus-ring-color)",
      outlineOffset: "2px",
    },
    "&:disabled, &[aria-disabled=true]": {
      cursor: "not-allowed",
      backgroundColor: "var(--ds-button-bg-disabled)",
      color: "var(--ds-button-color-disabled)",
      borderColor: "transparent",
    },
    "&:disabled:hover, &[aria-disabled=true]:hover": {
      backgroundColor: "var(--ds-button-bg-disabled)",
      color: "var(--ds-button-color-disabled)",
    },
  },
  variants: {
    variant: {
      primary: {
        backgroundColor: "var(--ds-button-bg-primary)",
        color: "var(--ds-button-color-primary)",
        "&:hover:not(:disabled)": { backgroundColor: "var(--ds-button-bg-primary-hover)" },
        "&:active:not(:disabled)": { backgroundColor: "var(--ds-button-bg-primary-active)" },
      },
      secondary: {
        backgroundColor: "transparent",
        color: "var(--ds-button-color-secondary)",
        borderColor: "var(--ds-button-border-secondary)",
        "&:hover:not(:disabled)": { backgroundColor: "var(--ds-color-action-primary-subtle)" },
        "&:active:not(:disabled)": { backgroundColor: "var(--ds-color-action-primary-subtle)", opacity: 0.8 },
      },
      ghost: {
        backgroundColor: "transparent",
        color: "var(--ds-button-color-ghost)",
        "&:hover:not(:disabled)": { backgroundColor: "var(--ds-color-action-primary-subtle)" },
        "&:active:not(:disabled)": { backgroundColor: "var(--ds-color-action-primary-subtle)", opacity: 0.8 },
      },
      danger: {
        backgroundColor: "var(--ds-button-bg-danger)",
        color: "var(--ds-button-color-danger)",
        "&:hover:not(:disabled)": { backgroundColor: "var(--ds-button-bg-danger-hover)" },
        "&:active:not(:disabled)": { opacity: 0.9 },
      },
    },
    size: {
      sm: {
        paddingInline: "var(--ds-button-padding-x-sm)",
        paddingBlock: "var(--ds-button-padding-y-sm)",
        fontSize: "var(--ds-button-font-size-sm)",
      },
      md: {
        paddingInline: "var(--ds-button-padding-x-md)",
        paddingBlock: "var(--ds-button-padding-y-md)",
        fontSize: "var(--ds-button-font-size-md)",
      },
      lg: {
        paddingInline: "var(--ds-button-padding-x-lg)",
        paddingBlock: "var(--ds-button-padding-y-lg)",
        fontSize: "var(--ds-button-font-size-lg)",
      },
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});
