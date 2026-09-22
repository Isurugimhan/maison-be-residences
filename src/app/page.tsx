"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import HeroBookingBar from "@/components/HeroBookingBar";
import SiteHeader from "@/components/SiteHeader";
import StoryPhotoSlider from "@/components/StoryPhotoSlider";
import { getAllResidences } from "@/data/residences";

const heroSlides = [
  {
    title: "Maison Be Residences • Ikoyi, Lagos",
    img: "https://file--storage.lon1.cdn.digitaloceanspaces.com/apartments/7ef125b8-d3b4-4136-a4f2-584f3dc01e7f.jpg",
    alt: "Maison Be Residences Interior Living",
  },
  {
    title: "Belvedere Signature Penthouse Salon",
    img: "https://file--storage.lon1.cdn.digitaloceanspaces.com/apartments/6a9bf43f-4269-4927-8242-f022396303fc.jpg",
    alt: "Belvedere Penthouse Living Room",
  },
  {
    title: "Beaufort Living & Dining Suite",
    img: "https://file--storage.lon1.cdn.digitaloceanspaces.com/apartments/66297d9e-562b-4ba7-9c6e-9bb3b6bf4720.jpg",
    alt: "Beaufort Residence Salon",
  },
  {
    title: "Berkeley & Bellamy Curated Suites",
    img: "https://file--storage.lon1.cdn.digitaloceanspaces.com/apartments/220a2086-9f5a-4b9a-a026-12a30962d97e.jpg",
    alt: "Berkeley and Bellamy Suites",
  },
];

const unitData = [
  {
    slug: "belvedere-penthouse",
    name: "Belvedere — Penthouse",
    badge: "SIGNATURE PENTHOUSE // $1,100 / NIGHT",
    area: "3 King Beds • Sleeps 7",
    beds: "3 Bedrooms • 3.5 Bathrooms",
    terrace: "2 Direct Penthouse Elevators",
    parking: "Secured Resident Parking Included",
    img: "https://file--storage.lon1.cdn.digitaloceanspaces.com/apartments/6a9bf43f-4269-4927-8242-f022396303fc.jpg",
    desc: "Elevated high above Ikoyi, Belvedere features two private direct elevators, soaring architectural ceiling heights, an expansive entertaining salon, formal dining room, full gourmet chef kitchen, and three magnificent king bedroom suites.",
  },
  {
    slug: "beaufort",
    name: "Beaufort Residence",
    badge: "LUXURY RESIDENCE // $500 / NIGHT",
    area: "3 King Beds • Sleeps 7",
    beds: "3 Bedrooms • 3.5 Bathrooms",
    terrace: "Open-Concept Salon & Dining",
    parking: "Secured Resident Parking Included",
    img: "https://file--storage.lon1.cdn.digitaloceanspaces.com/apartments/66297d9e-562b-4ba7-9c6e-9bb3b6bf4720.jpg",
    desc: "A sanctuary of calm and understated sophistication. Beaufort balances generous open-concept living and dining with warm contemporary tones, bespoke woodwork, HEPA air purification, and restful private bedroom quarters.",
  },
  {
    slug: "berkeley",
    name: "Berkeley Residence",
    badge: "LUXURY RESIDENCE // $500 / NIGHT",
    area: "3 King Beds • Sleeps 7",
    beds: "3 Bedrooms • 3.5 Bathrooms",
    terrace: "Curated Art & Designer Living",
    parking: "Secured Resident Parking Included",
    img: "https://file--storage.lon1.cdn.digitaloceanspaces.com/apartments/220a2086-9f5a-4b9a-a026-12a30962d97e.jpg",
    desc: "An artfully composed residence designed for extended unhurried stays. Berkeley boasts curated original artwork, an expansive gourmet kitchen, custom Italian furnishings, and tranquil morning light.",
  },
  {
    slug: "bellamy",
    name: "Bellamy Residence",
    badge: "LUXURY RESIDENCE // $500 / NIGHT",
    area: "3 King Beds • Sleeps 7",
    beds: "3 Bedrooms • 3.5 Bathrooms",
    terrace: "Smart Home Integrated Living",
    parking: "Secured Resident Parking Included",
    img: "https://file--storage.lon1.cdn.digitaloceanspaces.com/apartments/3fd0fbbe-c0b3-4819-b61c-2d93c07e962f.jpg",
    desc: "Modern luxury defined by clean geometric lines, plush king suites, and effortless entertaining spaces. Bellamy offers total privacy in the heart of Ikoyi with seamless smart home technology.",
  },
];

