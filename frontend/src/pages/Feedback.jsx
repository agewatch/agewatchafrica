import { useEffect, useState } from "react";
import GlassCard from "../components/GlassCard.jsx";
import { createFeedback, fetchFeedback } from "../services/feedback.js";

const emptyForm = { rating: 5, category: "general", message: "" };
const categories = ["general", "travel", "support", "app"];

export default function Feedback() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ ...emptyForm });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadFeedback = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchFeedback();
      setEntries(data?.data || []);
    } catch (err) {
      setError(err.message || "Unable to load feedback");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeedback();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      await createFeedback({
        rating: Number(form.rating),
        category: form.category,
        message: form.message
      });
      setForm({ ...emptyForm });
      await loadFeedback();
    } catch (err) {
      setError(err.message || "Unable to send feedback");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-amber-600 uppercase tracking-wide">
          Community
        </p>
        <h1 className="text-4xl font-bold text-slate-900">Share Feedback</h1>
        <p className="text-lg text-slate-600">
          Tell us what went well and what we can improve.
        </p>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      <GlassCard hover={false} className="p-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          New Feedback
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Rating
              </label>
              <select
                name="rating"
                value={form.rating}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2"
              >
                {[5, 4, 3, 2, 1].map((rating) => (
                  <option key={rating} value={rating}>
                    {rating} Stars
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Category
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">
              Feedback
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={4}
              required
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2"
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded-xl bg-amber-600 text-white font-semibold hover:bg-amber-700 disabled:opacity-60"
          >
            {saving ? "Sending..." : "Send Feedback"}
          </button>
        </form>
      </GlassCard>

      <GlassCard hover={false} className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-slate-900">
            Your Feedback
          </h2>
          <button
            onClick={loadFeedback}
            className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <p className="text-slate-600">Loading feedback...</p>
        ) : entries.length === 0 ? (
          <p className="text-slate-600">No feedback yet.</p>
        ) : (
          <div className="space-y-4">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="rounded-2xl border border-slate-200 bg-white p-4 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {entry.category} - {entry.rating} Stars
                    </h3>
                    <p className="text-sm text-slate-500">
                      Status: {entry.status} - {entry.created_at}
                    </p>
                  </div>
                </div>
                <p className="text-slate-700">{entry.message}</p>
                {entry.admin_notes && (
                  <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
                    <p className="text-sm font-semibold text-amber-700">
                      Admin notes
                    </p>
                    <p className="text-slate-700">{entry.admin_notes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </GlassCard>
    </div>
  );
}
