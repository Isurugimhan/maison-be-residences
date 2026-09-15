import React from "react";
import Image from "next/image";
import Link from "next/link";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#070c16] border-t border-white/10 pt-20 pb-12">
      <div className="max-w-[1320px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gold/40">
                <Image
                  src="/images/maison-be-logo.jpeg"
                  alt="Maison Be Residences"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-display text-xl tracking-[0.14em] text-white uppercase">
                Maison Be <span className="text-gold">Residences</span>
              </span>
            </div>
            <p className="text-xs text-white/60 leading-relaxed max-w-[320px]">
              An iconic landmark residential tower redefining luxury off-plan investment and bespoke architectural living in Nigeria.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold tracking-[0.16em] uppercase text-gold mb-5">
              Navigation
            </h4>
            <ul className="space-y-3 text-xs text-white/60">
              <li>
                <Link href="#vision" className="hover:text-gold transition-colors">
                  The Vision
                </Link>
              </li>
              <li>
                <Link href="#residences" className="hover:text-gold transition-colors">
                  Residences
                </Link>
              </li>
              <li>
                <Link href="#amenities" className="hover:text-gold transition-colors">
                  Amenities
                </Link>
              </li>
              <li>
                <Link href="#investment" className="hover:text-gold transition-colors">
                  Investment
                </Link>
              </li>
              <li>
                <Link href="#location" className="hover:text-gold transition-colors">
                  Location & Map
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Licenses */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold tracking-[0.16em] uppercase text-gold mb-5">
              Legal & Verification
            </h4>
            <ul className="space-y-3 text-xs text-white/60">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Approved Architectural Master Plan
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Deed of Assignment & Governor&apos;s Consent
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Environmental Impact Assessment (EIA)
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Privacy Policy & Terms of Purchase
                </span>
              </li>
            </ul>
          </div>

          {/* Sales Gallery */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold tracking-[0.16em] uppercase text-gold mb-5">
              Sales Pavilion
            </h4>
            <address className="not-italic text-xs text-white/65 leading-relaxed space-y-1">
              <p>Maison Be Sales Pavilion & Gallery</p>
              <p>Victoria Island / Ikoyi Corridor, Lagos, Nigeria</p>
              <p className="pt-2 text-gold">private@maisonbe.com</p>
              <p>+234 800 MAISON BE (624 766)</p>
            </address>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <div>
            &copy; {new Date().getFullYear()} Maison Be Residences. All rights reserved.
          </div>
          <div className="font-mono text-[11px] tracking-wider text-white/50">
            ARCHITECTURAL MONOGRAPH // NIGERIA EDITION
          </div>
        </div>
      </div>
    </footer>
  );
};
