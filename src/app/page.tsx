"use client";

import React, { useState, useEffect, useRef } from "react";

const heroSlides = [
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

const unitData = [
  {
    name: "1-Bedroom Executive Suite",
    badge: "RESIDENCE SPECIFICATION // 01",
    area: "88 sqm / 947 sq.ft",
    beds: "1 Bed • 1.5 En-Suite",
    terrace: "14 sqm Private Balcony",
    parking: "1 Dedicated Covered Bay",
    img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=85",
    desc: "Designed for dynamic executives and international investors, featuring an expansive open-concept salon, Italian marble chef kitchen, and private sunset terrace.",
  },
  {
    name: "2-Bedroom Luxury Residence",
    badge: "RESIDENCE SPECIFICATION // 02",
    area: "142 sqm / 1,528 sq.ft",
    beds: "2 Beds • 2.5 Bathrooms",
    terrace: "26 sqm Wraparound Deck",
    parking: "2 Dedicated Bays",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85",
    desc: "Generously proportioned with dual master suites, walk-in Italian wardrobes, private laundry suite, and panoramic skyline vistas.",
  },
  {
    name: "3-Bedroom Family Suite",
    badge: "RESIDENCE SPECIFICATION // 03",
    area: "215 sqm / 2,314 sq.ft",
    beds: "3 Beds • 3.5 Bathrooms",
    terrace: "38 sqm Corner Terrace",
    parking: "2 Dedicated Bays + Storage",
    img: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1000&q=85",
    desc: "A prestigious family haven with double reception salons, separate chef and prep kitchens, staff quarters, and triple-aspect daylight.",
  },
  {
    name: "Signature Sky Penthouse",
    badge: "RESIDENCE SPECIFICATION // 04",
    area: "420 sqm / 4,520 sq.ft",
    beds: "4 Beds • 5 Bathrooms",
    terrace: "110 sqm Private Roof Deck & Pool",
    parking: "3 Bays + Private Elevator",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=85",
    desc: "The crown of Maison Be. Crowned with 360-degree city and ocean vistas, private heated rooftop plunge pool, wine cellar, and dedicated concierge dispatch.",
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
    "Hello Maison Be Residences, I would like to inquire about off-plan availability and schedule a private tour."
  );

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

  // Active section scroll tracking (Scrollspy)
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["vision", "residences", "amenities", "investment", "contact"];
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
    alert(
      "Thank you. Your private VIP viewing request has been confirmed. A Senior Portfolio Advisor will contact you within 15 minutes."
    );
  };

  const handleBrochureSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Monograph PDF dispatched. Check your email and WhatsApp momentarily.");
    closeBrochureModal();
  };

  const handleSendWhatsApp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const phone = "2348000000000";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(whatsAppMessage)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setIsWhatsAppOpen(false);
  };

  const u = unitData[currentUnit];

  return (
    <div data-od-id="maison-be-body">
      {/* ─── GLOBAL FIXED HEADER ─── */}
      <header className="site-header" data-od-id="global-header">
        <div className="container header-inner">
          <a href="#" className="brand-name">
            <div className="brand-text-stack">
              <span className="brand-title">Maison Be</span>
              <span className="brand-subtitle">
                <span>R</span>
                <span>E</span>
                <span>S</span>
                <span>I</span>
                <span>D</span>
                <span>E</span>
                <span>N</span>
                <span>C</span>
                <span>E</span>
                <span>S</span>
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <ul className="nav-menu">
            <li>
              <a
                href="#vision"
                className={activeSection === "vision" ? "active" : ""}
              >
                The Vision
              </a>
            </li>
            <li>
              <a
                href="#residences"
                className={activeSection === "residences" ? "active" : ""}
              >
                Residences
              </a>
            </li>
            <li>
              <a
                href="#amenities"
                className={activeSection === "amenities" ? "active" : ""}
              >
                Amenities
              </a>
            </li>
            <li>
              <a
                href="#investment"
                className={activeSection === "investment" ? "active" : ""}
              >
                Investment
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className={activeSection === "contact" ? "active" : ""}
              >
                Private Tour
              </a>
            </li>
          </ul>

          <div className="header-actions">
            <button className="btn-ghost" onClick={openBrochureModal}>
              Download Brochure
            </button>
            <a href="#contact" className="btn-primary">
              Book VIP Tour
            </a>

            {/* Mobile Menu Hamburger Toggle */}
            <button
              className="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ─── MOBILE SLIDE-DOWN DRAWER ─── */}
      <div className={`mobile-nav-drawer ${isMobileMenuOpen ? "open" : ""}`}>
        <ul className="mobile-nav-links">
          <li>
            <a
              href="#vision"
              onClick={() => setIsMobileMenuOpen(false)}
              className={activeSection === "vision" ? "active" : ""}
            >
              The Vision
            </a>
          </li>
          <li>
            <a
              href="#residences"
              onClick={() => setIsMobileMenuOpen(false)}
              className={activeSection === "residences" ? "active" : ""}
            >
              Residences
            </a>
          </li>
          <li>
            <a
              href="#amenities"
              onClick={() => setIsMobileMenuOpen(false)}
              className={activeSection === "amenities" ? "active" : ""}
            >
              Amenities
            </a>
          </li>
          <li>
            <a
              href="#investment"
              onClick={() => setIsMobileMenuOpen(false)}
              className={activeSection === "investment" ? "active" : ""}
            >
              Investment
            </a>
          </li>
          <li>
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className={activeSection === "contact" ? "active" : ""}
            >
              Private Tour
            </a>
          </li>
        </ul>
        <div className="mobile-drawer-actions">
          <button
            className="btn-ghost"
            onClick={() => {
              setIsMobileMenuOpen(false);
              openBrochureModal();
            }}
          >
            Download Brochure
          </button>
          <a
            href="#contact"
            className="btn-primary"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Book VIP Tour
          </a>
        </div>
      </div>

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
            <div className="hero-eyebrow">Exclusive Off-Plan Launch</div>
            <h1 className="hero-title">
              Where Timeless Architecture Meets{" "}
              <span className="hero-title-accent">Prestigious Living.</span>
            </h1>
            <p className="hero-description">
              An exclusive sanctuary of 1, 2, and 3-bedroom luxury residences and bespoke
              sky penthouses, engineered with floor-to-ceiling panoramic glass, natural
              stone finishes, and five-star hospitality management.
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
              <button onClick={openBrochureModal} className="btn-hero-secondary">
                Request Floor Plans
              </button>
            </div>
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
        <div className="whatsapp-tooltip">Chat with Senior Portfolio Advisor</div>
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
                src="/images/maison-be-logo.jpeg"
                alt="Maison Be Concierge"
                className="whatsapp-advisor-avatar"
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
              <div className="whatsapp-advisor-status">Typically replies within 5 mins</div>
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
              Hello! Welcome to <strong>Maison Be Residences</strong>. How may we assist you today? Select a quick topic below or type your personal inquiry:
            </p>
            <div className="whatsapp-bubble-time">Just now</div>
          </div>

          <div className="whatsapp-quick-chips">
            <button
              type="button"
              className="whatsapp-chip"
              onClick={() =>
                setWhatsAppMessage(
                  "Hello, please share the 2026 off-plan price schedule and floor plans."
                )
              }
            >
              Request Price Schedule
            </button>
            <button
              type="button"
              className="whatsapp-chip"
              onClick={() =>
                setWhatsAppMessage(
                  "Hello, I would like to schedule a private VIP viewing at the sales pavilion."
                )
              }
            >
              Book Private Viewing
            </button>
            <button
              type="button"
              className="whatsapp-chip"
              onClick={() =>
                setWhatsAppMessage(
                  "Hello, I am interested in the Signature Sky Penthouse availability."
                )
              }
            >
              Penthouse Inquiry
            </button>
          </div>
        </div>

        <form className="whatsapp-input-bar" onSubmit={handleSendWhatsApp}>
          <input
            type="text"
            className="whatsapp-input-field"
            value={whatsAppMessage}
            onChange={(e) => setWhatsAppMessage(e.target.value)}
            placeholder="Type your message..."
            required
          />
          <button type="submit" className="whatsapp-send-btn" aria-label="Send WhatsApp message">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </form>
      </div>

      {/* ─── SECTION 2: THE VISION ─── */}
      <section className="section-vision" id="vision" data-od-id="vision-section">
        <div className="container">
          <div className="section-header">
            <span className="section-index">01 // Architectural Narrative</span>
            <h2 className="section-title">
              A Symphony of Classical Symmetry & Modern Sophistication
            </h2>
          </div>

          <div className="vision-grid">
            <div className="vision-text">
              <p className="vision-lead">
                Conceived by visionary architects, Maison Be Residences redefines premier
                urban living in Nigeria through pure geometry, natural light, and bespoke
                craftsmanship.
              </p>
              <p className="vision-body">
                Every residence is engineered with deep cantilevered terraces, bespoke
                fluted stone paneling, and German-engineered triple-glazed glass systems
                that provide acoustic serenity and uninterrupted skyline views.
              </p>

              <div className="vision-pillars">
                <div className="pillar-card">
                  <div className="pillar-num">01</div>
                  <h3 className="pillar-title">Panoramic Glass</h3>
                  <p className="pillar-desc">
                    Floor-to-ceiling 3.2m acoustic thermal glazing maximizing natural
                    daylight.
                  </p>
                </div>
                <div className="pillar-card">
                  <div className="pillar-num">02</div>
                  <h3 className="pillar-title">Smart Automation</h3>
                  <p className="pillar-desc">
                    Integrated biometric climate, lighting, and keyless concierge access.
                  </p>
                </div>
              </div>
            </div>

            <div className="vision-media-stack">
              <div className="vision-img-frame">
                <img
                  src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85"
                  alt="Maison Be Architecture Detail"
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
          <div className="section-header">
            <span className="section-index">02 // The Collection</span>
            <h2 className="section-title">Curated Suites & Sky Residences</h2>
          </div>

          <div className="residences-filter-bar">
            {unitData.map((unit, idx) => (
              <button
                key={unit.name}
                className={`filter-tab ${idx === currentUnit ? "active" : ""}`}
                onClick={() => setCurrentUnit(idx)}
              >
                {unit.name.replace(" Suite", "").replace(" Residence", "")}
              </button>
            ))}
          </div>

          <div className="unit-display-card" id="unit-card">
            <div className="unit-media-stack">
              <div className="unit-img-frame">
                <img id="unit-img" src={u.img} alt={u.name} />
              </div>
            </div>

            <div className="unit-details-pane">
              <div>
                <div className="unit-type-tag" id="unit-badge">
                  {u.badge}
                </div>
                <h3 className="unit-title" id="unit-name">
                  {u.name}
                </h3>
                <p className="unit-desc" id="unit-desc">
                  {u.desc}
                </p>

                <div className="unit-specs-matrix">
                  <div>
                    <div className="spec-item-label">Internal Area</div>
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
                    <div className="spec-item-label">Terrace Deck</div>
                    <div className="spec-item-val" id="unit-terrace">
                      {u.terrace}
                    </div>
                  </div>
                  <div>
                    <div className="spec-item-label">Parking Bay</div>
                    <div className="spec-item-val" id="unit-parking">
                      {u.parking}
                    </div>
                  </div>
                </div>
              </div>

              <div className="unit-actions-row">
                <button className="btn-primary" onClick={openBrochureModal}>
                  Inquire About Unit
                </button>
                <button className="btn-ghost" onClick={openBrochureModal}>
                  Download Blueprint (PDF)
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: SIGNATURE 5-STAR AMENITIES ─── */}
      <section
        className="section-amenities"
        id="amenities"
        data-od-id="amenities-section"
      >
        <div className="container">
          <div className="section-header">
            <span className="section-index">03 // Private Club & Amenities</span>
            <h2 className="section-title">Five-Star Hospitality, Everyday Living</h2>
          </div>

          <div className="amenities-matrix">
            <div className="amenity-column">
              <div className="amenity-meta">
                <span className="amenity-num">01</span>
                <span className="amenity-tag">AQUATICS</span>
              </div>
              <h3 className="amenity-name">Horizon Infinity Pool</h3>
              <p className="amenity-detail">
                Elevated heated horizon pool with panoramic skyline views and private
                resident cabanas.
              </p>
              <div className="amenity-spec">Panoramic Skyline Views</div>
            </div>

            <div className="amenity-column">
              <div className="amenity-meta">
                <span className="amenity-num">02</span>
                <span className="amenity-tag">HYDROTHERAPY</span>
              </div>
              <h3 className="amenity-name">Thermal Spa & Steam</h3>
              <p className="amenity-detail">
                Private rejuvenation suites, Finnish cedar saunas, and hydrotherapy
                plunge pools.
              </p>
              <div className="amenity-spec">Finnish Cedar & Plunge</div>
            </div>

            <div className="amenity-column">
              <div className="amenity-meta">
                <span className="amenity-num">03</span>
                <span className="amenity-tag">PERFORMANCE</span>
              </div>
              <h3 className="amenity-name">Technogym Studio</h3>
              <p className="amenity-detail">
                State-of-the-art cardiovascular and strength training with dedicated
                Pilates reformers.
              </p>
              <div className="amenity-spec">Biometric & Reformers</div>
            </div>

            <div className="amenity-column">
              <div className="amenity-meta">
                <span className="amenity-num">04</span>
                <span className="amenity-tag">EXECUTIVE</span>
              </div>
              <h3 className="amenity-name">Executive Boardroom</h3>
              <p className="amenity-detail">
                Ultra-high-speed fiber, conference facilities, and private video
                walkthrough suites.
              </p>
              <div className="amenity-spec">Private Video Suites</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: PAYMENT PLAN & INVESTMENT ─── */}
      <section
        className="section-investment"
        id="investment"
        data-od-id="investment-section"
      >
        <div className="container">
          <div className="investment-split-grid">
            <div className="investment-narrative-col">
              <span className="section-index">04 // Capital Security</span>
              <h2 className="section-title">
                Structured For Capital Preservation & Transparency
              </h2>
              <p className="investment-lead-text">
                Every phase of development is tied directly to independently certified structural milestones. Capital disbursements remain strictly protected in legal escrow until third-party engineering audits are fulfilled.
              </p>

              <div className="investment-guarantee-pillars">
                <div className="inv-pillar-item">
                  <div className="inv-pillar-header">
                    <span className="inv-pillar-index">01</span>
                    <h3 className="inv-pillar-name">Independent Escrow Protection</h3>
                  </div>
                  <p className="inv-pillar-desc">
                    Milestone funds are disbursed strictly against verified civil engineering drawdowns approved by independent legal trustees.
                  </p>
                </div>

                <div className="inv-pillar-item">
                  <div className="inv-pillar-header">
                    <span className="inv-pillar-index">02</span>
                    <h3 className="inv-pillar-name">Freehold Deed & Title Registration</h3>
                  </div>
                  <p className="inv-pillar-desc">
                    Direct government title perfection and prompt deed handover upon final completion and key exchange.
                  </p>
                </div>

                <div className="inv-pillar-item">
                  <div className="inv-pillar-header">
                    <span className="inv-pillar-index">03</span>
                    <h3 className="inv-pillar-name">Projected Capital Appreciation</h3>
                  </div>
                  <p className="inv-pillar-desc">
                    Estimated 28% – 35% equity appreciation through structural delivery and prime rental yield index.
                  </p>
                </div>
              </div>
            </div>

            <div className="investment-timeline-col">
              <div className="milestone-timeline">
                <div className="milestone-timeline-item highlight">
                  <div className="timeline-node-track">
                    <div className="timeline-dot"></div>
                    <div className="timeline-line"></div>
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-header-row">
                      <span className="timeline-phase-tag">PHASE 01 // INITIAL</span>
                      <span className="timeline-pct">10%</span>
                    </div>
                    <h3 className="timeline-title">Reservation Deposit</h3>
                    <p className="timeline-desc">
                      Secures priority unit allocation, preferred orientation, and locks in pre-construction price rates.
                    </p>
                  </div>
                </div>

                <div className="milestone-timeline-item">
                  <div className="timeline-node-track">
                    <div className="timeline-dot"></div>
                    <div className="timeline-line"></div>
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-header-row">
                      <span className="timeline-phase-tag">PHASE 02 // STRUCTURE</span>
                      <span className="timeline-pct">40%</span>
                    </div>
                    <h3 className="timeline-title">Construction Milestones</h3>
                    <p className="timeline-desc">
                      Disbursed in quarterly tranches tied to verified foundation, core framing, and floor slab progression.
                    </p>
                  </div>
                </div>

                <div className="milestone-timeline-item">
                  <div className="timeline-node-track">
                    <div className="timeline-dot"></div>
                    <div className="timeline-line"></div>
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-header-row">
                      <span className="timeline-phase-tag">PHASE 03 // ENVELOPE</span>
                      <span className="timeline-pct">10%</span>
                    </div>
                    <h3 className="timeline-title">Structure Completion</h3>
                    <p className="timeline-desc">
                      Payable upon architectural structural top-out and external acoustic thermal facade installation.
                    </p>
                  </div>
                </div>

                <div className="milestone-timeline-item">
                  <div className="timeline-node-track">
                    <div className="timeline-dot"></div>
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-header-row">
                      <span className="timeline-phase-tag">PHASE 04 // HANDOVER</span>
                      <span className="timeline-pct">40%</span>
                    </div>
                    <h3 className="timeline-title">Key Handover & Title</h3>
                    <p className="timeline-desc">
                      Final balance settled upon title deed perfection, physical key handover, and formal resident move-in.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: VIP CONSULTATION & PRIVATE VIEWING ─── */}
      <section className="section-booking" id="contact" data-od-id="booking-section">
        <div className="container">
          <div className="consultation-split-grid">
            <div className="consultation-info-col">
              <span className="section-index">05 // Private Consultation</span>
              <h2 className="section-title">Schedule Your Private Gallery Viewing</h2>
              <p className="consultation-lead-text">
                Experience the architectural scale model, explore bespoke materials & finishes, and review portfolio allocation strategies with our Senior Advisory team in complete privacy.
              </p>

              <div className="consultation-touchpoints">
                <div className="touchpoint-item">
                  <div className="touchpoint-label">Sales Gallery & Model Suite</div>
                  <div className="touchpoint-val">45 Alexander Road, Ikoyi / Victoria Island, Lagos, Nigeria</div>
                </div>

                <div className="touchpoint-item">
                  <div className="touchpoint-label">Direct VIP Concierge</div>
                  <div className="touchpoint-val">+234 800 000 0000 &nbsp;•&nbsp; advisors@maisonberesidences.com</div>
                </div>

                <div className="touchpoint-item">
                  <div className="touchpoint-label">Executive Chauffeur Service</div>
                  <div className="touchpoint-val">Complimentary private city and airport chauffeur transfers arranged upon confirmation.</div>
                </div>
              </div>
            </div>

            <div className="consultation-form-col">
              <form className="consultation-form" onSubmit={handleBooking}>
                <div className="form-row-2col">
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
                      placeholder="+234 / +44 / +1 ..."
                      required
                    />
                  </div>

                  <div>
                    <label className="input-label">Residence Preference</label>
                    <select className="input-field" defaultValue="1-Bedroom Executive Suite">
                      <option value="1-Bedroom Executive Suite">1-Bedroom Executive Suite</option>
                      <option value="2-Bedroom Luxury Residence">2-Bedroom Luxury Residence</option>
                      <option value="3-Bedroom Family Suite">3-Bedroom Family Suite</option>
                      <option value="Signature Sky Penthouse">Signature Sky Penthouse</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="input-label">Preferred Viewing Format</label>
                  <select className="input-field" defaultValue="Private Gallery Viewing (Ikoyi Suite)">
                    <option value="Private Gallery Viewing (Ikoyi Suite)">Private Gallery Viewing (Ikoyi Suite)</option>
                    <option value="Virtual High-Definition Walkthrough">Virtual High-Definition Walkthrough</option>
                    <option value="Private Advisory Dinner & Briefing">Private Advisory Briefing</option>
                  </select>
                </div>

                <div>
                  <button
                    type="submit"
                    className="btn-hero-primary consultation-submit-btn"
                  >
                    Confirm Private Appointment
                  </button>
                  <p className="consultation-confidential-note">
                    Strictly confidential. Your inquiry is managed exclusively by our Senior Advisory team.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ─── LUXURY FOOTER ─── */}
      <footer className="site-footer" data-od-id="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="footer-brand">Maison Be Residences</div>
              <p className="footer-tagline">
                An iconic landmark residential tower redefining luxury off-plan investment
                in Nigeria.
              </p>
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
                  <a href="#amenities">Amenities</a>
                </li>
                <li>
                  <a href="#investment">Investment</a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="footer-heading">Legal & Licenses</h4>
              <ul className="footer-links">
                <li>
                  <a href="#">Approved Master Plan</a>
                </li>
                <li>
                  <a href="#">Deed of Assignment</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Terms of Investment</a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="footer-heading">Sales Gallery</h4>
              <p
                style={{
                  fontSize: "13px",
                  color: "rgba(245, 246, 248, 0.65)",
                  lineHeight: "1.8",
                }}
              >
                Maison Be Sales Pavilion
                <br />
                Victoria Island, Lagos, Nigeria
                <br />
                private@maisonbe.com
              </p>
            </div>
          </div>

          <div className="footer-bottom">
            <div>&copy; 2026 Maison Be Residences. All rights reserved.</div>
            <div>Architectural Monograph // Prata Edition</div>
          </div>
        </div>
      </footer>

      {/* ─── BROCHURE MODAL ─── */}
      <div
        className={`modal-overlay ${isBrochureOpen ? "active" : ""}`}
        id="brochure-modal"
        onClick={(e) => {
          if ((e.target as HTMLElement).id === "brochure-modal") {
            closeBrochureModal();
          }
        }}
      >
        <div className="modal-box">
          <button className="modal-close" onClick={closeBrochureModal}>
            &times;
          </button>
          <span className="section-index">Official Document Access</span>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "28px",
              color: "#ffffff",
              marginBottom: "8px",
            }}
          >
            Download Full Brochure
          </h3>
          <p
            style={{
              fontSize: "13px",
              color: "rgba(245, 246, 248, 0.7)",
              marginBottom: "24px",
            }}
          >
            Receive the complete architectural monograph, unit blueprints, specification
            lists, and 2026 price schedule directly via email and WhatsApp.
          </p>

          <form onSubmit={handleBrochureSubmit}>
            <div style={{ marginBottom: "16px" }}>
              <label className="input-label">Your Name</label>
              <input
                type="text"
                className="input-field"
                placeholder="Full name"
                required
              />
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label className="input-label">Email Address</label>
              <input
                type="email"
                className="input-field"
                placeholder="name@domain.com"
                required
              />
            </div>
            <div style={{ marginBottom: "24px" }}>
              <label className="input-label">WhatsApp Number</label>
              <input
                type="tel"
                className="input-field"
                placeholder="+234 ..."
                required
              />
            </div>
            <button
              type="submit"
              className="btn-hero-primary"
              style={{ width: "100%", justifyContent: "center" }}
            >
              Download PDF Monograph
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
