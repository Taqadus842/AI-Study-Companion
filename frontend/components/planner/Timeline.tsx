import type { StudyDay } from "@/types";

import { StudyPlanCard } from "./StudyPlanCard";

interface TimelineProps {
  days: StudyDay[];
}

export function Timeline({
  days,
}: TimelineProps) {
  if (!days || days.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-4">
        No study plan available.
      </p>
    );
  }

  return (
    <div className="grid-plan">
      {days.map((day) => (
        <StudyPlanCard
          key={day.day}
          day={day}
        />
      ))}
    </div>
  );
}