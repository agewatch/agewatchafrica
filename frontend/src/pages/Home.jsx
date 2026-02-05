import { Link } from "react-router-dom";
import GlassCard from "../components/GlassCard.jsx";
import { Heart, Users, Sparkles } from "lucide-react";
import ImageWithFallback from "../components/figma/ImageWithFallback.jsx";

export default function Home() {
  return (
    <div className="animate-fade-in">
      <section className="relative min-h-[600px] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
        <div className="absolute inset-0 opacity-20">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1758881534787-f189d945748e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW5pb3IlMjBhZnJpY2FuJTIwc2FmYXJpJTIwZWxlcGhhbnRzfGVufDF8fHx8MTc3MDIzNjczM3ww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Safari background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-amber-900 mb-6">
            Explore Africa with Grace & Confidence
          </h1>
          <p className="text-xl sm:text-2xl text-amber-800 mb-10 max-w-3xl mx-auto leading-relaxed">
            Tailored travel experiences for seniors who seek adventure,
            comfort, and cultural richness across the African continent.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/destinations"
              className="px-8 py-4 text-xl rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Browse Destinations
            </Link>
            <Link
              to="/consult"
              className="px-8 py-4 text-xl rounded-xl backdrop-blur-lg bg-white/40 border-2 border-amber-500 text-amber-900 font-semibold hover:bg-white/60 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <GlassCard>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-amber-900 mb-3">
                Signature Journeys
              </h3>
              <p className="text-lg text-amber-800 leading-relaxed">
                Curated itineraries designed specifically for mature travelers
                who appreciate comfort and meaningful experiences.
              </p>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-amber-900 mb-3">
                Caregiver Friendly
              </h3>
              <p className="text-lg text-amber-800 leading-relaxed">
                Travel with ease knowing your companions and caregivers are
                welcomed and accommodated throughout every journey.
              </p>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-amber-900 mb-3">
                Legacy Tours
              </h3>
              <p className="text-lg text-amber-800 leading-relaxed">
                Create lasting memories and connect with your heritage through
                personalized cultural and historical experiences.
              </p>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
