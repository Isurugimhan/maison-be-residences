"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";

interface HeaderProps {
  onOpenBrochure: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBrochure }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "The Vision", href: "#vision" },
    { name: "Residences", href: "#residences" },
    { name: "Amenities", href: "#amenities" },
    { name: "Investment", href: "#investment" },
    { name: "Location", href: "#location" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#070c16]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-[1320px] mx-auto px-6 md:px-8 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link href="#" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 rounded-full overflow-hidden border border-gold/40 shadow-sm transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/images/maison-be-logo.jpeg"
              alt="Maison Be Residences Logo"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-lg md:text-xl tracking-[0.14em] text-white uppercase leading-tight font-normal">
              Maison Be <span className="text-gold font-normal">Residences</span>
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-white/50 -mt-0.5">
              Nigeria • Ultra-Luxury Living
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[13px] font-medium tracking-[0.08em] uppercase text-white/70 hover:text-gold transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenBrochure}
            className="px-5 py-2.5 text-[13px] font-medium tracking-[0.06em] text-white border border-white/20 rounded-full hover:border-gold hover:text-gold hover:bg-gold/10 transition-all duration-300 backdrop-blur-sm"
          >
            Download Brochure
          </button>
          <Link
            href="#contact"
            className="px-5 py-2.5 text-[13px] font-semibold tracking-[0.06em] text-[#070c16] bg-gold rounded-full hover:bg-gold-light transition-all duration-300 shadow-[0_4px_20px_rgba(212,175,55,0.25)] hover:shadow-[0_6px_25px_rgba(212,175,55,0.4)] hover:-translate-y-0.5 flex items-center gap-1.5"
          >
            Book VIP Tour
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-white/80 hover:text-gold"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#070c16]/98 backdrop-blur-2xl border-b border-white/10 px-6 py-6 transition-all">
          <nav className="flex flex-col gap-4 mb-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium tracking-[0.08em] uppercase text-white/80 hover:text-gold py-1"
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBrochure();
              }}
              className="w-full py-3 text-sm font-medium tracking-[0.06em] text-center text-white border border-white/20 rounded-full hover:border-gold hover:text-gold"
            >
              Download Brochure
            </button>
            <Link
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 text-sm font-semibold tracking-[0.06em] text-center text-[#070c16] bg-gold rounded-full hover:bg-gold-light"
            >
              Book VIP Tour
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
