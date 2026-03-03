import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import GlassCard from "../components/GlassCard.jsx";
import { sendVerificationEmail, verifyEmailLink, fetchMe } from "../services/auth.js";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const verifyUrl = searchParams.get("verify_url");
    const statusParam = searchParams.get("status");
    if (statusParam === "verified") {
      setVerified(true);
      setStatus("Your email has been confirmed and your account is active.");
      return;
    }
    if (!verifyUrl) return;
    setIsVerifying(true);
    setError("");
    setStatus("");
    verifyEmailLink(verifyUrl)
      .then(async () => {
        await fetchMe();
        setVerified(true);
        setStatus("Your email has been confirmed and your account is active.");
      })
      .catch(() => {
        setError("Unable to verify your email. Please try again.");
      })
      .finally(() => setIsVerifying(false));
  }, [searchParams]);

  const handleResend = async () => {
    setStatus("");
    setError("");
    setIsSending(true);
    try {
      await sendVerificationEmail();
      setStatus("Verification email sent. Please check your inbox.");
    } catch (err) {
      setError("Unable to send verification email. Try again later.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="animate-fade-in min-h-[calc(100vh-80px)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
      <div className="w-full max-w-lg">
        <GlassCard hover={false}>
          <h1 className="text-3xl font-bold text-amber-900 mb-3">
            {verified ? "Email Confirmed" : "Verify Your Email"}
          </h1>
          <p className="text-amber-800 mb-6">
            {verified
              ? "You're confirmed and logged in. Continue to your dashboard."
              : "We sent a verification link to your email. Please click it to activate your account."}
          </p>
          {isVerifying ? (
            <div className="w-full py-3 rounded-lg bg-amber-100 text-amber-900 font-semibold text-center">
              Verifying your email...
            </div>
          ) : verified ? (
            <div className="flex flex-col gap-3">
              <Link
                to="/dashboard"
                className="w-full py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-md hover:shadow-lg text-center"
              >
                Go to Dashboard
              </Link>
              <Link
                to="/"
                className="w-full py-3 rounded-lg bg-white border border-amber-200 text-amber-900 font-semibold hover:bg-amber-50 transition-all duration-300 shadow-sm text-center"
              >
                Back to Home
              </Link>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={isSending}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              {isSending ? "Sending..." : "Resend Verification Email"}
            </button>
          )}

          {status ? (
            <p className="mt-4 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
              {status}
            </p>
          ) : null}

          {error ? (
            <p className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </p>
          ) : null}
        </GlassCard>
      </div>
    </div>
  );
}
