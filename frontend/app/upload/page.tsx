"use client";

import { useState } from "react";

import { FileStackIcon } from "@/components/icons";
import { AppShell } from "@/components/shared/AppShell";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useToast } from "@/components/ui/Toast";
import { DocumentCard } from "@/components/upload/DocumentCard";
import { UploadBox } from "@/components/upload/UploadBox";

import { useDocuments } from "@/hooks/useDocuments";
import { uploadDocument } from "@/services/api";

export default function UploadPage() {
  const {
    documents = [],
    addDocument,
    remove,
  } = useDocuments();

  const toast = useToast();

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState("");

  async function handleFiles(files: File[]) {
    if (files.length === 0) return;

    const file = files[0];

    setUploading(true);
    setProgress(10);
    setFileName(file.name);

    try {
      const document = await uploadDocument(file);

      setProgress(100);

      addDocument(document);

      toast.success("Document uploaded successfully");
    } catch (error) {
      console.error(error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Upload failed"
      );
    } finally {
      setTimeout(() => {
        setUploading(false);
        setProgress(0);
        setFileName("");
      }, 300);
    }
  }

  return (
    <AppShell title="Upload">
      <UploadBox onFilesSelected={handleFiles} />

      {uploading && (
        <Card hoverLift={false}>
          <p className="mb-3 truncate font-medium">
            {fileName}
          </p>

          <ProgressBar value={progress} />
        </Card>
      )}

      <h2 className="section-title">
        Uploaded Documents ({documents.length})
      </h2>

      {documents.length === 0 ? (
        <EmptyState
          icon={<FileStackIcon size={24} />}
          title="No uploaded documents"
          description="Upload a PDF or TXT file to get started."
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