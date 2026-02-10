import { useState } from "react";
import GlassCard from "../components/GlassCard.jsx";
import { sendVerificationEmail } from "../services/auth.js";

export default function VerifyEmail() {
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [isSending, setIsSending] = useState(false);

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
            Verify Your Email
          </h1>
          <p className="text-amber-800 mb-6">
            We sent a verification link to your email. Please click it to
            activate your account.
          </p>
          <button
            type="button"
            onClick={handleResend}
            disabled={isSending}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            {isSending ? "Sending..." : "Resend Verification Email"}
          </button>

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
