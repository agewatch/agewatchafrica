export function Footer() {
  return (
    <footer className="mt-auto py-8 backdrop-blur-md bg-white/20 border-t border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xl text-amber-900 font-semibold">AgeWatchAfrica</p>
        <p className="text-base text-amber-800 mt-2">
          Empowering seniors to explore Africa with dignity, joy, and lasting memories.
        </p>
        <p className="text-sm text-amber-700 mt-4">
          © {new Date().getFullYear()} AgeWatchAfrica. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
