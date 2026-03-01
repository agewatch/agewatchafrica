import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GlassCard from "../components/GlassCard.jsx";
import { 
  Leaf, 
  Camera, 
  Palette, 
  Sun, 
  Coffee, 
  Sunset,
  Moon,
  Users, 
  MapPin, 
  Luggage, 
  Clock,
  ChevronRight,
  MessageCircle,
  Instagram,
  Facebook
} from "lucide-react";
import ImageWithFallback from "../components/figma/ImageWithFallback.jsx";
import { fetchPublicPhotos } from "../services/photos.js";

// Experience categories data
const experiences = [
  {
    icon: Leaf,
    title: "Wellness & Nature",
    description: "Rejuvenating retreats surrounded by Africa's stunning natural beauty.",
    image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx6YW56aWJhciUyMGJlYWNoJTIwdHJvcGljYWx8ZW58MXx8fHwxNzcwMjM2NzM0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    color: "from-emerald-400 to-teal-500",
    category: "wellness"
  },
  {
    icon: Camera,
    title: "Gentle Safari Experiences",
    description: "Comfortable wildlife viewing with expert guides and accessible vehicles.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXJlbmdldGklMjBzYWZhcmklMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzcwMjM2NzM0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    color: "from-amber-400 to-orange-500",
    category: "safari"
  },
  {
    icon: Palette,
    title: "Cultural & Learning Visits",
    description: "Meaningful connections with local communities and rich heritage sites.",
    image: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NvJTIwbWVkaW5hfGVufDF8fHx8MTc3MDIzNjczNHww&ixlib=rb-4.1.0&q=80&w=1080",
    color: "from-rose-400 to-pink-500",
    category: "cultural"
  }
];

// Day schedule items
const daySchedule = [
  { icon: Coffee, time: "Morning", activity: "Relaxed breakfast at your lodge" },
  { icon: Sun, time: "Late Morning", activity: "Wildlife viewing or cultural visit" },
  { icon: Sunset, time: "Midday", activity: "Rest and comfort break" },
  { icon: Moon, time: "Evening", activity: "Optional evening activity" }
];

// Safety & care points
const safetyPoints = [
  { icon: Users, text: "Small group sizes" },
  { icon: MapPin, text: "Local support team" },
  { icon: Luggage, text: "Assistance with luggage upon arrival" },
  { icon: Clock, text: "Flexible pacing" }
];

