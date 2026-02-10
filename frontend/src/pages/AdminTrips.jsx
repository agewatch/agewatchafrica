import { useEffect, useMemo, useState } from "react";
import GlassCard from "../components/GlassCard.jsx";
import {
  createTrip,
  deleteTrip,
  fetchTrip,
  fetchTrips,
  fetchTripMedia,
  deleteTripMedia,
  reorderTripMedia,
  setTripCover,
  uploadTripMedia,
  updateTrip
} from "../services/trips.js";

const emptyTrip = {
  title: "",
  destination_city: "",
  destination_country: "",
  start_date: "",
  end_date: "",
  price: "",
  capacity: "",
  status: "draft",
  description: "",
  image_url: "",
  album_images_text: "",
  itinerary_text: "",
  accessibility_rating: "",
  health_safety_notes: "",
  senior_discount_percent: "",
  included_items_text: "",
  excluded_items_text: ""
};

function parseList(text) {
  if (!text) return [];
  return text
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseItinerary(text) {
  if (!text) return [];
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => ({
      day: `Day ${index + 1}`,
      title: line,
      details: line
    }));
}

function parseAlbumImages(text) {
  if (!text) return [];
  return text
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function AdminTrips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ ...emptyTrip });
  const [editingId, setEditingId] = useState(null);
  const [albumMedia, setAlbumMedia] = useState([]);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState(null);
  const [filters, setFilters] = useState({ q: "", status: "" });
  const [draftFilters, setDraftFilters] = useState({ q: "", status: "" });

  const isEditing = useMemo(() => editingId !== null, [editingId]);

  const loadTrips = async (nextPage = page, activeFilters = filters) => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchTrips({
        page: nextPage,
        ...activeFilters
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
    loadTrips(page, filters);
  }, [page, filters]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm({ ...emptyTrip });
    setEditingId(null);
    setAlbumMedia([]);
  };

  const syncAlbumFromMedia = (media = []) => {
    const urls = media.map((item) => item.image_url).filter(Boolean);
    setAlbumMedia(media);
    setForm((prev) => ({
      ...prev,
      album_images_text: urls.join("\n")
    }));
  };

  const refreshMedia = async (tripId) => {
    const media = await fetchTripMedia(tripId);
    syncAlbumFromMedia(media || []);
  };

  const handleEdit = (trip) => {
    setEditingId(trip.id);
    setSaving(true);
    setError("");

    fetchTrip(trip.id)
      .then((fullTrip) => {
        const albumImages =
          fullTrip.media?.map((item) => item.image_url).filter(Boolean) || [];
        setAlbumMedia(fullTrip.media || []);
        setForm({
          title: fullTrip.title || "",
          destination_city: fullTrip.destination_city || "",
          destination_country: fullTrip.destination_country || "",
          start_date: fullTrip.start_date || "",
          end_date: fullTrip.end_date || "",
          price: fullTrip.price || "",
          capacity: fullTrip.capacity || "",
          status: fullTrip.status || "draft",
          description: fullTrip.description || "",
          image_url: fullTrip.image_url || "",
          album_images_text: albumImages.join("\n"),
          itinerary_text: (fullTrip.itinerary || [])
            .map((item) => item?.title || item?.details || "")
            .filter(Boolean)
            .join("\n"),
          accessibility_rating: fullTrip.accessibility_rating || "",
          health_safety_notes: fullTrip.health_safety_notes || "",
          senior_discount_percent: fullTrip.senior_discount_percent || "",
          included_items_text: (fullTrip.included_items || []).join(", "),
          excluded_items_text: (fullTrip.excluded_items || []).join(", ")
        });
      })
      .catch((err) => {
        setError(err.message || "Unable to load trip");
      })
      .finally(() => {
        setSaving(false);
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      title: form.title,
      destination_city: form.destination_city,
      destination_country: form.destination_country,
      start_date: form.start_date,
      end_date: form.end_date,
      price: Number(form.price || 0),
      capacity: Number(form.capacity || 1),
      status: form.status,
      description: form.description,
      image_url: form.image_url || null,
      album_images: parseAlbumImages(form.album_images_text),
      itinerary: parseItinerary(form.itinerary_text),
      accessibility_rating: form.accessibility_rating
        ? Number(form.accessibility_rating)
        : null,
      health_safety_notes: form.health_safety_notes || null,
      senior_discount_percent: form.senior_discount_percent
        ? Number(form.senior_discount_percent)
        : 0,
      included_items: parseList(form.included_items_text),
      excluded_items: parseList(form.excluded_items_text)
    };

    try {
      if (isEditing) {
        await updateTrip(editingId, payload);
        await refreshMedia(editingId);
      } else {
        const created = await createTrip(payload);
        if (created?.id) {
          await refreshMedia(created.id);
        }
      }
      resetForm();
      await loadTrips(page, filters);
    } catch (err) {
      setError(err.message || "Unable to save trip");
    } finally {
      setSaving(false);
    }
  };

  const handleUpload = async (event) => {
    const files = Array.from(event.target.files || []);
    if (!editingId || files.length === 0) return;

    setUploading(true);
    setError("");

    try {
      let first = true;
      const uploadedUrls = [];

      for (const file of files) {
        const response = await uploadTripMedia(editingId, file, {
          isCover: first && !form.image_url
        });
        const url = response?.media?.image_url;
        if (url) {
          uploadedUrls.push(url);
          if (first && !form.image_url) {
            setForm((prev) => ({ ...prev, image_url: url }));
          }
        }
        first = false;
      }

      if (uploadedUrls.length > 0) {
        await refreshMedia(editingId);
        await loadTrips(page, filters);
      }
    } catch (err) {
      setError(err.message || "Unable to upload image");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  const handleDeleteMedia = async (mediaId) => {
    if (!editingId) return;
    setError("");
    try {
      await deleteTripMedia(editingId, mediaId);
      await refreshMedia(editingId);
      const updatedTrip = await fetchTrip(editingId);
      setForm((prev) => ({ ...prev, image_url: updatedTrip.image_url || "" }));
    } catch (err) {
      setError(err.message || "Unable to delete image");
    }
  };

  const handleSetCover = async (mediaId) => {
    if (!editingId) return;
    setError("");
    try {
      const updatedTrip = await setTripCover(editingId, mediaId);
      setForm((prev) => ({ ...prev, image_url: updatedTrip.image_url || "" }));
      setAlbumMedia(updatedTrip.media || []);
    } catch (err) {
      setError(err.message || "Unable to set cover image");
    }
  };

  const moveMedia = async (mediaId, direction) => {
    if (!editingId) return;
    const index = albumMedia.findIndex((item) => item.id === mediaId);
    if (index < 0) return;

    const nextIndex = direction === "up" ? index - 1 : index + 1;
    if (nextIndex < 0 || nextIndex >= albumMedia.length) return;

    const reordered = [...albumMedia];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(nextIndex, 0, moved);

    setAlbumMedia(reordered);
    setForm((prev) => ({
      ...prev,
      album_images_text: reordered.map((item) => item.image_url).join("\n")
    }));

    try {
      const response = await reorderTripMedia(
        editingId,
        reordered.map((item) => item.id)
      );
      setAlbumMedia(response.media || []);
    } catch (err) {
      setError(err.message || "Unable to reorder images");
    }
  };

  const handleArchive = async (tripId) => {
    setError("");
    try {
      await deleteTrip(tripId);
      await loadTrips(page, filters);
    } catch (err) {
      setError(err.message || "Unable to archive trip");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wide">
          Admin
        </p>
        <h1 className="text-4xl font-bold text-slate-900">Trips Management</h1>
        <p className="text-lg text-slate-600">
          Create, publish, and archive trips. Keep itineraries and accessibility
          details up to date.
        </p>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      <GlassCard hover={false} className="p-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          {isEditing ? "Edit Trip" : "Create New Trip"}
        </h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-slate-700">
              Trip Title
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">
              Destination City
            </label>
            <input
              name="destination_city"
              value={form.destination_city}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">
              Destination Country
            </label>
            <input
              name="destination_country"
              value={form.destination_country}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">
              Start Date
            </label>
            <input
              type="date"
              name="start_date"
              value={form.start_date}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">
              End Date
            </label>
            <input
              type="date"
              name="end_date"
              value={form.end_date}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">Price</label>
            <input
              type="number"
              name="price"
              min="0"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">
              Capacity
            </label>
            <input
              type="number"
              name="capacity"
              min="1"
              value={form.capacity}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">
              Accessibility Rating (1-5)
            </label>
            <input
              type="number"
              name="accessibility_rating"
              min="1"
              max="5"
              value={form.accessibility_rating}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-slate-700">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={4}
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-slate-700">
              Image URL (optional)
            </label>
            <input
              name="image_url"
              value={form.image_url}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2"
            />
            <p className="text-xs text-slate-500 mt-1">
              This image is used as the cover image for the trip.
            </p>
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-slate-700">
              Upload Album Images
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              disabled={!editingId || uploading}
              onChange={handleUpload}
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2 bg-white"
            />
            <p className="text-xs text-slate-500 mt-1">
              Save the trip first, then upload images. Files are stored on the
              server.
            </p>
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-slate-700">
              Album Images (one URL per line)
            </label>
            <textarea
              name="album_images_text"
              value={form.album_images_text}
              onChange={handleChange}
              rows={4}
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2"
            />
            <p className="text-xs text-slate-500 mt-1">
              The cover image is taken from the main Image URL. The album will
              display as a slideshow.
            </p>
          </div>

          {(form.image_url || form.album_images_text) && (
            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-slate-700">
                Album Preview
              </label>
              <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-3">
                {[form.image_url, ...parseAlbumImages(form.album_images_text)]
                  .filter(Boolean)
                  .map((url, index) => (
                    <div
                      key={`${url}-${index}`}
                      className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50"
                    >
                      <img
                        src={url}
                        alt="Trip media"
                        className="h-24 w-full object-cover"
                      />
                    </div>
                  ))}
              </div>
            </div>
          )}

          {editingId && albumMedia.length > 0 && (
            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-slate-700">
                Manage Album Images
              </label>
              <div className="mt-2 space-y-3">
                {albumMedia.map((media, index) => (
                  <div
                    key={media.id}
                    className="flex flex-col md:flex-row md:items-center gap-3 rounded-xl border border-slate-200 p-3"
                  >
                    <div className="h-20 w-28 rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
                      <img
                        src={media.image_url}
                        alt="Trip media"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-600 break-all">
                        {media.image_url}
                      </p>
                      <p className="text-xs text-slate-500">
                        {media.is_cover ? "Cover image" : "Album image"}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => moveMedia(media.id, "up")}
                        disabled={index === 0}
                        className="px-3 py-2 rounded-lg border border-slate-200 text-slate-700 text-sm font-semibold disabled:opacity-50"
                      >
                        Up
                      </button>
                      <button
                        type="button"
                        onClick={() => moveMedia(media.id, "down")}
                        disabled={index === albumMedia.length - 1}
                        className="px-3 py-2 rounded-lg border border-slate-200 text-slate-700 text-sm font-semibold disabled:opacity-50"
                      >
                        Down
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSetCover(media.id)}
                        className="px-3 py-2 rounded-lg border border-emerald-200 text-emerald-700 text-sm font-semibold hover:bg-emerald-50"
                      >
                        Set Cover
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteMedia(media.id)}
                        className="px-3 py-2 rounded-lg border border-rose-200 text-rose-700 text-sm font-semibold hover:bg-rose-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-slate-700">
              Itinerary (one line per day)
            </label>
            <textarea
              name="itinerary_text"
              value={form.itinerary_text}
              onChange={handleChange}
              rows={4}
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-slate-700">
              Health & Safety Notes
            </label>
            <textarea
              name="health_safety_notes"
              value={form.health_safety_notes}
              onChange={handleChange}
              rows={3}
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">
              Senior Discount (%)
            </label>
            <input
              type="number"
              name="senior_discount_percent"
              min="0"
              max="100"
              step="0.01"
              value={form.senior_discount_percent}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">
              Included Items (comma separated)
            </label>
            <input
              name="included_items_text"
              value={form.included_items_text}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-slate-700">
              Excluded Items (comma separated)
            </label>
            <input
              name="excluded_items_text"
              value={form.excluded_items_text}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2"
            />
          </div>

          <div className="md:col-span-2 flex flex-wrap gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 disabled:opacity-60"
            >
              {saving ? "Saving..." : isEditing ? "Update Trip" : "Create Trip"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50"
            >
              Clear
            </button>
          </div>
        </form>
      </GlassCard>

      <GlassCard hover={false} className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-slate-900">All Trips</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => loadTrips(page, filters)}
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
            placeholder="Search by title or destination"
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
            <option value="draft">draft</option>
            <option value="published">published</option>
            <option value="archived">archived</option>
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
          <p className="text-slate-600">Loading trips...</p>
        ) : trips.length === 0 ? (
          <p className="text-slate-600">No trips created yet.</p>
        ) : (
          <div className="space-y-4">
            {trips.map((trip) => (
              <div
                key={trip.id}
                className="rounded-2xl border border-slate-200 bg-white p-4"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      {trip.title}
                    </h3>
                    <p className="text-slate-600">
                      {trip.destination_city}, {trip.destination_country} Ã¢â‚¬Â¢{" "}
                      {trip.start_date} to {trip.end_date}
                    </p>
                    <p className="text-sm text-slate-500">
                      Status: {trip.status} Ã¢â‚¬Â¢ Capacity: {trip.capacity}
                    </p>
                    {(trip.image_url || (trip.media && trip.media.length > 0)) && (
                      <div className="mt-3">
                        <div className="h-16 w-24 rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
                          <img
                            src={trip.image_url || trip.media?.[0]?.image_url}
                            alt={trip.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleEdit(trip)}
                      className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleArchive(trip.id)}
                      className="px-4 py-2 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800"
                    >
                      Archive
                    </button>
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
