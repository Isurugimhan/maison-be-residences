import React from "react";
import { Waves, Flame, Dumbbell, Briefcase, Film, UserCheck, ShieldCheck, TreePine } from "lucide-react";

export const Amenities: React.FC = () => {
  const amenities = [
    {
      icon: Waves,
      title: "Horizon Infinity Pool",
      desc: "Elevated temperature-controlled horizon pool with panoramic skyline vistas and private resident cabanas.",
    },
    {
      icon: Flame,
      title: "Thermal Spa & Steam",
      desc: "Private rejuvenation suites, Finnish cedar saunas, steam rooms, and hydrotherapy vitality plunge pools.",
    },
    {
      icon: Dumbbell,
      title: "Technogym Studio",
      desc: "State-of-the-art cardiovascular and strength training equipment with dedicated Pilates reformers and private trainer zone.",
    },
    {
      icon: Briefcase,
      title: "Executive Boardroom",
      desc: "Ultra-high-speed fiber, conference audio-visual facilities, private podcast studios, and meeting lounges.",
    },
    {
      icon: Film,
      title: "Private Screening Room",
      desc: "Dolby Atmos 18-seat private cinema suite for resident entertainment, sports viewings, and family screenings.",
    },
    {
      icon: UserCheck,
      title: "24/7 Dedicated Concierge",
      desc: "White-glove hospitality management, resident parcel handling, airport transfers, and private valet parking.",
    },
    {
      icon: ShieldCheck,
      title: "Biometric Multi-Tier Security",
      desc: "Touchless facial recognition entry, 24/7 CCTV surveillance, and secure direct-to-penthouse elevators.",
    },
    {
      icon: TreePine,
      title: "Landscaped Zen Gardens",
      desc: "Private courtyard gardens with water features, quiet reading alcoves, and shaded botanical outdoor terraces.",
    },
  ];

  return (
    <section id="amenities" className="py-28 bg-[#0c1424] border-t border-b border-white/10">
      <div className="max-w-[1320px] mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="mb-16">
          <span className="font-mono text-xs tracking-[0.24em] text-gold uppercase mb-3 block">
            03 // Private Club & Amenities
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight max-w-[700px]">
            Five-Star Hospitality, Everyday Living
          </h2>
        </div>

        {/* Grid of Amenities */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {amenities.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="p-8 bg-[#070c16] border border-white/10 hover:border-gold/60 transition-all duration-300 flex flex-col justify-between min-h-[260px] group hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              >
                <div>
                  <div className="w-12 h-12 rounded-sm bg-gold/10 border border-gold/20 flex items-center justify-center mb-6 group-hover:bg-gold group-hover:border-gold transition-colors duration-300">
                    <Icon className="w-6 h-6 text-gold group-hover:text-[#070c16] transition-colors duration-300 stroke-[1.5]" />
                  </div>
                  <h3 className="font-display text-xl text-white mb-3">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
