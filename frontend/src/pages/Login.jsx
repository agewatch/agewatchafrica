import GlassCard from "../components/GlassCard.jsx";
import { Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="animate-fade-in min-h-[calc(100vh-80px)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
      <div className="w-full max-w-md">
        <GlassCard hover={false}>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-amber-900 mb-2">
              Client Login
            </h1>
            <p className="text-amber-800">
              Access your travel dashboard and itinerary details
            </p>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-amber-900 font-semibold mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600 w-5 h-5" />
                <input
                  type="email"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/50 border border-amber-200 focus:border-amber-400 focus:outline-none"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-amber-900 font-semibold mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600 w-5 h-5" />
                <input
                  type="password"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/50 border border-amber-200 focus:border-amber-400 focus:outline-none"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-amber-700 text-sm">
              Don't have an account?{" "}
              <Link to="/consult" className="text-amber-900 font-semibold">
                Book a consultation
              </Link>
            </p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
