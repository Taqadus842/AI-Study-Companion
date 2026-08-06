"use client";

import { useEffect, useState } from "react";
import { SparklesIcon } from "@/components/icons";
import { LOADING_MESSAGES } from "@/constants";

export function LoadingScreen({
  messages = LOADING_MESSAGES,
  compact = false,
}: {
  messages?: string[];
  compact?: boolean;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((index + 1) % messages.length);
    }, 1400);

    return () => clearInterval(timer);
  }, [index, messages]);

  return (
    <div
      className={
        compact
          ? "loading-screen loading-screen--compact"
          : "loading-screen"
      }
    >
      <SparklesIcon size={24} />

      <p>{messages[index]}</p>
    </div>
  );
}