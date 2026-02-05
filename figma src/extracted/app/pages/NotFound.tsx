import { GlassCard } from '../components/GlassCard';
import { Link } from 'react-router-dom';
import { Map } from 'lucide-react';

export function NotFound() {
  return (
    <div className="min-h-[calc(100vh-20rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 animate-fade-in">
      <GlassCard hover={false} className="max-w-2xl">
        <div className="text-center py-12">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mx-auto mb-8">
            <Map className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-8xl font-bold text-amber-900 mb-4">404</h1>
          <h2 className="text-4xl font-bold text-amber-900 mb-4">Page Not Found</h2>
          <p className="text-xl text-amber-800 leading-relaxed mb-8 max-w-lg mx-auto">
            Looks like you've wandered off the beaten path! This page doesn't exist, but don't worry—there are plenty of amazing destinations to explore.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="px-8 py-4 text-xl rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Go Home
            </Link>
            <Link
              to="/destinations"
              className="px-8 py-4 text-xl rounded-xl bg-white/40 border-2 border-amber-500 text-amber-900 font-semibold hover:bg-white/60 transition-all duration-300"
            >
              Explore Destinations
            </Link>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}