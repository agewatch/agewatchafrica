export default function GlassCard({ children, className = "", hover = true }) {
  return (
    <div
      className={`backdrop-blur-lg bg-white/30 rounded-2xl border border-white/40 shadow-xl p-6 ${
        hover
          ? "transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:bg-white/40"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
