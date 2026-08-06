import {
  FileTextIcon,
  LoaderIcon,
  TrashIcon,
} from "@/components/icons";

import { Card } from "@/components/ui/Card";
import { formatDate } from "@/lib/utils";
import type { StudyDocument } from "@/types";

interface DocumentCardProps {
  document: StudyDocument;
  onDelete: (id: string) => void;
}

export function DocumentCard({
  document,
  onDelete,
}: DocumentCardProps) {
  return (
    <Card className="doc-card">
      <div className="doc-card-top">
        <FileTextIcon size={20} />

        <div className="flex-1">
          <p className="doc-name">
            {document.name}
          </p>

          <p className="doc-meta">
            {formatDate(document.uploadedAt)} • {document.sizeLabel}
          </p>
        </div>
      </div>

      <div className="doc-status-row">
        <span className={`badge badge--${document.status}`}>
          {document.status === "processing" && (
            <LoaderIcon size={12} />
          )}

          {document.status}
        </span>

        <span>
          {document.chunkCount} chunk
          {document.chunkCount !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="doc-actions">
        <button
          type="button"
          className="doc-action-btn doc-action-btn--danger"
          onClick={() => onDelete(document.id)}
          aria-label={`Delete ${document.name}`}
        >
          <TrashIcon size={14} />
          Delete
        </button>
      </div>
    </Card>
  );
}