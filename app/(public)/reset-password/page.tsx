"use client";

import {useState, useEffect, Suspense} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { confirmPasswordReset } from "@/app/utils/auth-utils";
import Link from "next/link";
// import "../login/login.css";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Get email from query parameters
    const emailParam = searchParams?.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Password validation
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      setLoading(false);
      return;
    }

    try {
      const result = await confirmPasswordReset(email, newPassword, code);

      if (result.success) {
        setSuccess(true);
        // Redirect to login after successful reset
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        // setError(result.error?.message || "Password reset failed. Please try again.");
      }
    } catch (err: any) {
      console.error("Password reset error:", err);
      // setError(err.message || "An error occurred during the password reset. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
     <Suspense>
       <div className="login-container">
         <div className="login-card">
           <h1>Password Reset Successful</h1>
           <div className="success-message">
             <p>Your password has been reset successfully!</p>
             <p>You will be redirected to the login page shortly...</p>
           </div>
           <Link href="/login" className="login-button" style={{ display: "block", textAlign: "center", marginTop: "20px", textDecoration: "none" }}>
             Go to Login
           </Link>
         </div>
       </div>
     </Suspense>
    );
  }

  return (
    <Suspense>
      <div className="login-container">
        <div className="login-card">
          <h1>Reset Your Password</h1>

          <p className="confirm-instructions">
            Enter the verification code sent to your email and your new password.
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
              <label htmlFor="code">Verification Code</label>
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

            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  disabled={loading}
                  minLength={8}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={loading}
              />
            </div>

            <button
                type="submit"
                className="login-button"
                disabled={loading}
            >
              {loading ? "Resetting Password..." : "Reset Password"}
            </button>
          </form>

          <div className="login-footer">
            <p>
              <Link href="/login">Back to Login</Link>
            </p>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
