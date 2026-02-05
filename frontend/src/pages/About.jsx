import GlassCard from "../components/GlassCard.jsx";
import { Target, Compass, UserPlus } from "lucide-react";

export default function About() {
  return (
    <div className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-amber-900 mb-6">
          About AgeWatchAfrica
        </h1>
        <p className="text-xl text-amber-800 max-w-3xl mx-auto leading-relaxed">
          We believe that age brings wisdom, and travel should honor that
          journey. AgeWatchAfrica creates extraordinary African experiences
          tailored for seniors who value comfort, safety, and cultural
          enrichment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <GlassCard>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-4">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-amber-900 mb-3">
              Our Mission
            </h3>
            <p className="text-lg text-amber-800 leading-relaxed">
              To provide safe, comfortable, and culturally rich travel
              experiences that celebrate the wisdom and dignity of senior
              travelers.
            </p>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center mb-4">
              <Compass className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-amber-900 mb-3">
              Our Vision
            </h3>
            <p className="text-lg text-amber-800 leading-relaxed">
              To be Africa's premier senior travel partner, creating
              meaningful connections between generations and cultures.
            </p>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center mb-4">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-amber-900 mb-3">
              Our Values
            </h3>
            <p className="text-lg text-amber-800 leading-relaxed">
              Respect, safety, authenticity, and personalized care guide every
              journey we design.
            </p>
          </div>
        </GlassCard>
      </div>

      <GlassCard className="mt-12" hover={false}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold text-amber-900 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-lg text-amber-800 leading-relaxed mb-4">
              With years of experience in senior care and African tourism,
              we understand the unique needs of mature travelers. Our team
              includes healthcare professionals, local guides, and travel
              experts who work together to create unforgettable experiences.
            </p>
            <ul className="space-y-3 text-amber-800">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-amber-500 rounded-full mr-3"></div>
                24/7 support throughout your journey
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-amber-500 rounded-full mr-3"></div>
                Medical-aware travel planning
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-amber-500 rounded-full mr-3"></div>
                Small group sizes for comfort
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-amber-500 rounded-full mr-3"></div>
                Cultural immersion experiences
              </li>
            </ul>
          </div>
          <div className="rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1524863479829-916d8e77f114?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW5pb3IlMjB0cmF2ZWwlMjBzdW5zZXR8ZW58MXx8fHwxNzcwMjM2NzM0fDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Senior travelers enjoying sunset"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
