import type {
  ServiceStatus,
  StudyDocument,
  StudyPlan,
  ActivityItem,
} from "@/types";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";


interface BackendDocument {
  id: string;
  filename: string;
  chunks: number;
  status?: "ready" | "processing" | "failed";
  uploadedAt?: string;
  sizeLabel?: string;
}


export interface DashboardResponse {
  documents: number;
  chunks: number;
  embeddings: number;
  studyPlans: number;
  activity: ActivityItem[];
}


export interface Profile {
  name: string;
  email: string;
}


// Helper function for API errors
async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Something went wrong");
  }

  return res.json();
}


// --------------------
// Upload Document
// --------------------

export async function uploadDocument(
  file: File
): Promise<StudyDocument> {

  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${BASE_URL}/upload/`, {
    method: "POST",
    body: formData,
  });


  const data = await handleResponse<{
    id: string;
    filename: string;
    chunks: number;
  }>(res);


  return {
    id: data.id,
    name: data.filename,
    uploadedAt: new Date().toISOString(),
    chunkCount: data.chunks,
    status: "ready",
    sizeLabel: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
  };
}



// --------------------
// Generate Study Plan
// --------------------

export async function generateStudyPlan(
  topic: string
): Promise<StudyPlan> {

  const res = await fetch(
    `${BASE_URL}/planner/study-plan/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic,
      }),
    }
  );


  const data = await handleResponse<{
    topic: string;
    days: number;
    retrieved_chunks: number;
  }>(res);


  return {
    topic: data.topic,
    days: data.days,
    retrievedChunks: data.retrieved_chunks,
  };
}



// --------------------
// Get Documents
// --------------------

export async function getDocuments(): Promise<StudyDocument[]> {

  const res = await fetch(
    `${BASE_URL}/documents/`
  );


  const data = await handleResponse<BackendDocument[]>(res);


  return data.map((doc) => ({
    id: doc.id,
    name: doc.filename,
    uploadedAt:
      doc.uploadedAt ??
      new Date().toISOString(),

    chunkCount: doc.chunks,

    status:
      doc.status ??
      "ready",

    sizeLabel:
      doc.sizeLabel ??
      "-",
  }));
}



// --------------------
// Delete Document
// --------------------

export async function deleteDocument(
  id: string
): Promise<void> {

  const res = await fetch(
    `${BASE_URL}/documents/${id}/`,
    {
      method: "DELETE",
    }
  );


  await handleResponse<void>(res);
}



// --------------------
// Dashboard
// --------------------

export async function getDashboard(): Promise<DashboardResponse> {

  const res = await fetch(
    `${BASE_URL}/dashboard/`
  );


  return handleResponse<DashboardResponse>(res);
}



// --------------------
// Profile
// --------------------

export async function getProfile(): Promise<Profile> {

  const res = await fetch(
    `${BASE_URL}/profile/`
  );


  return handleResponse<Profile>(res);
}



export async function updateProfile(
  profile: Profile
): Promise<Profile> {

  const res = await fetch(
    `${BASE_URL}/profile/`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(profile),
    }
  );


  return handleResponse<Profile>(res);
}



// --------------------
// System Status
// --------------------

export async function getStatus(): Promise<ServiceStatus[]> {

  const res = await fetch(
    `${BASE_URL}/status/`
  );


  return handleResponse<ServiceStatus[]>(res);
}