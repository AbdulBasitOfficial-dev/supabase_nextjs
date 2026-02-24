"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Save, Loader2 } from "lucide-react";

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
}

interface CourseFormProps {
  course?: Course | null;
  onSubmit: (data: Omit<Course, "id" | "created_at">) => void;
  onClose: () => void;
  loading: boolean;
}

const categories = [
  "Web Development",
  "Mobile Development",
  "Data Science",
  "Machine Learning",
  "Cloud Computing",
  "DevOps",
  "Cybersecurity",
  "UI/UX Design",
  "Database",
  "Blockchain",
  "Game Development",
  "Other",
];

export default function CourseForm({
  course,
  onSubmit,
  onClose,
  loading,
}: CourseFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    instructor: "",
    duration: "",
    level: "Beginner" as "Beginner" | "Intermediate" | "Advanced",
    category: "",
    price: 0,
    image_url: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (course) {
      setFormData({
        title: course.title,
        description: course.description,
        instructor: course.instructor,
        duration: course.duration,
        level: course.level,
        category: course.category,
        price: course.price,
        image_url: course.image_url || "",
      });
    }
  }, [course]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.instructor.trim())
      newErrors.instructor = "Instructor is required";
    if (!formData.duration.trim()) newErrors.duration = "Duration is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (formData.price < 0) newErrors.price = "Price must be non-negative";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
  };

  const inputClasses =
    "w-full px-4 py-3 bg-bg-input border border-border-default rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 transition-all text-sm";
  const labelClasses = "block text-sm font-medium text-text-secondary mb-1.5";
  const errorClasses = "text-xs text-danger mt-1";

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal — flex column layout with constrained height */}
      <div className="relative w-full max-w-2xl max-h-[90vh] glass rounded-2xl animate-fade-in-up flex flex-col overflow-hidden">
        {/* Sticky Header */}
        <div className="flex items-center justify-between p-6 pb-4 border-b border-border-default shrink-0">
          <h2 className="text-xl font-bold gradient-text">
            {course ? "Edit Course" : "Create New Course"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-text-muted hover:text-text-primary hover:bg-bg-card rounded-xl transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col overflow-hidden flex-1"
        >
          <div className="overflow-y-auto flex-1 p-6 space-y-5">
            {/* Title */}
            <div>
              <label htmlFor="course-title" className={labelClasses}>
                Course Title *
              </label>
              <input
                id="course-title"
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="e.g. Advanced React Patterns"
                className={inputClasses}
                maxLength={200}
              />
              {errors.title && <p className={errorClasses}>{errors.title}</p>}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="course-description" className={labelClasses}>
                Description *
              </label>
              <textarea
                id="course-description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="What will students learn in this course?"
                className={`${inputClasses} min-h-[100px] resize-y`}
                maxLength={2000}
              />
              {errors.description && (
                <p className={errorClasses}>{errors.description}</p>
              )}
            </div>

            {/* Two columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Instructor */}
              <div>
                <label htmlFor="course-instructor" className={labelClasses}>
                  Instructor *
                </label>
                <input
                  id="course-instructor"
                  type="text"
                  value={formData.instructor}
                  onChange={(e) =>
                    setFormData({ ...formData, instructor: e.target.value })
                  }
                  placeholder="Instructor Name"
                  className={inputClasses}
                  maxLength={100}
                />
                {errors.instructor && (
                  <p className={errorClasses}>{errors.instructor}</p>
                )}
              </div>

              {/* Duration */}
              <div>
                <label htmlFor="course-duration" className={labelClasses}>
                  Duration *
                </label>
                <input
                  id="course-duration"
                  type="text"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({ ...formData, duration: e.target.value })
                  }
                  placeholder="e.g. 12 hours"
                  className={inputClasses}
                  maxLength={50}
                />
                {errors.duration && (
                  <p className={errorClasses}>{errors.duration}</p>
                )}
              </div>
            </div>

            {/* Two columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Level */}
              <div>
                <label htmlFor="course-level" className={labelClasses}>
                  Level *
                </label>
                <select
                  id="course-level"
                  value={formData.level}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      level: e.target.value as
                        | "Beginner"
                        | "Intermediate"
                        | "Advanced",
                    })
                  }
                  className={inputClasses}
                >
                  <option value="Beginner">🌱 Beginner</option>
                  <option value="Intermediate">🔥 Intermediate</option>
                  <option value="Advanced">⚡ Advanced</option>
                </select>
              </div>

              {/* Category */}
              <div>
                <label htmlFor="course-category" className={labelClasses}>
                  Category *
                </label>
                <select
                  id="course-category"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className={inputClasses}
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className={errorClasses}>{errors.category}</p>
                )}
              </div>
            </div>

            {/* Two columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Price */}
              <div>
                <label htmlFor="course-price" className={labelClasses}>
                  Price ($)
                </label>
                <input
                  id="course-price"
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: parseFloat(e.target.value) || 0,
                    })
                  }
                  placeholder="0.00"
                  className={inputClasses}
                  min="0"
                  step="0.01"
                />
                {errors.price && <p className={errorClasses}>{errors.price}</p>}
              </div>

              {/* Image URL */}
              <div>
                <label htmlFor="course-image" className={labelClasses}>
                  Image URL (optional)
                </label>
                <input
                  id="course-image"
                  type="url"
                  value={formData.image_url}
                  onChange={(e) =>
                    setFormData({ ...formData, image_url: e.target.value })
                  }
                  placeholder="https://..."
                  className={inputClasses}
                />
              </div>
            </div>
          </div>

          {/* Sticky Footer — always visible */}
          <div className="flex items-center gap-3 p-6 pt-4 border-t border-border-default shrink-0 bg-bg-card/50">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-6 text-sm font-medium text-text-secondary bg-bg-card border border-border-default rounded-xl hover:border-accent-primary/50 hover:text-text-primary transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-6 text-sm font-semibold text-white bg-gradient-to-r from-accent-primary to-accent-secondary rounded-xl shadow-lg shadow-accent-primary/25 transition-all hover:shadow-accent-primary/40 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  <Save size={16} />
                  {course ? "Update Course" : "Create Course"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
}
