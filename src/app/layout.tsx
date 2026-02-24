import type { Metadata } from "next";
import "./globals.css";
import { TRPCProvider } from "@/components/providers/TRPCProvider";
import ToastProvider from "@/components/ui/Toast";

export const metadata: Metadata = {
  title: "CourseHub — Course Management",
  description:
    "A premium course management platform. Create, organize, and manage your courses with elegance.",
  keywords: ["courses", "education", "management", "learning"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <TRPCProvider>
          <ToastProvider />
          {children}
        </TRPCProvider>
      </body>
    </html>
  );
}
