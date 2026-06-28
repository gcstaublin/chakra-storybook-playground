import { useEffect, useRef } from "react";
import { chakra } from "@chakra-ui/react";
import { dialogStyles } from "./recipe";

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function Dialog({ isOpen, onClose, title, children }: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const styles = dialogStyles;

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <chakra.div css={styles.root}>
      <chakra.div css={styles.overlay} onClick={onClose} aria-hidden="true" />
      <chakra.div
        ref={dialogRef}
        css={styles.content}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "dialog-title" : undefined}
      >
        {title && (
          <chakra.h2 id="dialog-title" css={styles.title}>
            {title}
          </chakra.h2>
        )}
        {children}
      </chakra.div>
    </chakra.div>
  );
}
