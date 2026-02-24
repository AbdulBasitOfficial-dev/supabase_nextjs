"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { LogOut, BookOpen, Menu, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Navbar() {
  const router = useRouter();
  const supabase = createClient();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out successfully");
    router.push("/login");
    router.refresh();
  };

  return (
    <nav className="glass sticky top-0 z-50 border-b border-border-default">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => router.push("/courses")}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent-primary to-accent-secondary shadow-lg shadow-accent-primary/20 transition-transform group-hover:scale-110">
              <BookOpen size={20} className="text-white" />
            </div>
            <span className="hidden sm:block text-xl font-bold gradient-text">
              CourseHub
            </span>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => router.push("/courses")}
              className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary rounded-lg transition-colors hover:bg-bg-card"
            >
              My Courses
            </button>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-danger hover:text-danger-hover rounded-lg transition-all hover:bg-danger/10"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-text-secondary hover:text-text-primary rounded-lg transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 animate-fade-in-up">
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  router.push("/courses");
                  setMobileOpen(false);
                }}
                className="px-4 py-3 text-sm font-medium text-text-secondary hover:text-text-primary rounded-lg transition-colors hover:bg-bg-card text-left"
              >
                My Courses
              </button>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-danger hover:text-danger-hover rounded-lg transition-all hover:bg-danger/10"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
