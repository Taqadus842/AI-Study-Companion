import type { HTMLAttributes } from "react";

export function Card({
  hoverLift = true,
  glass = false,
  softBg = false,
  className = "",
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  hoverLift?: boolean;
  glass?: boolean;
  softBg?: boolean;
}) {
  return (
    <div
      className={`
        card
        ${hoverLift ? "card--hoverable" : ""}
        ${glass ? "card--glass" : ""}
        ${softBg ? "card--soft-bg" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}