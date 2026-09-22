"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { getResidenceBySlug, getAllResidences } from "@/data/residences";
import SiteHeader from "@/components/SiteHeader";

export default function ApartmentDetailPage() {
  const params = useParams();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : (params?.slug as string);

  const residence = getResidenceBySlug(slug);
  const allResidences = useMemo(() => getAllResidences(), []);

  // If residence doesn't exist
  if (!residence) {
    notFound();
  }

  // Related residences (exclude current)
  const relatedResidences = useMemo(() => {
    return allResidences.filter((r) => r.slug !== residence.slug).slice(0, 3);
  }, [allResidences, residence.slug]);

  // Reservation Panel State
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guestsCount, setGuestsCount] = useState(2);
  const [currency, setCurrency] = useState<"USD" | "NGN">("USD");

  // Lightbox Modal state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Default dates (tomorrow + 2 nights)
  useEffect(() => {
    const today = new Date();
    const dIn = new Date(today);
    dIn.setDate(today.getDate() + 1);
    const dOut = new Date(today);
    dOut.setDate(today.getDate() + 3);

    const pad = (n: number) => String(n).padStart(2, "0");
    setCheckIn(`${dIn.getFullYear()}-${pad(dIn.getMonth() + 1)}-${pad(dIn.getDate())}`);
    setCheckOut(`${dOut.getFullYear()}-${pad(dOut.getMonth() + 1)}-${pad(dOut.getDate())}`);
  }, []);

  // Night calculation
  const nightsCount = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const d1 = new Date(checkIn).getTime();
    const d2 = new Date(checkOut).getTime();
    const diff = Math.round((d2 - d1) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  }, [checkIn, checkOut]);

  // Rate calculations
  const nightlyRate = currency === "USD" ? residence.rateUSD : residence.rateNGN;
  const estimatedTotal = nightsCount * nightlyRate;

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") {
        setLightboxIndex(null);
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev! - 1 + residence.gallery.length) % residence.gallery.length);
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev! + 1) % residence.gallery.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, residence.gallery.length]);

  const whatsappMessage = `Hello Maison Be Concierge, I would like to inquire about reserving ${residence.name} ($${residence.rateUSD}/night)${
    nightsCount > 0 ? ` from ${checkIn} to ${checkOut} (${nightsCount} nights)` : ""
  } for ${guestsCount} guests.`;

  return (
    <div className="min-h-screen bg-[#070c16] text-[#f5f6f8] selection:bg-[#d4af37] selection:text-[#070c16]">
      {/* ─── UNIFIED SITE HEADER ─── */}
      <SiteHeader whatsappMessage={whatsappMessage} />

      <main className="pt-28 pb-20">
        <div className="container">
          {/* Breadcrumb & Top Bar */}
          <div className="py-4 border-b border-white/10 mb-8">
            <div className="flex items-center gap-2 text-xs text-white/50">
              <Link href="/" className="hover:text-[#d4af37] transition-colors">Home</Link>
              <span>/</span>
              <Link href="/apartments" className="hover:text-[#d4af37] transition-colors">Apartments</Link>
              <span>/</span>
              <span className="text-[#d4af37] font-medium">{residence.name}</span>
            </div>
          </div>

          {/* ─── RESIDENCE TITLE & PRICE HEADER ─── */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#d4af37] font-semibold mb-2">
                <span>{residence.floor ? residence.floor : "Ikoyi Luxury Residence"}</span>
                <span>•</span>
                <span>{residence.bedrooms} King Suites</span>
                <span>•</span>
                <span>{residence.bathrooms} En-Suite Baths</span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white font-normal leading-tight">
                {residence.name}
              </h1>
              <p className="text-sm md:text-base text-white/60 mt-2 italic font-light max-w-2xl">
                &ldquo;{residence.tagline}&rdquo;
              </p>
            </div>

            <div className="text-left md:text-right">
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-1">
                Nightly Direct Accommodation Rate
              </span>
              <div className="flex items-baseline md:justify-end gap-2">
                <span className="font-display text-3xl sm:text-4xl lg:text-5xl text-white font-normal">
                  ${residence.rateUSD.toLocaleString()}
                </span>
                <span className="text-xs text-white/60">/ night</span>
              </div>
              <span className="text-xs text-[#d4af37] block mt-1 font-medium">
                ₦{residence.rateNGN.toLocaleString()} / night • Min. 2 Nights Stay
              </span>
            </div>
          </div>

          {/* ─── EDITORIAL PHOTO GALLERY SHOWCASE GRID ─── */}
          <section className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-3 h-[420px] md:h-[540px] overflow-hidden">
              {/* Primary Featured Photo (Span 2 cols, 2 rows) */}
              <div
                className="md:col-span-2 md:row-span-2 relative group cursor-pointer overflow-hidden bg-black/60"
                onClick={() => setLightboxIndex(0)}
              >
                <img
                  src={residence.gallery[0] || residence.coverImage}
                  alt={`${residence.name} Living Salon`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                <span className="absolute bottom-4 left-4 px-3 py-1 text-xs bg-black/80 text-white font-mono font-medium backdrop-blur-md border border-white/15">
                  Featured Salon
                </span>
              </div>

              {/* Photo 2 */}
              <div
                className="relative group cursor-pointer overflow-hidden bg-black/60 hidden md:block"
                onClick={() => setLightboxIndex(1)}
              >
                <img
                  src={residence.gallery[1] || residence.coverImage}
                  alt={`${residence.name} Master Bedroom`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Photo 3 */}
              <div
                className="relative group cursor-pointer overflow-hidden bg-black/60 hidden md:block"
                onClick={() => setLightboxIndex(2)}
              >
                <img
                  src={residence.gallery[2] || residence.coverImage}
                  alt={`${residence.name} Dining & Kitchen`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Photo 4 */}
              <div
                className="relative group cursor-pointer overflow-hidden bg-black/60 hidden md:block"
                onClick={() => setLightboxIndex(3)}
              >
                <img
                  src={residence.gallery[3] || residence.coverImage}
                  alt={`${residence.name} Guest Suite`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Photo 5 with "View All N Photos" overlay */}
              <div
                className="relative group cursor-pointer overflow-hidden bg-black/60 hidden md:block"
                onClick={() => setLightboxIndex(4)}
              >
                <img
                  src={residence.gallery[4] || residence.coverImage}
                  alt={`${residence.name} En-Suite Bath`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/55 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <div className="text-center px-4 py-2 bg-black/80 border border-white/20 backdrop-blur-md shadow-2xl group-hover:scale-105 transition-transform">
                    <svg className="w-6 h-6 mx-auto mb-1 text-[#d4af37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                    <span className="text-xs font-semibold text-white block">
                      View All {residence.gallery.length} Photos
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile View All Photos Button */}
            <div className="mt-3 block md:hidden">
              <button
                onClick={() => setLightboxIndex(0)}
                className="w-full btn-ghost text-xs py-3"
              >
                Browse All {residence.gallery.length} Photos →
              </button>
            </div>
          </section>

          {/* ─── MAIN CONTENT: LEFT STORY & SPECS | RIGHT STICKY BOOKING PANEL ─── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column (8 cols): Story, Highlights, Amenities, Rules */}
            <div className="lg:col-span-8 space-y-12">
              {/* Quick Specs Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-5 bg-[#0c1424]/80 border border-white/10 shadow-lg">
                <div className="border-r border-white/10 pr-3">
                  <span className="text-[10px] uppercase tracking-wider text-white/40 block">Accommodations</span>
                  <span className="text-sm text-white font-medium mt-1 block">{residence.beds}</span>
                  <span className="text-[10px] text-white/50 block">Sleeps {residence.sleeps} Guests</span>
                </div>
                <div className="border-r border-white/10 px-3">
                  <span className="text-[10px] uppercase tracking-wider text-white/40 block">Bathrooms</span>
                  <span className="text-sm text-white font-medium mt-1 block">{residence.bathrooms} Bathrooms</span>
                  <span className="text-[10px] text-white/50 block">Private En-Suite</span>
                </div>
                <div className="border-r border-white/10 px-3">
                  <span className="text-[10px] uppercase tracking-wider text-white/40 block">Floor Position</span>
                  <span className="text-sm text-[#d4af37] font-medium mt-1 block">{residence.floor || "Residence"}</span>
                  <span className="text-[10px] text-white/50 block">Elevator Access</span>
                </div>
                <div className="pl-3">
                  <span className="text-[10px] uppercase tracking-wider text-white/40 block">Estate Security</span>
                  <span className="text-sm text-white font-medium mt-1 block">24/7 Armed Guard</span>
                  <span className="text-[10px] text-white/50 block">Biometric Entry</span>
                </div>
              </div>

              {/* Editorial Description & Overview */}
              <div>
                <h2 className="font-display text-2xl sm:text-3xl text-white mb-4">
                  The Residence Overview
                </h2>
                <p className="text-base text-white/80 leading-relaxed font-light mb-6">
                  {residence.description}
                </p>
                <p className="text-sm text-white/60 leading-relaxed">
                  Located in an exclusive enclave in Ikoyi, Lagos, Maison Be Residences redefines luxury serviced living.
                  Whether visiting for business engagements, diplomatic missions, or leisure, our residences ensure absolute privacy,
                  uncompromising security, and five-star bespoke hospitality services around the clock.
                </p>
              </div>

              {/* Signature Highlights */}
              <div className="border-t border-b border-white/10 py-8 my-4">
                <h3 className="text-xs uppercase tracking-[0.2em] text-[#d4af37] font-semibold mb-6">
                  Signature Highlights
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
                  {residence.highlights.map((hl, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-sm text-white/85 font-light"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Categorized Amenities Matrix */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-xs uppercase tracking-[0.2em] text-[#d4af37] font-semibold block">
                      Everything Included
                    </span>
                    <h2 className="font-display text-2xl text-white mt-1">
                      Comprehensive Amenities & Features
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Category 1: Bathroom */}
                  <div className="p-5 bg-[#0c1424]/60 border border-white/10">
                    <h4 className="text-xs uppercase tracking-[0.18em] text-[#d4af37] font-semibold mb-3 flex items-center gap-2">
                      <span className="font-mono text-white/40">01 //</span> En-Suite Bathrooms
                    </h4>
                    <ul className="space-y-2 text-xs text-white/75">
                      <li>• Rainfall walk-in showers & deep soaking tubs</li>
                      <li>• Designer luxury toiletries & organic essentials</li>
                      <li>• Plush oversized Egyptian cotton bath sheets</li>
                      <li>• Monogrammed luxury robes & slippers</li>
                      <li>• Professional salon-grade ionic hairdryers</li>
                    </ul>
                  </div>

                  {/* Category 2: Bedroom & Sleep */}
                  <div className="p-5 bg-[#0c1424]/60 border border-white/10">
                    <h4 className="text-xs uppercase tracking-[0.18em] text-[#d4af37] font-semibold mb-3 flex items-center gap-2">
                      <span className="font-mono text-white/40">02 //</span> Bedroom & Sleep Sanctuary
                    </h4>
                    <ul className="space-y-2 text-xs text-white/75">
                      <li>• Plush king-size orthopedic mattresses</li>
                      <li>• 600-thread-count Italian cotton bed linens</li>
                      <li>• Motorized architectural blackout drapery</li>
                      <li>• Walk-in cedar dressing wardrobes & hangers</li>
                      <li>• Digital laptop-size biometric security safe</li>
                    </ul>
                  </div>

                  {/* Category 3: Gourmet Kitchen */}
                  <div className="p-5 bg-[#0c1424]/60 border border-white/10">
                    <h4 className="text-xs uppercase tracking-[0.18em] text-[#d4af37] font-semibold mb-3 flex items-center gap-2">
                      <span className="font-mono text-white/40">03 //</span> Gourmet Kitchen & Dining
                    </h4>
                    <ul className="space-y-2 text-xs text-white/75">
                      <li>• Full chef kitchen with induction cooktop & oven</li>
                      <li>• Nespresso espresso bar with complimentary capsules</li>
                      <li>• Large refrigerator, freezer & wine cooler</li>
                      <li>• Dishwasher, microwave & cookware sets</li>
                      <li>• Formal 6-to-8 seat dining table & glassware</li>
                    </ul>
                  </div>

                  {/* Category 4: Technology & Media */}
                  <div className="p-5 bg-[#0c1424]/60 border border-white/10">
                    <h4 className="text-xs uppercase tracking-[0.18em] text-[#d4af37] font-semibold mb-3 flex items-center gap-2">
                      <span className="font-mono text-white/40">04 //</span> Entertainment & Connectivity
                    </h4>
                    <ul className="space-y-2 text-xs text-white/75">
                      <li>• Dedicated ultra-fast fiber WiFi (300+ Mbps)</li>
                      <li>• 75&quot; 4K Smart TVs in salon & each bedroom</li>
                      <li>• Integrated Sonos surround sound audio system</li>
                      <li>• Netflix, Apple TV & international satellite channels</li>
                      <li>• International multi-plug charging outlets</li>
                    </ul>
                  </div>

                  {/* Category 5: Air Quality & Wellness */}
                  <div className="p-5 bg-[#0c1424]/60 border border-white/10">
                    <h4 className="text-xs uppercase tracking-[0.18em] text-[#d4af37] font-semibold mb-3 flex items-center gap-2">
                      <span className="font-mono text-white/40">05 //</span> Climate & Medical HEPA Air
                    </h4>
                    <ul className="space-y-2 text-xs text-white/75">
                      <li>• Medical-grade HEPA air purification system</li>
                      <li>• Whisper-quiet multi-zone inverter climate control</li>
                      <li>• 100% uninterrupted 24/7 dual generator power</li>
                      <li>• Multi-stage reverse osmosis water filtration</li>
                      <li>• Double-glazed acoustic soundproof panoramic windows</li>
                    </ul>
                  </div>

                  {/* Category 6: Bespoke Services */}
                  <div className="p-5 bg-[#0c1424]/60 border border-white/10">
                    <h4 className="text-xs uppercase tracking-[0.18em] text-[#d4af37] font-semibold mb-3 flex items-center gap-2">
                      <span className="font-mono text-white/40">06 //</span> Bespoke Estate Services
                    </h4>
                    <ul className="space-y-2 text-xs text-white/75">
                      <li>• Dedicated 24-hour on-site concierge desk</li>
                      <li>• Daily discreet housekeeping & turndown service</li>
                      <li>• In-suite room service dining from Maison Be Café</li>
                      <li>• Dedicated covered resident parking with 24/7 security</li>
                      <li>• Private chauffeur & airport transfers (on request)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* House Rules & Policies */}
              <div className="p-6 bg-white/[0.02] border border-white/10">
                <h3 className="font-display text-xl text-white mb-4">
                  House Rules & Policies
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-white/70">
                  <div className="p-3 bg-black/30 border border-white/5">
                    <span className="text-white font-medium block mb-1">Check-in / Check-out</span>
                    Check-in: From 3:00 PM<br />Check-out: Until 11:00 AM
                  </div>
                  <div className="p-3 bg-black/30 border border-white/5">
                    <span className="text-white font-medium block mb-1">Minimum Stay</span>
                    Maison Be Residences requires a minimum reservation of 2 nights.
                  </div>
                  <div className="p-3 bg-black/30 border border-white/5">
                    <span className="text-white font-medium block mb-1">Non-Smoking Property</span>
                    Smoking, vaping, or shisha is strictly prohibited within all indoor suites.
                  </div>
                  <div className="p-3 bg-black/30 border border-white/5">
                    <span className="text-white font-medium block mb-1">Security & Quiet Hours</span>
                    Quiet hours: 10:00 PM – 8:00 AM. Estate entrance is restricted to registered guests.
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs text-white/50">
                    Need special arrival times or bespoke requirements?
                  </span>
                  <Link
                    href="/information/cancellation-refund-policy"
                    className="text-xs text-[#d4af37] hover:underline"
                  >
                    Read Full Cancellation & Refund Policy →
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column (4 cols): Sticky Reservation Panel */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 p-6 bg-[#0c1424] border border-[#d4af37]/40 shadow-2xl backdrop-blur-xl">
                {/* Panel Header */}
                <div className="border-b border-white/10 pb-5 mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#d4af37] font-semibold">
                      Reserve This Residence
                    </span>
                    {/* Currency toggle */}
                    <div className="inline-flex rounded-full bg-white/5 p-1 border border-white/10">
                      <button
                        onClick={() => setCurrency("USD")}
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold transition-all ${
                          currency === "USD" ? "bg-[#d4af37] text-[#070c16]" : "text-white/60"
                        }`}
                      >
                        USD
                      </button>
                      <button
                        onClick={() => setCurrency("NGN")}
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold transition-all ${
                          currency === "NGN" ? "bg-[#d4af37] text-[#070c16]" : "text-white/60"
                        }`}
                      >
                        NGN
                      </button>
                    </div>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-3xl text-white font-medium">
                      {currency === "USD" ? `$${residence.rateUSD.toLocaleString()}` : `₦${residence.rateNGN.toLocaleString()}`}
                    </span>
                    <span className="text-xs text-white/60">/ night</span>
                  </div>
                  <span className="text-[11px] text-white/40 block mt-1">
                    Direct Rate • No intermediary booking fees
                  </span>
                </div>

                {/* Reservation Inputs */}
                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-white/50 block mb-1">
                        Check-in
                      </label>
                      <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full bg-[#070c16] border border-white/15 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-white/50 block mb-1">
                        Check-out
                      </label>
                      <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full bg-[#070c16] border border-white/15 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-white/50 block mb-1">
                      Guests (Max {residence.sleeps})
                    </label>
                    <select
                      value={guestsCount}
                      onChange={(e) => setGuestsCount(Number(e.target.value))}
                      className="w-full bg-[#070c16] border border-white/15 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37] cursor-pointer"
                    >
                      {Array.from({ length: residence.sleeps }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>
                          {n} Guest{n > 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Nights & Cost Calculation */}
                {nightsCount > 0 ? (
                  <div className="p-4 bg-white/[0.04] border border-white/10 mb-6 space-y-2 text-xs">
                    <div className="flex justify-between text-white/70">
                      <span>
                        {currency === "USD" ? `$${nightlyRate.toLocaleString()}` : `₦${nightlyRate.toLocaleString()}`} × {nightsCount} nights
                      </span>
                      <span>
                        {currency === "USD" ? `$${estimatedTotal.toLocaleString()}` : `₦${estimatedTotal.toLocaleString()}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-white/70">
                      <span>Daily Housekeeping & Concierge</span>
                      <span className="text-[#d4af37]">Complimentary</span>
                    </div>
                    <div className="flex justify-between text-white/70">
                      <span>High-Speed Fiber & Parking</span>
                      <span className="text-[#d4af37]">Complimentary</span>
                    </div>
                    <div className="border-t border-white/10 pt-2 flex justify-between font-semibold text-white text-sm">
                      <span>Estimated Total</span>
                      <span className="text-[#d4af37]">
                        {currency === "USD" ? `$${estimatedTotal.toLocaleString()}` : `₦${estimatedTotal.toLocaleString()}`}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs mb-6 text-center">
                    Select check-in and check-out dates (minimum 2 nights).
                  </div>
                )}

                {/* Primary WhatsApp Booking Action */}
                <div className="space-y-3">
                  <a
                    href={`https://wa.me/2349065007079?text=${encodeURIComponent(whatsappMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-black font-semibold text-xs tracking-wider uppercase transition-all shadow-lg shadow-[#25D366]/20 hover:scale-[1.02]"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.299.144.347.491 1.2.534 1.288.043.088.072.19.014.305-.058.115-.087.187-.173.289l-.26.305c-.087.087-.177.18-.076.353.101.173.449.741.964 1.2 1.026.914 1.348 1.077 1.54 1.164.192.087.305.072.419-.058.115-.13.491-.57.621-.767.13-.197.26-.165.434-.101.173.064 1.101.52 1.289.614.188.094.314.141.36.219.046.079.046.455-.098.86z"/>
                    </svg>
                    <span>Instant Concierge Booking</span>
                  </a>

                  <a
                    href="tel:+2349065007079"
                    className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-white/5 hover:bg-white/10 text-white font-medium text-xs border border-white/15 transition-all"
                  >
                    <span>Call Concierge: +234 906 500 7079</span>
                  </a>
                </div>

                {/* Trust Badges */}
                <div className="mt-6 pt-5 border-t border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-white/60">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Best rate direct from property</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-white/60">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Complimentary airport pickup on 5+ night stays</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-white/60">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>24-hour check-in greeting & luggage handling</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ─── OTHER RESIDENCES IN THE COLLECTION ─── */}
          <section className="mt-20 pt-12 border-t border-white/10">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-[#d4af37] font-semibold block">
                  Compare Suites
                </span>
                <h2 className="font-display text-2xl sm:text-3xl text-white mt-1">
                  Other Residences in The Collection
                </h2>
              </div>
              <Link href="/apartments" className="btn-ghost text-xs hidden sm:inline-flex">
                View All 7 Residences →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedResidences.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/apartments/${rel.slug}`}
                  className="group block bg-[#0c1424]/60 border border-white/10 overflow-hidden hover:border-[#d4af37]/50 transition-all duration-300"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-black/60">
                    <img
                      src={rel.coverImage}
                      alt={rel.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-semibold bg-black/80 text-[#d4af37] border border-[#d4af37]/35 backdrop-blur-md">
                      {rel.floor || "Luxury Suite"}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg text-white group-hover:text-[#d4af37] transition-colors">
                      {rel.name}
                    </h3>
                    <p className="text-xs text-white/50 mt-1">
                      {rel.bedrooms} Bedrooms • {rel.bathrooms} Baths • Sleeps {rel.sleeps}
                    </p>
                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                      <span className="text-sm font-semibold text-white">
                        ${rel.rateUSD.toLocaleString()} <span className="text-xs text-white/50 font-normal">/ night</span>
                      </span>
                      <span className="text-xs text-[#d4af37] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        Explore →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* ─── FULLSCREEN LIGHTBOX MODAL ─── */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[2000] bg-black/95 backdrop-blur-2xl flex flex-col justify-between"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Lightbox Top Bar */}
          <div
            className="flex items-center justify-between px-6 py-4 border-b border-white/10 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <h3 className="font-display text-lg text-white font-medium">
                {residence.name}
              </h3>
              <p className="text-xs text-white/50">
                Photo {lightboxIndex + 1} of {residence.gallery.length}
              </p>
            </div>

            <button
              onClick={() => setLightboxIndex(null)}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              aria-label="Close photo gallery"
            >
              ✕
            </button>
          </div>

          {/* Lightbox Center Image & Arrows */}
          <div
            className="relative flex-1 flex items-center justify-center p-4 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                const total = residence.gallery.length;
                setLightboxIndex((prev) => (prev! - 1 + total) % total);
              }}
              className="absolute left-4 md:left-8 z-20 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center text-2xl border border-white/20 transition-all hover:scale-110"
              aria-label="Previous image"
            >
              ‹
            </button>

            <img
              src={residence.gallery[lightboxIndex]}
              alt={`${residence.name} Gallery Photo ${lightboxIndex + 1}`}
              className="max-h-[72vh] max-w-full object-contain border border-white/15 shadow-2xl transition-all duration-300"
            />

            <button
              onClick={() => {
                const total = residence.gallery.length;
                setLightboxIndex((prev) => (prev! + 1) % total);
              }}
              className="absolute right-4 md:right-8 z-20 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center text-2xl border border-white/20 transition-all hover:scale-110"
              aria-label="Next image"
            >
              ›
            </button>
          </div>

          {/* Lightbox Bottom Thumbnail Strip */}
          <div
            className="px-6 py-4 border-t border-white/10 overflow-x-auto flex items-center gap-2 z-10 scrollbar-thin"
            onClick={(e) => e.stopPropagation()}
          >
            {residence.gallery.map((imgUrl, idx) => (
              <button
                key={idx}
                onClick={() => setLightboxIndex(idx)}
                className={`relative flex-shrink-0 w-16 h-12 overflow-hidden border transition-all ${
                  idx === lightboxIndex
                    ? "border-[#d4af37] ring-2 ring-[#d4af37]/40 scale-105"
                    : "border-white/20 opacity-50 hover:opacity-100"
                }`}
              >
                <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ─── FOOTER ─── */}
      <footer className="site-footer" data-od-id="residence-detail-footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <Link href="/" className="footer-brand" aria-label="Maison Be Residences Home">
                <img
                  src="/logo.png"
                  alt="Maison Be Residences"
                  className="footer-logo-img"
                />
              </Link>
              <p className="footer-desc">
                An ultra-luxury boutique residential enclave in Ikoyi, Lagos.
                Seven private suites engineered for extended executive stays, discretion, and quiet luxury.
              </p>
            </div>

            <div>
              <h4 className="footer-heading">The Collection</h4>
              <ul className="footer-links">
                {allResidences.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/apartments/${r.slug}`}>{r.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="footer-heading">Information & Policies</h4>
              <ul className="footer-links">
                <li><Link href="/information/about-us">About Us</Link></li>
                <li><Link href="/information/events">Amenities & Events</Link></li>
                <li><Link href="/information/cancellation-refund-policy">Cancellation & Refund Policy</Link></li>
                <li><Link href="/information/house-rules">House Rules</Link></li>
                <li><Link href="/information/terms-of-use">Terms of Use</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-heading">Reservations & Concierge</h4>
              <ul className="footer-links">
                <li><a href="mailto:reservations@maisonberesidences.com">reservations@maisonberesidences.com</a></li>
                <li><a href="tel:+2349065007079">+234 906 500 7079</a></li>
                <li>
                  <a
                    href="https://wa.me/2349065007079"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#25D366" }}
                  >
                    WhatsApp Concierge Desk
                  </a>
                </li>
                <li><span>Ikoyi, Lagos, Nigeria</span></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <div>© 2026 Maison Be Residences. All rights reserved.</div>
            <div className="footer-legal-bar">
              <Link href="/information/cancellation-refund-policy">Cancellation & Refund Policy</Link>
              <span>•</span>
              <Link href="/information/house-rules">House Rules</Link>
              <span>•</span>
              <Link href="/information/terms-of-use">Terms of Use</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
