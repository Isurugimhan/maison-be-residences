import React from "react";
import { MapPin, Navigation, Plane, ShoppingBag, Landmark, GraduationCap } from "lucide-react";

export const Location: React.FC = () => {
  const landmarks = [
    {
      time: "05 Mins",
      title: "Central Business District & Financial Towers",
      desc: "Instant access to major corporate headquarters, banking centres, and consular offices.",
      icon: Landmark,
    },
    {
      time: "08 Mins",
      title: "Luxury Shopping & Gourmet Waterfront Dining",
      desc: "Surrounded by Michelin-starred culinary experiences, private clubs, and high-end retail.",
      icon: ShoppingBag,
    },
    {
      time: "20 Mins",
      title: "Murtala Muhammed International Airport",
      desc: "Fast arterial road and helicopter charter connectivity for frequent international travel.",
      icon: Plane,
    },
    {
      time: "10 Mins",
      title: "International Schools & Top-Tier Medical",
      desc: "Proximity to world-accredited educational academies and premier specialist clinics.",
      icon: GraduationCap,
    },
  ];

  return (
    <section id="location" className="py-28 bg-[#0c1424] border-t border-b border-white/10">
      <div className="max-w-[1320px] mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="mb-16">
          <span className="font-mono text-xs tracking-[0.24em] text-gold uppercase mb-3 block">
            05 // Prime Location & Connectivity
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight max-w-[750px]">
            At the Center of Everything That Matters
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Landmark Connectivity List */}
          <div className="lg:col-span-6 space-y-4">
            {landmarks.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-6 bg-[#070c16] border border-white/10 hover:border-gold/50 transition-all duration-300 flex items-start gap-5 group"
                >
                  <div className="w-11 h-11 rounded-sm bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0 group-hover:bg-gold transition-colors">
                    <Icon className="w-5 h-5 text-gold group-hover:text-[#070c16] transition-colors" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm sm:text-base font-semibold text-white">
                        {item.title}
                      </h3>
                      <span className="font-mono text-xs text-gold font-semibold bg-gold/10 px-2.5 py-0.5 rounded-full border border-gold/20 shrink-0 ml-2">
                        {item.time}
                      </span>
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Stylized Dark Map UI Card */}
          <div className="lg:col-span-6 relative h-[460px] bg-[#070c16] border border-white/10 p-8 flex flex-col justify-between overflow-hidden shadow-2xl">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#1a2744_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />
            
            {/* Concentric location radar rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-gold/15 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-52 rounded-full border border-gold/25 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border border-gold/40 animate-ping pointer-events-none opacity-30" />

            {/* Center Pin Marker */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
              <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center text-[#070c16] shadow-[0_0_30px_rgba(212,175,55,0.7)] animate-bounce">
                <MapPin className="w-6 h-6 fill-current" />
              </div>
              <div className="mt-2 px-3 py-1 bg-[#070c16]/95 border border-gold text-gold font-display text-xs tracking-wider uppercase whitespace-nowrap shadow-xl">
                Maison Be Residences
              </div>
            </div>

            {/* Card Header & Footer Info */}
            <div className="relative z-10 flex justify-between items-center">
              <span className="font-mono text-xs text-gold tracking-widest uppercase">
                GEOGRAPHIC COORDINATES
              </span>
              <span className="text-[11px] text-white/50 font-mono">
                6.4281° N, 3.4219° E
              </span>
            </div>

            <div className="relative z-10 p-4 bg-[#0c1424]/90 backdrop-blur-md border border-white/10 rounded-sm">
              <div className="text-xs font-semibold text-white mb-1">
                Sales Pavilion & Site Gallery
              </div>
              <div className="text-xs text-white/60">
                Victoria Island / Ikoyi Prime Corridor, Lagos, Nigeria
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
