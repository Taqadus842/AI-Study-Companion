import { ReactNode } from "react";

import { Card } from "@/components/ui/Card";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
}

export function StatCard({
  label,
  value,
  icon,
}: StatCardProps) {
  return (
    <Card className="stat-card">
      <div className="stat-icon">
        {icon}
      </div>

      <div className="stat-content">
        <p className="stat-value">
          {value}
        </p>

        <p className="stat-label">
          {label}
        </p>
      </div>
    </Card>
  );
}