"use client";

import { createContext, useContext, useState } from "react";
import { CheckCircleIcon, XCircleIcon } from "@/components/icons";
import { randomId } from "@/lib/utils";

const ToastContext = createContext<any>(null);

export function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toasts, setToasts] = useState<any[]>([]);

  function show(message: string, type: "success" | "error") {
    const id = randomId();

    setToasts((prev) => [
      ...prev,
      { id, message, type },
    ]);

    setTimeout(() => {
      setToasts((prev) =>
        prev.filter((toast) => toast.id !== id)
      );
    }, 3000);
  }

  return (
    <ToastContext.Provider
      value={{
        success: (message: string) =>
          show(message, "success"),
        error: (message: string) =>
          show(message, "error"),
      }}
    >
      {children}

      <div className="toast-viewport">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`toast toast--${toast.type}`}
          >
            {toast.type === "success" ? (
              <CheckCircleIcon size={16} />
            ) : (
              <XCircleIcon size={16} />
            )}

            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}