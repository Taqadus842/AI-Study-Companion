import type { ReactNode } from "react";

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="state-block state-block--empty">
      <div className="state-icon state-icon--empty">
        {icon}
      </div>

      <h3>{title}</h3>

      <p>{description}</p>

      {action}
    </div>
  );
}