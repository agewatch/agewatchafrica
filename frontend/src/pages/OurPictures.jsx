import { useEffect, useMemo, useState } from "react";
import GlassCard from "../components/GlassCard.jsx";
import { fetchPublicPhotos } from "../services/photos.js";

export default function OurPictures() {
  const [galleryPhotos, setGalleryPhotos] = useState([]);
  const [loadingGallery, setLoadingGallery] = useState(true);
  const [error, setError] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);

  const activePhotos = useMemo(() => galleryPhotos, [galleryPhotos]);

  const loadGallery = async () => {
    setLoadingGallery(true);
    try {
      const data = await fetchPublicPhotos(1);
      setGalleryPhotos(data?.data || []);
    } catch (err) {
      setError(err.message || "Unable to load gallery");
    } finally {
      setLoadingGallery(false);
    }
  };

  useEffect(() => {
    loadGallery();
  }, []);

  useEffect(() => {
    const handleKey = (event) => {
      if (activeIndex === null) return;
      if (event.key === "Escape") {
        setActiveIndex(null);
      } else if (event.key === "ArrowRight") {
        setActiveIndex((prev) =>
          prev === null ? prev : (prev + 1) % activePhotos.length
        );
      } else if (event.key === "ArrowLeft") {
        setActiveIndex((prev) =>
          prev === null
            ? prev
            : (prev - 1 + activePhotos.length) % activePhotos.length
        );
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex, activePhotos.length]);

  const activePhoto = activeIndex !== null ? activePhotos[activeIndex] : null;

  return (
    <div className="w-full min-h-screen px-4 sm:px-6 lg:px-10 py-10 space-y-8">
      <div className="flex flex-col gap-2 text-center">
        <p className="text-sm font-semibold text-rose-600 uppercase tracking-wide">
          Our Pictures
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900">
          Community Gallery
        </h1>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
          Explore real moments from AgeWatch Africa travelers. Uploads are only
          available from the dashboard.
        </p>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      <GlassCard hover={false} className="p-6 min-h-[70vh]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">
            Latest Highlights
          </h2>
          <button
            onClick={loadGallery}
            className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50"
          >
            Refresh
          </button>
        </div>

        {loadingGallery ? (
          <p className="text-slate-600">Loading photos...</p>
        ) : activePhotos.length === 0 ? (
          <p className="text-slate-600">No approved photos yet.</p>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
            {activePhotos.map((photo, index) => (
              <button
                key={photo.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className="mb-6 w-full break-inside-avoid rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-xl transition-all"
              >
                <div className="relative">
                  <img
                    src={photo.image_url}
                    alt={photo.title || "Trip memory"}
                    className="w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 hover:opacity-100 transition-all" />
                </div>
                <div className="p-5 text-left">
                  <p className="text-sm text-slate-500">Community</p>
                  <h3 className="text-lg font-bold text-slate-900">
                    {photo.title || "Untitled"}
                  </h3>
                  {photo.caption && (
                    <p className="text-sm text-slate-600 mt-1">{photo.caption}</p>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </GlassCard>

      {activePhoto && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <div>
                <p className="text-sm text-slate-500">
                  {activeTab === "gallery" ? "Community Gallery" : "Your Upload"}
                </p>
                <h3 className="text-xl font-bold text-slate-900">
                  {activePhoto.title || "Photo"}
                </h3>
              </div>
              <button
                onClick={() => setActiveIndex(null)}
                className="text-slate-500 hover:text-slate-900"
              >
                Close
              </button>
            </div>
            <div className="bg-black">
              <img
                src={activePhoto.image_url}
                alt={activePhoto.title || "Photo"}
                className="w-full max-h-[70vh] object-contain"
              />
            </div>
            <div className="p-4 bg-slate-50 flex items-center gap-3 overflow-x-auto">
              {activePhotos.map((photo, index) => (
                <button
                  key={photo.id}
                  onClick={() => setActiveIndex(index)}
                  className={`h-16 w-24 rounded-xl overflow-hidden border ${
                    index === activeIndex ? "border-slate-900" : "border-slate-200"
                  }`}
                >
                  <img
                    src={photo.image_url}
                    alt={photo.title || "Thumbnail"}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
