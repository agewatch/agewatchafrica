import GlassCard from "../components/GlassCard.jsx";
import { Plane, Calendar, HeartPulse, BookOpen } from "lucide-react";

const services = [
  {
    icon: Plane,
    title: "Customized Travel Planning",
    description:
      "Personalized itineraries designed around your pace, interests, and comfort preferences."
  },
  {
    icon: Calendar,
    title: "Senior-Friendly Scheduling",
    description:
      "Thoughtful timing with rest periods, accessible transport, and medical considerations."
  },
  {
    icon: HeartPulse,
    title: "Health & Wellness Support",
    description:
      "Coordination with healthcare providers, medication management, and emergency planning."
  },
  {
    icon: BookOpen,
    title: "Cultural Immersion",
    description:
      "Authentic experiences with local communities, historical sites, and traditional cuisine."
  }
];

export default function Services() {
  return (
    <div className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-amber-900 mb-6">
          Our Services
        </h1>
        <p className="text-xl text-amber-800 max-w-3xl mx-auto leading-relaxed">
          Comprehensive travel services tailored specifically for senior
          travelers, ensuring every journey is safe, comfortable, and
          memorable.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <GlassCard key={index}>
              <div className="flex items-start space-x-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-amber-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-lg text-amber-800 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>

      <GlassCard className="mt-12" hover={false}>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-amber-900 mb-4">
            Ready to Start Planning?
          </h2>
          <p className="text-lg text-amber-800 mb-6 max-w-2xl mx-auto">
            Let our experienced team create a custom travel plan that matches
            your interests, health considerations, and desired level of
            adventure.
          </p>
          <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5">
            Schedule a Consultation
          </button>
        </div>
      </GlassCard>
    </div>
  );
}
