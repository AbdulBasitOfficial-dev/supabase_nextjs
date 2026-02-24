"use client";

import { LogIn, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useLoginForm } from "@/hooks/auth/useLoginForm";
import {
  AuthLayout,
  AuthInput,
  PasswordInput,
  SubmitButton,
  AuthDivider,
  AuthLink,
} from "./AuthComponents";

export default function LoginForm() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    togglePasswordVisibility,
    loading,
    handleSubmit,
  } = useLoginForm();

  return (
    <AuthLayout
      icon={LogIn}
      title="Welcome Back"
      subtitle="Sign in to manage your courses"
      onSubmit={handleSubmit}
    >
      {/* Email */}
      <AuthInput
        id="login-email"
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
        id="login-password"
        label="Password"
        value={password}
        onChange={setPassword}
        showPassword={showPassword}
        onToggle={togglePasswordVisibility}
        icon={Lock}
        eyeIcon={Eye}
        eyeOffIcon={EyeOff}
        autoComplete="current-password"
      />

      {/* Submit */}
      <SubmitButton loading={loading} label="Sign In" />

      {/* Divider + Link */}
      <AuthDivider text="New here?" />
      <AuthLink href="/signup" label="Create an Account" />
    </AuthLayout>
  );
}
