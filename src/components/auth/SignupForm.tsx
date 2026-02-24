"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
  ArrowRight,
  User,
  CheckCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";

export default function SignupForm() {
  const router = useRouter();
  const supabase = createClient();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const passwordChecks = [
    { label: "At least 8 characters", valid: password.length >= 8 },
    { label: "Contains uppercase", valid: /[A-Z]/.test(password) },
    { label: "Contains number", valid: /[0-9]/.test(password) },
    {
      label: "Passwords match",
      valid: password === confirmPassword && confirmPassword.length > 0,
    },
  ];

  const isPasswordValid = passwordChecks.every((c) => c.valid);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!isPasswordValid) {
      toast.error("Please meet all password requirements");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    toast.success("Account created! Check your email to verify.");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-accent-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md animate-fade-in-up relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-secondary to-accent-primary shadow-xl shadow-accent-primary/25 pulse-glow">
            <UserPlus size={28} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold gradient-text mb-2">
            Create Account
          </h1>
          <p className="text-text-secondary text-sm">
            Start managing your courses today
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSignup}
          className="glass rounded-2xl p-8 space-y-5"
        >
          {/* Full Name */}
          <div className="space-y-2">
            <label
              htmlFor="signup-name"
              className="block text-sm font-medium text-text-secondary"
            >
              Full Name
            </label>
            <div className="relative">
              <User
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
              />
              <input
                id="signup-name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                className="w-full pl-12 pr-4 py-3 bg-bg-input border border-border-default rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 transition-all text-sm"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label
              htmlFor="signup-email"
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
                id="signup-email"
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
              htmlFor="signup-password"
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
                id="signup-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-3 bg-bg-input border border-border-default rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 transition-all text-sm"
                autoComplete="new-password"
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

          {/* Confirm Password */}
          <div className="space-y-2">
            <label
              htmlFor="signup-confirm-password"
              className="block text-sm font-medium text-text-secondary"
            >
              Confirm Password
            </label>
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
              />
              <input
                id="signup-confirm-password"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-3 bg-bg-input border border-border-default rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 transition-all text-sm"
                autoComplete="new-password"
              />
            </div>
          </div>

          {/* Password strength indicators */}
          {password.length > 0 && (
            <div className="space-y-2 p-3 bg-bg-input rounded-xl">
              {passwordChecks.map((check, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <CheckCircle
                    size={14}
                    className={check.valid ? "text-success" : "text-text-muted"}
                  />
                  <span
                    className={check.valid ? "text-success" : "text-text-muted"}
                  >
                    {check.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !isPasswordValid}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-gradient-to-r from-accent-secondary to-accent-primary hover:from-accent-secondary hover:to-accent-primary-hover text-white font-semibold rounded-xl shadow-lg shadow-accent-primary/25 transition-all hover:shadow-accent-primary/40 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm"
          >
            {loading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <>
                Create Account
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
                Already have an account?
              </span>
            </div>
          </div>

          {/* Login link */}
          <Link
            href="/login"
            className="w-full flex items-center justify-center gap-2 py-3 px-6 border border-border-default text-text-secondary hover:text-text-primary hover:border-accent-primary/50 rounded-xl transition-all hover:bg-bg-card text-sm font-medium"
          >
            Sign In Instead
            <ArrowRight size={14} />
          </Link>
        </form>
      </div>
    </div>
  );
}
