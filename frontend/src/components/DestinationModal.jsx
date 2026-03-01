import Modal from "./Modal.jsx";
import ImageCarousel from "./ImageCarousel.jsx";
import { MapPin, Calendar, Users, Star } from "lucide-react";

export default function DestinationModal({ destination, isOpen, onClose }) {
  if (!destination) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="w-full max-w-6xl">
      <div className="flex flex-col md:flex-row max-h-[90vh]">
        {/* Image Carousel - Left Side */}
        <div className="md:w-1/2 h-64 md:h-auto md:min-h-[500px]">
          <ImageCarousel images={destination.images} alt={destination.name} />
        </div>

        {/* Content - Right Side */}
        <div className="md:w-1/2 p-6 overflow-y-auto max-h-[60vh] md:max-h-[90vh]">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-amber-900 mb-2">
              {destination.name}
            </h2>
            <div className="flex items-center text-amber-700">
              <MapPin className="w-5 h-5 mr-2" />
              <span className="text-lg">{destination.location}</span>
            </div>
          </div>

          {/* Quick Info */}
          {destination.quickInfo && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              {destination.quickInfo.bestTime && (
                <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-xl">
                  <Calendar className="w-5 h-5 text-amber-600" />
                  <div>
                    <p className="text-xs text-amber-600 font-medium">Best Time</p>
                    <p className="text-sm text-amber-900">{destination.quickInfo.bestTime}</p>
                  </div>
                </div>
              )}
              {destination.quickInfo.groupSize && (
                <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-xl">
                  <Users className="w-5 h-5 text-amber-600" />
                  <div>
                    <p className="text-xs text-amber-600 font-medium">Group Size</p>
                    <p className="text-sm text-amber-900">{destination.quickInfo.groupSize}</p>
                  </div>
                </div>
              )}
              {destination.quickInfo.rating && (
                <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-xl">
                  <Star className="w-5 h-5 text-amber-600" />
                  <div>
                    <p className="text-xs text-amber-600 font-medium">Rating</p>
                    <p className="text-sm text-amber-900">{destination.quickInfo.rating}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Detailed Description */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-amber-900">About This Destination</h3>
            <p className="text-amber-800 leading-relaxed whitespace-pre-line">
              {destination.detailedDescription}
            </p>
          </div>

          {/* Highlights */}
          {destination.highlights && destination.highlights.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-amber-900 mb-3">Highlights</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {destination.highlights.map((highlight, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-amber-800"
                  >
                    <span className="w-2 h-2 bg-amber-500 rounded-full" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* CTA Button */}
          <div className="mt-8 flex justify-center">
            <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              Explore Trips to {destination.location}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
