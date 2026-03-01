import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "+254700000000"; // Kenya placeholder - replace with actual number
const DEFAULT_MESSAGE = "Hello! I'm interested in learning more about AgeWatchAfrica travel experiences for seniors.";

export default function WhatsAppButton() {
  const handleClick = () => {
    const encodedMessage = encodeURIComponent(DEFAULT_MESSAGE);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, "")}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-full bg-green-500 hover:bg-green-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="hidden sm:inline">Chat with us</span>
      
      {/* Pulse animation */}
      <span className="absolute -top-1 -right-1 flex h-4 w-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-4 w-4 bg-green-300"></span>
      </span>
    </button>
  );
}
