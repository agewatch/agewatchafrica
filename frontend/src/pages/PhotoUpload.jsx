import { useState } from "react";
import GlassCard from "../components/GlassCard.jsx";
import { createPhoto } from "../services/photos.js";

const emptyForm = { title: "", caption: "" };

export default function PhotoUpload() {
  const [form, setForm] = useState({ ...emptyForm });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    setSuccess("");
    if (!file) {
      setPreviewUrl("");
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setError("Please choose a photo to upload.");
      return;
    }
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      await createPhoto({
        file: selectedFile,
        title: form.title || null,
        caption: form.caption || null
      });
      setForm({ ...emptyForm });
      setSelectedFile(null);
      setPreviewUrl("");
      setSuccess("Photo submitted for approval.");
    } catch (err) {
      setError(err.message || "Unable to submit photo");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-rose-600 uppercase tracking-wide">
          Upload Photos
        </p>
        <h1 className="text-4xl font-bold text-slate-900">
          Share Your Travel Memories
        </h1>
        <p className="text-lg text-slate-600">
          Upload a photo directly from your device. Once approved, it will appear
          in the community gallery.
        </p>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {error}
        </div>
      )}
      {success && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-700">
          {success}
        </div>
      )}

      <GlassCard hover={false} className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Upload a Photo
            </h2>
            <p className="text-slate-600 mb-4">
              Photos are reviewed before appearing in the public gallery.
            </p>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-3">
                <label className="text-sm font-semibold text-slate-700">
                  Choose image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 bg-white"
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
                {saving ? "Uploading..." : "Submit for Approval"}
              </button>
            </form>
          </div>
          <div className="lg:w-80">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 h-full flex flex-col">
              <p className="text-sm font-semibold text-slate-700 mb-3">
                Preview
              </p>
              <div className="flex-1 rounded-xl overflow-hidden bg-white border border-slate-200">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="h-full flex items-center justify-center text-slate-400 text-sm">
                    Select a photo to preview
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
