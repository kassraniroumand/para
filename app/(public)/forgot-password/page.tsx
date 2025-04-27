"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { requestPasswordReset } from "@/app/utils/auth-utils";
import Link from "next/link";
import "../login/login.css";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await requestPasswordReset(email);

      if (result.success) {
        setSuccess(true);
        // Redirect to reset password page
        router.push(`/reset-password?email=${encodeURIComponent(email)}`);
      } else {
        setError(result.error?.message || "Password reset request failed. Please try again.");
      }
    } catch (err: any) {
      console.error("Password reset error:", err);
      setError(err.message || "An error occurred during the password reset request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Reset Password</h1>

        <p className="confirm-instructions">
          Enter your email address and we'll send you a code to reset your password.
        </p>

        {error && <div className="login-error">{error}</div>}
        {success && (
          <div className="success-message">
            A verification code has been sent to your email.
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading || success}
            />
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={loading || success}
          >
            {loading ? "Sending Code..." : "Send Reset Code"}
          </button>
        </form>

        <div className="login-footer">
          <p>
            <Link href="/login">Back to Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
