import { forwardRef } from "react";
import { styled } from "@chakra-ui/react";
import { inputRecipe } from "./recipe";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isInvalid?: boolean;
}

const StyledInput = styled("input", inputRecipe);

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ isInvalid, ...rest }, ref) => {
    return (
      <StyledInput
        ref={ref}
        aria-invalid={isInvalid}
        data-invalid={isInvalid ? "" : undefined}
        {...rest}
      />
    );
  }
);

Input.displayName = "Input";
