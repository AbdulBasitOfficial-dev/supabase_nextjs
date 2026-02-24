import type { Metadata } from "next";
import CourseList from "@/components/courses/CourseList";

export const metadata: Metadata = {
  title: "My Courses — CourseHub",
  description: "Manage, create, and organize your course collection.",
};

export default function CoursesPage() {
  return <CourseList />;
}
