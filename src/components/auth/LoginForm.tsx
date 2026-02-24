"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Mail, Lock, Eye, EyeOff, LogIn, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    toast.success("Welcome back!");
    router.push("/courses");
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md animate-fade-in-up relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-primary to-accent-secondary shadow-xl shadow-accent-primary/25 pulse-glow">
            <LogIn size={28} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold gradient-text mb-2">
            Welcome Back
          </h1>
          <p className="text-text-secondary text-sm">
            Sign in to manage your courses
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleLogin}
          className="glass rounded-2xl p-8 space-y-6"
        >
          {/* Email */}
          <div className="space-y-2">
            <label
              htmlFor="login-email"
              className="block text-sm font-medium text-text-secondary"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
              />
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-12 pr-4 py-3 bg-bg-input border border-border-default rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 transition-all text-sm"
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label
              htmlFor="login-password"
              className="block text-sm font-medium text-text-secondary"
            >
              Password
            </label>
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
              />
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-3 bg-bg-input border border-border-default rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 transition-all text-sm"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-gradient-to-r from-accent-primary to-accent-secondary hover:from-accent-primary-hover hover:to-accent-secondary text-white font-semibold rounded-xl shadow-lg shadow-accent-primary/25 transition-all hover:shadow-accent-primary/40 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm"
          >
            {loading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <>
                Sign In
                <ArrowRight size={16} />
              </>
            )}
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border-default"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-bg-card text-text-muted rounded">
                New here?
              </span>
            </div>
          </div>

          {/* Sign up link */}
          <Link
            href="/signup"
            className="w-full flex items-center justify-center gap-2 py-3 px-6 border border-border-default text-text-secondary hover:text-text-primary hover:border-accent-primary/50 rounded-xl transition-all hover:bg-bg-card text-sm font-medium"
          >
            Create an Account
            <ArrowRight size={14} />
          </Link>
        </form>
      </div>
    </div>
  );
}
