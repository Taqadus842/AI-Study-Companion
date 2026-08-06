# AI Study Companion — Frontend (Plain Next.js)

A production-ready Next.js 15 (App Router) frontend for an AI-powered study companion: upload notes, watch them chunk → embed → index in Qdrant, retrieve relevant passages, and generate a personalized day-by-day study plan.

**Zero extra dependencies** — just Next.js, React, and TypeScript. No Tailwind, no component libraries, no icon packages, no HTTP or animation libraries. Styling is a single hand-written `app/globals.css`, icons are inline SVG components, animations are plain CSS keyframes/transitions, and data fetching uses the native `fetch` API.

## Getting started

```bash
npm install
cp .env.example .env.local   # point NEXT_PUBLIC_API_URL at your FastAPI backend
npm run dev
```

Open http://localhost:3000 — it redirects to `/dashboard`.

If no backend is running, the API service layer (`services/api.ts`) transparently falls back to realistic mock data so every page is fully demoable on its own.

## Backend contract

The frontend expects a FastAPI backend exposing:

```
POST   /upload            multipart file upload → StudyDocument
GET    /documents         → StudyDocument[]
DELETE /documents/:id
POST   /study-plan        { topic } → StudyPlan
GET    /status             → ServiceStatus[]
```

Types for all of these live in `types/index.ts`.

## Project structure

```
app/            routes: dashboard, upload, planner, documents, settings
                globals.css — the entire design system (tokens, components, layout)
components/
  icons.tsx     hand-built inline SVG icon set
  ui/           Button, Card, Input, Modal, ProgressBar, Accordion,
                LoadingScreen, EmptyState, ErrorState, Toast
  shared/       Navbar, Sidebar, AppShell
  dashboard/    StatCard, FeatureCard, ActivityRow
  upload/       UploadBox, DocumentCard, PipelineView
  planner/      StudyPlanCard, Timeline, RetrievedChunks
hooks/          useDocuments, useStudyPlan
services/       api.ts (fetch-based), mockData.ts
lib/            utils.ts (cn, formatDate, delay, randomId)
types/          shared TypeScript interfaces
constants/      nav items, pipeline steps, loading messages
```

## Notes

- Fully responsive; the sidebar collapses into a drawer below 1024px.
- Respects `prefers-reduced-motion`.
- Toasts, modals, accordions, the upload pipeline, and the loading screen are all built with plain React state + CSS — no animation library.
