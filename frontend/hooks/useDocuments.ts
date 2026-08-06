"use client";

import { useCallback, useEffect, useState } from "react";

import { useToast } from "@/components/ui/Toast";
import { deleteDocument, getDocuments } from "@/services/api";
import type { StudyDocument } from "@/types";

export function useDocuments() {
  const [documents, setDocuments] = useState<StudyDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const toast = useToast();

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const docs = await getDocuments();
      setDocuments(docs);
    } catch (err) {
      console.error(err);
      setError("Couldn't load documents.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const remove = useCallback(
    async (id: string) => {
      try {
        await deleteDocument(id);

        setDocuments((prev) =>
          prev.filter((doc) => doc.id !== id)
        );

        toast.success("Document deleted");
      } catch (err) {
        console.error(err);
        toast.error("Couldn't delete document");
      }
    },
    [toast]
  );

  const addDocument = useCallback(
    (document: StudyDocument) => {
      setDocuments((prev) => [document, ...prev]);
    },
    []
  );

  return {
    documents,
    isLoading,
    error,
    refresh,
    remove,
    addDocument,
  };
}