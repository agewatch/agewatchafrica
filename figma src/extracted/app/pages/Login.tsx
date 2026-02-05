import { GlassCard } from '../components/GlassCard';
import { Mail, Lock } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would authenticate with a backend
    // For demo purposes, we'll just navigate to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-20rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 animate-fade-in">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-amber-900 mb-4">Client Login</h1>
          <p className="text-xl text-amber-800">Access your travel dashboard</p>
        </div>

        <GlassCard hover={false}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="flex items-center text-lg font-semibold text-amber-900 mb-2">
                <Mail className="w-5 h-5 mr-2" />
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 text-lg rounded-xl backdrop-blur-lg bg-white/50 border-2 border-white/60 text-amber-900 placeholder-amber-600 focus:outline-none focus:border-amber-500 transition-all"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="flex items-center text-lg font-semibold text-amber-900 mb-2">
                <Lock className="w-5 h-5 mr-2" />
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 text-lg rounded-xl backdrop-blur-lg bg-white/50 border-2 border-white/60 text-amber-900 placeholder-amber-600 focus:outline-none focus:border-amber-500 transition-all"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full px-8 py-4 text-xl rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/40 text-center">
            <a href="#" className="text-base text-amber-800 hover:text-amber-900 font-semibold">
              Forgot your password?
            </a>
            <p className="text-base text-amber-800 mt-4">
              New to AgeWatchAfrica?{' '}
              <a href="/consult" className="font-semibold hover:text-amber-900">
                Start with a consultation
              </a>
            </p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
