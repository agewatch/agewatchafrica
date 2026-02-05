import { GlassCard } from '../components/GlassCard';
import { MapPin } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function Destinations() {
  const destinations = [
    {
      name: 'South Africa',
      tagline: 'Wine Country & Safari Magic',
      description: 'Experience Cape Town\'s stunning beauty, taste world-class wines in Stellenbosch, and witness the Big Five in Kruger National Park. Excellent infrastructure makes this ideal for first-time visitors.',
      highlights: ['Table Mountain', 'Winelands tours', 'Kruger safari', 'Garden Route'],
      image: 'https://images.unsplash.com/photo-1604763655221-b98ebdac6ddf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXBlJTIwdG93biUyMHRhYmxlJTIwbW91bnRhaW58ZW58MXx8fHwxNzcwMjM2NzM1fDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      name: 'Tanzania',
      tagline: 'Serengeti & Zanzibar Dreams',
      description: 'Witness the great wildebeest migration in the Serengeti, explore Ngorongoro Crater, then relax on Zanzibar\'s pristine beaches. Perfect blend of adventure and relaxation.',
      highlights: ['Serengeti migration', 'Ngorongoro Crater', 'Zanzibar beaches', 'Stone Town culture'],
      image: 'https://images.unsplash.com/photo-1586398001760-068b32569e00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXJlbmdldGklMjB3aWxkbGlmZSUyMHN1bnNldHxlbnwxfHx8fDE3NzAyMzY3MzR8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      name: 'Morocco',
      tagline: 'Imperial Cities & Sahara Wonders',
      description: 'Wander through the medinas of Marrakech and Fez, stay in luxurious riads, and experience the magic of the Sahara Desert. Rich history and sensory delights await.',
      highlights: ['Marrakech souks', 'Fez medina', 'Sahara desert camp', 'Atlas Mountains'],
      image: 'https://images.unsplash.com/photo-1699210260087-347545f89de6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NvJTIwbWFya2V0JTIwY29sb3JmdWx8ZW58MXx8fHwxNzcwMTk4NDgxfDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      name: 'Kenya',
      tagline: 'Wildlife & Coastal Heritage',
      description: 'Safari through the Maasai Mara, visit elephant orphanages, and explore the Swahili Coast. Kenya offers incredible wildlife encounters with warm hospitality.',
      highlights: ['Maasai Mara safari', 'Amboseli elephants', 'Lamu Island', 'Karen Blixen Museum'],
      image: 'https://images.unsplash.com/photo-1758881534787-f189d945748e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW5pb3IlMjBhZnJpY2FuJTIwc2FmYXJpJTIwZWxlcGhhbnRzfGVufDF8fHx8MTc3MDIzNjczM3ww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      name: 'Zimbabwe',
      tagline: 'Victoria Falls & Ancient Ruins',
      description: 'Stand in awe of Victoria Falls, explore the ancient city of Great Zimbabwe, and enjoy sunset cruises on the Zambezi River. A destination of natural and historical wonders.',
      highlights: ['Victoria Falls', 'Hwange National Park', 'Great Zimbabwe ruins', 'Zambezi cruises'],
      image: 'https://images.unsplash.com/photo-1759163150873-aa9e3b4f0698?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwbGFuZHNjYXBlJTIwdmljdG9yaWElMjBmYWxsc3xlbnwxfHx8fDE3NzAyMzY3MzN8MA&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in">
      <div className="text-center mb-16">
        <h1 className="text-5xl sm:text-6xl font-bold text-amber-900 mb-6">Destinations</h1>
        <p className="text-xl text-amber-800 max-w-3xl mx-auto leading-relaxed">
          Discover the diverse wonders of Africa. Each destination offers unique experiences tailored for senior travelers seeking comfort, culture, and adventure.
        </p>
      </div>

      <div className="space-y-8">
        {destinations.map((destination, index) => (
          <GlassCard key={index}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <ImageWithFallback
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-64 lg:h-full object-cover rounded-xl"
                />
              </div>
              
              <div className="lg:col-span-2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-6 h-6 text-amber-600" />
                    <h2 className="text-3xl font-bold text-amber-900">{destination.name}</h2>
                  </div>
                  <p className="text-xl text-amber-700 font-semibold mb-4">{destination.tagline}</p>
                  <p className="text-lg text-amber-800 leading-relaxed mb-6">{destination.description}</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-amber-900 mb-3">Key Highlights:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {destination.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center text-base text-amber-800">
                        <span className="mr-2 text-amber-600">✦</span>
                        {highlight}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="mt-12" hover={false}>
        <div className="text-center py-6">
          <h2 className="text-3xl font-bold text-amber-900 mb-4">Can't Decide?</h2>
          <p className="text-lg text-amber-800 mb-6">
            Let our travel consultants help you choose the perfect destination based on your interests, mobility, and travel goals.
          </p>
          <a
            href="/consult"
            className="inline-block px-8 py-4 text-xl rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Schedule a Consultation
          </a>
        </div>
      </GlassCard>
    </div>
  );
}
