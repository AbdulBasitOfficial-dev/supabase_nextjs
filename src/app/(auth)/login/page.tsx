import type { Metadata } from "next";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Sign In — CourseHub",
  description: "Sign in to your CourseHub account to manage your courses.",
};

export default function LoginPage() {
  return <LoginForm />;
}
