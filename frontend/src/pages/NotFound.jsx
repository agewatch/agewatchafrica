import GlassCard from "../components/GlassCard.jsx";
import { Map } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="animate-fade-in min-h-[calc(100vh-80px)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
      <GlassCard hover={false} className="max-w-2xl">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mx-auto mb-6">
            <Map className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-amber-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-lg text-amber-800 mb-8">
            It looks like you've wandered off the trail. Let's get you back to
            exploring Africa.
          </p>
          <Link
            to="/"
            className="inline-block px-8 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            Return Home
          </Link>
        </div>
      </GlassCard>
    </div>
  );
}
