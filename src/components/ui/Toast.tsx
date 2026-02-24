"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: "#1a1a2e",
          color: "#e8e8f0",
          border: "1px solid #2a2a4a",
          borderRadius: "12px",
          fontSize: "14px",
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3)",
        },
        success: {
          iconTheme: {
            primary: "#00cec9",
            secondary: "#1a1a2e",
          },
        },
        error: {
          iconTheme: {
            primary: "#ff6b6b",
            secondary: "#1a1a2e",
          },
        },
      }}
    />
  );
}
