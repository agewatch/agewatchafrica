import GlassCard from "../components/GlassCard.jsx";
import { MapPin } from "lucide-react";
import ImageWithFallback from "../components/figma/ImageWithFallback.jsx";

const destinations = [
  {
    name: "Serengeti Safari",
    location: "Tanzania",
    image:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXJlbmdldGklMjBzYWZhcmklMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzcwMjM2NzM0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description:
      "Experience the world's most famous wildlife reserve with comfortable lodges and expert guides."
  },
  {
    name: "Cape Town Heritage",
    location: "South Africa",
    image:
      "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXBlJTIwdG93biUyMHZpZXd8ZW58MXx8fHwxNzcwMjM2NzM0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description:
      "Discover rich history, stunning landscapes, and vibrant culture in South Africa's mother city."
  },
  {
    name: "Nile River Cruise",
    location: "Egypt",
    image:
      "https://images.unsplash.com/photo-1544948503-7ad532e71046?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWxlJTIwcml2ZXIlMjBjcnVpc2V8ZW58MXx8fHwxNzcwMjM2NzM0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description:
      "Sail through ancient history with luxury accommodations and guided tours of historic sites."
  },
  {
    name: "Morocco Wellness Retreat",
    location: "Morocco",
    image:
      "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NvJTIwbWVkaW5hfGVufDF8fHx8MTc3MDIzNjczNHww&ixlib=rb-4.1.0&q=80&w=1080",
    description:
      "Rejuvenate in peaceful riads with spa treatments and gentle cultural experiences."
  },
  {
    name: "Ghana Heritage Trail",
    location: "Ghana",
    image:
      "https://images.unsplash.com/photo-1582711012124-a56cf82307a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaGFuYSUyMGNhc3RsZXxlbnwwfHx8fDE3NzAyMzY3MzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description:
      "Connect with history and heritage through meaningful visits and local community engagement."
  },
  {
    name: "Zanzibar Island Escape",
    location: "Tanzania",
    image:
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx6YW56aWJhciUyMGJlYWNoJTIwdHJvcGljYWx8ZW58MXx8fHwxNzcwMjM2NzM0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description:
      "Relax on pristine beaches with gentle activities and luxury resort accommodations."
  }
];

export default function Destinations() {
  return (
    <div className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-amber-900 mb-6">
          Destinations
        </h1>
        <p className="text-xl text-amber-800 max-w-3xl mx-auto leading-relaxed">
          Explore our carefully selected destinations across Africa, each
          chosen for their cultural richness, accessibility, and senior-friendly
          accommodations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {destinations.map((destination, index) => (
          <GlassCard key={index}>
            <div className="space-y-4">
              <div className="aspect-video rounded-xl overflow-hidden">
                <ImageWithFallback
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-amber-900 mb-2">
                  {destination.name}
                </h3>
                <div className="flex items-center text-amber-700 mb-3">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{destination.location}</span>
                </div>
                <p className="text-amber-800 leading-relaxed">
                  {destination.description}
                </p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="mt-12" hover={false}>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-amber-900 mb-4">
            Custom Destinations Available
          </h2>
          <p className="text-lg text-amber-800 mb-6 max-w-2xl mx-auto">
            Don't see your dream destination? We create custom itineraries for
            any African location with the same care and attention to senior
            travelers.
          </p>
          <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5">
            Request Custom Trip
          </button>
        </div>
      </GlassCard>
    </div>
  );
}
