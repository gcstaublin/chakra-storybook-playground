import { defineRecipe } from "@chakra-ui/react";

export const gridRecipe = defineRecipe({
  base: {
    display: "grid",
  },
  variants: {
    gap: {
      sm: { gap: "var(--ds-grid-gap-sm)" },
      md: { gap: "var(--ds-grid-gap-md)" },
      lg: { gap: "var(--ds-grid-gap-lg)" },
    },
  },
  defaultVariants: {
    gap: "md",
  },
});
