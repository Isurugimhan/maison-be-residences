"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SiteHeaderProps {
  /** Optional callback for "Request Lookbook" on landing page */
  onOpenBrochure?: () => void;
  /** Optional WhatsApp pre-filled message override */
  whatsappMessage?: string;
}

const WHATSAPP_DEFAULT =
  "Hello Maison Be Concierge, I would like to inquire about suite reservations.";
const WHATSAPP_NUMBER = "2349065007079";

interface NavDropdownItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href: string;
  /** Sub-items shown in a dropdown on hover/click */
  children?: NavDropdownItem[];
}

const NAV_ITEMS: NavItem[] = [
  { label: "The Vision", href: "/#vision" },
  {
    label: "Residences",
    href: "/apartments",
    children: [
      { label: "All Apartments", href: "/apartments" },
      { label: "Belvedere — Penthouse", href: "/apartments/belvedere-penthouse" },
      { label: "Beaufort Residence", href: "/apartments/beaufort" },
      { label: "Berkeley Residence", href: "/apartments/berkeley" },
      { label: "Bellamy Residence", href: "/apartments/bellamy" },
      { label: "Belgravia Residence", href: "/apartments/belgravia" },
      { label: "Belmont Residence", href: "/apartments/belmont" },
      { label: "Beaumont Residence", href: "/apartments/beaumont" },
    ],
  },
  { label: "Amenities", href: "/#amenities" },
  { label: "Experience", href: "/#experience" },
  {
    label: "About",
    href: "/information/about-us",
    children: [
      { label: "About Us", href: "/information/about-us" },
      { label: "Contact & Inquiries", href: "/information/contact" },
      { label: "Private Events", href: "/information/events" },
    ],
  },
];

export default function SiteHeader({ onOpenBrochure, whatsappMessage }: SiteHeaderProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  const isLandingPage = pathname === "/";

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenMobileDropdown(null);
  }, [pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        setOpenDropdown(null);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const [internalBrochureOpen, setInternalBrochureOpen] = useState(false);

  const handleOpenBrochure = () => {
    if (onOpenBrochure) {
      onOpenBrochure();
    } else {
      setInternalBrochureOpen(true);
    }
  };

  const handleBrochureSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Residence Lookbook & Floor Plans dispatched to your email and WhatsApp.");
    setInternalBrochureOpen(false);
  };

  const waMsg = encodeURIComponent(whatsappMessage || WHATSAPP_DEFAULT);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`;

  return (
    <>
      <header className="site-header" data-od-id="global-header" ref={headerRef}>
        <div className="container header-inner">
          {/* ─── Brand Logo ─── */}
          <Link href="/" className="brand-name" aria-label="Maison Be Residences Home">
            <img
              src="/logo.png"
              alt="Maison Be Residences"
              className="brand-logo-img"
            />
          </Link>

          {/* ─── Desktop Navigation ─── */}
          <ul className="nav-menu">
            {NAV_ITEMS.map((item) => (
              <li
                key={item.label}
                className={item.children ? "nav-has-dropdown" : ""}
                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                onMouseLeave={() => item.children && setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="nav-link-item inline-flex items-center gap-1.5"
                  onClick={() => setOpenDropdown(null)}
                >
                  <span className="nav-label">{item.label}</span>
                  {item.children && (
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      className="nav-chevron inline-block"
                      style={{ opacity: 0.6 }}
                      aria-hidden="true"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  )}
                </Link>

                {/* Dropdown Panel */}
                {item.children && openDropdown === item.label && (
                  <div className="nav-dropdown-panel">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="nav-dropdown-item"
                        onClick={() => setOpenDropdown(null)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* ─── Header Actions ─── */}
          <div className="header-actions">
            <button className="btn-ghost" onClick={handleOpenBrochure}>
              Request Lookbook
            </button>
            {isLandingPage ? (
              <a href="#contact" className="btn-primary">
                Reserve Stay
              </a>
            ) : (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Concierge Desk
              </a>
            )}

            {/* Mobile Hamburger */}
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

      {/* ─── Mobile Slide-Down Drawer ─── */}
      <div className={`mobile-nav-drawer ${isMobileMenuOpen ? "open" : ""}`}>
        <ul className="mobile-nav-links">
          {NAV_ITEMS.map((item) => (
            <li key={item.label} className={item.children ? "mobile-has-dropdown" : ""}>
              {item.children ? (
                <>
                  <button
                    className="mobile-dropdown-trigger"
                    onClick={() =>
                      setOpenMobileDropdown(
                        openMobileDropdown === item.label ? null : item.label
                      )
                    }
                  >
                    {item.label}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className={openMobileDropdown === item.label ? "rotate-180" : ""}
                      style={{ transition: "transform 0.2s ease" }}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  {openMobileDropdown === item.label && (
                    <ul className="mobile-dropdown-children">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
        <div className="mobile-drawer-actions">
          <button
            className="btn-ghost w-full justify-center"
            onClick={() => {
              setIsMobileMenuOpen(false);
              handleOpenBrochure();
            }}
          >
            Request Lookbook
          </button>
          {isLandingPage ? (
            <a
              href="#contact"
              className="btn-primary w-full justify-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Reserve Stay
            </a>
          ) : (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full justify-center"
            >
              Concierge Desk
            </a>
          )}
        </div>
      </div>

      {/* ─── LOOKBOOK MODAL (UNIVERSAL FALLBACK) ─── */}
      <div
        className={`modal-overlay modal-backdrop ${internalBrochureOpen ? "active open" : ""}`}
        onClick={() => setInternalBrochureOpen(false)}
      >
        <div className="modal-box" onClick={(e) => e.stopPropagation()}>
          <button
            className="modal-close-btn"
            onClick={() => setInternalBrochureOpen(false)}
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
    </>
  );
}
