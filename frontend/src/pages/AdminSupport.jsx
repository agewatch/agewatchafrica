import { useEffect, useState } from "react";
import GlassCard from "../components/GlassCard.jsx";
import {
  fetchAdminSupportMessages,
  updateSupportMessage
} from "../services/support.js";

const statusOptions = ["open", "closed"];

export default function AdminSupport() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState(null);
  const [filters, setFilters] = useState({ q: "", status: "" });
  const [draftFilters, setDraftFilters] = useState({ q: "", status: "" });

  const loadMessages = async (nextPage = page, activeFilters = filters) => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchAdminSupportMessages({
        page: nextPage,
        ...activeFilters
      });
      setMessages(data?.data || []);
      setMeta(data?.meta || null);
    } catch (err) {
      setError(err.message || "Unable to load support messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages(page, filters);
  }, [page, filters]);

  const handleFieldChange = (id, field, value) => {
    setMessages((prev) =>
      prev.map((message) =>
        message.id === id ? { ...message, [field]: value } : message
      )
    );
  };

  const handleSave = async (message) => {
    setSavingId(message.id);
    setError("");
    try {
      await updateSupportMessage(message.id, {
        status: message.status,
        admin_reply: message.admin_reply || null
      });
      await loadMessages();
    } catch (err) {
      setError(err.message || "Unable to update support message");
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wide">
          Admin
        </p>
        <h1 className="text-4xl font-bold text-slate-900">Support Inbox</h1>
        <p className="text-lg text-slate-600">
          Reply to traveler questions and close resolved tickets.
        </p>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      <GlassCard hover={false} className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-slate-900">Messages</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => loadMessages(page, filters)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50"
            >
              Refresh
            </button>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 lg:grid-cols-3 gap-3">
          <input
            value={draftFilters.q}
            onChange={(event) =>
              setDraftFilters((prev) => ({ ...prev, q: event.target.value }))
            }
            placeholder="Search by subject or user"
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
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setPage(1);
                setFilters({ ...draftFilters });
              }}
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700"
            >
              Apply
            </button>
            <button
              onClick={() => {
                const cleared = { q: "", status: "" };
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

        {loading ? (
          <p className="text-slate-600">Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="text-slate-600">No messages yet.</p>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className="rounded-2xl border border-slate-200 bg-white p-4 space-y-4"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      {message.subject}
                    </h3>
                    <p className="text-slate-600">
                      {message.user?.name} ({message.user?.email})
                    </p>
                    <p className="text-sm text-slate-500">
                      Ticket #{message.id} - {message.created_at}
                    </p>
                  </div>
                  <button
                    onClick={() => handleSave(message)}
                    disabled={savingId === message.id}
                    className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 disabled:opacity-60"
                  >
                    {savingId === message.id ? "Saving..." : "Save Changes"}
                  </button>
                </div>

                <p className="text-slate-700">{message.message}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-slate-700">
                      Status
                    </label>
                    <select
                      value={message.status}
                      onChange={(event) =>
                        handleFieldChange(
                          message.id,
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
                      Reply
                    </label>
                    <textarea
                      value={message.admin_reply || ""}
                      onChange={(event) =>
                        handleFieldChange(
                          message.id,
                          "admin_reply",
                          event.target.value
                        )
                      }
                      rows={3}
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
