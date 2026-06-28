import { forwardRef } from "react";
import { chakra, useRecipe } from "@chakra-ui/react";

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: number;
  gap?: "sm" | "md" | "lg";
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ columns = 12, gap = "md", style, ...rest }, ref) => {
    const recipe = useRecipe({ key: "dsGrid" });
    const styles = recipe({ gap });

    return (
      <chakra.div
        ref={ref}
        css={styles}
        // gridTemplateColumns is dynamic (arbitrary column count) so it cannot be expressed as a recipe variant
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, ...style }}
        {...rest}
      />
    );
  }
);

Grid.displayName = "Grid";
