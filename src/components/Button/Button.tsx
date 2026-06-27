import { forwardRef } from "react";
import { styled } from "@chakra-ui/react";
import { buttonRecipe } from "./recipe";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  loadingText?: string;
}

const StyledButton = styled("button", buttonRecipe);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", isLoading, loadingText, children, disabled, ...rest }, ref) => {
    return (
      <StyledButton
        ref={ref}
        variant={variant}
        size={size}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        {...rest}
      >
        {isLoading ? (loadingText ?? "Loading…") : children}
      </StyledButton>
    );
  }
);

Button.displayName = "Button";
