import { useEffect, useState } from "react";
import GlassCard from "../components/GlassCard.jsx";
import { fetchAvailableTrips } from "../services/trips.js";
import { createBooking } from "../services/bookings.js";

export default function Trips() {
  const [trips, setTrips] = useState([]);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bookingTripId, setBookingTripId] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    apply_senior_discount: false,
    payment_method: "",
    notes: ""
  });
  const [activeSlides, setActiveSlides] = useState({});
  const [search, setSearch] = useState("");
  const [draftSearch, setDraftSearch] = useState("");
  const [gallery, setGallery] = useState({
    open: false,
    images: [],
    index: 0,
    title: ""
  });

  const loadTrips = async (nextPage = page, query = search) => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchAvailableTrips({
        page: nextPage,
        q: query
      });
      setTrips(data?.data || []);
      setMeta(data?.meta || null);
    } catch (err) {
      setError(err.message || "Unable to load trips");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTrips(page, search);
  }, [page, search]);

  const startBooking = (tripId) => {
    setBookingTripId(tripId);
    setBookingForm({
      apply_senior_discount: false,
      payment_method: "",
      notes: ""
    });
  };

  const submitBooking = async (tripId) => {
    setError("");
    try {
      await createBooking({
        trip_id: tripId,
        apply_senior_discount: bookingForm.apply_senior_discount,
        payment_method: bookingForm.payment_method || null,
        notes: bookingForm.notes || null
      });
      setBookingTripId(null);
      await loadTrips(page, search);
    } catch (err) {
      setError(err.message || "Unable to book trip");
    }
  };

  const getTripImages = (trip) => {
    const media = Array.isArray(trip.media)
      ? trip.media.map((item) => item.image_url).filter(Boolean)
      : [];
    const cover = trip.image_url ? [trip.image_url] : [];
    const merged = [...cover, ...media.filter((url) => !cover.includes(url))];
    return merged.length > 0 ? merged : [];
  };

  const setSlideIndex = (tripId, nextIndex) => {
    setActiveSlides((prev) => ({ ...prev, [tripId]: nextIndex }));
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

  const openGallery = (trip, images, index = 0) => {
    if (!images || images.length === 0) {
      return;
    }
    setGallery({
      open: true,
      images,
      index,
      title: trip?.title || "Trip gallery"
    });
  };

  const closeGallery = () => {
    setGallery((prev) => ({ ...prev, open: false }));
  };

  const shiftGallery = (direction) => {
    setGallery((prev) => {
      if (!prev.images.length) {
        return prev;
      }
      const nextIndex =
        (prev.index + direction + prev.images.length) % prev.images.length;
      return { ...prev, index: nextIndex };
    });
  };

  useEffect(() => {
    if (!gallery.open) {
      return undefined;
    }

    const handleKey = (event) => {
      if (event.key === "Escape") {
        closeGallery();
      } else if (event.key === "ArrowLeft") {
        shiftGallery(-1);
      } else if (event.key === "ArrowRight") {
        shiftGallery(1);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [gallery.open]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wide">
          Trips
        </p>
        <h1 className="text-4xl font-bold text-slate-900">Book Your Next Trip</h1>
        <p className="text-lg text-slate-600">
          Explore upcoming adventures and reserve your seat.
        </p>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      <GlassCard hover={false} className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Available Trips</h2>
          <div className="flex flex-wrap gap-2">
            <input
              value={draftSearch}
              onChange={(event) => setDraftSearch(event.target.value)}
              placeholder="Search by title or destination"
              className="rounded-xl border border-slate-200 px-3 py-2"
            />
            <button
              onClick={() => {
                setPage(1);
                setSearch(draftSearch);
              }}
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700"
            >
              Search
            </button>
            <button
              onClick={() => {
                setDraftSearch("");
                setSearch("");
                setPage(1);
              }}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50"
            >
              Clear
            </button>
          </div>
        </div>

        {loading ? (
          <p className="text-slate-600">Loading trips...</p>
        ) : trips.length === 0 ? (
          <p className="text-slate-600">No trips available yet.</p>
        ) : (
          <div className="space-y-4">
            {trips.map((trip) => (
              (() => {
                const images = getTripImages(trip);
                const activeIndex = activeSlides[trip.id] || 0;
                const activeImage = images[activeIndex] || "";

                return (
              <div
                key={trip.id}
                className="rounded-2xl border border-slate-200 bg-white p-4 space-y-4"
              >
                {activeImage && (
                  <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                    <img
                      src={activeImage}
                      alt={trip.title}
                      className="h-56 w-full object-cover cursor-zoom-in"
                      onClick={() => openGallery(trip, images, activeIndex)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          openGallery(trip, images, activeIndex);
                        }
                      }}
                    />
                    {images.length > 1 && (
                      <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            setSlideIndex(
                              trip.id,
                              (activeIndex - 1 + images.length) %
                                images.length
                            )
                          }
                          className="px-3 py-1 rounded-full bg-white/80 text-slate-700 text-sm font-semibold"
                        >
                          Prev
                        </button>
                        <span className="text-xs text-white font-semibold drop-shadow">
                          {activeIndex + 1}/{images.length}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setSlideIndex(trip.id, (activeIndex + 1) % images.length)
                          }
                          className="px-3 py-1 rounded-full bg-white/80 text-slate-700 text-sm font-semibold"
                        >
                          Next
                        </button>
                      </div>
                    )}
                  </div>
                )}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      {trip.title}
                    </h3>
                    <p className="text-slate-600">
                      {trip.destination_city}, {trip.destination_country}
                    </p>
                    <p className="text-sm text-slate-500">
                      {formatTripDate(trip.start_date)} to{" "}
                      {formatTripDate(trip.end_date)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-500">Starting at</p>
                    <p className="text-2xl font-bold text-emerald-700">
                      USD {trip.price}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <p className="text-slate-700 line-clamp-2">
                    {trip.description}
                  </p>
                  <button
                    onClick={() => startBooking(trip.id)}
                    className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700"
                  >
                    Book Trip
                  </button>
                </div>

                {bookingTripId === trip.id && (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <input
                        id={`discount-${trip.id}`}
                        type="checkbox"
                        checked={bookingForm.apply_senior_discount}
                        onChange={(event) =>
                          setBookingForm((prev) => ({
                            ...prev,
                            apply_senior_discount: event.target.checked
                          }))
                        }
                        className="h-4 w-4 rounded border-slate-300"
                      />
                      <label
                        htmlFor={`discount-${trip.id}`}
                        className="text-sm font-semibold text-slate-700"
                      >
                        Apply senior discount
                      </label>
                    </div>
                    <input
                      value={bookingForm.payment_method}
                      onChange={(event) =>
                        setBookingForm((prev) => ({
                          ...prev,
                          payment_method: event.target.value
                        }))
                      }
                      placeholder="Preferred payment method (optional)"
                      className="w-full rounded-xl border border-slate-200 px-3 py-2"
                    />
                    <textarea
                      value={bookingForm.notes}
                      onChange={(event) =>
                        setBookingForm((prev) => ({
                          ...prev,
                          notes: event.target.value
                        }))
                      }
                      placeholder="Notes for the team (optional)"
                      rows={2}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2"
                    />
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => submitBooking(trip.id)}
                        className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700"
                      >
                        Confirm Booking
                      </button>
                      <button
                        onClick={() => setBookingTripId(null)}
                        className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
                );
              })()
            ))}
          </div>
        )}

        {meta && meta.last_page > 1 && (
          <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <p className="text-sm text-slate-600">
              Showing {meta.from || 0}-{meta.to || 0} of {meta.total || 0}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={meta.current_page <= 1}
                className="px-3 py-2 rounded-xl border border-slate-200 text-slate-700 font-semibold disabled:opacity-50"
              >
                Prev
              </button>
              <span className="px-3 py-2 text-sm text-slate-600">
                Page {meta.current_page} of {meta.last_page}
              </span>
              <button
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, meta.last_page))
                }
                disabled={meta.current_page >= meta.last_page}
                className="px-3 py-2 rounded-xl border border-slate-200 text-slate-700 font-semibold disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </GlassCard>

      {gallery.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 px-4 py-6">
          <div className="absolute inset-0" onClick={closeGallery} />
          <div className="relative z-10 w-full max-w-5xl rounded-3xl bg-white shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <div>
                <p className="text-xs uppercase tracking-wide text-emerald-600 font-semibold">
                  Trip Gallery
                </p>
                <h3 className="text-lg font-bold text-slate-900">
                  {gallery.title}
                </h3>
              </div>
              <button
                onClick={closeGallery}
                className="h-10 w-10 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-100"
                aria-label="Close gallery"
              >
                ×
              </button>
            </div>

            <div className="relative bg-slate-900">
              <img
                src={gallery.images[gallery.index]}
                alt={`Gallery ${gallery.index + 1}`}
                className="h-[320px] sm:h-[420px] w-full object-contain bg-slate-900"
              />
              {gallery.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => shiftGallery(-1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-slate-700 font-semibold"
                  >
                    Prev
                  </button>
                  <button
                    type="button"
                    onClick={() => shiftGallery(1)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-slate-700 font-semibold"
                  >
                    Next
                  </button>
                </>
              )}
            </div>

            {gallery.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto px-6 py-4 bg-slate-50">
                {gallery.images.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() =>
                      setGallery((prev) => ({ ...prev, index }))
                    }
                    className={`h-16 w-24 shrink-0 overflow-hidden rounded-xl border ${
                      index === gallery.index
                        ? "border-emerald-500 ring-2 ring-emerald-300"
                        : "border-slate-200"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
