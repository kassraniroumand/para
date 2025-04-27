"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { confirmSignUpUser } from "@/app/utils/auth-utils";
import Link from "next/link";
import "../login/login.css";

export default function ConfirmSignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Get email from query parameters
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await confirmSignUpUser(email, code);

      if (result.success) {
        setSuccess(true);
        // Redirect to login after successful confirmation
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setError(result.error?.message || "Confirmation failed. Please try again.");
      }
    } catch (err: any) {
      console.error("Confirmation error:", err);
      setError(err.message || "An error occurred during confirmation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="login-container">
        <div className="login-card">
          <h1>Email Confirmed!</h1>
          <div className="success-message">
            <p>Your email has been confirmed successfully!</p>
            <p>You will be redirected to the login page shortly...</p>
          </div>
          <Link href="/login" className="login-button" style={{ display: "block", textAlign: "center", marginTop: "20px", textDecoration: "none" }}>
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Confirm Your Email</h1>

        <p className="confirm-instructions">
          We've sent a confirmation code to your email address.
          Please enter the code below to verify your account.
        </p>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="code">Confirmation Code</label>
            <input
              type="text"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              disabled={loading}
              placeholder="Enter code from your email"
            />
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? "Confirming..." : "Confirm Email"}
          </button>
        </form>

        <div className="login-footer">
          <p>
            Didn't receive a code? <button className="resend-link">Resend code</button>
          </p>
          <p>
            <Link href="/login">Back to Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
