"use client";

import { UserPlus, Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import { useSignupForm } from "@/hooks/auth/useSignupForm";
import {
  AuthLayout,
  AuthInput,
  PasswordInput,
  SubmitButton,
  AuthDivider,
  AuthLink,
} from "./AuthComponents";
import PasswordStrength from "./PasswordStrength";

export default function SignupForm() {
  const {
    fullName,
    setFullName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    showPassword,
    togglePasswordVisibility,
    loading,
    passwordChecks,
    isPasswordValid,
    handleSubmit,
  } = useSignupForm();

  return (
    <AuthLayout
      icon={UserPlus}
      title="Create Account"
      subtitle="Start managing your courses today"
      onSubmit={handleSubmit}
      gradientDirection="reverse"
    >
      {/* Full Name */}
      <AuthInput
        id="signup-name"
        label="Full Name"
        value={fullName}
        onChange={setFullName}
        placeholder="John Doe"
        icon={User}
      />

      {/* Email */}
      <AuthInput
        id="signup-email"
        label="Email Address"
        type="email"
        value={email}
        onChange={setEmail}
        placeholder="you@example.com"
        icon={Mail}
        autoComplete="email"
      />

      {/* Password */}
      <PasswordInput
        id="signup-password"
        label="Password"
        value={password}
        onChange={setPassword}
        showPassword={showPassword}
        onToggle={togglePasswordVisibility}
        icon={Lock}
        eyeIcon={Eye}
        eyeOffIcon={EyeOff}
        autoComplete="new-password"
      />

      {/* Confirm Password */}
      <PasswordInput
        id="signup-confirm-password"
        label="Confirm Password"
        value={confirmPassword}
        onChange={setConfirmPassword}
        showPassword={showPassword}
        onToggle={togglePasswordVisibility}
        icon={Lock}
        eyeIcon={Eye}
        eyeOffIcon={EyeOff}
        autoComplete="new-password"
      />

      {/* Password Strength */}
      <PasswordStrength checks={passwordChecks} visible={password.length > 0} />

      {/* Submit */}
      <SubmitButton
        loading={loading}
        disabled={!isPasswordValid}
        label="Create Account"
        gradientDirection="reverse"
      />

      {/* Divider + Link */}
      <AuthDivider text="Already have an account?" />
      <AuthLink href="/login" label="Sign In Instead" />
    </AuthLayout>
  );
}