export default function LandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentUnit, setCurrentUnit] = useState(0);
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [whatsAppMessage, setWhatsAppMessage] = useState(
    "Hello Maison Be Residences, I would like to inquire about suite availability and rates."
  );

  // Check-in / Check-out Booking Bar State
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guestsRooms, setGuestsRooms] = useState("2 Guests, 1 Room");

  const allResidences = getAllResidences();
  const belvedereRes = allResidences.find((r) => r.slug === "belvedere-penthouse");
  const beaufortRes = allResidences.find((r) => r.slug === "beaufort");
  const belvedereGallery = belvedereRes?.gallery || [];
  const beaufortGallery = beaufortRes?.gallery || [];

  const slideTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play background slideshow
  useEffect(() => {
    slideTimerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => {
      if (slideTimerRef.current) clearInterval(slideTimerRef.current);
    };
  }, []);

  // Setup default check-in and check-out dates (min 2 nights)
  useEffect(() => {
    const today = new Date();
    const checkin = new Date(today);
    checkin.setDate(checkin.getDate() + 1);
    const checkout = new Date(today);
    checkout.setDate(checkout.getDate() + 3);

    const toISO = (d: Date) => d.toISOString().split("T")[0];
    setCheckInDate(toISO(checkin));
    setCheckOutDate(toISO(checkout));
  }, []);

  // Active section scroll tracking (Scrollspy)
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["vision", "residences", "amenities", "experience", "contact"];
      const scrollPos = window.scrollY + 220;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            return;
          }
        }
      }
      if (window.scrollY < 300) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openBrochureModal = () => setIsBrochureOpen(true);
  const closeBrochureModal = () => setIsBrochureOpen(false);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkInDate && checkOutDate) {
      const d1 = new Date(checkInDate).getTime();
      const d2 = new Date(checkOutDate).getTime();
      const diffDays = Math.round((d2 - d1) / (1000 * 60 * 60 * 24));
      if (diffDays < 2) {
        alert("Maison Be Residences requires a minimum reservation of 2 nights. Please select a later check-out date.");
        return;
      }
    }
    alert(
      "Thank you. Your reservation request has been received. Our concierge team will contact you momentarily to confirm availability."
    );
  };

  const handleBrochureSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Residence Lookbook & Floor Plans dispatched to your email and WhatsApp.");
    closeBrochureModal();
  };

  const handleSendWhatsApp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const phone = "2349065007079";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(whatsAppMessage)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setIsWhatsAppOpen(false);
  };

  const u = unitData[currentUnit];

  return (
    <div data-od-id="maison-be-body">
      {/* ─── UNIFIED SITE HEADER ─── */}
      <SiteHeader onOpenBrochure={openBrochureModal} />

      {/* ─── SEAMLESS ATMOSPHERIC HERO SECTION ─── */}
      <section className="hero-viewport" data-od-id="hero-section">
        {/* Blueprint Watermark Scaffolding */}
        <div className="hero-blueprint-bg"></div>
        <div className="hero-cad-drawing"></div>

        {/* Architectural Multi-Image Cross-Fade Slideshow */}
        <div className="hero-imagery-backdrop" id="hero-slideshow">
          {heroSlides.map((slide, idx) => (
            <div
              key={slide.title}
              className={`slide-item ${idx === currentSlide ? "active" : ""}`}
              data-title={slide.title}
            >
              <img src={slide.img} alt={slide.alt} />
            </div>
          ))}
        </div>

        {/* Editorial Content Overlaid on Atmospheric Background */}
        <div className="hero-content-wrapper">
          <div className="hero-text-block">
            <div className="hero-eyebrow">IKOYI, LAGOS • BOUTIQUE APART-HOTEL</div>
            <h1 className="hero-title">
              Live Beautifully. Where Luxury Meets{" "}
              <span className="hero-title-accent">Home.</span>
            </h1>
            <p className="hero-description">
              Private stays in Lagos, thoughtfully considered. More than a place to stay,
              Maison Be is a place to belong. Built around comfort, trust, and understated luxury
              with 24-hour dedicated concierge hospitality.
            </p>

            <div className="hero-action-group">
              <a href="#residences" className="btn-hero-primary">
                Explore Residences
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* ─── LUXURY INTEGRATED CHECK-IN / CHECK-OUT AVAILABILITY BAR ─── */}
            <HeroBookingBar />
          </div>
        </div>
      </section>

      {/* ─── FLOATING WHATSAPP BUTTON (TOGGLES POPUP) ─── */}
      <button
        type="button"
        onClick={() => setIsWhatsAppOpen(!isWhatsAppOpen)}
        className="whatsapp-floating-btn"
        aria-label="WhatsApp Sales Concierge"
      >
        <div className="whatsapp-pulse"></div>
        <div className="whatsapp-tooltip">Chat with Maison Be Concierge</div>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      </button>

      {/* ─── WHATSAPP INTERACTIVE POPUP CHAT BOX ─── */}
      <div className={`whatsapp-chat-widget ${isWhatsAppOpen ? "active" : ""}`}>
        <div className="whatsapp-widget-header">
          <div className="whatsapp-advisor-profile">
            <div className="whatsapp-advisor-avatar-wrapper">
              <img
                src="/logo.png"
                alt="Maison Be Concierge"
                className="whatsapp-advisor-avatar object-contain bg-[#070c16] p-1"
              />
              <div className="whatsapp-online-dot"></div>
            </div>
            <div className="whatsapp-advisor-info">
              <div className="whatsapp-advisor-name">
                Maison Be Concierge
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#25d366">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <div className="whatsapp-advisor-status">+234 906 500 7079 • Online</div>
            </div>
          </div>
          <button
            onClick={() => setIsWhatsAppOpen(false)}
            className="whatsapp-widget-close"
            aria-label="Close Chat Window"
          >
            &times;
          </button>
        </div>

        <div className="whatsapp-chat-body">
          <div className="whatsapp-chat-bubble">
            <p>
              Hello! Welcome to <strong>Maison Be Residences</strong>. How may we assist your stay in Ikoyi, Lagos? Select a topic or send us your inquiry:
            </p>
            <div className="whatsapp-bubble-time">Just now</div>
          </div>

          <div className="whatsapp-quick-chips">
            <button
              type="button"
              className="whatsapp-chip"
              onClick={() =>
                setWhatsAppMessage(
                  "Hello, I would like to check availability and rates for the Belvedere Penthouse."
                )
              }
            >
              Belvedere Penthouse ($1,100/night)
            </button>
            <button
              type="button"
              className="whatsapp-chip"
              onClick={() =>
                setWhatsAppMessage(
                  "Hello, please share rates and availability for Beaufort, Berkeley or Bellamy suites."
                )
              }
            >
              3-Bedroom Luxury Suites ($500/night)
            </button>
            <button
              type="button"
              className="whatsapp-chip"
              onClick={() =>
                setWhatsAppMessage(
                  "Hello, I would like to inquire about hosting a private event or photoshoot at Maison Be."
                )
              }
            >
              Private Events & Café Inquiries
            </button>
          </div>
        </div>

        <form onSubmit={handleSendWhatsApp} className="whatsapp-chat-footer">
          <input
            type="text"
            className="whatsapp-chat-input"
            value={whatsAppMessage}
            onChange={(e) => setWhatsAppMessage(e.target.value)}
            placeholder="Type message to concierge..."
          />
          <button
            type="submit"
            className="whatsapp-send-action"
            aria-label="Send WhatsApp Message"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </form>
      </div>

      {/* ─── SECTION 2: THE VISION ─── */}
      <section className="section-vision" id="vision" data-od-id="vision-section">
        <div className="container">
          <div className="section-header">
            <span className="section-index">01 // The Philosophy</span>
            <h2 className="section-title">
              More than a place to stay, Maison Be is a place to belong.
            </h2>
          </div>

          <div className="vision-grid">
            <div className="vision-text">
              <p className="vision-lead">
                Maison BE Residence is a contemporary boutique apart-hotel in the heart of
                Ikoyi, Lagos, offering beautifully designed residences where refined luxury meets
                the comfort of home.
              </p>
              <p className="vision-body">
                Thoughtfully created for privacy, exceptional comfort and impeccable hospitality,
                every stay is designed to feel effortless, personal and memorable. Built around
                comfort, trust and understated luxury for short stays and extended visits.
              </p>

              <div className="vision-pillars">
                <div className="pillar-card">
                  <div className="pillar-num">01</div>
                  <h3 className="pillar-title">Understated Luxury</h3>
                  <p className="pillar-desc">
                    Bespoke Italian furnishings, quiet neutral palettes, and curated artwork.
                  </p>
                </div>
                <div className="pillar-card">
                  <div className="pillar-num">02</div>
                  <h3 className="pillar-title">Thoughtful Hospitality</h3>
                  <p className="pillar-desc">
                    24-hour concierge, daily housekeeping, 24-hour room service, and secure valet arrival.
                  </p>
                </div>
              </div>
            </div>

            <div className="vision-media-stack">
              <div className="vision-img-frame">
                <img
                  src="/media/exterior/patio.jpg"
                  alt="Maison Be Residences Courtyard and Architecture"
                  className="vision-img-main"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: RESIDENCES & FLOOR PLANS ─── */}
      <section
        className="section-residences"
        id="residences"
        data-od-id="residences-section"
      >
        <div className="container">
          <div className="section-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <span className="section-index">02 // The Collection</span>
              <h2 className="section-title">Find your stay.</h2>
            </div>
            <a href="/apartments" className="btn-ghost" style={{ fontSize: "13px", padding: "10px 22px" }}>
              View All 7 Residences →
            </a>
          </div>

          <div className="residences-filter-bar">
            {unitData.map((unit, idx) => (
              <button
                key={unit.name}
                className={`filter-tab ${idx === currentUnit ? "active" : ""}`}
                onClick={() => setCurrentUnit(idx)}
              >
                {unit.name.replace(" — Penthouse", " Penthouse").replace(" Residence", "")}
              </button>
            ))}
            <a
              href="/apartments"
              className="filter-tab"
              style={{
                borderColor: "rgba(212, 175, 55, 0.4)",
                color: "#d4af37",
                background: "rgba(212, 175, 55, 0.08)",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              + 3 More Suites (View All 7) →
            </a>
          </div>

          <div className="unit-display-card" id="unit-card">
            <div className="unit-media-stack">
              <a href={`/apartments/${u.slug}`} className="unit-img-frame" style={{ display: "block" }}>
                <img id="unit-img" src={u.img} alt={u.name} />
              </a>
            </div>

            <div className="unit-details-pane">
              <div>
                <div className="unit-type-tag" id="unit-badge">
                  {u.badge}
                </div>
                <h3 className="unit-title" id="unit-name">
                  <a href={`/apartments/${u.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                    {u.name}
                  </a>
                </h3>
                <p className="unit-desc" id="unit-desc">
                  {u.desc}
                </p>

                <div className="unit-specs-matrix">
                  <div>
                    <div className="spec-item-label">Accommodations</div>
                    <div className="spec-item-val" id="unit-area">
                      {u.area}
                    </div>
                  </div>
                  <div>
                    <div className="spec-item-label">Bedrooms & Bath</div>
                    <div className="spec-item-val" id="unit-beds">
                      {u.beds}
                    </div>
                  </div>
                  <div>
                    <div className="spec-item-label">Signature Feature</div>
                    <div className="spec-item-val" id="unit-terrace">
                      {u.terrace}
                    </div>
                  </div>
                  <div>
                    <div className="spec-item-label">Parking & Access</div>
                    <div className="spec-item-val" id="unit-parking">
                      {u.parking}
                    </div>
                  </div>
                </div>
              </div>

              <div className="unit-actions-row">
                <a href={`/apartments/${u.slug}`} className="btn-primary">
                  View Suite Details & Photos
                </a>
                <a href="/apartments" className="btn-ghost">
                  View All Residences →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: SIGNATURE 5-STAR AMENITIES & SPACES ─── */}
      <section
        className="section-amenities"
        id="amenities"
        data-od-id="amenities-section"
      >
        <div className="container">
          <div className="section-header">
            <span className="section-index">03 // Spaces & Amenities</span>
            <h2 className="section-title">Spaces that make staying feel beautifully complete.</h2>
          </div>

          <div className="amenities-matrix">
            <div className="amenity-column">
              <div className="amenity-meta">
                <span className="amenity-num">01</span>
                <span className="amenity-tag">ALL-DAY CAFÉ</span>
              </div>
              <h3 className="amenity-name">Maison Be Café</h3>
              <p className="amenity-detail">
                A warm, art-filled setting for breakfast, coffee, conversation, and an unhurried start to the day.
              </p>
              <div className="amenity-spec">Artisanal Coffee & Breakfast</div>
            </div>

            <div className="amenity-column">
              <div className="amenity-meta">
                <span className="amenity-num">02</span>
                <span className="amenity-tag">OPEN-AIR POOL</span>
              </div>
              <h3 className="amenity-name">Poolside Hours</h3>
              <p className="amenity-detail">
                An open-air pool and sun deck designed for quiet afternoons, refreshing dips, and leisure at your own pace.
              </p>
              <div className="amenity-spec">Swimming Pool & Sun Deck</div>
            </div>

            <div className="amenity-column">
              <div className="amenity-meta">
                <span className="amenity-num">03</span>
                <span className="amenity-tag">SANCTUARY</span>
              </div>
              <h3 className="amenity-name">Vivez en beauté</h3>
              <p className="amenity-detail">
                Colour, calm, and a secluded private oasis in the middle of Ikoyi, Lagos for quiet reflection.
              </p>
              <div className="amenity-spec">Courtyard Garden Oasis</div>
            </div>

            <div className="amenity-column">
              <div className="amenity-meta">
                <span className="amenity-num">04</span>
                <span className="amenity-tag">PORTE-COCHÈRE</span>
              </div>
              <h3 className="amenity-name">A Considered Arrival</h3>
              <p className="amenity-detail">
                A welcoming private entrance framed by greenery, with 24/7 guarded security and dedicated valet.
              </p>
              <div className="amenity-spec">Gated Valet & 24/7 Security</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4 & 5: EDITORIAL STORIES ("THE MAISON BE WAY" & "MADE FOR LINGERING") ─── */}
      <section className="residence-stories" id="experience" aria-label="The Maison Be Experience">
        <div className="container">
          <div className="residence-story-wrapper">
            {/* Story 1: Belvedere Penthouse */}
            <article className="residence-story-item">
              <div className="residence-story-copy">
                <span className="residence-story-eyebrow">04 // The Maison Be Way</span>
                <h2 className="residence-story-title">A more considered way to stay.</h2>
                <p className="residence-story-desc">
                  From the first arrival to the last unhurried morning, each Maison Be residence is designed around the quiet details that make a stay feel effortless.
                </p>
                <Link href="/apartments" className="residence-story-link">
                  View all apartments <span aria-hidden="true">→</span>
                </Link>
              </div>

              <div className="residence-story-media-stack">
                <StoryPhotoSlider
                  gallery={belvedereGallery}
                  fallbackImage={belvedereRes?.coverImage}
                  residenceTitle="Belvedere Penthouse"
                  alt="Belvedere Penthouse at Maison Be"
                  autoPlayInterval={4500}
                />
              </div>
            </article>

            {/* Story 2: Beaufort Residence (Inverted layout) */}
            <article className="residence-story-item is-reversed">
              <div className="residence-story-media-stack">
                <StoryPhotoSlider
                  gallery={beaufortGallery}
                  fallbackImage={beaufortRes?.coverImage}
                  residenceTitle="Beaufort Residence"
                  alt="Beaufort Residence at Maison Be"
                  autoPlayInterval={5000}
                />
              </div>

              <div className="residence-story-copy">
                <span className="residence-story-eyebrow">05 // Made for Lingering</span>
                <h2 className="residence-story-title">Space to settle into your own rhythm.</h2>
                <p className="residence-story-desc">
                  Thoughtful interiors, generous rooms and a private sense of calm make every visit feel less like a booking and more like coming home.
                </p>
                <Link href="/apartments" className="residence-story-link">
                  View all apartments <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: VIP RESERVATION & CONCIERGE ─── */}
      <section className="section-booking" id="contact" data-od-id="booking-section">
        <div className="container">
          <div className="section-header">
            <span className="section-index">06 // Reserve Your Stay</span>
            <h2 className="section-title">We’re here to make your stay effortless.</h2>
            <p className="consultation-lead-text">
              Whether you are planning a short visit, an extended executive stay, or need assistance selecting the ideal residence, our dedicated concierge team is at your disposal 24/7.
            </p>
          </div>

          <div className="consultation-split-grid">
            <div className="booking-info-col">
              <div className="consultation-touchpoints">
                <div className="touchpoint-card">
                  <div className="touchpoint-card-icon">
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <span className="touchpoint-label">Residence Location</span>
                    <div className="touchpoint-val">Ikoyi, Lagos, Nigeria</div>
                    <span className="text-xs text-white/50 block mt-1">Prime residential enclave with swift corporate & dining access</span>
                  </div>
                </div>

                <a href="mailto:reservations@maisonberesidences.com" className="touchpoint-card group">
                  <div className="touchpoint-card-icon group-hover:text-[#f3d068] transition-colors">
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div>
                    <span className="touchpoint-label">Official Reservations Email</span>
                    <div className="touchpoint-val group-hover:text-[#d4af37] transition-colors">reservations@maisonberesidences.com</div>
                    <span className="text-xs text-white/50 block mt-1">Direct reservations desk • Inquiries answered promptly</span>
                  </div>
                </a>

                <a href="https://wa.me/2349065007079" target="_blank" rel="noopener noreferrer" className="touchpoint-card group">
                  <div className="touchpoint-card-icon group-hover:text-[#f3d068] transition-colors">
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <span className="touchpoint-label">Direct Concierge WhatsApp & Phone</span>
                    <div className="touchpoint-val group-hover:text-[#d4af37] transition-colors">+234 906 500 7079</div>
                    <span className="text-xs text-white/50 block mt-1">Instant WhatsApp concierge dispatch 24/7</span>
                  </div>
                </a>

                <div className="touchpoint-card">
                  <div className="touchpoint-card-icon">
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div>
                    <span className="touchpoint-label">Stay Policy & Guarantee</span>
                    <div className="touchpoint-val">Minimum 2 Nights Stay</div>
                    <span className="text-xs text-white/50 block mt-1">14+ days: 50% refund • 7–13 days: 50% refund • Under 7 days: Non-refundable</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="consultation-form-col">
              <div className="consultation-form-card">
                <form className="consultation-form" onSubmit={handleBooking}>
                  <div className="form-row-2col">
                    <div>
                      <label className="input-label">Full Name</label>
                      <input
                        type="text"
                        className="input-field"
                        placeholder="Your full name"
                        required
                      />
                    </div>

                    <div>
                      <label className="input-label">Email Address</label>
                      <input
                        type="email"
                        className="input-field"
                        placeholder="name@domain.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row-2col">
                    <div>
                      <label className="input-label">Phone / WhatsApp</label>
                      <input
                        type="tel"
                        className="input-field"
                        placeholder="+234 906 500 7079"
                        required
                      />
                    </div>

                    <div>
                      <label className="input-label">Residence Preference</label>
                      <div className="luxury-select-wrapper">
                        <select className="input-field" defaultValue="Belvedere — Penthouse">
                          <option value="Belvedere — Penthouse">Belvedere — Penthouse ($1,100 / night)</option>
                          <option value="Beaufort Residence">Beaufort Residence ($500 / night)</option>
                          <option value="Berkeley Residence">Berkeley Residence ($500 / night)</option>
                          <option value="Bellamy Residence">Bellamy Residence ($500 / night)</option>
                        </select>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="var(--gold)"
                          strokeWidth="2"
                          className="luxury-select-arrow"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="form-row-2col">
                    <div>
                      <label className="input-label">Check-in Date</label>
                      <input
                        type="date"
                        className="input-field"
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="input-label">Check-out Date</label>
                      <input
                        type="date"
                        className="input-field"
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="btn-hero-primary consultation-submit-btn"
                    >
                      Request Reservation Availability
                    </button>
                    <p className="consultation-confidential-note">
                      Strictly confidential. Send us your preferred dates and our concierge team will confirm availability promptly.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── LUXURY FOOTER ─── */}
      <footer className="site-footer" data-od-id="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="footer-brand mb-3">
                <img
                  src="/logo.png"
                  alt="Maison Be Residences"
                  className="brand-logo-img"
                  style={{ height: "38px", width: "auto", objectFit: "contain" }}
                />
              </div>
              <p className="footer-tagline">
                A contemporary boutique apart-hotel in the heart of Ikoyi, Lagos, offering
                beautifully designed residences where refined luxury meets the comfort of home.
              </p>
            </div>

            <div>
              <h4 className="footer-heading">The Residences</h4>
              <ul className="footer-links">
                <li>
                  <a href="#residences">Belvedere — Penthouse</a>
                </li>
                <li>
                  <a href="#residences">Beaufort Suite</a>
                </li>
                <li>
                  <a href="#residences">Berkeley Suite</a>
                </li>
                <li>
                  <a href="#residences">Bellamy Suite</a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="footer-heading">Navigation</h4>
              <ul className="footer-links">
                <li>
                  <a href="#vision">The Vision</a>
                </li>
                <li>
                  <a href="#residences">Residences</a>
                </li>
                <li>
                  <a href="#amenities">Amenities & Spaces</a>
                </li>
                <li>
                  <a href="/information/about-us">About Maison Be</a>
                </li>
                <li>
                  <a href="/information/events">Amenities & Events</a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="footer-heading">Reservations & Contact</h4>
              <ul className="footer-links">
                <li>
                  <a href="mailto:reservations@maisonberesidences.com">reservations@maisonberesidences.com</a>
                </li>
                <li>
                  <a href="tel:+2349065007079">+234 906 500 7079</a>
                </li>
                <li>
                  <a href="https://wa.me/2349065007079" target="_blank" rel="noopener noreferrer">WhatsApp Concierge</a>
                </li>
                <li>
                  <a href="/information/contact">Ikoyi, Lagos, Nigeria</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <div>© 2026 Maison Be Residences. All rights reserved.</div>
            <div className="footer-legal-bar">
              <a href="/information/cancellation-refund-policy">Cancellation & Refund Policy</a>
              <span>•</span>
              <a href="/information/house-rules">House Rules</a>
              <span>•</span>
              <a href="/information/terms-of-use">Terms of Use</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ─── LOOKBOOK MODAL ─── */}
      <div
        className={`modal-overlay modal-backdrop ${isBrochureOpen ? "active open" : ""}`}
        id="brochure-modal"
        onClick={closeBrochureModal}
      >
        <div className="modal-box" onClick={(e) => e.stopPropagation()}>
          <button
            className="modal-close-btn"
            onClick={closeBrochureModal}
            aria-label="Close Modal"
          >
            &times;
          </button>
          <span className="modal-category">Exclusive Monograph</span>
          <h3 className="modal-title">Maison Be Lookbook & Floor Plans</h3>
          <p className="modal-desc">
            Receive the complete residential portfolio with high-resolution interior photography,
            detailed floor plans, and amenities guide for Belvedere, Beaufort, Berkeley, and Bellamy.
          </p>

          <form className="modal-form" onSubmit={handleBrochureSubmit}>
            <div>
              <label className="input-label">Full Name</label>
              <input
                type="text"
                className="input-field"
                placeholder="Lord / Lady / Dr. / Mr. / Ms."
                required
              />
            </div>

            <div>
              <label className="input-label">Direct Email</label>
              <input
                type="email"
                className="input-field"
                placeholder="name@domain.com"
                required
              />
            </div>

            <div>
              <label className="input-label">WhatsApp Number</label>
              <input
                type="tel"
                className="input-field"
                placeholder="+234 906 500 7079"
                required
              />
            </div>

            <button type="submit" className="btn-hero-primary modal-submit-btn">
              Download Lookbook (PDF)
            </button>
            <p className="modal-privacy-notice">
              Your contact information is strictly confidential and managed exclusively by Maison Be Concierge.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
