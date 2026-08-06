import { CheckIcon } from "@/components/icons";
import { PIPELINE_STEPS } from "@/constants";
import { cn } from "@/lib/utils";

interface PipelineViewProps {
  currentStepIndex: number;
}

export function PipelineView({
  currentStepIndex,
}: PipelineViewProps) {
  return (
    <div className="pipeline">
      {PIPELINE_STEPS.map((step, index) => {
        const isComplete = index < currentStepIndex;
        const isCurrent = index === currentStepIndex;

        return (
          <div
            key={step.id}
            className="pipeline-row"
          >
            <div className="pipeline-node-col">
              <div
                className={cn(
                  "pipeline-node",
                  isComplete && "pipeline-node--complete",
                  isCurrent && "pipeline-node--current"
                )}
              >
                {isComplete ? (
                  <CheckIcon size={14} />
                ) : (
                  index + 1
                )}
              </div>

              {index < PIPELINE_STEPS.length - 1 && (
                <div
                  className={cn(
                    "pipeline-line",
                    isComplete &&
                      "pipeline-line--complete"
                  )}
                />
              )}
            </div>

            <div className="pipeline-body">
              <p
                className={cn(
                  "pipeline-label",
                  (isComplete || isCurrent) &&
                    "pipeline-label--active"
                )}
              >
                {step.label}
              </p>

              {isCurrent && (
                <p className="pipeline-sub">
                  In Progress...
                </p>
              )}

              {isComplete && (
                <p className="pipeline-sub">
                  Complete
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}