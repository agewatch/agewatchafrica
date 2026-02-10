import { useEffect, useState } from "react";
import GlassCard from "../components/GlassCard.jsx";
import { fetchUsers, updateUser } from "../services/users.js";

const roleOptions = ["user", "admin"];

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savingId, setSavingId] = useState(null);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState(null);
  const [filters, setFilters] = useState({
    q: "",
    role: "",
    verified: ""
  });
  const [draftFilters, setDraftFilters] = useState({
    q: "",
    role: "",
    verified: ""
  });

  const loadUsers = async (nextPage = page, activeFilters = filters) => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchUsers({
        page: nextPage,
        ...activeFilters
      });
      const items = data?.data || [];
      setUsers(
        items.map((user) => ({
          ...user,
          verified: Boolean(user.email_verified_at)
        }))
      );
      setMeta(data?.meta || null);
    } catch (err) {
      setError(err.message || "Unable to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers(page, filters);
  }, [page, filters]);

  const handleFieldChange = (id, field, value) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, [field]: value } : user))
    );
  };

  const handleSave = async (user) => {
    setSavingId(user.id);
    setError("");
    try {
      await updateUser(user.id, {
        role: user.role || "user",
        verified: Boolean(user.verified)
      });
      await loadUsers();
    } catch (err) {
      setError(err.message || "Unable to update user");
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-purple-600 uppercase tracking-wide">
          Admin
        </p>
        <h1 className="text-4xl font-bold text-slate-900">Users Management</h1>
        <p className="text-lg text-slate-600">
          Review users, verify accounts, and promote administrators.
        </p>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      <GlassCard hover={false} className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-slate-900">All Users</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => loadUsers(page, filters)}
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
            placeholder="Search by name or email"
            className="rounded-xl border border-slate-200 px-3 py-2"
          />
          <select
            value={draftFilters.role}
            onChange={(event) =>
              setDraftFilters((prev) => ({ ...prev, role: event.target.value }))
            }
            className="rounded-xl border border-slate-200 px-3 py-2"
          >
            <option value="">All roles</option>
            {roleOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <select
            value={draftFilters.verified}
            onChange={(event) =>
              setDraftFilters((prev) => ({
                ...prev,
                verified: event.target.value
              }))
            }
            className="rounded-xl border border-slate-200 px-3 py-2"
          >
            <option value="">All verification states</option>
            <option value="true">Verified</option>
            <option value="false">Unverified</option>
          </select>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setPage(1);
                setFilters({ ...draftFilters });
              }}
              className="px-4 py-2 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700"
            >
              Apply
            </button>
            <button
              onClick={() => {
                const cleared = { q: "", role: "", verified: "" };
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
          <p className="text-slate-600">Loading users...</p>
        ) : users.length === 0 ? (
          <p className="text-slate-600">No users yet.</p>
        ) : (
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="rounded-2xl border border-slate-200 bg-white p-4 space-y-4"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      {user.name}
                    </h3>
                    <p className="text-slate-600">{user.email}</p>
                    <p className="text-sm text-slate-500">
                      User #{user.id} - {user.created_at}
                    </p>
                  </div>
                  <button
                    onClick={() => handleSave(user)}
                    disabled={savingId === user.id}
                    className="px-5 py-2 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 disabled:opacity-60"
                  >
                    {savingId === user.id ? "Saving..." : "Save Changes"}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-slate-700">
                      Role
                    </label>
                    <select
                      value={user.role || "user"}
                      onChange={(event) =>
                        handleFieldChange(user.id, "role", event.target.value)
                      }
                      className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2"
                    >
                      {roleOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      id={`verified-${user.id}`}
                      type="checkbox"
                      checked={Boolean(user.verified)}
                      onChange={(event) =>
                        handleFieldChange(
                          user.id,
                          "verified",
                          event.target.checked
                        )
                      }
                      className="h-4 w-4 rounded border-slate-300"
                    />
                    <label
                      htmlFor={`verified-${user.id}`}
                      className="text-sm font-semibold text-slate-700"
                    >
                      Email verified
                    </label>
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
