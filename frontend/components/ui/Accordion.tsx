"use client";

import { useState, type ReactNode } from "react";
import { ChevronDownIcon } from "@/components/icons";

export function AccordionItem({
  header,
  children,
  defaultOpen = false,
}: {
  header: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="accordion-item">
      <button
        className="accordion-header"
        onClick={() => setOpen(!open)}
      >
        {header}

        <ChevronDownIcon
          size={16}
          className={
            open
              ? "accordion-chevron accordion-chevron--open"
              : "accordion-chevron"
          }
        />
      </button>

      <div
        className={
          open
            ? "accordion-body accordion-body--open"
            : "accordion-body"
        }
      >
        <div className="accordion-body-inner">
          {children}
        </div>
      </div>
    </div>
  );
}