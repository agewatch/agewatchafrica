import { GlassCard } from '../components/GlassCard';
import { Plane, Calendar, HeartPulse, BookOpen } from 'lucide-react';

export function Services() {
  const services = [
    {
      icon: Plane,
      title: 'Custom Trip Planning',
      description: 'Work one-on-one with our travel consultants to design a journey that matches your interests, mobility needs, and budget. From wildlife safaris to cultural tours, we craft the perfect itinerary.',
      features: ['Personalized itineraries', 'Accessibility planning', 'Budget optimization', 'Activity level matching']
    },
    {
      icon: Calendar,
      title: 'Group Tour Coordination',
      description: 'Join scheduled departures with fellow senior travelers for shared experiences. Our group tours balance social connection with personal space and flexible participation.',
      features: ['Small group sizes (8-12)', 'Singles welcome', 'Flexible activities', 'Shared interests']
    },
    {
      icon: HeartPulse,
      title: 'Companion & Care Services',
      description: 'Travel with confidence knowing that professional companions and care coordinators are available. We ensure medical needs are met and caregivers are supported throughout the journey.',
      features: ['Trained travel companions', 'Medical coordination', 'Caregiver support', 'Emergency assistance']
    },
    {
      icon: BookOpen,
      title: 'Heritage & Legacy Consulting',
      description: 'Explore your roots or create meaningful family experiences. Our heritage consultants help you connect with ancestral lands, document stories, and create multigenerational legacy trips.',
      features: ['Genealogy research', 'Cultural connections', 'Story documentation', 'Family trip planning']
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in">
      <div className="text-center mb-16">
        <h1 className="text-5xl sm:text-6xl font-bold text-amber-900 mb-6">Our Services</h1>
        <p className="text-xl text-amber-800 max-w-3xl mx-auto leading-relaxed">
          Comprehensive travel and consulting services designed to make your African adventure seamless, safe, and unforgettable.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <GlassCard key={index}>
            <div className="flex flex-col h-full">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-5">
                <service.icon className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-amber-900 mb-4">{service.title}</h2>
              <p className="text-lg text-amber-800 mb-6 leading-relaxed">{service.description}</p>
              
              <div className="mt-auto">
                <h3 className="text-xl font-semibold text-amber-900 mb-3">What's Included:</h3>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-base text-amber-800 flex items-start">
                      <span className="mr-2 text-amber-600">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="mt-12" hover={false}>
        <div className="text-center py-6">
          <h2 className="text-3xl font-bold text-amber-900 mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-amber-800 mb-6">
            Schedule a free consultation to discuss your travel dreams and learn how we can help bring them to life.
          </p>
          <a
            href="/consult"
            className="inline-block px-8 py-4 text-xl rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Book Your Consultation
          </a>
        </div>
      </GlassCard>
    </div>
  );
}
