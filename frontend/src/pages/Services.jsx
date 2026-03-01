import GlassCard from "../components/GlassCard.jsx";

const servicesOffered = [
  {
    title: "Senior tourism",
    description:
      "Senior-friendly travel planning with accessible experiences and a comfortable pace.",
    includes: [
      "Accessible itineraries",
      "Gentle pacing and rest stops",
      "Assisted mobility support"
    ]
  },
  {
    title: "Meditourism consultancy",
    description:
      "Guidance for clients who travel for medical or wellness services, with safety and continuity of care in mind.",
    includes: ["Provider coordination", "Travel logistics", "Care continuity planning"]
  },
  {
    title: "Travel guide and consultancy",
    description:
      "Local insight, planning support, and on-the-ground guidance for smooth, stress-free trips.",
    includes: ["Destination briefings", "Local logistics", "Trusted guide support"]
  },
  {
    title: "Caregiver training",
    description:
      "Practical, hands-on training for caregivers supporting older adults at home or while traveling.",
    includes: ["Basic geriatric care", "Safety and mobility", "Compassionate communication"]
  },
  {
    title: "Pre-retirement planning training",
    description:
      "Workshops that prepare individuals for a healthy, active, and financially mindful retirement.",
    includes: ["Lifestyle planning", "Wellness readiness", "Family support planning"]
  },
  {
    title: "Geriatric medical and wellness services",
    description:
      "Supportive services focused on health maintenance, prevention, and well-being in later life.",
    includes: ["Wellness check-ins", "Health referrals", "Preventive guidance"]
  }
];

const processSteps = [
  {
    title: "Consultation",
    description: "We understand goals, health considerations, and preferences."
  },
  {
    title: "Personalized plan",
    description: "We design a tailored plan aligned to comfort and needs."
  },
  {
    title: "Ongoing support",
    description: "We stay available before, during, and after your journey."
  }
];

export default function Services() {
  return (
    <div className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-amber-900 mb-6">
          Services Offered
        </h1>
        <p className="text-xl text-amber-800 max-w-3xl mx-auto leading-relaxed">
          Here is a clear overview of the services we provide.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {servicesOffered.map((service) => (
          <GlassCard key={service.title}>
            <div>
              <h3 className="text-2xl font-bold text-amber-900 mb-3">
                {service.title}
              </h3>
              <p className="text-lg text-amber-800 leading-relaxed mb-4">
                {service.description}
              </p>
              <ul className="space-y-2 text-amber-800">
                {service.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 w-2 h-2 rounded-full bg-amber-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="mt-12" hover={false}>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-amber-900 mb-4">
            How we work
          </h2>
          <p className="text-lg text-amber-800 mb-8 max-w-2xl mx-auto">
            A simple, respectful process designed for clarity and confidence.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {processSteps.map((step) => (
              <div key={step.title} className="p-4 rounded-xl bg-white/60">
                <h3 className="text-xl font-semibold text-amber-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-amber-800">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>

      <GlassCard className="mt-12" hover={false}>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-amber-900 mb-4">
            Need more details?
          </h2>
          <p className="text-lg text-amber-800 mb-6 max-w-2xl mx-auto">
            Contact us for a tailored discussion based on your needs.
          </p>
          <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5">
            Get in touch
          </button>
        </div>
      </GlassCard>
    </div>
  );
}
