import { useEffect, useState } from "react";
import GlassCard from "../components/GlassCard.jsx";
import { createPhoto, fetchPhotos } from "../services/photos.js";

const emptyForm = { title: "", image_url: "", caption: "" };

export default function CommunityPhotos() {
  const [photos, setPhotos] = useState([]);
  const [form, setForm] = useState({ ...emptyForm });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadPhotos = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchPhotos();
      setPhotos(data?.data || []);
    } catch (err) {
      setError(err.message || "Unable to load photos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPhotos();
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
      await createPhoto({
        title: form.title || null,
        image_url: form.image_url,
        caption: form.caption || null
      });
      setForm({ ...emptyForm });
      await loadPhotos();
    } catch (err) {
      setError(err.message || "Unable to submit photo");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-rose-600 uppercase tracking-wide">
          Community
        </p>
        <h1 className="text-4xl font-bold text-slate-900">Photo Share</h1>
        <p className="text-lg text-slate-600">
          Share your travel memories. Photos are reviewed before publishing.
        </p>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      <GlassCard hover={false} className="p-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Submit a Photo
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-semibold text-slate-700">
              Image URL
            </label>
            <input
              name="image_url"
              value={form.image_url}
              onChange={handleChange}
              required
              placeholder="https://"
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Title (optional)
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Caption (optional)
              </label>
              <input
                name="caption"
                value={form.caption}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded-xl bg-rose-600 text-white font-semibold hover:bg-rose-700 disabled:opacity-60"
          >
            {saving ? "Submitting..." : "Submit Photo"}
          </button>
        </form>
      </GlassCard>

      <GlassCard hover={false} className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-slate-900">Your Photos</h2>
          <button
            onClick={loadPhotos}
            className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <p className="text-slate-600">Loading photos...</p>
        ) : photos.length === 0 ? (
          <p className="text-slate-600">No photos submitted yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden"
              >
                <div className="aspect-video bg-slate-100">
                  <img
                    src={photo.image_url}
                    alt={photo.title || "Community"}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <div>
                    <p className="text-sm text-slate-500">
                      Status: {photo.status}
                    </p>
                    <h3 className="text-lg font-bold text-slate-900">
                      {photo.title || "Untitled"}
                    </h3>
                  </div>
                  {photo.caption && (
                    <p className="text-slate-700 text-sm">{photo.caption}</p>
                  )}
                  {photo.rejection_reason && (
                    <p className="text-sm text-red-600">
                      Rejected: {photo.rejection_reason}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </GlassCard>
    </div>
  );
}
