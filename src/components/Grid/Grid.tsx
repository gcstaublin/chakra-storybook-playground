import { forwardRef } from "react";
import { chakra } from "@chakra-ui/react";

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: number;
  gap?: "sm" | "md" | "lg";
}

const gapMap = {
  sm: "var(--ds-grid-gap-sm)",
  md: "var(--ds-grid-gap-md)",
  lg: "var(--ds-grid-gap-lg)",
};

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ columns = 12, gap = "md", style, ...rest }, ref) => {
    return (
      <chakra.div
        ref={ref}
        display="grid"
        gridTemplateColumns={`repeat(${columns}, 1fr)`}
        gap={gapMap[gap]}
        style={style}
        {...rest}
      />
    );
  }
);

Grid.displayName = "Grid";
