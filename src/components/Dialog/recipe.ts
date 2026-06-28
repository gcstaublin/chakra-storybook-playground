import type { SystemStyleObject } from "@chakra-ui/react";

export const dialogStyles = {
  root: {
    position: "fixed",
    inset: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: "var(--ds-dialog-z-index)",
  },
  overlay: {
    position: "absolute",
    inset: "0",
    backgroundColor: "var(--ds-dialog-overlay-bg)",
    opacity: 0.5,
  },
  content: {
    position: "relative",
    backgroundColor: "var(--ds-dialog-bg)",
    borderRadius: "var(--ds-dialog-border-radius)",
    padding: "var(--ds-dialog-padding)",
    boxShadow: "var(--ds-dialog-shadow)",
    maxWidth: "560px",
    width: "90%",
    zIndex: 1,
  },
  title: {
    fontSize: "var(--ds-font-size-xl)",
    fontWeight: "var(--ds-font-weight-semibold)",
    color: "var(--ds-color-text-primary)",
    marginBottom: "var(--ds-space-4)",
  },
} satisfies Record<string, SystemStyleObject>;
