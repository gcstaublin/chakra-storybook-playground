import { forwardRef } from "react";
import { chakra, useRecipe } from "@chakra-ui/react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isInvalid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ isInvalid, ...rest }, ref) => {
    const recipe = useRecipe({ key: "input" });
    const styles = recipe();

    return (
      <chakra.input
        ref={ref}
        {...styles}
        aria-invalid={isInvalid}
        data-invalid={isInvalid ? "" : undefined}
        {...rest}
      />
    );
  }
);

Input.displayName = "Input";
