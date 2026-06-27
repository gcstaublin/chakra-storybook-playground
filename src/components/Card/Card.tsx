import { forwardRef } from "react";
import { styled } from "@chakra-ui/react";
import { cardRecipe } from "./recipe";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "elevated" | "outline" | "subtle";
}

const StyledCard = styled("div", cardRecipe);

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = "elevated", children, ...rest }, ref) => {
    return (
      <StyledCard ref={ref} variant={variant} {...rest}>
        {children}
      </StyledCard>
    );
  }
);

Card.displayName = "Card";
