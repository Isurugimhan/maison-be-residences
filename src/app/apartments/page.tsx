"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getAllResidences, Residence } from "@/data/residences";
import SiteHeader from "@/components/SiteHeader";
import ApartmentsFilterBar from "@/components/ApartmentsFilterBar";

function ApartmentsContent() {
  const searchParams = useSearchParams();
  const initialCheckIn = searchParams.get("checkin") || "";
  const initialCheckOut = searchParams.get("checkout") || "";
  const initialGuests = Number(searchParams.get("guests")) || 2;

  const residences = useMemo(() => getAllResidences(), []);

  // Filter state
  const [checkIn, setCheckIn] = useState(initialCheckIn);
  const [checkOut, setCheckOut] = useState(initialCheckOut);
  const [guestsCount, setGuestsCount] = useState(initialGuests);

  // Active photo per residence card: { [slug]: index }
  const [activePhotoIdx, setActivePhotoIdx] = useState<Record<string, number>>({});

  // Lightbox Modal state
  const [lightboxData, setLightboxData] = useState<{
    residence: Residence;
    photoIdx: number;
  } | null>(null);

  // Mobile navigation menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Filter logic
  const filteredResidences = useMemo(() => {
    return residences.filter((res) => {
      if (guestsCount > res.sleeps) return false;
      return true;
    });
  }, [residences, guestsCount]);

  // Image slider handlers
  const handlePrevPhoto = (slug: string, total: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActivePhotoIdx((prev) => {
      const curr = prev[slug] || 0;
      return { ...prev, [slug]: (curr - 1 + total) % total };
    });
  };

  const handleNextPhoto = (slug: string, total: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActivePhotoIdx((prev) => {
      const curr = prev[slug] || 0;
      return { ...prev, [slug]: (curr + 1) % total };
    });
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxData) return;
      if (e.key === "Escape") {
        setLightboxData(null);
      } else if (e.key === "ArrowLeft") {
        const total = lightboxData.residence.gallery.length;
        setLightboxData({
          ...lightboxData,
          photoIdx: (lightboxData.photoIdx - 1 + total) % total,
        });
      } else if (e.key === "ArrowRight") {
        const total = lightboxData.residence.gallery.length;
        setLightboxData({
          ...lightboxData,
          photoIdx: (lightboxData.photoIdx + 1) % total,
        });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxData]);

  // Calculate nights
  const nightsCount = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const d1 = new Date(checkIn).getTime();
    const d2 = new Date(checkOut).getTime();
    const diff = Math.round((d2 - d1) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  }, [checkIn, checkOut]);

  return (
    <div className="min-h-screen bg-[#070c16] text-[#f5f6f8] selection:bg-[#d4af37] selection:text-[#070c16]">
      {/* ─── UNIFIED SITE HEADER ─── */}
      <SiteHeader />

      {/* ─── PAGE HERO BANNER ─── */}
      <section className="pt-32 pb-8 border-b border-white/10 relative z-30">
        <div
          className="absolute inset-0 opacity-15 pointer-events-none overflow-hidden"
          style={{
            backgroundImage: "radial-gradient(#d4af37 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#d4af37] font-semibold">
                Ikoyi, Lagos • Luxury Suites
              </span>
              <span className="w-8 h-[1px] bg-[#d4af37]/40" />
              <span className="text-[11px] uppercase tracking-[0.2em] text-white/50">
                7 Bespoke Private Residences
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white font-normal leading-tight">
              Select Your Apartment
            </h1>
            <p className="text-sm md:text-base text-white/60 mt-3 leading-relaxed">
              Every suite is curated with bespoke Italian furnishings, open-concept living salons,
              gourmet kitchens, HEPA air purification, and dedicated 24-hour concierge hospitality.
            </p>
          </div>

          {/* ─── INTERACTIVE FILTER & DATES BAR ─── */}
          <div className="mt-8">
            <ApartmentsFilterBar
              checkIn={checkIn}
              checkOut={checkOut}
              guestsCount={guestsCount}
              onCheckInChange={setCheckIn}
              onCheckOutChange={setCheckOut}
              onGuestsCountChange={setGuestsCount}
            />
          </div>
        </div>
      </section>

      {/* ─── RESIDENCES LISTING (CLEAN 2-COLUMN GRID) ─── */}
      <main className="py-12 md:py-16 relative z-10">
        <div className="container">
          {filteredResidences.length === 0 ? (
            <div className="text-center py-20 bg-white/[0.02] border border-white/10 p-8">
              <h3 className="font-display text-2xl text-white mb-2">No residences match your criteria</h3>
              <p className="text-white/60 text-sm max-w-md mx-auto mb-6">
                Try adjusting your guest count to see all available suites.
              </p>
              <button
                onClick={() => {
                  setGuestsCount(2);
                }}
                className="btn-primary"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredResidences.map((res) => {
                const currentPhoto = activePhotoIdx[res.slug] || 0;
                const totalPhotos = res.gallery.length;
                const activeImgUrl = res.gallery[currentPhoto] || res.coverImage;

                return (
                  <article
                    key={res.slug}
                    className="group bg-[#0c1424]/60 border border-white/10 overflow-hidden hover:border-[#d4af37]/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-black/40 flex flex-col justify-between"
                  >
                    {/* Top: Image Showcase */}
                    <div>
                      <div className="relative aspect-[16/10] overflow-hidden bg-black/60">
                        <Link href={`/apartments/${res.slug}`} className="block w-full h-full">
                          <img
                            src={activeImgUrl}
                            alt={res.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
                        </Link>

                        {/* Floor Badge */}
                        <div className="absolute top-4 left-4 z-[2] flex items-center gap-2 pointer-events-none">
                          <span className="px-3 py-1 text-[10px] uppercase tracking-[0.15em] font-semibold bg-[#070c16]/90 text-[#d4af37] border border-[#d4af37]/35 backdrop-blur-md">
                            {res.floor || "Luxury Suite"}
                          </span>
                          {res.slug === "belvedere-penthouse" && (
                            <span className="px-3 py-1 text-[10px] uppercase tracking-[0.15em] font-semibold bg-[#d4af37] text-[#070c16] shadow-md">
                              Crown Penthouse
                            </span>
                          )}
                        </div>

                        {/* Photo Navigation Arrows */}
                        <button
                          onClick={(e) => handlePrevPhoto(res.slug, totalPhotos, e)}
                          className="absolute left-3 top-1/2 -translate-y-1/2 z-[2] w-8 h-8 bg-black/75 hover:bg-[#d4af37] hover:text-[#070c16] text-white flex items-center justify-center border border-white/20 transition-all opacity-0 group-hover:opacity-100"
                          aria-label="Previous image"
                        >
                          ‹
                        </button>
                        <button
                          onClick={(e) => handleNextPhoto(res.slug, totalPhotos, e)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 z-[2] w-8 h-8 bg-black/75 hover:bg-[#d4af37] hover:text-[#070c16] text-white flex items-center justify-center border border-white/20 transition-all opacity-0 group-hover:opacity-100"
                          aria-label="Next image"
                        >
                          ›
                        </button>

                        {/* Photo count pill */}
                        <button
                          onClick={() => setLightboxData({ residence: res, photoIdx: currentPhoto })}
                          className="absolute bottom-3 right-3 z-[2] inline-flex items-center gap-1.5 px-2.5 py-1 bg-black/80 hover:bg-black text-white text-[11px] font-mono border border-white/20 backdrop-blur-md transition-all"
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                          </svg>
                          <span>{currentPhoto + 1} / {totalPhotos}</span>
                        </button>
                      </div>

                      {/* Suite Details */}
                      <div className="p-6">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#d4af37] font-semibold">
                          {res.bedrooms} Bedrooms • {res.bathrooms} En-Suite Baths
                        </span>
                        <h2 className="font-display text-2xl text-white mt-1 group-hover:text-[#d4af37] transition-colors">
                          <Link href={`/apartments/${res.slug}`}>{res.name}</Link>
                        </h2>
                        <p className="text-xs text-white/50 mt-1 font-light italic">
                          &ldquo;{res.tagline}&rdquo;
                        </p>
                      </div>
                    </div>

                    {/* Bottom: Price & Explore Button */}
                    <div className="px-6 pb-6 pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className="font-display text-2xl text-white font-medium">
                            ${res.rateUSD.toLocaleString()}
                          </span>
                          <span className="text-xs text-white/50">/ night</span>
                        </div>
                        <span className="text-[10px] text-white/40 block mt-0.5">
                          Min. 2 Nights • Direct Rate
                        </span>
                      </div>

                      <Link
                        href={`/apartments/${res.slug}`}
                        className="btn-primary"
                        style={{ padding: "10px 22px", fontSize: "12px" }}
                      >
                        Explore Suite Details →
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* ─── FULLSCREEN LIGHTBOX MODAL ─── */}
      {lightboxData && (
        <div
          className="fixed inset-0 z-[2000] bg-black/95 backdrop-blur-2xl flex flex-col justify-between"
          onClick={() => setLightboxData(null)}
        >
          {/* Lightbox Top Bar */}
          <div
            className="flex items-center justify-between px-6 py-4 border-b border-white/10 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <h3 className="font-display text-lg text-white font-medium">
                {lightboxData.residence.name}
              </h3>
              <p className="text-xs text-white/50">
                Photo {lightboxData.photoIdx + 1} of {lightboxData.residence.gallery.length}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href={`/apartments/${lightboxData.residence.slug}`}
                className="btn-primary text-xs"
                style={{ padding: "8px 18px" }}
              >
                View Suite Details
              </Link>
              <button
                onClick={() => setLightboxData(null)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                aria-label="Close photo gallery"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Lightbox Center Image & Arrows */}
          <div
            className="relative flex-1 flex items-center justify-center p-4 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                const total = lightboxData.residence.gallery.length;
                setLightboxData({
                  ...lightboxData,
                  photoIdx: (lightboxData.photoIdx - 1 + total) % total,
                });
              }}
              className="absolute left-4 md:left-8 z-20 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center text-2xl border border-white/20 transition-all hover:scale-110"
              aria-label="Previous image"
            >
              ‹
            </button>

            <img
              src={lightboxData.residence.gallery[lightboxData.photoIdx]}
              alt={`${lightboxData.residence.name} Photo ${lightboxData.photoIdx + 1}`}
              className="max-h-[72vh] max-w-full object-contain rounded-lg shadow-2xl transition-all duration-300"
            />

            <button
              onClick={() => {
                const total = lightboxData.residence.gallery.length;
                setLightboxData({
                  ...lightboxData,
                  photoIdx: (lightboxData.photoIdx + 1) % total,
                });
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
            {lightboxData.residence.gallery.map((imgUrl, idx) => (
              <button
                key={idx}
                onClick={() => setLightboxData({ ...lightboxData, photoIdx: idx })}
                className={`relative flex-shrink-0 w-16 h-12 rounded-md overflow-hidden border transition-all ${
                  idx === lightboxData.photoIdx
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
      <footer className="site-footer" data-od-id="global-footer">
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
                {residences.map((r) => (
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

export default function ApartmentsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#070c16] flex items-center justify-center text-[#d4af37]">Loading Residences...</div>}>
      <ApartmentsContent />
    </Suspense>
  );
}
