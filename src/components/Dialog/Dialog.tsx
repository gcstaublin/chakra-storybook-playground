import { useEffect, useRef } from "react";
import { chakra } from "@chakra-ui/react";

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function Dialog({ isOpen, onClose, title, children }: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

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
    <chakra.div
      position="fixed"
      inset="0"
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex="var(--ds-dialog-z-index)"
    >
      <chakra.div
        position="absolute"
        inset="0"
        bg="var(--ds-dialog-overlay-bg)"
        opacity={0.5}
        onClick={onClose}
        aria-hidden="true"
      />
      <chakra.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "dialog-title" : undefined}
        position="relative"
        bg="var(--ds-dialog-bg)"
        borderRadius="var(--ds-dialog-border-radius)"
        padding="var(--ds-dialog-padding)"
        boxShadow="var(--ds-dialog-shadow)"
        maxW="560px"
        w="90%"
        zIndex={1}
      >
        {title && (
          <chakra.h2
            id="dialog-title"
            fontSize="var(--ds-font-size-xl)"
            fontWeight="var(--ds-font-weight-semibold)"
            color="var(--ds-color-text-primary)"
            mb="var(--ds-space-4)"
          >
            {title}
          </chakra.h2>
        )}
        {children}
      </chakra.div>
    </chakra.div>
  );
}
