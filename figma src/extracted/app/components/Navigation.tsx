import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/destinations', label: 'Destinations' },
    { path: '/consult', label: 'Consult' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/30 border-b border-white/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Brand */}
          <Link to="/" className="flex flex-col">
            <span className="text-2xl font-bold text-amber-900">AgeWatchAfrica</span>
            <span className="text-xs text-amber-700 -mt-1">Discover Africa with Confidence</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-lg transition-all duration-300 ${
                  isActive(link.path)
                    ? 'bg-white/40 text-amber-900 font-semibold'
                    : 'text-amber-800 hover:bg-white/20 hover:text-amber-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/login"
              className="ml-4 px-6 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              Client Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-white/40 text-amber-900 hover:bg-white/60 transition-all"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-lg transition-all ${
                  isActive(link.path)
                    ? 'bg-white/40 text-amber-900 font-semibold'
                    : 'text-amber-800 hover:bg-white/20'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-center text-lg"
            >
              Client Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
