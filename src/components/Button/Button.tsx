import { forwardRef } from "react";
import { chakra, useRecipe } from "@chakra-ui/react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  loadingText?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", isLoading, loadingText, children, disabled, ...rest }, ref) => {
    const recipe = useRecipe({ key: "button" });
    const styles = recipe({ variant, size });

    return (
      <chakra.button
        ref={ref}
        css={styles}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        {...rest}
      >
        {isLoading ? (loadingText ?? "Loading…") : children}
      </chakra.button>
    );
  }
);

Button.displayName = "Button";
