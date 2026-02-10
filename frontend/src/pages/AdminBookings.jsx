import { useEffect, useState } from "react";
import GlassCard from "../components/GlassCard.jsx";
import { fetchBookings, updateBooking } from "../services/bookings.js";

const statusOptions = ["pending", "approved", "cancelled"];
const paymentOptions = ["unpaid", "paid", "refunded"];

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savingId, setSavingId] = useState(null);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState(null);
  const [filters, setFilters] = useState({
    q: "",
    status: "",
    payment_status: "",
    discounted: ""
  });
  const [draftFilters, setDraftFilters] = useState({
    q: "",
    status: "",
    payment_status: "",
    discounted: ""
  });

  const loadBookings = async (nextPage = page, activeFilters = filters) => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchBookings({
        page: nextPage,
        ...activeFilters
      });
      setBookings(data?.data || []);
      setMeta(data?.meta || null);
    } catch (err) {
      setError(err.message || "Unable to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings(page, filters);
  }, [page, filters]);

  const handleUpdate = async (booking) => {
    setSavingId(booking.id);
    setError("");
    try {
      await updateBooking(booking.id, {
        status: booking.status,
        payment_status: booking.payment_status,
        payment_method: booking.payment_method || null,
        amount_paid: Number(booking.amount_paid || 0),
        currency: booking.currency || "USD",
        notes: booking.notes || null,
        booked_at: booking.booked_at || null,
        payment_provider: booking.payment_provider || null,
        payment_reference: booking.payment_reference || null,
        paid_at: booking.paid_at || null
      });
      await loadBookings();
    } catch (err) {
      setError(err.message || "Unable to update booking");
    } finally {
      setSavingId(null);
    }
  };

  const handleFieldChange = (id, field, value) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === id ? { ...booking, [field]: value } : booking
      )
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
          Admin
        </p>
        <h1 className="text-4xl font-bold text-slate-900">Bookings</h1>
        <p className="text-lg text-slate-600">
          Review bookings, approve or cancel trips, and update payment status.
        </p>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      <GlassCard hover={false} className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-slate-900">All Bookings</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => loadBookings(page, filters)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50"
            >
              Refresh
            </button>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 lg:grid-cols-4 gap-3">
          <input
            value={draftFilters.q}
            onChange={(event) =>
              setDraftFilters((prev) => ({ ...prev, q: event.target.value }))
            }
            placeholder="Search by user or trip"
            className="rounded-xl border border-slate-200 px-3 py-2"
          />
          <select
            value={draftFilters.status}
            onChange={(event) =>
              setDraftFilters((prev) => ({ ...prev, status: event.target.value }))
            }
            className="rounded-xl border border-slate-200 px-3 py-2"
          >
            <option value="">All statuses</option>
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <select
            value={draftFilters.payment_status}
            onChange={(event) =>
              setDraftFilters((prev) => ({
                ...prev,
                payment_status: event.target.value
              }))
            }
            className="rounded-xl border border-slate-200 px-3 py-2"
          >
            <option value="">All payment statuses</option>
            {paymentOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setPage(1);
                setFilters({ ...draftFilters });
              }}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
            >
              Apply
            </button>
            <button
              onClick={() => {
                const cleared = {
                  q: "",
                  status: "",
                  payment_status: "",
                  discounted: ""
                };
                setDraftFilters(cleared);
                setFilters(cleared);
                setPage(1);
              }}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50"
            >
              Clear
            </button>
          </div>
        </div>
        <div className="mb-6 flex items-center gap-3">
          <input
            id="discounted-only"
            type="checkbox"
            checked={draftFilters.discounted === "true"}
            onChange={(event) =>
              setDraftFilters((prev) => ({
                ...prev,
                discounted: event.target.checked ? "true" : ""
              }))
            }
            className="h-4 w-4 rounded border-slate-300"
          />
          <label
            htmlFor="discounted-only"
            className="text-sm font-semibold text-slate-700"
          >
            Discounted bookings only
          </label>
        </div>

        {loading ? (
          <p className="text-slate-600">Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <p className="text-slate-600">No bookings yet.</p>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="rounded-2xl border border-slate-200 bg-white p-4 space-y-4"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      {booking.trip?.title || "Trip"}
                    </h3>
                    <p className="text-slate-600">
                      {booking.user?.name} ({booking.user?.email})
                    </p>
                    <p className="text-sm text-slate-500">
                      Booking #{booking.id} - {booking.created_at}
                    </p>
                  </div>
                  <button
                    onClick={() => handleUpdate(booking)}
                    disabled={savingId === booking.id}
                    className="px-5 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-60"
                  >
                    {savingId === booking.id ? "Saving..." : "Save Changes"}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                      <p className="text-xs font-semibold text-slate-500 uppercase">
                        Base Price
                      </p>
                      <p className="text-lg font-bold text-slate-900">
                        {booking.currency || "USD"} {booking.base_price ?? 0}
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
                    <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                      <p className="text-xs font-semibold text-slate-500 uppercase">
                        Total Amount
                      </p>
                      <p className="text-lg font-bold text-slate-900">
                        {booking.currency || "USD"} {booking.total_amount ?? 0}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-700">
                      Status
                    </label>
                    <select
                      value={booking.status}
                      onChange={(event) =>
                        handleFieldChange(
                          booking.id,
                          "status",
                          event.target.value
                        )
                      }
                      className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2"
                    >
                      {statusOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-700">
                      Payment Status
                    </label>
                    <select
                      value={booking.payment_status}
                      onChange={(event) =>
                        handleFieldChange(
                          booking.id,
                          "payment_status",
                          event.target.value
                        )
                      }
                      className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2"
                    >
                      {paymentOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-700">
                      Amount Paid
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={booking.amount_paid || 0}
                      onChange={(event) =>
                        handleFieldChange(
                          booking.id,
                          "amount_paid",
                          event.target.value
                        )
                      }
                      className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-700">
                      Payment Method
                    </label>
                    <input
                      value={booking.payment_method || ""}
                      onChange={(event) =>
                        handleFieldChange(
                          booking.id,
                          "payment_method",
                          event.target.value
                        )
                      }
                      placeholder="e.g. card, bank transfer"
                      className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-700">
                      Payment Provider
                    </label>
                    <input
                      value={booking.payment_provider || ""}
                      onChange={(event) =>
                        handleFieldChange(
                          booking.id,
                          "payment_provider",
                          event.target.value
                        )
                      }
                      placeholder="e.g. Stripe, Paystack"
                      className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-700">
                      Payment Reference
                    </label>
                    <input
                      value={booking.payment_reference || ""}
                      onChange={(event) =>
                        handleFieldChange(
                          booking.id,
                          "payment_reference",
                          event.target.value
                        )
                      }
                      placeholder="Transaction ID"
                      className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-700">
                      Currency
                    </label>
                    <input
                      value={booking.currency || "USD"}
                      onChange={(event) =>
                        handleFieldChange(
                          booking.id,
                          "currency",
                          event.target.value
                        )
                      }
                      className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-700">
                      Paid At
                    </label>
                    <input
                      type="datetime-local"
                      value={booking.paid_at || ""}
                      onChange={(event) =>
                        handleFieldChange(
                          booking.id,
                          "paid_at",
                          event.target.value
                        )
                      }
                      className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-700">
                      Notes
                    </label>
                    <input
                      value={booking.notes || ""}
                      onChange={(event) =>
                        handleFieldChange(
                          booking.id,
                          "notes",
                          event.target.value
                        )
                      }
                      className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2"
                    />
                  </div>
                </div>
              </div>
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
    </div>
  );
}
