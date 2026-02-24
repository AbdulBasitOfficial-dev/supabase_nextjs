"use client";

import { useState, useEffect, useCallback } from "react";
import { trpc } from "@/lib/trpc/client";
import { keepPreviousData } from "@tanstack/react-query";
import CourseCard from "./CourseCard";
import CourseForm from "./CourseForm";
import Pagination from "./Pagination";
import { Plus, Search, BookOpen, Sparkles, X, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  price: number;
  image_url?: string;
  created_at: string;
}

export default function CourseList() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset to first page on search
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  // Fetch courses
  const { data, isLoading, isFetching, refetch } = trpc.course.list.useQuery(
    { page, limit: 9, search: debouncedSearch || undefined },
    { placeholderData: keepPreviousData },
  );

  // Mutations
  const createMutation = trpc.course.create.useMutation({
    onSuccess: () => {
      toast.success("Course created successfully! 🎉");
      setShowForm(false);
      refetch();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const updateMutation = trpc.course.update.useMutation({
    onSuccess: () => {
      toast.success("Course updated successfully! ✨");
      setEditingCourse(null);
      setShowForm(false);
      refetch();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const deleteMutation = trpc.course.delete.useMutation({
    onSuccess: () => {
      toast.success("Course deleted successfully");
      setDeletingId(null);
      refetch();
    },
    onError: (err) => {
      toast.error(err.message);
      setDeletingId(null);
    },
  });

  const handleCreate = useCallback(
    (formData: Omit<Course, "id" | "created_at">) => {
      createMutation.mutate(formData);
    },
    [createMutation],
  );

  const handleUpdate = useCallback(
    (formData: Omit<Course, "id" | "created_at">) => {
      if (!editingCourse) return;
      updateMutation.mutate({ id: editingCourse.id, ...formData });
    },
    [editingCourse, updateMutation],
  );

  const handleDelete = useCallback(
    (id: string) => {
      if (window.confirm("Are you sure you want to delete this course?")) {
        setDeletingId(id);
        deleteMutation.mutate({ id });
      }
    },
    [deleteMutation],
  );

  const handleEdit = useCallback((course: Course) => {
    setEditingCourse(course);
    setShowForm(true);
  }, []);

  const handleCloseForm = useCallback(() => {
    setShowForm(false);
    setEditingCourse(null);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-accent-primary/5 via-bg-primary to-bg-primary pt-8 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-accent-secondary text-sm font-medium mb-2">
                <Sparkles size={16} />
                <span>Course Management</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-2">
                My <span className="gradient-text">Courses</span>
              </h1>
              <p className="text-text-secondary text-sm sm:text-base">
                {data?.totalCount
                  ? `${data.totalCount} course${data.totalCount !== 1 ? "s" : ""} in your collection`
                  : "Start building your course collection"}
              </p>
            </div>

            <button
              onClick={() => {
                setEditingCourse(null);
                setShowForm(true);
              }}
              className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-accent-primary to-accent-secondary rounded-xl shadow-lg shadow-accent-primary/25 transition-all hover:shadow-accent-primary/40 hover:scale-[1.02] active:scale-[0.98] self-start sm:self-auto"
            >
              <Plus size={18} />
              Add Course
            </button>
          </div>

          {/* Search Bar */}
          <div className="mt-8 relative max-w-lg">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search courses by title or description..."
              className="w-full pl-12 pr-10 py-3.5 bg-bg-card border border-border-default rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 transition-all text-sm"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
              >
                <X size={16} />
              </button>
            )}
            {isFetching && (
              <div className="absolute right-10 top-1/2 -translate-y-1/2">
                <RefreshCw
                  size={14}
                  className="animate-spin text-accent-primary"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        {isLoading ? (
          // Skeleton loading
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-bg-card border border-border-default rounded-2xl overflow-hidden"
              >
                <div className="h-40 skeleton" />
                <div className="p-5 space-y-3">
                  <div className="h-6 w-3/4 skeleton" />
                  <div className="h-4 w-full skeleton" />
                  <div className="h-4 w-2/3 skeleton" />
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <div className="h-3 skeleton" />
                    <div className="h-3 skeleton" />
                  </div>
                  <div className="flex gap-2 pt-3">
                    <div className="flex-1 h-10 skeleton" />
                    <div className="flex-1 h-10 skeleton" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : data?.courses && data.courses.length > 0 ? (
          <>
            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 stagger-children">
              {data.courses.map((course: Course, index: number) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  index={index}
                />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={data.currentPage}
              totalPages={data.totalPages}
              onPageChange={setPage}
            />

            {/* Results info */}
            <div className="text-center mt-4 text-xs text-text-muted">
              Showing page {data.currentPage} of {data.totalPages} (
              {data.totalCount} total courses)
            </div>
          </>
        ) : (
          // Empty state
          <div className="flex flex-col items-center justify-center py-24 px-4">
            <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10 mb-6 pulse-glow">
              <BookOpen size={40} className="text-accent-primary" />
            </div>
            <h3 className="text-xl font-bold text-text-primary mb-2">
              {debouncedSearch ? "No courses found" : "No courses yet"}
            </h3>
            <p className="text-text-secondary text-sm mb-6 text-center max-w-sm">
              {debouncedSearch
                ? `No courses match "${debouncedSearch}". Try a different search term.`
                : "Create your first course to get started with your collection."}
            </p>
            {!debouncedSearch && (
              <button
                onClick={() => {
                  setEditingCourse(null);
                  setShowForm(true);
                }}
                className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-accent-primary to-accent-secondary rounded-xl shadow-lg shadow-accent-primary/25 transition-all hover:shadow-accent-primary/40 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Plus size={18} />
                Create First Course
              </button>
            )}
          </div>
        )}
      </div>

      {/* Delete Confirmation Overlay */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-accent-primary border-t-transparent" />
        </div>
      )}

      {/* Course Form Modal */}
      {showForm && (
        <CourseForm
          course={editingCourse}
          onSubmit={editingCourse ? handleUpdate : handleCreate}
          onClose={handleCloseForm}
          loading={createMutation.isPending || updateMutation.isPending}
        />
      )}
    </div>
  );
}
