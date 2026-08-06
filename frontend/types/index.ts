export type DocumentStatus =
  | "processing"
  | "ready"
  | "failed";

export interface StudyDocument {
  id: string;
  name: string;
  uploadedAt: string;
  chunkCount: number;
  status: DocumentStatus;
  sizeLabel: string;
}

export interface RetrievedChunk {
  chunk_id: number;
  score: number;
  content: string;
  document?: string;
}

export interface StudyDay {
  day: number;
  title: string;
  tasks: string[];
}

export interface StudyPlan {
  topic: string;
  days: StudyDay[];
  retrievedChunks: RetrievedChunk[];
}

export interface PipelineStep {
  id: string;
  label: string;
}

export interface ActivityItem {
  id: string;
  label: string;
  detail: string;
  timestamp: string;
}

export interface ServiceStatus {
  name: string;
  status: "operational" | "degraded" | "down";
  latencyMs: number;
}