import { GlassCard } from '../components/GlassCard';
import { Mail, User, Target } from 'lucide-react';
import { useState } from 'react';

export function Consult() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    goals: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, this would send data to a backend
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in">
        <GlassCard hover={false}>
          <div className="text-center py-12">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-amber-900 mb-4">Thank You!</h1>
            <p className="text-xl text-amber-800 leading-relaxed mb-8">
              We've received your consultation request. One of our travel specialists will reach out to you within 24 hours to discuss your African adventure.
            </p>
            <a
              href="/"
              className="inline-block px-8 py-4 text-xl rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Return Home
            </a>
          </div>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-5xl sm:text-6xl font-bold text-amber-900 mb-6">Book a Consultation</h1>
        <p className="text-xl text-amber-800 leading-relaxed">
          Share your travel dreams with us. We'll create a personalized plan that matches your interests, comfort needs, and budget.
        </p>
      </div>

      <GlassCard hover={false}>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label htmlFor="name" className="flex items-center text-xl font-semibold text-amber-900 mb-3">
              <User className="w-5 h-5 mr-2" />
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 text-lg rounded-xl backdrop-blur-lg bg-white/50 border-2 border-white/60 text-amber-900 placeholder-amber-600 focus:outline-none focus:border-amber-500 transition-all"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="flex items-center text-xl font-semibold text-amber-900 mb-3">
              <Mail className="w-5 h-5 mr-2" />
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 text-lg rounded-xl backdrop-blur-lg bg-white/50 border-2 border-white/60 text-amber-900 placeholder-amber-600 focus:outline-none focus:border-amber-500 transition-all"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label htmlFor="goals" className="flex items-center text-xl font-semibold text-amber-900 mb-3">
              <Target className="w-5 h-5 mr-2" />
              Travel Goals & Interests
            </label>
            <textarea
              id="goals"
              name="goals"
              value={formData.goals}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-5 py-4 text-lg rounded-xl backdrop-blur-lg bg-white/50 border-2 border-white/60 text-amber-900 placeholder-amber-600 focus:outline-none focus:border-amber-500 transition-all resize-none"
              placeholder="Tell us about your dream African adventure... Which destinations interest you? Any specific activities or experiences you'd like? Do you have any mobility or health considerations we should know about?"
            />
          </div>

          <button
            type="submit"
            className="w-full px-8 py-5 text-xl rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Submit Consultation Request
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-white/40">
          <p className="text-center text-base text-amber-800">
            Prefer to speak directly? Call us at <span className="font-semibold">+1 (555) 123-4567</span>
          </p>
        </div>
      </GlassCard>
    </div>
  );
}
