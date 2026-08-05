import { FileTextIcon, SparklesIcon } from "@/components/icons";
import type { ActivityItem } from "@/types";

interface ActivityRowProps {
  item: ActivityItem;
}

export function ActivityRow({
  item,
}: ActivityRowProps) {
  const isStudyPlan = item.label
    .toLowerCase()
    .includes("plan");

  return (
    <div className="activity-row">
      <div className="activity-icon">
        {isStudyPlan ? (
          <SparklesIcon size={16} />
        ) : (
          <FileTextIcon size={16} />
        )}
      </div>

      <div className="flex-1">
        <p className="activity-label">
          {item.label}
        </p>

        <p className="activity-detail">
          {item.detail}
        </p>
      </div>

      <span className="activity-time">
        {item.timestamp}
      </span>
    </div>
  );
}