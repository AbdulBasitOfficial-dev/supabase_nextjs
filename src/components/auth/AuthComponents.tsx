import { type ReactNode } from "react";
import { type LucideIcon, ArrowRight } from "lucide-react";
import Link from "next/link";

// ─── Shared Styles ───────────────────────────────────────────
export const INPUT_CLASSES =
  "w-full pl-12 pr-4 py-3 bg-bg-input border border-border-default rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 transition-all text-sm";

export const INPUT_WITH_TOGGLE_CLASSES =
  "w-full pl-12 pr-12 py-3 bg-bg-input border border-border-default rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 transition-all text-sm";

// ─── Auth Page Layout ────────────────────────────────────────
interface AuthLayoutProps {
  children: ReactNode;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  onSubmit: (e: React.FormEvent) => void;
  gradientDirection?: "normal" | "reverse";
}

export function AuthLayout({
  children,
  icon: Icon,
  title,
  subtitle,
  onSubmit,
  gradientDirection = "normal",
}: AuthLayoutProps) {
  const gradientFrom =
    gradientDirection === "normal"
      ? "from-accent-primary"
      : "from-accent-secondary";
  const gradientTo =
    gradientDirection === "normal"
      ? "to-accent-secondary"
      : "to-accent-primary";

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
          <div
            className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${gradientFrom} ${gradientTo} shadow-xl shadow-accent-primary/25 pulse-glow`}
          >
            <Icon size={28} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold gradient-text mb-2">{title}</h1>
          <p className="text-text-secondary text-sm">{subtitle}</p>
        </div>

        {/* Card */}
        <form onSubmit={onSubmit} className="glass rounded-2xl p-8 space-y-6">
          {children}
        </form>
      </div>
    </div>
  );
}

// ─── Text Input Field ────────────────────────────────────────
interface AuthInputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  icon: LucideIcon;
  autoComplete?: string;
  hasToggle?: boolean;
}

export function AuthInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  icon: Icon,
  autoComplete,
  hasToggle = false,
}: AuthInputProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-text-secondary"
      >
        {label}
      </label>
      <div className="relative">
        <Icon
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
        />
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={hasToggle ? INPUT_WITH_TOGGLE_CLASSES : INPUT_CLASSES}
          autoComplete={autoComplete}
        />
      </div>
    </div>
  );
}

// ─── Password Input Field ────────────────────────────────────
interface PasswordInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  showPassword: boolean;
  onToggle: () => void;
  icon: LucideIcon;
  eyeIcon: LucideIcon;
  eyeOffIcon: LucideIcon;
  autoComplete?: string;
}

export function PasswordInput({
  id,
  label,
  value,
  onChange,
  placeholder = "••••••••",
  showPassword,
  onToggle,
  icon: Icon,
  eyeIcon: EyeIcon,
  eyeOffIcon: EyeOffIcon,
  autoComplete,
}: PasswordInputProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-text-secondary"
      >
        {label}
      </label>
      <div className="relative">
        <Icon
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
        />
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={INPUT_WITH_TOGGLE_CLASSES}
          autoComplete={autoComplete}
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
        >
          {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
        </button>
      </div>
    </div>
  );
}

// ─── Submit Button ───────────────────────────────────────────
interface SubmitButtonProps {
  loading: boolean;
  disabled?: boolean;
  label: string;
  gradientDirection?: "normal" | "reverse";
}

export function SubmitButton({
  loading,
  disabled = false,
  label,
  gradientDirection = "normal",
}: SubmitButtonProps) {
  const gradientFrom =
    gradientDirection === "normal"
      ? "from-accent-primary"
      : "from-accent-secondary";
  const gradientTo =
    gradientDirection === "normal"
      ? "to-accent-secondary"
      : "to-accent-primary";

  return (
    <button
      type="submit"
      disabled={loading || disabled}
      className={`w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-gradient-to-r ${gradientFrom} ${gradientTo} text-white font-semibold rounded-xl shadow-lg shadow-accent-primary/25 transition-all hover:shadow-accent-primary/40 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm`}
    >
      {loading ? (
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
      ) : (
        <>
          {label}
          <ArrowRight size={16} />
        </>
      )}
    </button>
  );
}

// ─── Auth Divider ────────────────────────────────────────────
interface AuthDividerProps {
  text: string;
}

export function AuthDivider({ text }: AuthDividerProps) {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-border-default"></div>
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-4 bg-bg-card text-text-muted rounded">{text}</span>
      </div>
    </div>
  );
}

// ─── Auth Alternate Link ─────────────────────────────────────
interface AuthLinkProps {
  href: string;
  label: string;
}

export function AuthLink({ href, label }: AuthLinkProps) {
  return (
    <Link
      href={href}
      className="w-full flex items-center justify-center gap-2 py-3 px-6 border border-border-default text-text-secondary hover:text-text-primary hover:border-accent-primary/50 rounded-xl transition-all hover:bg-bg-card text-sm font-medium"
    >
      {label}
      <ArrowRight size={14} />
    </Link>
  );
}
