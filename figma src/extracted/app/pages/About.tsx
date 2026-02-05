import { GlassCard } from '../components/GlassCard';
import { Target, Compass, UserPlus } from 'lucide-react';

export function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in">
      <div className="text-center mb-16">
        <h1 className="text-5xl sm:text-6xl font-bold text-amber-900 mb-6">About AgeWatchAfrica</h1>
        <p className="text-xl text-amber-800 max-w-3xl mx-auto leading-relaxed">
          We believe that adventure has no age limit. Our mission is to empower seniors to discover the wonders of Africa with dignity, comfort, and joy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <GlassCard>
          <div className="flex flex-col items-center text-center h-full">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-6">
              <Target className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-amber-900 mb-4">Our Mission</h2>
            <p className="text-lg text-amber-800 leading-relaxed">
              To provide safe, accessible, and enriching travel experiences across Africa that honor the wisdom and needs of senior travelers while celebrating the continent's rich diversity.
            </p>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex flex-col items-center text-center h-full">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center mb-6">
              <Compass className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-amber-900 mb-4">Our Approach</h2>
            <p className="text-lg text-amber-800 leading-relaxed">
              We combine careful itinerary planning, accessibility accommodations, and cultural sensitivity to create journeys that are both comfortable and transformative. Every detail is considered.
            </p>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex flex-col items-center text-center h-full">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center mb-6">
              <UserPlus className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-amber-900 mb-4">Our Community</h2>
            <p className="text-lg text-amber-800 leading-relaxed">
              Join a growing network of adventurous seniors who have discovered that the best chapters of life can be written at any age. Share stories, make friends, and inspire others.
            </p>
          </div>
        </GlassCard>
      </div>

      <GlassCard className="mt-12" hover={false}>
        <div className="text-center py-8">
          <h2 className="text-4xl font-bold text-amber-900 mb-4">Why Choose AgeWatchAfrica?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 text-left">
            <div>
              <h3 className="text-xl font-semibold text-amber-900 mb-2">• Expert Guides</h3>
              <p className="text-base text-amber-800">Trained in senior care and cultural expertise</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-amber-900 mb-2">• Medical Support</h3>
              <p className="text-base text-amber-800">24/7 health coordination and assistance</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-amber-900 mb-2">• Comfortable Pace</h3>
              <p className="text-base text-amber-800">Flexible schedules with plenty of rest time</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-amber-900 mb-2">• Accessible Venues</h3>
              <p className="text-base text-amber-800">Hotels and sites chosen for mobility access</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-amber-900 mb-2">• Small Groups</h3>
              <p className="text-base text-amber-800">Intimate tours with personalized attention</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-amber-900 mb-2">• Cultural Immersion</h3>
              <p className="text-base text-amber-800">Authentic experiences with local communities</p>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
