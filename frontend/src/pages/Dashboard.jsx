import GlassCard from "../components/GlassCard.jsx";
import { Plane, FileText, HeadphonesIcon } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
        <div>
          <h1 className="text-4xl font-bold text-amber-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-amber-800 text-lg">
            Here's an overview of your upcoming adventures and travel plans.
          </p>
        </div>
        <button className="mt-4 sm:mt-0 px-6 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5">
          Book New Trip
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <GlassCard>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-4">
              <Plane className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-amber-900 mb-3">
              Upcoming Trips
            </h3>
            <p className="text-lg text-amber-800 leading-relaxed">
              You have 2 upcoming trips scheduled for 2024.
            </p>
            <button className="mt-4 text-amber-900 font-semibold hover:text-amber-700 transition-colors">
              View Details →
            </button>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-amber-900 mb-3">
              Travel Documents
            </h3>
            <p className="text-lg text-amber-800 leading-relaxed">
              Access your itineraries, visas, and travel insurance documents.
            </p>
            <button className="mt-4 text-amber-900 font-semibold hover:text-amber-700 transition-colors">
              View Documents →
            </button>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center mb-4">
              <HeadphonesIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-amber-900 mb-3">
              24/7 Support
            </h3>
            <p className="text-lg text-amber-800 leading-relaxed">
              Connect with your dedicated travel concierge anytime.
            </p>
            <button className="mt-4 text-amber-900 font-semibold hover:text-amber-700 transition-colors">
              Contact Support →
            </button>
          </div>
        </GlassCard>
      </div>

      <GlassCard className="mt-8" hover={false}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-amber-900 mb-4">
              Next Trip: Morocco Wellness Retreat
            </h3>
            <p className="text-amber-800 mb-4">
              Departure: March 15, 2024
            </p>
            <p className="text-amber-700 text-sm">
              7 days of relaxation, cultural immersion, and wellness
              activities in beautiful Morocco.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-amber-900 mb-3">
              Preparation Checklist
            </h4>
            <ul className="space-y-2 text-amber-800 text-sm">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                Passport valid for 6+ months
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                Travel insurance confirmed
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                Medical clearance completed
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                Packing list reviewed
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-amber-900 mb-3">
              Your Consultant
            </h4>
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                <span className="text-white font-semibold">AS</span>
              </div>
              <div>
                <p className="text-amber-900 font-semibold">Amara S.</p>
                <p className="text-amber-700 text-sm">Senior Travel Specialist</p>
              </div>
            </div>
            <button className="text-amber-900 font-semibold hover:text-amber-700 transition-colors text-sm">
              Message Consultant →
            </button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
