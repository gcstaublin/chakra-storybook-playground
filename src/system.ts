import { createSystem, defineConfig } from "@chakra-ui/react";
import { buttonRecipe } from "./components/Button/recipe";
import { cardRecipe } from "./components/Card/recipe";
import { inputRecipe } from "./components/Input/recipe";

const config = defineConfig({
  cssVarsPrefix: "ds",
  theme: {
    recipes: {
      button: buttonRecipe,
      card: cardRecipe,
      input: inputRecipe,
    },
  },
});

export const system = createSystem(config);
