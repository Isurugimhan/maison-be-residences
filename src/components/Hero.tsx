"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, ChevronLeft, ChevronRight, ShieldCheck, Sparkles } from "lucide-react";

interface HeroProps {
  onOpenBrochure: () => void;
}

const slides = [
  {
    title: "Twilight Architectural Facade",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=85",
    alt: "Maison Be Residences Twilight Facade",
  },
  {
    title: "Grand Residential Arrival Driveway",
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=85",
    alt: "Private Valet and Arrival Court",
  },
  {
    title: "Sky Horizon Infinity Pool & Lounge",
    img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1920&q=85",
    alt: "Horizon Infinity Pool",
  },
  {
    title: "Signature Master Penthouse Salon",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=85",
    alt: "Penthouse Living Room",
  },
];

export const Hero: React.FC<HeroProps> = ({ onOpenBrochure }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative w-full min-h-screen flex items-center bg-[#070c16] overflow-hidden pt-24 pb-16">
      {/* CAD Blueprint Background */}
      <div className="hero-blueprint-bg" />
      <div className="hero-cad-drawing" />

      {/* Atmospheric Multi-Image Cross-Fade Slideshow */}
      <div className="absolute top-0 right-0 bottom-0 w-full lg:w-[68%] h-full z-[2] overflow-hidden">
        {slides.map((slide, idx) => (
          <div
            key={slide.title}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              idx === currentSlide ? "opacity-75 scale-100 z-10" : "opacity-0 scale-105 z-0"
            }`}
          >
            <Image
              src={slide.img}
              alt={slide.alt}
              fill
              priority={idx === 0}
              className="object-cover object-center lg:object-right"
            />
          </div>
        ))}

        {/* Seamless Radial & Linear Dark Blending Masks */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070c16] via-[#070c16]/70 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070c16] via-transparent to-[#070c16]/40 z-20 pointer-events-none" />
      </div>

      {/* Hero Editorial Content */}
      <div className="relative z-30 max-w-[1320px] mx-auto px-6 md:px-8 w-full">
        <div className="max-w-[700px]">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
            <span>Exclusive Off-Plan Launch • Nigeria</span>
          </div>

          {/* Main Title */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[68px] leading-[1.08] font-normal text-white tracking-tight mb-6">
            Where Timeless Architecture Meets{" "}
            <span className="bg-gradient-to-r from-white via-gold-light to-gold bg-clip-text text-transparent font-normal">
              Prestigious Living.
            </span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-white/85 font-light leading-relaxed mb-8 max-w-[580px] drop-shadow-md">
            An exclusive sanctuary of 1, 2, and 3-bedroom luxury suites and bespoke sky penthouses, engineered with floor-to-ceiling panoramic glass, imported Italian stone, and five-star private concierge management.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <Link
              href="#residences"
              className="px-8 py-4 text-sm font-semibold tracking-[0.08em] uppercase text-[#070c16] bg-gold rounded-full hover:bg-gold-light transition-all duration-300 shadow-[0_4px_25px_rgba(212,175,55,0.3)] hover:shadow-[0_8px_35px_rgba(212,175,55,0.5)] hover:-translate-y-0.5 inline-flex items-center gap-2.5"
            >
              Explore Residences
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={onOpenBrochure}
              className="px-7 py-4 text-sm font-medium tracking-[0.06em] text-white border border-white/30 rounded-full bg-[#070c16]/50 backdrop-blur-md hover:border-gold hover:text-gold hover:bg-gold/10 transition-all duration-300 inline-flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Request Floor Plans
            </button>
          </div>

          {/* Trust Highlights Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10 max-w-[580px]">
            <div>
              <div className="font-mono text-gold text-xs tracking-wider uppercase mb-1">Down Payment</div>
              <div className="text-lg font-display text-white font-normal">10% Reservation</div>
            </div>
            <div>
              <div className="font-mono text-gold text-xs tracking-wider uppercase mb-1">Projected ROI</div>
              <div className="text-lg font-display text-white font-normal">12–16% Annual</div>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <div className="font-mono text-gold text-xs tracking-wider uppercase mb-1">Security & Service</div>
              <div className="text-lg font-display text-white font-normal flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-gold inline" />
                24/7 Concierge
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Minimalist Slideshow Navigation Controller */}
      <div className="absolute bottom-8 right-6 md:right-12 z-30 hidden sm:flex items-center gap-5 bg-[#070c16]/80 backdrop-blur-xl px-5 py-3.5 border border-white/10 rounded-sm">
        <div className="text-right">
          <div className="font-mono text-[11px] text-gold tracking-widest">
            0{currentSlide + 1} / 0{slides.length}
          </div>
          <div className="text-xs font-semibold text-white tracking-wider uppercase max-w-[200px] truncate">
            {slides[currentSlide].title}
          </div>
        </div>

        {/* Slide dots */}
        <div className="flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-0.5 transition-all duration-300 ${
                idx === currentSlide ? "w-8 bg-gold" : "w-4 bg-white/30 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Slide arrows */}
        <div className="flex gap-1.5 pl-2 border-l border-white/10">
          <button
            onClick={prevSlide}
            className="w-7 h-7 flex items-center justify-center text-white/80 hover:text-gold hover:bg-white/5 border border-white/10 transition-colors"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextSlide}
            className="w-7 h-7 flex items-center justify-center text-white/80 hover:text-gold hover:bg-white/5 border border-white/10 transition-colors"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
