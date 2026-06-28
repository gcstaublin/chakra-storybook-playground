import { createSystem, defineConfig } from "@chakra-ui/react";
import { buttonRecipe } from "./components/Button/recipe";
import { cardRecipe } from "./components/Card/recipe";
import { inputRecipe } from "./components/Input/recipe";
import { gridRecipe } from "./components/Grid/recipe";

const config = defineConfig({
  cssVarsPrefix: "ds",
  theme: {
    recipes: {
      dsButton: buttonRecipe,
      dsCard: cardRecipe,
      dsInput: inputRecipe,
      dsGrid: gridRecipe,
    },
  },
});

export const system = createSystem(config);
