import { GlassCard } from '../components/GlassCard';
import { 
  Calendar, 
  Heart, 
  CreditCard, 
  MapPin, 
  Users, 
  Phone, 
  Shield,
  FileText,
  Camera,
  MessageSquare,
  Type,
  Contrast,
  Volume2,
  ChevronDown,
  ChevronUp,
  Printer,
  AlertCircle,
  Home as HomeIcon,
  Plane
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export function Dashboard() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [textSize, setTextSize] = useState('medium');
  const [highContrast, setHighContrast] = useState(false);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const adjustTextSize = (size: string) => {
    setTextSize(size);
    document.documentElement.style.fontSize = 
      size === 'small' ? '14px' : 
      size === 'large' ? '18px' : 
      '16px';
  };

  // Calculate days until next trip
  const nextTripDate = new Date('2026-03-15');
  const today = new Date();
  const daysUntil = Math.ceil((nextTripDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in ${highContrast ? 'contrast-125' : ''}`}>
      {/* Dashboard Header with Navigation */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 mb-2">Welcome Back, Margaret!</h1>
            <p className="text-xl text-slate-600">Your travel dashboard • Everything in one place</p>
          </div>
          
          {/* Quick Navigation */}
          <div className="flex gap-3">
            <Link
              to="/"
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border-2 border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-all shadow-sm"
            >
              <HomeIcon className="w-5 h-5" />
              <span className="hidden sm:inline">Home</span>
            </Link>
            <button className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-all shadow-md">
              <Plane className="w-5 h-5" />
              <span className="hidden sm:inline">My Trips</span>
            </button>
          </div>
        </div>

        {/* Emergency Support Banner */}
        <div className="bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-2xl p-5 shadow-lg">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-3 rounded-full">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <p className="text-lg font-bold">24/7 Emergency Support</p>
                <p className="text-sm opacity-90">We're here whenever you need us</p>
              </div>
            </div>
            <a 
              href="tel:+15559117847"
              className="px-6 py-3 bg-white text-red-600 rounded-xl font-bold text-lg hover:bg-red-50 transition-all shadow-md whitespace-nowrap"
            >
              Call: +1 (555) 911-TRIP
            </a>
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        
        {/* 1. UPCOMING TRIPS - Large Calendar View */}
        <div className="lg:col-span-2">
          <GlassCard hover={false} className="h-full">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-blue-400 to-cyan-500 p-3 rounded-2xl">
                  <Calendar className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-slate-800">Your Next Adventure</h2>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200 mb-4">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <div className="text-sm font-semibold text-blue-600 mb-1">DEPARTING IN</div>
                  <div className="text-6xl font-bold text-blue-700 mb-2">{daysUntil} Days</div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">South Africa Explorer</h3>
                  <p className="text-lg text-slate-600 mb-3">March 15 - March 28, 2026 (14 days)</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-white rounded-full text-sm font-semibold text-slate-700 border border-blue-200">
                      Cape Town
                    </span>
                    <span className="px-3 py-1 bg-white rounded-full text-sm font-semibold text-slate-700 border border-blue-200">
                      Stellenbosch
                    </span>
                    <span className="px-3 py-1 bg-white rounded-full text-sm font-semibold text-slate-700 border border-blue-200">
                      Kruger National Park
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="bg-white rounded-xl p-4 border border-blue-200">
                    <div className="text-sm font-semibold text-slate-600 mb-1">Accessibility</div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-green-600" />
                      <span className="text-base font-bold text-green-600">Fully Accessible</span>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-blue-200">
                    <div className="text-sm font-semibold text-slate-600 mb-1">Group Size</div>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      <span className="text-base font-bold text-slate-800">8 travelers</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-bold text-lg hover:from-blue-600 hover:to-cyan-600 transition-all shadow-md">
                View Full Itinerary
              </button>
              <button className="px-6 py-4 bg-white border-2 border-slate-300 text-slate-700 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all">
                Modify Booking
              </button>
            </div>
          </GlassCard>
        </div>

        {/* 2. HEALTH & SAFETY */}
        <div>
          <GlassCard hover={false} className="h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-emerald-400 to-green-500 p-3 rounded-2xl">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-slate-800">Health & Safety</h2>
            </div>

            <div className="space-y-4">
              <div className="bg-emerald-50 rounded-xl p-4 border-2 border-emerald-200">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-1">Health Reminder</h3>
                    <p className="text-base text-slate-600">Yellow fever vaccination required. Please complete 2 weeks before departure.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 border-2 border-slate-200">
                <h3 className="text-lg font-bold text-slate-800 mb-2">Emergency Contact</h3>
                <p className="text-base text-slate-600 mb-1">John Smith (Son)</p>
                <p className="text-base font-semibold text-slate-800">+1 (555) 234-5678</p>
              </div>

              <div className="bg-white rounded-xl p-4 border-2 border-slate-200">
                <h3 className="text-lg font-bold text-slate-800 mb-2">Medical Support</h3>
                <p className="text-base text-slate-600">Dr. Sarah Williams will be available throughout your journey.</p>
              </div>

              <button className="w-full px-6 py-4 bg-emerald-500 text-white rounded-xl font-bold text-lg hover:bg-emerald-600 transition-all shadow-md">
                View Health Profile
              </button>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        
        {/* 3. BOOKING & PAYMENTS */}
        <GlassCard hover={false}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-3 rounded-2xl">
                <CreditCard className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-slate-800">Booking & Payments</h2>
            </div>
            <button
              onClick={() => toggleSection('payment')}
              className="p-2 hover:bg-white/60 rounded-lg transition-all"
            >
              {expandedSection === 'payment' ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
            </button>
          </div>

          <div className="space-y-4">
            <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-bold text-slate-800">Payment Status</span>
                <span className="px-4 py-1 bg-green-500 text-white rounded-full text-sm font-bold">PAID IN FULL</span>
              </div>
              <p className="text-base text-slate-600">Total: $4,850 • Paid: February 1, 2026</p>
            </div>

            {expandedSection === 'payment' && (
              <div className="space-y-3 animate-fade-in">
                <div className="bg-white rounded-xl p-4 border-2 border-slate-200">
                  <h3 className="text-lg font-bold text-slate-800 mb-2">Senior Discount Applied</h3>
                  <p className="text-base text-slate-600">You saved $485 (10% senior discount)</p>
                </div>
                <div className="bg-white rounded-xl p-4 border-2 border-slate-200">
                  <h3 className="text-lg font-bold text-slate-800 mb-2">Included Services</h3>
                  <ul className="text-base text-slate-600 space-y-1">
                    <li>✓ All accommodations & meals</li>
                    <li>✓ Private transportation</li>
                    <li>✓ Travel insurance</li>
                    <li>✓ 24/7 medical support</li>
                  </ul>
                </div>
              </div>
            )}

            <button className="w-full px-6 py-4 bg-white border-2 border-slate-300 text-slate-700 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all">
              Download Receipt
            </button>
          </div>
        </GlassCard>

        {/* 4. ITINERARY */}
        <GlassCard hover={false}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-purple-400 to-pink-500 p-3 rounded-2xl">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-slate-800">Detailed Itinerary</h2>
            </div>
            <button
              onClick={() => toggleSection('itinerary')}
              className="p-2 hover:bg-white/60 rounded-lg transition-all"
            >
              {expandedSection === 'itinerary' ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
            </button>
          </div>

          <div className="space-y-3">
            <div className="bg-purple-50 rounded-xl p-4 border-2 border-purple-200">
              <h3 className="text-lg font-bold text-slate-800 mb-1">Day 1-3: Cape Town</h3>
              <p className="text-base text-slate-600">Table Mountain, waterfront tour, wine tasting</p>
            </div>
            
            {expandedSection === 'itinerary' && (
              <div className="space-y-3 animate-fade-in">
                <div className="bg-white rounded-xl p-4 border-2 border-slate-200">
                  <h3 className="text-lg font-bold text-slate-800 mb-1">Day 4-6: Stellenbosch</h3>
                  <p className="text-base text-slate-600">Wine country tours, historic districts, gourmet dining</p>
                </div>
                <div className="bg-white rounded-xl p-4 border-2 border-slate-200">
                  <h3 className="text-lg font-bold text-slate-800 mb-1">Day 7-12: Kruger Park</h3>
                  <p className="text-base text-slate-600">Safari drives, wildlife photography, sunset cruises</p>
                </div>
                <div className="bg-white rounded-xl p-4 border-2 border-slate-200">
                  <h3 className="text-lg font-bold text-slate-800 mb-1">Day 13-14: Return</h3>
                  <p className="text-base text-slate-600">Leisure time, farewell dinner, departure</p>
                </div>
              </div>
            )}

            <button className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold text-lg hover:from-purple-600 hover:to-pink-600 transition-all shadow-md flex items-center justify-center gap-2">
              <Printer className="w-5 h-5" />
              Print Full Itinerary
            </button>
          </div>
        </GlassCard>
      </div>

      {/* Third Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        
        {/* 5. COMMUNITY */}
        <div className="lg:col-span-2">
          <GlassCard hover={false}>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-rose-400 to-pink-500 p-3 rounded-2xl">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-slate-800">Travel Community</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl p-5 border-2 border-rose-200">
                <Camera className="w-6 h-6 text-rose-600 mb-3" />
                <h3 className="text-xl font-bold text-slate-800 mb-2">Share Your Photos</h3>
                <p className="text-base text-slate-600 mb-4">Upload and share memories with fellow travelers</p>
                <button className="w-full px-5 py-3 bg-rose-500 text-white rounded-xl font-semibold hover:bg-rose-600 transition-all">
                  Upload Photos
                </button>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-5 border-2 border-blue-200">
                <MessageSquare className="w-6 h-6 text-blue-600 mb-3" />
                <h3 className="text-xl font-bold text-slate-800 mb-2">Connect with Travelers</h3>
                <p className="text-base text-slate-600 mb-4">Meet your fellow South Africa group members</p>
                <button className="w-full px-5 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-all">
                  View Group Chat
                </button>
              </div>
            </div>

            <div className="bg-amber-50 rounded-xl p-4 border-2 border-amber-200">
              <div className="flex items-start gap-3">
                <FileText className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-800 mb-1">Share Your Feedback</h3>
                  <p className="text-base text-slate-600 mb-3">Help us improve! Share your thoughts and suggestions.</p>
                  <button className="px-5 py-2 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600 transition-all">
                    Leave Feedback
                  </button>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* 6. ACCESSIBILITY TOOLS */}
        <div>
          <GlassCard hover={false} className="h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-indigo-400 to-purple-500 p-3 rounded-2xl">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-slate-800">Accessibility</h2>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-xl p-4 border-2 border-slate-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Type className="w-5 h-5 text-slate-600" />
                    <span className="text-lg font-bold text-slate-800">Text Size</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => adjustTextSize('small')}
                    className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all ${
                      textSize === 'small' 
                        ? 'bg-indigo-500 text-white' 
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    A
                  </button>
                  <button
                    onClick={() => adjustTextSize('medium')}
                    className={`flex-1 px-4 py-3 rounded-xl font-semibold text-lg transition-all ${
                      textSize === 'medium' 
                        ? 'bg-indigo-500 text-white' 
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    A
                  </button>
                  <button
                    onClick={() => adjustTextSize('large')}
                    className={`flex-1 px-4 py-3 rounded-xl font-semibold text-xl transition-all ${
                      textSize === 'large' 
                        ? 'bg-indigo-500 text-white' 
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    A
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 border-2 border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Contrast className="w-5 h-5 text-slate-600" />
                    <span className="text-lg font-bold text-slate-800">High Contrast</span>
                  </div>
                  <button
                    onClick={() => setHighContrast(!highContrast)}
                    className={`w-16 h-9 rounded-full transition-all ${
                      highContrast ? 'bg-indigo-500' : 'bg-slate-300'
                    }`}
                  >
                    <div className={`w-7 h-7 bg-white rounded-full transition-transform ${
                      highContrast ? 'translate-x-8' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 border-2 border-slate-200">
                <div className="flex items-center gap-2 mb-3">
                  <Volume2 className="w-5 h-5 text-slate-600" />
                  <span className="text-lg font-bold text-slate-800">Voice Guidance</span>
                </div>
                <button className="w-full px-5 py-3 bg-indigo-500 text-white rounded-xl font-semibold hover:bg-indigo-600 transition-all">
                  Enable Voice Assistant
                </button>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Support Section */}
      <GlassCard hover={false}>
        <div className="text-center py-6">
          <h2 className="text-3xl font-bold text-slate-800 mb-3">Need Help or Have Questions?</h2>
          <p className="text-lg text-slate-600 mb-6">
            Our support team is available 24/7 to assist you with any concerns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl font-bold text-lg hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              Contact Support
            </button>
            <Link
              to="/consult"
              className="px-8 py-4 bg-white border-2 border-slate-300 text-slate-700 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all text-center"
            >
              Schedule Consultation
            </Link>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
