import { BookOpenIcon } from "@/components/icons";
import { Card } from "@/components/ui/Card";
import type { StudyDay } from "@/types";

interface StudyPlanCardProps {
  day: StudyDay;
}

export function StudyPlanCard({
  day,
}: StudyPlanCardProps) {
  return (
    <Card className="study-plan-card">
      <p className="study-day">
        Day {day.day}
      </p>

      <h4 className="study-title">
        {day.title}
      </h4>

      <div className="study-icon">
        <BookOpenIcon size={16} />
      </div>

      <ul className="study-tasks">
        {day.tasks.length > 0 ? (
          day.tasks.map((task, index) => (
            <li key={index}>
              {task}
            </li>
          ))
        ) : (
          <li>No tasks available.</li>
        )}
      </ul>
    </Card>
  );
}