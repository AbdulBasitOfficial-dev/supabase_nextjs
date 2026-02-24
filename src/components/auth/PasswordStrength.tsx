import { CheckCircle } from "lucide-react";
import type { PasswordCheck } from "@/hooks/auth/useSignupForm";

interface PasswordStrengthProps {
  checks: PasswordCheck[];
  visible: boolean;
}

export default function PasswordStrength({
  checks,
  visible,
}: PasswordStrengthProps) {
  if (!visible) return null;

  return (
    <div className="space-y-2 p-3 bg-bg-input rounded-xl">
      {checks.map((check, i) => (
        <div key={i} className="flex items-center gap-2 text-xs">
          <CheckCircle
            size={14}
            className={check.valid ? "text-success" : "text-text-muted"}
          />
          <span className={check.valid ? "text-success" : "text-text-muted"}>
            {check.label}
          </span>
        </div>
      ))}
    </div>
  );
}
