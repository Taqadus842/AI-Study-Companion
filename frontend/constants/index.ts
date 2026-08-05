export const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: "LayoutDashboard" },
  { href: "/upload", label: "Upload", icon: "UploadCloud" },
  { href: "/planner", label: "Study Planner", icon: "Sparkles" },
  { href: "/documents", label: "Documents", icon: "FileStack" },
  { href: "/settings", label: "Settings", icon: "Settings" },
];

export const PIPELINE_STEPS = [
  { id: "upload", label: "Upload" },
  { id: "chunking", label: "Chunking" },
  { id: "embeddings", label: "Embeddings" },
  { id: "qdrant", label: "Qdrant Storage" },
  { id: "retrieval", label: "Retrieval" },
  { id: "studyPlan", label: "Study Plan" },
];

export const LOADING_MESSAGES = [
  "Uploading document...",
  "Splitting into chunks...",
  "Creating embeddings...",
  "Connecting to Qdrant...",
  "Retrieving notes...",
  "Generating study plan...",
];