import { useEffect, useState } from "react";
import GlassCard from "../components/GlassCard.jsx";
import { fetchUserBookings } from "../services/bookings.js";

export default function MyTrips() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadBookings = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchUserBookings();
      setBookings(data?.data || []);
    } catch (err) {
      setError(err.message || "Unable to load your trips");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wide">
          Trips
        </p>
        <h1 className="text-4xl font-bold text-slate-900">My Trips</h1>
        <p className="text-lg text-slate-600">
          Review your bookings and track payment status.
        </p>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      <GlassCard hover={false} className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-slate-900">Your Bookings</h2>
          <button
            onClick={loadBookings}
            className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <p className="text-slate-600">Loading your trips...</p>
        ) : bookings.length === 0 ? (
          <p className="text-slate-600">No trips booked yet.</p>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      {booking.trip?.title || "Trip"}
                    </h3>
                    <p className="text-slate-600">
                      {booking.trip?.destination_city},{" "}
                      {booking.trip?.destination_country}
                    </p>
                    <p className="text-sm text-slate-500">
                      Booking #{booking.id} - {booking.created_at}
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm font-semibold">
                      {booking.status}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold">
                      {booking.payment_status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <p className="text-xs font-semibold text-slate-500 uppercase">
                      Total
                    </p>
                    <p className="text-lg font-bold text-slate-900">
                      {booking.currency || "USD"} {booking.total_amount ?? 0}
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <p className="text-xs font-semibold text-slate-500 uppercase">
                      Paid
                    </p>
                    <p className="text-lg font-bold text-slate-900">
                      {booking.currency || "USD"} {booking.amount_paid ?? 0}
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <p className="text-xs font-semibold text-slate-500 uppercase">
                      Discount
                    </p>
                    <p className="text-lg font-bold text-slate-900">
                      {booking.discount_percent ?? 0}% (
                      {booking.currency || "USD"} {booking.discount_amount ?? 0})
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </GlassCard>
    </div>
  );
}
