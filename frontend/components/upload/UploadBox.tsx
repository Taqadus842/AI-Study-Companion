"use client";

import { useRef, useState } from "react";

import { UploadCloudIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

interface UploadBoxProps {
  onFilesSelected: (files: File[]) => void;
  accept?: string;
}

export function UploadBox({
  onFilesSelected,
  accept = ".pdf,.txt",
}: UploadBoxProps) {
  const [dragging, setDragging] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const openFilePicker = () => {
    inputRef.current?.click();
  };

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    onFilesSelected(Array.from(files));
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    setDragging(false);

    handleFiles(e.dataTransfer.files);
  };

  return (
    <div
      className={cn(
        "upload-box",
        dragging && "upload-box--dragging"
      )}
      role="button"
      tabIndex={0}
      onClick={openFilePicker}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openFilePicker();
        }
      }}
      onDragOver={(e) => {
        e.preventDefault();

        if (!dragging) {
          setDragging(true);
        }
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        hidden
        multiple
        accept={accept}
        onChange={(e) => {
          handleFiles(e.target.files);

          // Allow selecting the same file again
          e.target.value = "";
        }}
      />

      <div className="upload-icon">
        <UploadCloudIcon size={28} />
      </div>

      <p className="upload-title">
        Drag &amp; drop your files here
      </p>

      <p className="upload-subtitle">
        or click to browse (PDF, TXT)
      </p>
    </div>
  );
}