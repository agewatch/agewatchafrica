import GlassCard from "../components/GlassCard.jsx";
import { Mail, User, Target } from "lucide-react";

export default function Consult() {
  return (
    <div className="animate-fade-in max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-amber-900 mb-6">
          Book a Consultation
        </h1>
        <p className="text-xl text-amber-800 max-w-3xl mx-auto leading-relaxed">
          Let's create your perfect African journey. Schedule a consultation
          with our travel experts to discuss your preferences and needs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <GlassCard hover={false}>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-amber-900 mb-6">
              Consultation Request
            </h2>
            <form className="space-y-6">
              <div>
                <label className="block text-amber-900 font-semibold mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600 w-5 h-5" />
                  <input
                    type="text"
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/50 border border-amber-200 focus:border-amber-400 focus:outline-none"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

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
                  Travel Goals
                </label>
                <div className="relative">
                  <Target className="absolute left-3 top-3 text-amber-600 w-5 h-5" />
                  <textarea
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/50 border border-amber-200 focus:border-amber-400 focus:outline-none h-32 resize-none"
                    placeholder="Tell us about your dream trip, preferred destinations, travel dates, and any special needs..."
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                Submit Consultation Request
              </button>
            </form>
          </div>
        </GlassCard>

        <div className="space-y-8">
          <GlassCard hover={false}>
            <div>
              <h3 className="text-2xl font-bold text-amber-900 mb-4">
                What to Expect
              </h3>
              <ul className="space-y-4 text-amber-800">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>
                    30-45 minute consultation with a senior travel specialist
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>
                    Discussion of your travel goals, health considerations, and
                    preferences
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>
                    Personalized itinerary suggestions and pricing overview
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>
                    Next steps for booking and travel preparation
                  </span>
                </li>
              </ul>
            </div>
          </GlassCard>

          <GlassCard hover={false}>
            <div>
              <h3 className="text-2xl font-bold text-amber-900 mb-4">
                Contact Information
              </h3>
              <div className="space-y-3 text-amber-800">
                <p>📞 +1 (555) 123-4567</p>
                <p>✉️ hello@agewatchafrica.com</p>
                <p>📍 Accra, Ghana | Nairobi, Kenya</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
