import { AlertTriangleIcon } from "@/components/icons";
import { Button } from "./Button";

export function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div className="state-block state-block--error">
      <AlertTriangleIcon size={24} />

      <h3>Something went wrong</h3>

      <p>{message}</p>

      {onRetry && (
        <Button onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}