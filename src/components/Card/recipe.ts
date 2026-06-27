import { defineRecipe } from "@chakra-ui/react";

export const cardRecipe = defineRecipe({
  base: {
    backgroundColor: "var(--ds-card-bg)",
    border: "1px solid var(--ds-card-border-color)",
    borderRadius: "var(--ds-card-border-radius)",
    padding: "var(--ds-card-padding)",
    boxShadow: "var(--ds-card-shadow)",
  },
  variants: {
    variant: {
      elevated: {
        boxShadow: "var(--ds-card-shadow)",
        border: "none",
      },
      outline: {
        boxShadow: "none",
        border: "1px solid var(--ds-card-border-color)",
      },
      subtle: {
        backgroundColor: "var(--ds-color-surface-subtle)",
        boxShadow: "none",
        border: "none",
      },
    },
  },
  defaultVariants: {
    variant: "elevated",
  },
});
