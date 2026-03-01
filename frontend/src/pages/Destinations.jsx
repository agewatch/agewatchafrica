import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import GlassCard from "../components/GlassCard.jsx";
import { MapPin, ChevronDown, ChevronUp, Leaf, Camera, Palette } from "lucide-react";
import ImageWithFallback from "../components/figma/ImageWithFallback.jsx";
import DestinationModal from "../components/DestinationModal.jsx";

// Category configuration
const categories = [
  { id: "all", label: "All Destinations", icon: MapPin },
  { id: "wellness", label: "Wellness & Nature", icon: Leaf },
  { id: "safari", label: "Safari", icon: Camera },
  { id: "cultural", label: "Cultural", icon: Palette }
];

const categoryColors = {
  wellness: "bg-emerald-100 text-emerald-700 border-emerald-300",
  safari: "bg-amber-100 text-amber-700 border-amber-300",
  cultural: "bg-rose-100 text-rose-700 border-rose-300"
};

const destinations = [
  {
    name: "Serengeti Safari",
    location: "Tanzania",
    category: "safari",
    image:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXJlbmdldGklMjBzYWZhcmklMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzcwMjM2NzM0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXJlbmdldGklMjBzYWZhcmklMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzcwMjM2NzM0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1544948503-7ad532e71046?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWxlJTIwcml2ZXIlMjBjcnVpc2V8ZW58MXx8fHwxNzcwMjM2NzM0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx6YW56aWJhciUyMGJlYWNoJTIwdHJvcGljYWx8ZW58MXx8fHwxNzcwMjM2NzM0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NvJTIwbWVkaW5hfGVufDF8fHx8MTc3MDIzNjczNHww&ixlib=rb-4.1.0&q=80&w=1080"
    ],
    description:
      "Experience the world's most famous wildlife reserve with comfortable lodges and expert guides.",
    detailedDescription: `The Serengeti is one of the most celebrated wildlife sanctuaries in the world, spanning over 14,750 square kilometers of pristine African savanna. Our senior-friendly safari experience combines the thrill of wildlife viewing with the comfort and care you deserve.

Journey across endless golden plains where millions of wildebeest, zebras, and gazelles participate in the greatest wildlife spectacle on Earth – the Great Migration. Our experienced guides ensure comfortable game drives in specially modified vehicles with easy access and cushioned seating.

Stay in carefully selected lodges that offer accessibility features, medical support on standby, and gourmet cuisine tailored to dietary requirements. Each day brings new wonders – from majestic elephants at watering holes to lions basking in the African sun.`,
    quickInfo: {
      bestTime: "June - October",
      groupSize: "8-12 travelers",
      rating: "4.9/5 (127 reviews)"
    },
    highlights: [
      "Great Migration viewing",
      "Luxury lodge accommodation",
      "Expert wildlife guides",
      "Medical support available",
      "Accessible vehicle transfers",
      "Sunset cocktail experiences"
    ]
  },
  {
    name: "Cape Town Heritage",
    location: "South Africa",
    category: "cultural",
    image:
      "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXBlJTIwdG93biUyMHZpZXd8ZW58MXx8fHwxNzcwMjM2NzM0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXBlJTIwdG93biUyMHZpZXd8ZW58MXx8fHwxNzcwMjM2NzM0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1582711012124-a56cf82307a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaGFuYSUyMGNhc3RsZXxlbnwwfHx8fDE3NzAyMzY3MzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXJlbmdldGklMjBzYWZhcmklMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzcwMjM2NzM0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NvJTIwbWVkaW5hfGVufDF8fHx8MTc3MDIzNjczNHww&ixlib=rb-4.1.0&q=80&w=1080"
    ],
    description:
      "Discover rich history, stunning landscapes, and vibrant culture in South Africa's mother city.",
    detailedDescription: `Cape Town, nestled between the iconic Table Mountain and the sparkling Atlantic Ocean, offers an unparalleled blend of natural beauty, rich history, and vibrant culture. Our heritage tour is designed with senior travelers in mind, ensuring comfort without compromising on authentic experiences.

Ascend Table Mountain via the revolving cable car for breathtaking 360-degree views of the city and coastline. Explore the historic Bo-Kaap neighborhood with its colorful houses and Cape Malay heritage. Visit Robben Island to learn about South Africa's journey to democracy, with priority access and comfortable seating arrangements.

The Cape Winelands await with gentle tastings at historic estates, where you'll savor world-renowned wines amid stunning mountain scenery. Our carefully paced itinerary includes plenty of rest time and always features accessible options.`,
    quickInfo: {
      bestTime: "October - April",
      groupSize: "10-14 travelers",
      rating: "4.8/5 (98 reviews)"
    },
    highlights: [
      "Table Mountain cable car",
      "Robben Island tour",
      "Cape Winelands tasting",
      "Bo-Kaap cultural walk",
      "Kirstenbosch Gardens visit",
      "Seafood dining experiences"
    ]
  },
  {
    name: "Nile River Cruise",
    location: "Egypt",
    category: "cultural",
    image:
      "https://images.unsplash.com/photo-1544948503-7ad532e71046?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWxlJTIwcml2ZXIlMjBjcnVpc2V8ZW58MXx8fHwxNzcwMjM2NzM0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1544948503-7ad532e71046?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWxlJTIwcml2ZXIlMjBjcnVpc2V8ZW58MXx8fHwxNzcwMjM2NzM0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXBlJTIwdG93biUyMHZpZXd8ZW58MXx8fHwxNzcwMjM2NzM0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx6YW56aWJhciUyMGJlYWNoJTIwdHJvcGljYWx8ZW58MXx8fHwxNzcwMjM2NzM0fDA&ixlib=rb-4.1.0&q=80&w=1080"
    ],
    description:
      "Sail through ancient history with luxury accommodations and guided tours of historic sites.",
    detailedDescription: `Embark on a timeless journey along the legendary Nile River, where ancient pharaohs once sailed and monuments have stood for millennia. Our luxury Nile cruise combines five-star comfort with expert Egyptology, creating an unforgettable voyage through 5,000 years of history.

Your floating hotel features spacious cabins with private balconies, allowing you to watch the Egyptian landscape drift by from the comfort of your room. On-board amenities include a swimming pool, spa services, and gourmet dining featuring both international and traditional Egyptian cuisine.

Explore the temples of Luxor and Karnak, the Valley of the Kings, and the magnificent temple of Philae. Each excursion is thoughtfully scheduled during cooler hours, with wheelchair-accessible options and plenty of shaded rest areas. Our expert guides bring ancient history to life with engaging storytelling.`,
    quickInfo: {
      bestTime: "October - April",
      groupSize: "20-30 travelers",
      rating: "4.9/5 (156 reviews)"
    },
    highlights: [
      "Luxor Temple by night",
      "Valley of the Kings",
      "Temple of Karnak",
      "Edfu & Kom Ombo temples",
      "Onboard entertainment",
      "Private balcony cabins"
    ]
  },
  {
    name: "Morocco Wellness Retreat",
    location: "Morocco",
    category: "wellness",
    image:
      "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NvJTIwbWVkaW5hfGVufDF8fHx8MTc3MDIzNjczNHww&ixlib=rb-4.1.0&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NvJTIwbWVkaW5hfGVufDF8fHx8MTc3MDIzNjczNHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXJlbmdldGklMjBzYWZhcmklMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzcwMjM2NzM0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1582711012124-a56cf82307a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaGFuYSUyMGNhc3RsZXxlbnwwfHx8fDE3NzAyMzY3MzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1544948503-7ad532e71046?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWxlJTIwcml2ZXIlMjBjcnVpc2V8ZW58MXx8fHwxNzcwMjM2NzM0fDA&ixlib=rb-4.1.0&q=80&w=1080"
    ],
    description:
      "Rejuvenate in peaceful riads with spa treatments and gentle cultural experiences.",
    detailedDescription: `Escape to Morocco for a transformative wellness journey that nurtures body, mind, and spirit. Stay in exquisite traditional riads – elegant courtyard houses converted into intimate boutique hotels – where tranquility meets authentic Moroccan hospitality.

Begin each day with gentle yoga sessions in fragrant garden courtyards, followed by nourishing breakfasts of fresh fruits, traditional msemen pancakes, and aromatic mint tea. Afternoons bring traditional hammam spa treatments, where centuries-old bathing rituals cleanse and rejuvenate.

Experience Marrakech's famous Jemaa el-Fnaa square at your own pace, explore the serene Majorelle Garden, and participate in a traditional cooking class. Our wellness-focused itinerary emphasizes relaxation and gentle exploration, with plenty of free time to simply enjoy the peaceful atmosphere of your riad.`,
    quickInfo: {
      bestTime: "March - May, Sept - Nov",
      groupSize: "6-10 travelers",
      rating: "4.7/5 (84 reviews)"
    },
    highlights: [
      "Traditional hammam spa",
      "Yoga & meditation sessions",
      "Moroccan cooking class",
      "Majorelle Garden visit",
      "Medina guided walks",
      "Riad courtyard dining"
    ]
  },
  {
    name: "Ghana Heritage Trail",
    location: "Ghana",
    category: "cultural",
    image:
      "https://images.unsplash.com/photo-1582711012124-a56cf82307a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaGFuYSUyMGNhc3RsZXxlbnwwfHx8fDE3NzAyMzY3MzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1582711012124-a56cf82307a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaGFuYSUyMGNhc3RsZXxlbnwwfHx8fDE3NzAyMzY3MzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXBlJTIwdG93biUyMHZpZXd8ZW58MXx8fHwxNzcwMjM2NzM0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx6YW56aWJhciUyMGJlYWNoJTIwdHJvcGljYWx8ZW58MXx8fHwxNzcwMjM2NzM0fDA&ixlib=rb-4.1.0&q=80&w=1080"
    ],
    description:
      "Connect with history and heritage through meaningful visits and local community engagement.",
    detailedDescription: `The Ghana Heritage Trail offers a profound journey of discovery and connection, tracing the footsteps of history while celebrating the vibrant culture and warm hospitality of modern Ghana. This thoughtfully designed experience honors the past while embracing hope and healing.

Visit the UNESCO World Heritage coastal castles of Cape Coast and Elmina, where expert guides provide sensitive, educational tours of these significant historical sites. The "Door of Return" ceremony at Cape Coast Castle offers a powerful moment of reflection and reconciliation.

Beyond the historical sites, immerse yourself in the joyful spirit of Ghana. Visit local artisan villages to see traditional kente cloth weaving, participate in a traditional naming ceremony, and share meals with local families. Our itinerary balances meaningful historical exploration with uplifting cultural celebrations.`,
    quickInfo: {
      bestTime: "November - March",
      groupSize: "10-15 travelers",
      rating: "4.9/5 (72 reviews)"
    },
    highlights: [
      "Cape Coast Castle tour",
      "Elmina Castle visit",
      "Kente weaving village",
      "Traditional naming ceremony",
      "Local community meals",
      "Accra city exploration"
    ]
  },
  {
    name: "Zanzibar Island Escape",
    location: "Tanzania",
    category: "wellness",
    image:
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx6YW56aWJhciUyMGJlYWNoJTIwdHJvcGljYWx8ZW58MXx8fHwxNzcwMjM2NzM0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx6YW56aWJhciUyMGJlYWNoJTIwdHJvcGljYWx8ZW58MXx8fHwxNzcwMjM2NzM0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NvJTIwbWVkaW5hfGVufDF8fHx8MTc3MDIzNjczNHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1544948503-7ad532e71046?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWxlJTIwcml2ZXIlMjBjcnVpc2V8ZW58MXx8fHwxNzcwMjM2NzM0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXJlbmdldGklMjBzYWZhcmklMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzcwMjM2NzM0fDA&ixlib=rb-4.1.0&q=80&w=1080"
    ],
    description:
      "Relax on pristine beaches with gentle activities and luxury resort accommodations.",
    detailedDescription: `Zanzibar, the legendary Spice Island, offers the perfect finale to any African adventure or a standalone tropical retreat. This exotic archipelago combines pristine white sand beaches, crystal-clear turquoise waters, and a fascinating cultural heritage influenced by Arab, Persian, Indian, and African traditions.

Your luxury beachfront resort provides the ultimate in relaxation with direct beach access, infinity pools overlooking the Indian Ocean, and world-class spa facilities. Each day unfolds at your own pace – perhaps a gentle morning swim, followed by a spice tour through fragrant plantations, or simply relaxing with a good book in a shaded beach cabana.

Explore the UNESCO-listed Stone Town, a maze of narrow streets filled with historic buildings, bustling bazaars, and aromatic food markets. Take a sunset dhow cruise on traditional wooden sailing boats, visit a local spice farm, or simply let the warm tropical breezes carry your cares away.`,
    quickInfo: {
      bestTime: "June - October",
      groupSize: "Any size",
      rating: "4.8/5 (143 reviews)"
    },
    highlights: [
      "Luxury beach resort stay",
      "Stone Town walking tour",
      "Spice plantation visit",
      "Sunset dhow cruise",
      "Snorkeling excursions",
      "Fresh seafood dining"
    ]
  },
  {
    name: "Nairobi Giraffe Centre",
    location: "Kenya",
    category: "cultural",
    image:
      "https://images.unsplash.com/photo-1549854233-ca0baec6fa74?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: [
      "https://images.unsplash.com/photo-1549854233-ca0baec6fa74?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1577114995803-d8ce0e2b4aa9?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    description: "Senior tourism destination in Kenya.",
    detailedDescription: "Nairobi Giraffe Centre.",
    quickInfo: {
      bestTime: "TBD",
      groupSize: "TBD",
      rating: "TBD"
    },
    highlights: ["Nairobi Giraffe Centre"]
  },
  {
    name: "Nairobi Elephant Orphanage",
    location: "Kenya",
    category: "cultural",
    image:
      "https://images.unsplash.com/photo-1702509416553-c0dc86bb173c?q=80&w=1071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: [
      "https://images.unsplash.com/photo-1702509416553-c0dc86bb173c?q=80&w=1071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1641299916717-a5879e5bbe96?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    description: "Senior tourism destination in Kenya.",
    detailedDescription: "Nairobi Elephant Orphanage.",
    quickInfo: {
      bestTime: "TBD",
      groupSize: "TBD",
      rating: "TBD"
    },
    highlights: ["Nairobi Elephant Orphanage"]
  },
  {
    name: "Maasai Mara National Reserve",
    location: "Kenya",
    category: "safari",
    image:
      "https://images.unsplash.com/photo-1535940587896-3a4e0ce292f4?q=80&w=1204&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: [
      "https://images.unsplash.com/photo-1535940587896-3a4e0ce292f4?q=80&w=1204&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1569691106162-cfdf73228d43?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    description: "Senior tourism destination in Kenya.",
    detailedDescription: "Maasai Mara National Reserve.",
    quickInfo: {
      bestTime: "TBD",
      groupSize: "TBD",
      rating: "TBD"
    },
    highlights: ["Maasai Mara National Reserve"]
  },
  {
    name: "Lake Nakuru National Park",
    location: "Kenya",
    category: "safari",
    image:
      "https://images.unsplash.com/photo-1609848997238-464b7e28e17d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: [
      "https://images.unsplash.com/photo-1609848997238-464b7e28e17d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1609848930155-cd505cf3cd38?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    description: "Senior tourism destination in Kenya.",
    detailedDescription: "Lake Nakuru National Park.",
    quickInfo: {
      bestTime: "TBD",
      groupSize: "TBD",
      rating: "TBD"
    },
    highlights: ["Lake Nakuru National Park"]
  },
  {
    name: "Diani Beach",
    location: "Kenya",
    category: "wellness",
    image:
      "https://images.unsplash.com/photo-1594471630864-11bad9e74271?q=80&w=1329&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: [
      "https://images.unsplash.com/photo-1594471630864-11bad9e74271?q=80&w=1329&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1579498615226-0b4641f02a77?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    description: "Senior tourism destination in Kenya.",
    detailedDescription: "Diani Beach.",
    quickInfo: {
      bestTime: "TBD",
      groupSize: "TBD",
      rating: "TBD"
    },
    highlights: ["Diani Beach"]
  },
  {
    name: "Amboseli National Park",
    location: "Tanzania",
    category: "safari",
    image:
      "https://images.unsplash.com/photo-1592670130129-4388cdb9d76e?q=80&w=1431&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: [
      "https://images.unsplash.com/photo-1592670130129-4388cdb9d76e?q=80&w=1431&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1648982156491-992b4b1d1060?q=80&w=1360&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    description: "Senior tourism destination in Tanzania.",
    detailedDescription: "Amboseli National Park.",
    quickInfo: {
      bestTime: "TBD",
      groupSize: "TBD",
      rating: "TBD"
    },
    highlights: ["Amboseli National Park"]
  },
  {
    name: "Source of the Nile Boat Cruise",
    location: "Uganda",
    category: "wellness",
    image:
      "https://images.unsplash.com/photo-1723997332510-35d144b44a50?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: [
      "https://images.unsplash.com/photo-1723997332510-35d144b44a50?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1713300530540-de1a5d182e94?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    description: "Senior tourism destination in Uganda.",
    detailedDescription: "Source of the Nile Boat Cruise.",
    quickInfo: {
      bestTime: "TBD",
      groupSize: "TBD",
      rating: "TBD"
    },
    highlights: ["Source of the Niele Boat Cruise"]
  },
  {
    name: "Entebbe Zoo",
    location: "Uganda",
    category: "cultural",
    image:
      "https://images.unsplash.com/flagged/photo-1566127992631-137a642a90f4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: [
      "https://images.unsplash.com/flagged/photo-1566127992631-137a642a90f4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1579786419323-980ee401051b?q=80&w=708&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    description: "Senior tourism destination in Uganda.",
    detailedDescription: "Entebbe Zoo.",
    quickInfo: {
      bestTime: "TBD",
      groupSize: "TBD",
      rating: "TBD"
    },
    highlights: ["Entebbe Zoo"]
  },
  {
    name: "Murchison Falls Park Safari with Boat Cruise",
    location: "Uganda",
    category: "safari",
    image:
      "https://images.unsplash.com/photo-1494472155656-f34e81b17ddc?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: [
      "https://images.unsplash.com/photo-1494472155656-f34e81b17ddc?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1632860776949-70b2a0f30205?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    description: "Senior tourism destination in Uganda.",
    detailedDescription: "Murchison Falls Park Safari with Boat Cruise.",
    quickInfo: {
      bestTime: "TBD",
      groupSize: "TBD",
      rating: "TBD"
    },
    highlights: ["Murchison Falls Park Safari with Boat Cruise"]
  },
  {
    name: "Pristine White Beaches",
    location: "Zanzibar",
    category: "wellness",
    image:
      "https://images.unsplash.com/photo-1692895975768-11bc8a3fdf8f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: [
      "https://images.unsplash.com/photo-1692895975768-11bc8a3fdf8f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1746047064261-42964bd9ac3a?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    description: "Senior tourism destination in Zanzibar.",
    detailedDescription: "Pristine White Beaches.",
    quickInfo: {
      bestTime: "TBD",
      groupSize: "TBD",
      rating: "TBD"
    },
    highlights: ["Pistine White Beaches"]
  },
  {
    name: "Safari Blue Cruise",
    location: "Zanzibar",
    category: "wellness",
    image:
      "https://images.unsplash.com/photo-1620896712848-d05411ec91ec?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: [
      "https://images.unsplash.com/photo-1620896712848-d05411ec91ec?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1683322753580-6bf07759dbfe?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    description: "Senior tourism destination in Zanzibar.",
    detailedDescription: "Safari Blue Cruise.",
    quickInfo: {
      bestTime: "TBD",
      groupSize: "TBD",
      rating: "TBD"
    },
    highlights: ["Safari Blue Cruise"]
  }
];

