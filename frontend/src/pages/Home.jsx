import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import GlassCard from "../components/GlassCard.jsx";
import { Heart, Users, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import ImageWithFallback from "../components/figma/ImageWithFallback.jsx";
import { fetchPublicTrips } from "../services/trips.js";

export default function Home() {
  const [upcomingTrips, setUpcomingTrips] = useState([]);
  const [tripsError, setTripsError] = useState("");
  const [tripsLoading, setTripsLoading] = useState(true);
  const carouselRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    const loadUpcomingTrips = async () => {
      setTripsLoading(true);
      setTripsError("");
      try {
        const data = await fetchPublicTrips({ scope: "upcoming", limit: 3 });
        if (!mounted) {
          return;
        }
        setUpcomingTrips(data?.data || []);
      } catch (err) {
        if (!mounted) {
          return;
        }
        setTripsError(err.message || "Unable to load upcoming trips");
      } finally {
        if (mounted) {
          setTripsLoading(false);
        }
      }
    };

    loadUpcomingTrips();
    return () => {
      mounted = false;
    };
  }, []);

  const getTripImages = (trip) => {
    const media = Array.isArray(trip.media)
      ? trip.media.map((item) => item.image_url).filter(Boolean)
      : [];
    const cover = trip.image_url ? [trip.image_url] : [];
    const merged = [...cover, ...media.filter((url) => !cover.includes(url))];
    return merged.length > 0 ? merged : [];
  };

  const formatTripDate = (value) => {
    if (!value) {
      return "";
    }
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return String(value).split(" ")[0];
    }
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  const scrollCarousel = (direction) => {
    if (!carouselRef.current) {
      return;
    }
    carouselRef.current.scrollBy({
      left: direction * carouselRef.current.clientWidth,
      behavior: "smooth"
    });
  };

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

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {tripsError && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-700 mb-6">
            {tripsError}
          </div>
        )}

        <div className="relative">
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 hidden lg:flex">
            <button
              type="button"
              onClick={() => scrollCarousel(-1)}
              className="h-10 w-10 rounded-full bg-white shadow-lg border border-amber-200 text-amber-800 flex items-center justify-center hover:bg-amber-50"
              aria-label="Scroll previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
          <div className="absolute -right-3 top-1/2 -translate-y-1/2 hidden lg:flex">
            <button
              type="button"
              onClick={() => scrollCarousel(1)}
              className="h-10 w-10 rounded-full bg-white shadow-lg border border-amber-200 text-amber-800 flex items-center justify-center hover:bg-amber-50"
              aria-label="Scroll next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {tripsLoading ? (
            <p className="text-amber-800">Loading upcoming trips...</p>
          ) : upcomingTrips.length === 0 ? (
            <p className="text-amber-800">No upcoming trips yet.</p>
          ) : (
            <div
              ref={carouselRef}
              className="flex gap-6 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory"
            >
              {upcomingTrips.map((trip) => {
                const images = getTripImages(trip);
                const cover = images[0];

                return (
                  <div
                    key={trip.id}
                    className="min-w-[280px] sm:min-w-[340px] lg:min-w-[360px] snap-start"
                  >
                    <GlassCard hover={false} className="p-0 overflow-hidden">
                      {cover && (
                        <div className="h-48 w-full overflow-hidden">
                          <img
                            src={cover}
                            alt={trip.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}
                      <div className="p-6 space-y-3">
                        <div>
                          <h3 className="text-xl font-bold text-amber-900">
                            {trip.title}
                          </h3>
                          <p className="text-amber-800">
                            {trip.destination_city}, {trip.destination_country}
                          </p>
                          <p className="text-sm text-amber-700">
                            {formatTripDate(trip.start_date)} to{" "}
                            {formatTripDate(trip.end_date)}
                          </p>
                        </div>
                        <p className="text-sm text-amber-800 line-clamp-3">
                          {trip.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-amber-700">Starting at</p>
                            <p className="text-lg font-bold text-amber-900">
                              USD {trip.price}
                            </p>
                          </div>
                          <Link
                            to="/trips"
                            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-semibold hover:from-amber-600 hover:to-orange-600"
                          >
                            Book Now
                          </Link>
                        </div>
                      </div>
                    </GlassCard>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
