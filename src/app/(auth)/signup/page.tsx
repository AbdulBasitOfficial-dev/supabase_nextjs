import type { Metadata } from "next";
import SignupForm from "@/components/auth/SignupForm";

export const metadata: Metadata = {
  title: "Create Account — CourseHub",
  description: "Sign up for CourseHub and start managing your courses.",
};

export default function SignupPage() {
  return <SignupForm />;
}
