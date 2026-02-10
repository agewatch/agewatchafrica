import { useEffect, useState } from "react";
import GlassCard from "../components/GlassCard.jsx";
import {
  fetchAdminNotifications,
  markAdminNotificationRead,
  markAllAdminNotificationsRead
} from "../services/notifications.js";

export default function AdminNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [showUnread, setShowUnread] = useState(false);

  const loadNotifications = async (nextPage = page, unread = showUnread) => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchAdminNotifications({
        page: nextPage,
        status: unread ? "unread" : ""
      });
      setNotifications(data?.data || []);
      setMeta(data?.meta || null);
    } catch (err) {
      setError(err.message || "Unable to load notifications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications(page, showUnread);
  }, [page, showUnread]);

  const handleMarkRead = async (id) => {
    setError("");
    try {
      await markAdminNotificationRead(id);
      await loadNotifications(page, showUnread);
    } catch (err) {
      setError(err.message || "Unable to update notification");
    }
  };

  const handleMarkAll = async () => {
    setError("");
    try {
      await markAllAdminNotificationsRead();
      await loadNotifications(page, showUnread);
    } catch (err) {
      setError(err.message || "Unable to update notifications");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wide">
          Admin
        </p>
        <h1 className="text-4xl font-bold text-slate-900">Notifications</h1>
        <p className="text-lg text-slate-600">
          Stay on top of new bookings and system events.
        </p>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      <GlassCard hover={false} className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowUnread((prev) => !prev)}
              className={`px-4 py-2 rounded-xl border text-sm font-semibold ${
                showUnread
                  ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                  : "border-slate-200 text-slate-700"
              }`}
            >
              {showUnread ? "Showing Unread" : "Showing All"}
            </button>
            <button
              onClick={() => loadNotifications(page, showUnread)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50"
            >
              Refresh
            </button>
          </div>
          <button
            onClick={handleMarkAll}
            className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700"
          >
            Mark All Read
          </button>
        </div>

        {loading ? (
          <p className="text-slate-600">Loading notifications...</p>
        ) : notifications.length === 0 ? (
          <p className="text-slate-600">No notifications yet.</p>
        ) : (
          <div className="space-y-3">
            {notifications.map((item) => (
              <div
                key={item.id}
                className={`rounded-xl border p-4 ${
                  item.read_at
                    ? "border-slate-200 bg-white"
                    : "border-emerald-200 bg-emerald-50"
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <p className="text-sm text-slate-500">
                      {new Date(item.created_at).toLocaleString()}
                    </p>
                    <p className="text-lg font-semibold text-slate-900">
                      {item.data?.title
                        ? item.data.title
                        : item.data?.trip_title
                          ? `New booking for ${item.data.trip_title}`
                          : "New activity received"}
                    </p>
                    <p className="text-sm text-slate-600">
                      {item.data?.body
                        ? item.data.body
                        : item.data?.booking_id
                          ? `Booking #${item.data.booking_id} · User #${item.data?.user_id}`
                          : item.data?.meta?.user_id
                            ? `User #${item.data.meta.user_id}`
                            : "Check details for more information."}
                    </p>
                  </div>
                  {!item.read_at && (
                    <button
                      onClick={() => handleMarkRead(item.id)}
                      className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50"
                    >
                      Mark Read
                    </button>
                  )}
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
