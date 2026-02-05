export default function Footer() {
  return (
    <footer className="backdrop-blur-md bg-white/20 border-t border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-amber-900">AgeWatchAfrica</h3>
            <p className="text-amber-800 mt-1">
              Discover Africa with confidence
            </p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-amber-700 text-sm">
              © 2026 AgeWatchAfrica. All rights reserved.
            </p>
            <p className="text-amber-700 text-sm">
              Senior Travel, Tourism & Consulting
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
