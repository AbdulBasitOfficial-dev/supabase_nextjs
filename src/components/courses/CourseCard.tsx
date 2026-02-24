"use client";

import {
  Clock,
  User,
  Tag,
  DollarSign,
  Pencil,
  Trash2,
  BarChart3,
} from "lucide-react";

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

interface CourseCardProps {
  course: Course;
  onEdit: (course: Course) => void;
  onDelete: (id: string) => void;
  index: number;
}

const levelColors: Record<string, string> = {
  Beginner: "bg-level-beginner/15 text-level-beginner border-level-beginner/30",
  Intermediate:
    "bg-level-intermediate/15 text-level-intermediate border-level-intermediate/30",
  Advanced: "bg-level-advanced/15 text-level-advanced border-level-advanced/30",
};

const levelIcons: Record<string, string> = {
  Beginner: "🌱",
  Intermediate: "🔥",
  Advanced: "⚡",
};

export default function CourseCard({
  course,
  onEdit,
  onDelete,
  index,
}: CourseCardProps) {
  return (
    <div
      className="group relative bg-bg-card border border-border-default rounded-2xl overflow-hidden transition-all duration-300 hover:border-accent-primary/40 hover:shadow-lg hover:shadow-accent-primary/10 hover:-translate-y-1"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* Image / Gradient Header */}
      <div className="relative h-40 overflow-hidden">
        {course.image_url ? (
          <img
            src={course.image_url}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-accent-primary/20 via-accent-secondary/10 to-bg-card flex items-center justify-center">
            <div className="text-5xl opacity-30">📚</div>
          </div>
        )}
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent" />

        {/* Level Badge */}
        <div
          className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full border ${levelColors[course.level]}`}
        >
          <span className="mr-1">{levelIcons[course.level]}</span>
          {course.level}
        </div>

        {/* Price Badge */}
        <div className="absolute top-3 left-3 px-3 py-1 text-xs font-bold bg-bg-card/80 backdrop-blur-sm text-accent-secondary rounded-full border border-border-default">
          {course.price === 0 ? "Free" : `$${course.price.toFixed(2)}`}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <h3 className="text-lg font-bold text-text-primary line-clamp-1 group-hover:gradient-text transition-all">
          {course.title}
        </h3>

        <p className="text-sm text-text-secondary line-clamp-2 leading-relaxed">
          {course.description}
        </p>

        {/* Meta info */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <User size={13} />
            <span className="truncate">{course.instructor}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <Clock size={13} />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <Tag size={13} />
            <span className="truncate">{course.category}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <BarChart3 size={13} />
            <span>{course.level}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-3 border-t border-border-default">
          <button
            onClick={() => onEdit(course)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-medium text-accent-secondary bg-accent-primary/10 hover:bg-accent-primary/20 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Pencil size={13} />
            Edit
          </button>
          <button
            onClick={() => onDelete(course.id)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-medium text-danger bg-danger/10 hover:bg-danger/20 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Trash2 size={13} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