export default function Home() {
  const [galleryPhotos, setGalleryPhotos] = useState([]);
  const [galleryLoading, setGalleryLoading] = useState(true);

  useEffect(() => {
    const loadGallery = async () => {
      try {
        const data = await fetchPublicPhotos(1);
        setGalleryPhotos((data?.data || []).slice(0, 6));
      } catch (err) {
        console.error("Failed to load gallery:", err);
      } finally {
        setGalleryLoading(false);
      }
    };
    loadGallery();
  }, []);

  // Placeholder images if no gallery photos
  const placeholderImages = [
    "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400",
    "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=400",
    "https://images.unsplash.com/photo-1544948503-7ad532e71046?w=400",
    "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=400",
    "https://images.unsplash.com/photo-1582711012124-a56cf82307a2?w=400",
    "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=400"
  ];

  const displayImages = galleryPhotos.length > 0 
    ? galleryPhotos.map(p => p.image_url) 
    : placeholderImages;

  return (
    <div className="animate-fade-in">
      {/* ========== HERO SECTION ========== */}
      <section className="relative min-h-[650px] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
        {/* Background Image */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1516426122078-c23e76319801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXJlbmdldGklMjBzYWZhcmklMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzcwMjM2NzM0fDA&ixlib=rb-4.1.0&q=80&w=1920"
            alt="African Safari"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-amber-50/80 via-amber-50/60 to-amber-50/90" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-amber-900 mb-6 leading-tight">
            Travel Experiences Designed for Seniors
          </h1>
          <p className="text-xl sm:text-2xl text-amber-800 mb-10 max-w-3xl mx-auto leading-relaxed">
            Gentle, meaningful journeys across Kenya with care, comfort, and flexibility.
          </p>

          <Link
            to="/destinations"
            className="inline-flex items-center gap-2 px-8 py-4 text-xl rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Explore Experiences
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* ========== EXPERIENCE CATEGORIES ========== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-amber-900 mb-4">
            Choose Your Experience
          </h2>
          <p className="text-lg text-amber-800 max-w-2xl mx-auto">
            Every journey is crafted with your comfort and interests in mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {experiences.map((exp, index) => {
            const Icon = exp.icon;
            return (
              <Link 
                key={index} 
                to={`/destinations?category=${exp.category}`}
                className="group block"
              >
                <GlassCard className="h-full overflow-hidden p-0">
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={exp.image}
                      alt={exp.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className={`absolute top-4 left-4 w-12 h-12 rounded-xl bg-gradient-to-br ${exp.color} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-amber-900 mb-2 group-hover:text-amber-700 transition-colors">
                      {exp.title}
                    </h3>
                    <p className="text-amber-800 leading-relaxed">
                      {exp.description}
                    </p>
                    <span className="inline-flex items-center gap-1 mt-4 text-amber-600 font-medium group-hover:text-amber-500">
                      Learn more <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </GlassCard>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ========== WHAT A DAY FEELS LIKE ========== */}
      <section className="bg-gradient-to-r from-amber-100/50 to-orange-100/50 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-amber-900 mb-4">
              What a Typical Day Might Feel Like
            </h2>
            <p className="text-lg text-amber-800 max-w-2xl mx-auto">
              We keep our days structured but flexible, so you can enjoy the experience without feeling rushed.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {daySchedule.map((item, index) => {
              const Icon = item.icon;
              return (
                <GlassCard key={index} className="text-center">
                  <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <p className="text-sm font-semibold text-amber-600 uppercase tracking-wide mb-1">
                    {item.time}
                  </p>
                  <p className="text-amber-900 font-medium">
                    {item.activity}
                  </p>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== SAFETY & CARE PROMISE ========== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <GlassCard hover={false} className="p-8 md:p-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-amber-900 mb-4">
              Your Safety & Comfort Matter
            </h2>
            <p className="text-lg text-amber-800 max-w-2xl mx-auto">
              We understand that safety and comfort are essential. Our experiences are designed with:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {safetyPoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-amber-50/50">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-amber-900 font-medium">{point.text}</p>
                </div>
              );
            })}
          </div>
        </GlassCard>
      </section>

      {/* ========== VISUAL GALLERY ========== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-amber-900 mb-4">
            Glimpses of Africa
          </h2>
          <p className="text-lg text-amber-800">
            Real moments from our travel experiences.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {displayImages.slice(0, 6).map((img, index) => (
            <div 
              key={index} 
              className="aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <ImageWithFallback
                src={img}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/community-gallery"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/60 border-2 border-amber-400 text-amber-900 font-semibold hover:bg-white/80 transition-all duration-300"
          >
            View Full Gallery
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* ========== TESTIMONIALS PLACEHOLDER ========== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-amber-900 mb-4">
            Traveler Stories
          </h2>
        </div>

        <GlassCard hover={false} className="text-center p-12">
          <p className="text-xl text-amber-800 italic mb-6">
            "Our first senior guests are arriving soon. We look forward to sharing their stories here."
          </p>
          <p className="text-amber-600 font-medium">
            — The AgeWatchAfrica Team
          </p>
        </GlassCard>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mt-8">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-all shadow-md hover:shadow-lg"
          >
            <Instagram className="w-5 h-5" />
            Instagram
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
          >
            <Facebook className="w-5 h-5" />
            Facebook
          </a>
        </div>
      </section>

      {/* ========== FINAL CONTACT CTA ========== */}
      <section className="bg-gradient-to-r from-amber-500 to-orange-500 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Have Questions? Let's Talk.
          </h2>
          <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
            We're here to help you plan your perfect African adventure.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/254700000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              <MessageCircle className="w-6 h-6" />
              Chat on WhatsApp
            </a>
            <Link
              to="/consult"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg rounded-xl bg-white text-amber-900 font-semibold hover:bg-amber-50 transition-all shadow-lg hover:shadow-xl"
            >
              Contact Form
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
