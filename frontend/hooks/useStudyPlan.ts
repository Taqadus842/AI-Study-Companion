"use client";

import { useCallback, useState } from "react";

import { generateStudyPlan } from "@/services/api";
import { useToast } from "@/components/ui/Toast";
import type { StudyPlan } from "@/types";

export function useStudyPlan() {
  const [plan, setPlan] = useState<StudyPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toast = useToast();

  const generate = useCallback(
    async (topic: string): Promise<StudyPlan | null> => {
      setIsGenerating(true);
      setError(null);

      try {
        const result = await generateStudyPlan(topic);

        setPlan(result);
        toast.success("Study plan generated successfully.");

        return result;
      } catch (err) {
        console.error(err);

        setError("Couldn't generate the study plan.");
        toast.error("Failed to generate study plan.");

        return null;
      } finally {
        setIsGenerating(false);
      }
    },
    [toast]
  );

  const reset = useCallback(() => {
    setPlan(null);
    setError(null);
  }, []);

  return {
    plan,
    isGenerating,
    error,
    generate,
    reset,
  };
}