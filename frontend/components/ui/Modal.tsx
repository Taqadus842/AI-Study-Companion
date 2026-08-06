"use client";

import { useEffect, type ReactNode } from "react";
import { XIcon } from "@/components/icons";

export function Modal({
  isOpen,
  onClose,
  title,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div
        className="modal-backdrop"
        onClick={onClose}
      />

      <div className="modal-panel">
        <div className="modal-header">
          {title && <h3>{title}</h3>}

          <button
            onClick={onClose}
            className="modal-close"
          >
            <XIcon size={20} />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}