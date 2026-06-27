import { defineRecipe } from "@chakra-ui/react";

export const inputRecipe = defineRecipe({
  base: {
    display: "block",
    width: "100%",
    backgroundColor: "var(--ds-input-bg)",
    border: "1px solid var(--ds-input-border-color)",
    borderRadius: "var(--ds-input-border-radius)",
    paddingInline: "var(--ds-input-padding-x)",
    paddingBlock: "var(--ds-input-padding-y)",
    fontSize: "var(--ds-input-font-size)",
    color: "var(--ds-input-color)",
    outline: "none",
    transition: "border-color 150ms ease, box-shadow 150ms ease",
    "&::placeholder": {
      color: "var(--ds-input-placeholder-color)",
    },
    "&:hover": {
      borderColor: "var(--ds-input-border-color-hover)",
    },
    "&:focus-visible": {
      borderColor: "var(--ds-input-border-color-focus)",
      boxShadow: "0 0 0 3px var(--ds-input-border-color-focus)",
    },
    "&[data-invalid]": {
      borderColor: "var(--ds-input-border-color-danger)",
    },
    "&[data-invalid]:focus-visible": {
      boxShadow: "0 0 0 3px var(--ds-input-border-color-danger)",
    },
    "&:disabled": {
      cursor: "not-allowed",
      opacity: 0.5,
    },
  },
});
