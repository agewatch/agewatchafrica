import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
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
} from "lucide-react";
import GlassCard from "../components/GlassCard.jsx";
import { getStoredUser } from "../services/auth.js";
import { fetchUserBookings } from "../services/bookings.js";
import { fetchAdminUnreadCount } from "../services/notifications.js";

export default function Dashboard() {
  const [expandedSection, setExpandedSection] = useState(null);
  const [textSize, setTextSize] = useState("medium");
  const [highContrast, setHighContrast] = useState(false);
  const [adminUnread, setAdminUnread] = useState(0);
  const [userBookings, setUserBookings] = useState([]);
  const [bookingError, setBookingError] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);
  const user = useMemo(() => getStoredUser(), []);
  const isAdmin = user?.role === "admin";
  const firstName =
    user?.name?.trim()?.split(/\s+/)?.[0] ||
    user?.first_name?.trim() ||
    "Traveler";

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const adjustTextSize = (size) => {
    setTextSize(size);
    document.documentElement.style.fontSize =
      size === "small" ? "14px" : size === "large" ? "18px" : "16px";
  };

  useEffect(() => {
    if (!isAdmin) return;
    fetchAdminUnreadCount()
      .then((data) => setAdminUnread(Number(data?.unread || 0)))
      .catch(() => setAdminUnread(0));
  }, [isAdmin]);

  useEffect(() => {
    if (isAdmin) return;
    setBookingLoading(true);
    fetchUserBookings(1)
      .then((data) => {
        const items = data?.data || [];
        setUserBookings(items);
        setBookingError("");
      })
      .catch((err) => {
        setBookingError(err.message || "Unable to load bookings");
        setUserBookings([]);
      })
      .finally(() => setBookingLoading(false));
  }, [isAdmin]);

  const upcomingBooking = useMemo(() => {
    if (!userBookings.length) {
      return null;
    }
    const today = new Date();
    const upcoming = userBookings
      .map((booking) => {
        const startDate = booking?.trip?.start_date;
        const parsed = startDate ? new Date(startDate) : null;
        return { booking, startDate, parsed };
      })
      .filter((item) => item.parsed && !Number.isNaN(item.parsed.getTime()))
      .filter((item) => item.parsed >= today)
      .sort((a, b) => a.parsed - b.parsed);

    return upcoming[0]?.booking || null;
  }, [userBookings]);

  const daysUntil = useMemo(() => {
    if (!upcomingBooking?.trip?.start_date) {
      return null;
    }
    const start = new Date(upcomingBooking.trip.start_date);
    const today = new Date();
    if (Number.isNaN(start.getTime())) {
      return null;
    }
    return Math.max(
      0,
      Math.ceil((start.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    );
  }, [upcomingBooking]);

  const formatTripDate = (value) => {
    if (!value) {
      return "";
    }
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return String(value).split(" ")[0];
    }
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  const itineraryLocations = useMemo(() => {
    const trip = upcomingBooking?.trip;
    if (!trip) {
      return [];
    }
    return [
      trip.destination_city,
      trip.destination_country
    ].filter(Boolean);
  }, [upcomingBooking]);

  const formatMoney = (amount, currency = "USD") => {
    if (amount === null || amount === undefined || Number.isNaN(Number(amount))) {
      return null;
    }
    const numeric = Number(amount);
    try {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        maximumFractionDigits: 0
      }).format(numeric);
    } catch {
      return `${currency} ${numeric.toFixed(0)}`;
    }
  };

  const normalizeStatus = (value, fallback = "Pending") => {
    if (!value) {
      return fallback;
    }
    return String(value)
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div
      className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in ${
        highContrast ? "contrast-125" : ""
      }`}
    >
      {/* Dashboard Header with Navigation */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 mb-2">
              {isAdmin ? "Admin Dashboard" : `Welcome Back, ${firstName}!`}
            </h1>
            {!isAdmin && (
              <p className="text-xl text-slate-600">
                Your travel dashboard • Everything in one place
              </p>
            )}
          </div>

          {/* Quick Navigation */}
          <div className="flex gap-3">
            {isAdmin ? (
              <>
                <Link
                  to="/admin/trips"
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-all shadow-md"
                >
                  <FileText className="w-5 h-5" />
                  <span className="hidden sm:inline">Admin Trips</span>
                </Link>
                <Link
                  to="/admin/bookings"
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all shadow-md"
                >
                  <CreditCard className="w-5 h-5" />
                  <span className="hidden sm:inline">Admin Bookings</span>
                </Link>
                <Link
                  to="/admin/notifications"
                  className="relative flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-all shadow-md"
                >
                  <AlertCircle className="w-5 h-5" />
                  <span className="hidden sm:inline">Notifications</span>
                  {adminUnread > 0 && (
                    <span className="absolute -top-2 -right-2 min-w-[22px] px-1.5 py-0.5 rounded-full bg-red-500 text-xs font-bold text-white text-center">
                      {adminUnread > 99 ? "99+" : adminUnread}
                    </span>
                  )}
                </Link>
                <Link
                  to="/admin/users"
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-all shadow-md"
                >
                  <Users className="w-5 h-5" />
                  <span className="hidden sm:inline">Admin Users</span>
                </Link>
                <Link
                  to="/admin/support"
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-all shadow-md"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span className="hidden sm:inline">Admin Support</span>
                </Link>
                <Link
                  to="/admin/feedback"
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-600 text-white font-semibold hover:bg-amber-700 transition-all shadow-md"
                >
                  <FileText className="w-5 h-5" />
                  <span className="hidden sm:inline">Admin Feedback</span>
                </Link>
                <Link
                  to="/admin/photos"
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-rose-600 text-white font-semibold hover:bg-rose-700 transition-all shadow-md"
                >
                  <Camera className="w-5 h-5" />
                  <span className="hidden sm:inline">Admin Photos</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border-2 border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-all shadow-sm"
                >
                  <HomeIcon className="w-5 h-5" />
                  <span className="hidden sm:inline">Home</span>
                </Link>
                <Link
                  to="/trips"
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-all shadow-md"
                >
                  <Plane className="w-5 h-5" />
                  <span className="hidden sm:inline">Book Trip</span>
                </Link>
                <Link
                  to="/my-trips"
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border-2 border-emerald-200 text-emerald-700 font-semibold hover:bg-emerald-50 transition-all shadow-sm"
                >
                  <Plane className="w-5 h-5" />
                  <span className="hidden sm:inline">My Trips</span>
                </Link>
                <Link
                  to="/support"
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border-2 border-emerald-200 text-emerald-700 font-semibold hover:bg-emerald-50 transition-all shadow-sm"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span className="hidden sm:inline">Support</span>
                </Link>
                <Link
                  to="/feedback"
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border-2 border-amber-200 text-amber-700 font-semibold hover:bg-amber-50 transition-all shadow-sm"
                >
                  <FileText className="w-5 h-5" />
                  <span className="hidden sm:inline">Feedback</span>
                </Link>
              </>
            )}
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
                <p className="text-sm opacity-90">
                  We're here whenever you need us
                </p>
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

      {isAdmin ? (
        <div className="mb-6">
          <GlassCard hover={false}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-emerald-400 to-teal-500 p-3 rounded-2xl">
                  <AlertCircle className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-slate-800">
                  Admin Notifications
                </h2>
              </div>
              <Link
                to="/admin/notifications"
                className="px-5 py-2 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-all"
              >
                View All
              </Link>
            </div>
            <div className="flex items-center justify-between bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-4">
              <div>
                <p className="text-lg font-bold text-slate-800">
                  Unread Notifications
                </p>
                <p className="text-sm text-slate-600">
                  Stay on top of new bookings and messages.
                </p>
              </div>
              <div className="text-4xl font-bold text-emerald-600">
                {adminUnread}
              </div>
            </div>
          </GlassCard>
        </div>
      ) : (
        <>
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
                <h2 className="text-3xl font-bold text-slate-800">
                  Your Next Adventure
                </h2>
              </div>
            </div>

            {bookingLoading ? (
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200 mb-4">
                <p className="text-base text-slate-600">
                  Loading your upcoming trips...
                </p>
              </div>
            ) : bookingError ? (
              <div className="bg-red-50 rounded-2xl p-6 border-2 border-red-200 mb-4 text-red-700">
                {bookingError}
              </div>
            ) : !upcomingBooking ? (
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200 mb-4">
                <h3 className="text-2xl font-bold text-slate-800 mb-2">
                  No Upcoming Trips
                </h3>
                <p className="text-base text-slate-600">
                  You have no upcoming bookings. Browse trips to reserve your
                  next adventure.
                </p>
              </div>
            ) : (
              <>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200 mb-4">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-blue-600 mb-1">
                        DEPARTING IN
                      </div>
                      <div className="text-6xl font-bold text-blue-700 mb-2">
                        {daysUntil ?? "--"} Days
                      </div>
                      <h3 className="text-2xl font-bold text-slate-800 mb-2">
                        {upcomingBooking.trip?.title || "Upcoming Trip"}
                      </h3>
                      <p className="text-lg text-slate-600 mb-3">
                        {formatTripDate(upcomingBooking.trip?.start_date)} -{" "}
                        {formatTripDate(upcomingBooking.trip?.end_date)}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {itineraryLocations.length === 0 ? (
                          <span className="px-3 py-1 bg-white rounded-full text-sm font-semibold text-slate-700 border border-blue-200">
                            Location details pending
                          </span>
                        ) : (
                          itineraryLocations.map((location) => (
                            <span
                              key={location}
                              className="px-3 py-1 bg-white rounded-full text-sm font-semibold text-slate-700 border border-blue-200"
                            >
                              {location}
                            </span>
                          ))
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="bg-white rounded-xl p-4 border border-blue-200">
                        <div className="text-sm font-semibold text-slate-600 mb-1">
                          Payment Status
                        </div>
                        <div className="flex items-center gap-2">
                          <Shield className="w-5 h-5 text-green-600" />
                          <span className="text-base font-bold text-green-600">
                            {upcomingBooking.payment_status || "Pending"}
                          </span>
                        </div>
                      </div>
                      <div className="bg-white rounded-xl p-4 border border-blue-200">
                        <div className="text-sm font-semibold text-slate-600 mb-1">
                          Booking Status
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-5 h-5 text-blue-600" />
                          <span className="text-base font-bold text-slate-800">
                            {upcomingBooking.status || "Pending"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/my-trips"
                    className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-bold text-lg hover:from-blue-600 hover:to-cyan-600 transition-all shadow-md text-center"
                  >
                    View Booking
                  </Link>
                  <Link
                    to="/trips"
                    className="px-6 py-4 bg-white border-2 border-slate-300 text-slate-700 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all text-center"
                  >
                    Browse Trips
                  </Link>
                </div>
              </>
            )}
          </GlassCard>
        </div>

        {/* 2. HEALTH & SAFETY */}
        <div>
          <GlassCard hover={false} className="h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-emerald-400 to-green-500 p-3 rounded-2xl">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-slate-800">
                Health & Safety
              </h2>
            </div>

            <div className="space-y-4">
              <div className="bg-emerald-50 rounded-xl p-4 border-2 border-emerald-200">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-1">
                      Health Notes
                    </h3>
                    <p className="text-base text-slate-600">
                      {upcomingBooking?.notes
                        ? upcomingBooking.notes
                        : "No health notes on file for this booking."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 border-2 border-slate-200">
                <h3 className="text-lg font-bold text-slate-800 mb-2">
                  Email Verification
                </h3>
                <p className="text-base text-slate-600">
                  {user?.email_verified_at
                    ? "Verified email on file."
                    : "Email not verified yet."}
                </p>
                <p className="text-base font-semibold text-slate-800 mt-1">
                  {user?.email || "No email on file"}
                </p>
              </div>

              <div className="bg-white rounded-xl p-4 border-2 border-slate-200">
                <h3 className="text-lg font-bold text-slate-800 mb-2">
                  Emergency Support
                </h3>
                <p className="text-base text-slate-600">
                  Our team is available 24/7 while you travel.
                </p>
              </div>

              <Link
                to="/support"
                className="w-full px-6 py-4 bg-emerald-500 text-white rounded-xl font-bold text-lg hover:bg-emerald-600 transition-all shadow-md text-center"
              >
                Contact Support
              </Link>
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
              <h2 className="text-3xl font-bold text-slate-800">
                Booking & Payments
              </h2>
            </div>
            <button
              onClick={() => toggleSection("payment")}
              className="p-2 hover:bg-white/60 rounded-lg transition-all"
            >
              {expandedSection === "payment" ? (
                <ChevronUp className="w-6 h-6" />
              ) : (
                <ChevronDown className="w-6 h-6" />
              )}
            </button>
          </div>

          <div className="space-y-4">
            {!upcomingBooking ? (
              <div className="bg-white rounded-xl p-4 border-2 border-slate-200">
                <p className="text-base text-slate-600">
                  No active booking yet. Book a trip to see payment details.
                </p>
              </div>
            ) : (
              <>
                <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-bold text-slate-800">
                      Payment Status
                    </span>
                    <span className="px-4 py-1 bg-green-500 text-white rounded-full text-sm font-bold">
                      {normalizeStatus(upcomingBooking.payment_status, "Pending")}
                    </span>
                  </div>
                  <p className="text-base text-slate-600">
                    Total:{" "}
                    {formatMoney(
                      upcomingBooking.total_amount ?? upcomingBooking.trip?.price,
                      upcomingBooking.currency
                    ) || "—"}
                    {" • "}
                    Paid:{" "}
                    {upcomingBooking.paid_at
                      ? formatTripDate(upcomingBooking.paid_at)
                      : "Not yet"}
                  </p>
                </div>

                {expandedSection === "payment" && (
                  <div className="space-y-3 animate-fade-in">
                    <div className="bg-white rounded-xl p-4 border-2 border-slate-200">
                      <h3 className="text-lg font-bold text-slate-800 mb-2">
                        Discounts & Fees
                      </h3>
                      <p className="text-base text-slate-600">
                        {upcomingBooking.discount_percent ||
                        upcomingBooking.discount_amount
                          ? `Discount: ${upcomingBooking.discount_percent || 0}% (${formatMoney(
                              upcomingBooking.discount_amount,
                              upcomingBooking.currency
                            ) || "—"})`
                          : "No discounts applied."}
                      </p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-2 border-slate-200">
                      <h3 className="text-lg font-bold text-slate-800 mb-2">
                        Payment Method
                      </h3>
                      <p className="text-base text-slate-600">
                        {upcomingBooking.payment_method || "Not specified"}
                      </p>
                    </div>
                  </div>
                )}

                <Link
                  to="/my-trips"
                  className="w-full px-6 py-4 bg-white border-2 border-slate-300 text-slate-700 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all text-center"
                >
                  View Booking Details
                </Link>
              </>
            )}
          </div>
        </GlassCard>

        {/* 4. ITINERARY */}
        <GlassCard hover={false}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-purple-400 to-pink-500 p-3 rounded-2xl">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-slate-800">
                Detailed Itinerary
              </h2>
            </div>
            <button
              onClick={() => toggleSection("itinerary")}
              className="p-2 hover:bg-white/60 rounded-lg transition-all"
            >
              {expandedSection === "itinerary" ? (
                <ChevronUp className="w-6 h-6" />
              ) : (
                <ChevronDown className="w-6 h-6" />
              )}
            </button>
          </div>

          <div className="space-y-3">
            {!upcomingBooking ? (
              <div className="bg-white rounded-xl p-4 border-2 border-slate-200">
                <p className="text-base text-slate-600">
                  Book a trip to see your itinerary.
                </p>
              </div>
            ) : (
              <>
                <div className="bg-purple-50 rounded-xl p-4 border-2 border-purple-200">
                  <h3 className="text-lg font-bold text-slate-800 mb-1">
                    {upcomingBooking.trip?.title || "Upcoming Trip"}
                  </h3>
                  <p className="text-base text-slate-600">
                    {upcomingBooking.trip?.description ||
                      "Itinerary details will appear here."}
                  </p>
                </div>

                {expandedSection === "itinerary" && (
                  <div className="space-y-3 animate-fade-in">
                    <div className="bg-white rounded-xl p-4 border-2 border-slate-200">
                      <h3 className="text-lg font-bold text-slate-800 mb-1">
                        Dates
                      </h3>
                      <p className="text-base text-slate-600">
                        {formatTripDate(upcomingBooking.trip?.start_date)} -{" "}
                        {formatTripDate(upcomingBooking.trip?.end_date)}
                      </p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-2 border-slate-200">
                      <h3 className="text-lg font-bold text-slate-800 mb-1">
                        Destination
                      </h3>
                      <p className="text-base text-slate-600">
                        {itineraryLocations.length
                          ? itineraryLocations.join(", ")
                          : "Destination details pending"}
                      </p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-2 border-slate-200">
                      <h3 className="text-lg font-bold text-slate-800 mb-1">
                        Booking Reference
                      </h3>
                      <p className="text-base text-slate-600">
                        {upcomingBooking.payment_reference || "Not available"}
                      </p>
                    </div>
                  </div>
                )}

                <Link
                  to="/my-trips"
                  className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold text-lg hover:from-purple-600 hover:to-pink-600 transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Printer className="w-5 h-5" />
                  View Itinerary
                </Link>
              </>
            )}
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
              <h2 className="text-3xl font-bold text-slate-800">
                Travel Community
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl p-5 border-2 border-rose-200">
                <Camera className="w-6 h-6 text-rose-600 mb-3" />
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  Share Your Photos
                </h3>
                <p className="text-base text-slate-600 mb-4">
                  Upload and share memories with fellow travelers
                </p>
                <Link
                  to="/pictures/upload"
                  className="w-full px-5 py-3 bg-rose-500 text-white rounded-xl font-semibold hover:bg-rose-600 transition-all text-center"
                >
                  Upload Photos
                </Link>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-5 border-2 border-blue-200">
                <MessageSquare className="w-6 h-6 text-blue-600 mb-3" />
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  Connect with Travelers
                </h3>
                <p className="text-base text-slate-600 mb-4">
                  Meet your fellow South Africa group members
                </p>
                <button className="w-full px-5 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-all">
                  View Group Chat
                </button>
              </div>
            </div>

            <div className="bg-amber-50 rounded-xl p-4 border-2 border-amber-200">
              <div className="flex items-start gap-3">
                <FileText className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-800 mb-1">
                    Share Your Feedback
                  </h3>
                  <p className="text-base text-slate-600 mb-3">
                    Help us improve! Share your thoughts and suggestions.
                  </p>
                  <Link
                    to="/feedback"
                    className="px-5 py-2 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600 transition-all text-center inline-block"
                  >
                    Leave Feedback
                  </Link>
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
              <h2 className="text-3xl font-bold text-slate-800">
                Accessibility
              </h2>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-xl p-4 border-2 border-slate-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Type className="w-5 h-5 text-slate-600" />
                    <span className="text-lg font-bold text-slate-800">
                      Text Size
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => adjustTextSize("small")}
                    className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all ${
                      textSize === "small"
                        ? "bg-indigo-500 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    A
                  </button>
                  <button
                    onClick={() => adjustTextSize("medium")}
                    className={`flex-1 px-4 py-3 rounded-xl font-semibold text-lg transition-all ${
                      textSize === "medium"
                        ? "bg-indigo-500 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    A
                  </button>
                  <button
                    onClick={() => adjustTextSize("large")}
                    className={`flex-1 px-4 py-3 rounded-xl font-semibold text-xl transition-all ${
                      textSize === "large"
                        ? "bg-indigo-500 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
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
                    <span className="text-lg font-bold text-slate-800">
                      High Contrast
                    </span>
                  </div>
                  <button
                    onClick={() => setHighContrast(!highContrast)}
                    className={`w-16 h-9 rounded-full transition-all ${
                      highContrast ? "bg-indigo-500" : "bg-slate-300"
                    }`}
                  >
                    <div
                      className={`w-7 h-7 bg-white rounded-full transition-transform ${
                        highContrast ? "translate-x-8" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 border-2 border-slate-200">
                <div className="flex items-center gap-2 mb-3">
                  <Volume2 className="w-5 h-5 text-slate-600" />
                  <span className="text-lg font-bold text-slate-800">
                    Voice Guidance
                  </span>
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
          <h2 className="text-3xl font-bold text-slate-800 mb-3">
            Need Help or Have Questions?
          </h2>
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
        </>
      )}
    </div>
  );
}