export default function Destinations() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mapExpanded, setMapExpanded] = useState(false);
  
  // Get category from URL params, default to "all"
  const activeCategory = searchParams.get("category") || "all";

  // Filter destinations based on selected category
  const filteredDestinations = activeCategory === "all" 
    ? destinations 
    : destinations.filter(d => d.category === activeCategory);

  const handleCategoryChange = (categoryId) => {
    if (categoryId === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ category: categoryId });
    }
  };

  const handleCardClick = (destination) => {
    setSelectedDestination(destination);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDestination(null);
  };

  // Scroll to top when category changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeCategory]);

  return (
    <div className="animate-fade-in">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-amber-100/50 to-orange-100/50 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-amber-900 mb-6">
            Explore Our Destinations
          </h1>
          <p className="text-xl text-amber-800 max-w-3xl mx-auto leading-relaxed">
            Discover our carefully selected destinations across Africa, each
            chosen for their cultural richness, accessibility, and senior-friendly
            accommodations.
          </p>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-amber-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 py-4">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-full text-base sm:text-lg font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg scale-105"
                      : "bg-white/60 text-amber-800 hover:bg-white hover:shadow-md border border-amber-200"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden sm:inline">{cat.label}</span>
                  <span className="sm:hidden">{cat.id === "all" ? "All" : cat.label.split(" ")[0]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p className="text-lg text-amber-700">
          Showing <span className="font-semibold text-amber-900">{filteredDestinations.length}</span> destination{filteredDestinations.length !== 1 ? 's' : ''}
          {activeCategory !== "all" && (
            <span> in <span className="font-semibold text-amber-900">{categories.find(c => c.id === activeCategory)?.label}</span></span>
          )}
        </p>
      </div>

      {/* Destination Cards - Senior Friendly Large Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredDestinations.map((destination, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(destination)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleCardClick(destination);
                }
              }}
              role="button"
              tabIndex={0}
              className="cursor-pointer focus:outline-none focus:ring-4 focus:ring-amber-400 focus:ring-offset-2 rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <GlassCard className="h-full overflow-hidden p-0">
                <div className="flex flex-col md:flex-row h-full">
                  {/* Image Section */}
                  <div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden">
                    <ImageWithFallback
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    {/* Category Badge */}
                    <span className={`absolute top-4 left-4 px-4 py-2 rounded-full text-sm font-semibold border ${categoryColors[destination.category]}`}>
                      {destination.category.charAt(0).toUpperCase() + destination.category.slice(1)}
                    </span>
                  </div>
                  
                  {/* Content Section */}
                  <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-amber-900 mb-3">
                        {destination.name}
                      </h3>
                      <div className="flex items-center text-amber-700 mb-4 text-lg">
                        <MapPin className="w-5 h-5 mr-2" />
                        <span>{destination.location}</span>
                      </div>
                      <p className="text-lg text-amber-800 leading-relaxed mb-4">
                        {destination.description}
                      </p>
                      
                      {/* Quick Info */}
                      <div className="grid grid-cols-1 gap-2 text-base text-amber-700">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Best time:</span> {destination.quickInfo.bestTime}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Group:</span> {destination.quickInfo.groupSize}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-amber-600 font-semibold text-lg">
                        Tap to explore →
                      </span>
                      <span className="text-sm bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
                        {destination.quickInfo.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredDestinations.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-amber-800 mb-4">No destinations found in this category.</p>
            <button
              onClick={() => handleCategoryChange("all")}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold hover:from-amber-600 hover:to-orange-600 transition-all"
            >
              View All Destinations
            </button>
          </div>
        )}
      </div>

      {/* Collapsible Map Section */}
      <div className="bg-gradient-to-r from-amber-100/50 to-orange-100/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setMapExpanded(!mapExpanded)}
            className="w-full flex items-center justify-between p-6 bg-white/60 rounded-2xl hover:bg-white/80 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-xl sm:text-2xl font-bold text-amber-900">
                  View Destinations on Map
                </h3>
                <p className="text-amber-700">See where our adventures take you across Africa</p>
              </div>
            </div>
            {mapExpanded ? (
              <ChevronUp className="w-8 h-8 text-amber-600" />
            ) : (
              <ChevronDown className="w-8 h-8 text-amber-600" />
            )}
          </button>
          
          {/* Expandable Map Content */}
          <div className={`transition-all duration-500 overflow-hidden ${mapExpanded ? 'max-h-[600px] mt-6 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="rounded-2xl overflow-hidden shadow-xl h-[400px] sm:h-[500px]">
              <iframe
                title="AgeWatchAfrica Destinations"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d16294774.036307007!2d20.0!3d0.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182780d08db3b663%3A0x298f2c9a5f4ef4e5!2sKenya!5e0!3m2!1sen!2s!4v1650000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Custom Trip CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <GlassCard className="mt-0" hover={false}>
          <div className="text-center p-4 sm:p-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-amber-900 mb-4">
              Custom Destinations Available
            </h2>
            <p className="text-lg sm:text-xl text-amber-800 mb-8 max-w-2xl mx-auto">
              Don't see your dream destination? We create custom itineraries for
              any African location with the same care and attention to senior
              travelers.
            </p>
            <button className="px-10 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white text-lg font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
              Request Custom Trip
            </button>
          </div>
        </GlassCard>
      </div>

      {/* Destination Modal */}
      <DestinationModal
        destination={selectedDestination}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
