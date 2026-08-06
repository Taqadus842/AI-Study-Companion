import { FileTextIcon } from "@/components/icons";
import { AccordionItem } from "@/components/ui/Accordion";
import type { RetrievedChunk } from "@/types";

interface RetrievedChunksProps {
  chunks: RetrievedChunk[];
}

export function RetrievedChunks({
  chunks,
}: RetrievedChunksProps) {
  if (!chunks || chunks.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-4">
        No retrieved chunks found.
      </p>
    );
  }

  return (
    <div className="retrieved-chunks">
      {chunks.map((chunk) => (
        <AccordionItem
          key={chunk.chunk_id}
          header={
            <div className="chunk-header">
              <FileTextIcon size={16} />

              <div className="flex-1">
                <p className="font-medium">
                  Chunk #{chunk.chunk_id}
                </p>

                <p className="text-sm text-muted-foreground">
                  {chunk.document}
                </p>

                <p className="text-sm text-muted-foreground">
                  Similarity: {(chunk.score * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          }
        >
          <p>{chunk.content}</p>
        </AccordionItem>
      ))}
    </div>
  );
}