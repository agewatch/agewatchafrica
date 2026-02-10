import { useEffect, useState } from "react";
import GlassCard from "../components/GlassCard.jsx";
import {
  createSupportMessage,
  fetchSupportMessages
} from "../services/support.js";

const emptyForm = { subject: "", message: "" };

export default function SupportMessages() {
  const [messages, setMessages] = useState([]);
  const [form, setForm] = useState({ ...emptyForm });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadMessages = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchSupportMessages();
      setMessages(data?.data || []);
    } catch (err) {
      setError(err.message || "Unable to load support messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
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
      await createSupportMessage(form);
      setForm({ ...emptyForm });
      await loadMessages();
    } catch (err) {
      setError(err.message || "Unable to send support message");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wide">
          Support
        </p>
        <h1 className="text-4xl font-bold text-slate-900">
          Messages & Help
        </h1>
        <p className="text-lg text-slate-600">
          Send a message to our support team and track responses.
        </p>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      <GlassCard hover={false} className="p-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          New Support Message
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-semibold text-slate-700">
              Subject
            </label>
            <input
              name="subject"
              value={form.subject}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">
              Message
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
            className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 disabled:opacity-60"
          >
            {saving ? "Sending..." : "Send Message"}
          </button>
        </form>
      </GlassCard>

      <GlassCard hover={false} className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-slate-900">
            Your Messages
          </h2>
          <button
            onClick={loadMessages}
            className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <p className="text-slate-600">Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="text-slate-600">No messages yet.</p>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {message.subject}
                    </h3>
                    <p className="text-sm text-slate-500">
                      Status: {message.status} - {message.created_at}
                    </p>
                  </div>
                </div>
                <p className="text-slate-700">{message.message}</p>
                {message.admin_reply && (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
                    <p className="text-sm font-semibold text-emerald-700">
                      Support reply
                    </p>
                    <p className="text-slate-700">{message.admin_reply}</p>
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
