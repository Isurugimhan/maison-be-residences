import React from "react";
import Image from "next/image";
import { Sparkles, Maximize2, Cpu, Shield } from "lucide-react";

export const Vision: React.FC = () => {
  return (
    <section id="vision" className="py-28 bg-[#0c1424] border-t border-b border-white/10 relative">
      <div className="max-w-[1320px] mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="mb-16">
          <span className="font-mono text-xs tracking-[0.24em] text-gold uppercase mb-3 block">
            01 // Architectural Narrative
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight max-w-[800px]">
            A Symphony of Classical Symmetry & Modern Sophistication
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <p className="text-lg sm:text-xl text-white font-light leading-relaxed">
              Conceived by world-class architects, Maison Be Residences redefines premier urban living in Nigeria through pure geometry, natural light, and bespoke craftsmanship.
            </p>
            <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed">
              Every residence is engineered with deep cantilevered terraces, bespoke fluted stone paneling, and acoustic triple-glazed floor-to-ceiling glass systems that provide acoustic serenity and uninterrupted skyline views.
            </p>

            {/* Architectural Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-6 bg-[#070c16] border border-white/10 hover:border-gold/50 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-3">
                  <div className="font-mono text-xs text-gold">01</div>
                  <Maximize2 className="w-4 h-4 text-gold/60 group-hover:text-gold transition-colors" />
                </div>
                <h3 className="font-display text-lg text-white mb-2">Panoramic Glass</h3>
                <p className="text-xs text-white/60 leading-relaxed">
                  Floor-to-ceiling 3.2m acoustic thermal glazing maximizing natural daylight and views.
                </p>
              </div>

              <div className="p-6 bg-[#070c16] border border-white/10 hover:border-gold/50 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-3">
                  <div className="font-mono text-xs text-gold">02</div>
                  <Cpu className="w-4 h-4 text-gold/60 group-hover:text-gold transition-colors" />
                </div>
                <h3 className="font-display text-lg text-white mb-2">Smart Automation</h3>
                <p className="text-xs text-white/60 leading-relaxed">
                  Integrated climate, scene lighting, biometric access, and touchless concierge dispatch.
                </p>
              </div>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-6 relative h-[420px] sm:h-[500px] border border-white/10 rounded-sm overflow-hidden group shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85"
              alt="Maison Be Architecture Detail"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070c16]/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs text-white/80">
              <span className="font-mono text-gold">FACADE DETAIL // IK-04</span>
              <span className="bg-black/60 backdrop-blur-md px-3 py-1 border border-white/10 rounded-full">
                Italian Travertine & Fluted Bronze
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
