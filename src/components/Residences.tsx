"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Download, ArrowUpRight, BedDouble, Bath, Maximize, Car, Compass } from "lucide-react";

interface ResidencesProps {
  onOpenBrochure: () => void;
}

const unitData = [
  {
    id: "1br",
    name: "1-Bedroom Executive Suite",
    badge: "RESIDENCE SPECIFICATION // 01",
    area: "88 sqm / 947 sq.ft",
    beds: "1 Bed • 1.5 En-Suite",
    terrace: "14 sqm Private Balcony",
    parking: "1 Dedicated Covered Bay",
    price: "From $180,000 / ₦270M",
    img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85",
    desc: "Designed for dynamic executives and international investors, featuring an expansive open-concept salon, Italian marble chef kitchen, and private sunset terrace with sweeping skyline views.",
  },
  {
    id: "2br",
    name: "2-Bedroom Luxury Residence",
    badge: "RESIDENCE SPECIFICATION // 02",
    area: "142 sqm / 1,528 sq.ft",
    beds: "2 Beds • 2.5 Bathrooms",
    terrace: "26 sqm Wraparound Deck",
    parking: "2 Dedicated Covered Bays",
    price: "From $290,000 / ₦435M",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
    desc: "Generously proportioned with dual master suites, walk-in Italian wardrobes, a private laundry suite, breakfast island, and double-aspect panoramic skyline vistas.",
  },
  {
    id: "3br",
    name: "3-Bedroom Family Suite",
    badge: "RESIDENCE SPECIFICATION // 03",
    area: "215 sqm / 2,314 sq.ft",
    beds: "3 Beds • 3.5 Bathrooms",
    terrace: "38 sqm Corner Terrace",
    parking: "2 Dedicated Bays + Storage",
    price: "From $440,000 / ₦660M",
    img: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=85",
    desc: "A prestigious family haven with double reception salons, separate chef and preparation kitchens, staff helper quarters, and triple-aspect natural daylight.",
  },
  {
    id: "penthouse",
    name: "Signature Sky Penthouse",
    badge: "RESIDENCE SPECIFICATION // 04",
    area: "420 sqm / 4,520 sq.ft",
    beds: "4 Beds • 5 Bathrooms",
    terrace: "110 sqm Private Roof Deck & Pool",
    parking: "3 Bays + Private Elevator",
    price: "Price On Application",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85",
    desc: "The crown of Maison Be. Crowned with 360-degree city and waterfront vistas, private heated rooftop plunge pool, temperature-controlled wine cellar, and dedicated concierge dispatch.",
  },
];

export const Residences: React.FC<ResidencesProps> = ({ onOpenBrochure }) => {
  const [activeTab, setActiveTab] = useState(0);
  const currentUnit = unitData[activeTab];

  return (
    <section id="residences" className="py-28 bg-[#070c16]">
      <div className="max-w-[1320px] mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="font-mono text-xs tracking-[0.24em] text-gold uppercase mb-3 block">
              02 // The Collection
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight">
              Curated Suites & Sky Residences
            </h2>
          </div>
          <p className="text-sm text-white/60 max-w-[360px] leading-relaxed">
            Each residence is delivered fully finished with integrated European appliances, custom cabinetry, and bespoke architectural millwork.
          </p>
        </div>

        {/* Unit Selector Tabs */}
        <div className="flex gap-2.5 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {unitData.map((unit, idx) => (
            <button
              key={unit.id}
              onClick={() => setActiveTab(idx)}
              className={`px-6 py-3.5 text-xs sm:text-sm font-medium tracking-[0.06em] rounded-full transition-all duration-300 whitespace-nowrap ${
                activeTab === idx
                  ? "bg-gold text-[#070c16] font-semibold shadow-[0_4px_20px_rgba(212,175,55,0.3)]"
                  : "bg-[#0c1424] text-white/70 border border-white/10 hover:border-gold/50 hover:text-white"
              }`}
            >
              {unit.name}
            </button>
          ))}
        </div>

        {/* Active Unit Display Card */}
        <div className="bg-[#0c1424] border border-white/10 grid grid-cols-1 lg:grid-cols-12 overflow-hidden shadow-2xl transition-all duration-500">
          {/* Left Media Pane */}
          <div className="lg:col-span-7 relative h-[360px] sm:h-[460px] lg:h-auto min-h-[420px] bg-black">
            <Image
              src={currentUnit.img}
              alt={currentUnit.name}
              fill
              className="object-cover transition-all duration-700 hover:scale-105"
            />
            <div className="absolute top-4 left-4 bg-[#070c16]/80 backdrop-blur-md px-3.5 py-1.5 border border-white/10 rounded-full font-mono text-[11px] text-gold">
              {currentUnit.price}
            </div>
          </div>

          {/* Right Details Pane */}
          <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between">
            <div>
              <div className="font-mono text-xs text-gold tracking-[0.2em] uppercase mb-2">
                {currentUnit.badge}
              </div>
              <h3 className="font-display text-2xl sm:text-3xl text-white font-normal mb-4">
                {currentUnit.name}
              </h3>
              <p className="text-sm text-white/70 leading-relaxed font-light mb-8">
                {currentUnit.desc}
              </p>

              {/* Specs Matrix */}
              <div className="grid grid-cols-2 gap-y-5 gap-x-4 py-6 border-t border-b border-white/10 mb-8">
                <div>
                  <div className="text-[11px] font-medium tracking-wider uppercase text-white/45 mb-1 flex items-center gap-1.5">
                    <Maximize className="w-3.5 h-3.5 text-gold" />
                    Internal Area
                  </div>
                  <div className="font-mono text-sm sm:text-base font-medium text-white">
                    {currentUnit.area}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] font-medium tracking-wider uppercase text-white/45 mb-1 flex items-center gap-1.5">
                    <BedDouble className="w-3.5 h-3.5 text-gold" />
                    Bedrooms & Bath
                  </div>
                  <div className="font-mono text-sm sm:text-base font-medium text-white">
                    {currentUnit.beds}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] font-medium tracking-wider uppercase text-white/45 mb-1 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-gold" />
                    Terrace Deck
                  </div>
                  <div className="font-mono text-sm sm:text-base font-medium text-white">
                    {currentUnit.terrace}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] font-medium tracking-wider uppercase text-white/45 mb-1 flex items-center gap-1.5">
                    <Car className="w-3.5 h-3.5 text-gold" />
                    Parking
                  </div>
                  <div className="font-mono text-sm sm:text-base font-medium text-white">
                    {currentUnit.parking}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="px-6 py-3 text-xs sm:text-sm font-semibold tracking-[0.06em] text-[#070c16] bg-gold rounded-full hover:bg-gold-light transition-all flex items-center gap-1.5 shadow-[0_4px_20px_rgba(212,175,55,0.25)]"
              >
                Inquire About Unit
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={onOpenBrochure}
                className="px-5 py-3 text-xs sm:text-sm font-medium tracking-[0.06em] text-white border border-white/20 rounded-full hover:border-gold hover:text-gold hover:bg-gold/10 transition-all flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                Download Blueprint (PDF)
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
