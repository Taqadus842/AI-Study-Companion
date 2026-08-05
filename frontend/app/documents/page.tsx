"use client";

import Link from "next/link";

import { FileStackIcon, UploadCloudIcon } from "@/components/icons";
import { AppShell } from "@/components/shared/AppShell";
import { DocumentCard } from "@/components/upload/DocumentCard";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { LoadingScreen } from "@/components/ui/LoadingScreen";

import { useDocuments } from "@/hooks/useDocuments";

export default function DocumentsPage() {
  const {
    documents = [],
    isLoading,
    error,
    refresh,
    remove,
  } = useDocuments();

  if (isLoading) {
    return (
      <AppShell title="Documents">
        <LoadingScreen
          compact
          messages={["Loading your documents..."]}
        />
      </AppShell>
    );
  }

  if (error) {
    return (
      <AppShell title="Documents">
        <ErrorState
          message={error}
          onRetry={refresh}
        />
      </AppShell>
    );
  }

  return (
    <AppShell title="Documents">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            Documents
          </h2>

          <p className="text-sm text-muted-foreground">
            {documents.length} document
            {documents.length !== 1 ? "s" : ""} uploaded
          </p>
        </div>

        <Link href="/upload">
          <Button>
            <UploadCloudIcon size={18} />
            Upload
          </Button>
        </Link>
      </div>

      {documents.length === 0 ? (
        <EmptyState
          icon={<FileStackIcon size={28} />}
          title="No documents found"
          description="Upload your first PDF or TXT document to start generating AI study plans."
        />
      ) : (
        <div className="grid-docs">
          {documents.map((document) => (
            <DocumentCard
              key={document.id}
              document={document}
              onDelete={remove}
            />
          ))}
        </div>
      )}
    </AppShell>
  );
}