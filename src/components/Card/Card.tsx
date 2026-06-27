import { forwardRef } from "react";
import { chakra, useRecipe } from "@chakra-ui/react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "elevated" | "outline" | "subtle";
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = "elevated", children, ...rest }, ref) => {
    const recipe = useRecipe({ recipe: "card" });
    const styles = recipe({ variant });

    return (
      <chakra.div ref={ref} css={styles} {...rest}>
        {children}
      </chakra.div>
    );
  }
);

Card.displayName = "Card";
