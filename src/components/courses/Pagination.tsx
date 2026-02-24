"use client";

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("ellipsis");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("ellipsis");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-text-secondary bg-bg-card border border-border-default rounded-xl hover:border-accent-primary/50 hover:text-text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-[1.02] active:scale-[0.98]"
      >
        <ChevronLeft size={16} />
        <span className="hidden sm:inline">Prev</span>
      </button>

      {/* Page numbers */}
      <div className="flex items-center gap-1.5">
        {getPageNumbers().map((page, index) =>
          page === "ellipsis" ? (
            <div
              key={`ellipsis-${index}`}
              className="flex items-center justify-center w-10 h-10 text-text-muted"
            >
              <MoreHorizontal size={16} />
            </div>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`flex items-center justify-center w-10 h-10 text-sm font-medium rounded-xl transition-all hover:scale-[1.05] active:scale-[0.95] ${
                currentPage === page
                  ? "bg-gradient-to-br from-accent-primary to-accent-secondary text-white shadow-lg shadow-accent-primary/25"
                  : "text-text-secondary bg-bg-card border border-border-default hover:border-accent-primary/50 hover:text-text-primary"
              }`}
            >
              {page}
            </button>
          ),
        )}
      </div>

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-text-secondary bg-bg-card border border-border-default rounded-xl hover:border-accent-primary/50 hover:text-text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-[1.02] active:scale-[0.98]"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
