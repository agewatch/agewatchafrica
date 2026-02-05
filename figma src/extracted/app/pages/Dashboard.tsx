import { GlassCard } from '../components/GlassCard';
import { Plane, FileText, HeadphonesIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in">
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-amber-900 mb-4">Welcome Back, Margaret!</h1>
        <p className="text-xl text-amber-800">Here's an overview of your travel plans and resources.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <GlassCard>
          <div className="flex flex-col h-full">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-5">
              <Plane className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-amber-900 mb-4">Upcoming Trips</h2>
            
            <div className="space-y-4 flex-1">
              <div className="p-4 rounded-xl bg-white/40 border border-white/60">
                <h3 className="text-xl font-semibold text-amber-900">South Africa Explorer</h3>
                <p className="text-base text-amber-800 mt-1">March 15 - March 28, 2026</p>
                <p className="text-sm text-amber-700 mt-2">Cape Town • Stellenbosch • Kruger</p>
              </div>
              
              <div className="p-4 rounded-xl bg-white/30 border border-white/50 opacity-75">
                <h3 className="text-xl font-semibold text-amber-900">Tanzania & Zanzibar</h3>
                <p className="text-base text-amber-800 mt-1">July 10 - July 24, 2026</p>
                <p className="text-sm text-amber-700 mt-2">Serengeti • Ngorongoro • Zanzibar</p>
              </div>
            </div>

            <button className="mt-6 w-full px-6 py-3 text-lg rounded-xl bg-white/40 border border-white/60 text-amber-900 font-semibold hover:bg-white/60 transition-all">
              View All Details
            </button>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex flex-col h-full">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center mb-5">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-amber-900 mb-4">Consultation Notes</h2>
            
            <div className="space-y-4 flex-1">
              <div className="p-4 rounded-xl bg-white/40 border border-white/60">
                <h3 className="text-lg font-semibold text-amber-900">Health & Mobility Plan</h3>
                <p className="text-sm text-amber-800 mt-2">Wheelchair-accessible accommodations confirmed. Dietary requirements noted for all meals.</p>
              </div>
              
              <div className="p-4 rounded-xl bg-white/40 border border-white/60">
                <h3 className="text-lg font-semibold text-amber-900">Travel Preferences</h3>
                <p className="text-sm text-amber-800 mt-2">Prefers morning activities, cultural experiences over strenuous hiking, vegetarian meals.</p>
              </div>

              <div className="p-4 rounded-xl bg-white/40 border border-white/60">
                <h3 className="text-lg font-semibold text-amber-900">Emergency Contacts</h3>
                <p className="text-sm text-amber-800 mt-2">Primary: John Smith (son)<br/>Phone: +1 (555) 234-5678</p>
              </div>
            </div>

            <button className="mt-6 w-full px-6 py-3 text-lg rounded-xl bg-white/40 border border-white/60 text-amber-900 font-semibold hover:bg-white/60 transition-all">
              Download PDF
            </button>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex flex-col h-full">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center mb-5">
              <HeadphonesIcon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-amber-900 mb-4">Support</h2>
            
            <div className="space-y-4 flex-1">
              <div className="p-4 rounded-xl bg-white/40 border border-white/60">
                <h3 className="text-lg font-semibold text-amber-900">Your Travel Consultant</h3>
                <p className="text-base text-amber-800 mt-2">Sarah Johnson</p>
                <p className="text-sm text-amber-700 mt-1">sarah@agewatchafrica.com</p>
                <p className="text-sm text-amber-700">+1 (555) 123-4567</p>
              </div>

              <div className="p-4 rounded-xl bg-white/40 border border-white/60">
                <h3 className="text-lg font-semibold text-amber-900">24/7 Emergency Line</h3>
                <p className="text-base text-amber-800 mt-2">+1 (555) 911-TRIP</p>
                <p className="text-sm text-amber-700 mt-1">Available worldwide</p>
              </div>

              <div className="p-4 rounded-xl bg-white/40 border border-white/60">
                <h3 className="text-lg font-semibold text-amber-900">Resources</h3>
                <ul className="text-sm text-amber-800 mt-2 space-y-1">
                  <li>• Travel insurance details</li>
                  <li>• Packing checklists</li>
                  <li>• Visa information</li>
                  <li>• Health recommendations</li>
                </ul>
              </div>
            </div>

            <button className="mt-6 w-full px-6 py-3 text-lg rounded-xl bg-white/40 border border-white/60 text-amber-900 font-semibold hover:bg-white/60 transition-all">
              Contact Support
            </button>
          </div>
        </GlassCard>
      </div>

      <GlassCard className="mt-8" hover={false}>
        <div className="text-center py-6">
          <h2 className="text-3xl font-bold text-amber-900 mb-4">Planning Your Next Adventure?</h2>
          <p className="text-lg text-amber-800 mb-6">
            Explore new destinations or schedule another consultation to add more experiences to your journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/destinations"
              className="px-8 py-3 text-lg rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Browse Destinations
            </Link>
            <Link
              to="/consult"
              className="px-8 py-3 text-lg rounded-xl bg-white/40 border-2 border-amber-500 text-amber-900 font-semibold hover:bg-white/60 transition-all duration-300"
            >
              Book Consultation
            </Link>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
