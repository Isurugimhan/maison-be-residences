"use client";

import React, { useState } from "react";
import { X, Download, CheckCircle2, FileText } from "lucide-react";

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrochureModal: React.FC<BrochureModalProps> = ({ isOpen, onClose }) => {
  const [downloaded, setDownloaded] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDownloaded(true);
  };

  const handleClose = () => {
    setDownloaded(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070c16]/85 backdrop-blur-xl animate-fade-in"
      onClick={handleClose}
    >
      <div
        className="bg-[#0c1424] border border-gold/40 max-w-lg w-full p-8 sm:p-10 relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 text-white/50 hover:text-white transition-colors"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        <span className="font-mono text-[11px] tracking-[0.2em] text-gold uppercase mb-2 block">
          Official Document Access
        </span>

        <h3 className="font-display text-2xl sm:text-3xl text-white font-normal mb-2">
          Download Full Monograph
        </h3>

        <p className="text-xs sm:text-sm text-white/70 mb-6 leading-relaxed">
          Receive the comprehensive architectural monograph, CAD floor blueprints, interior finishes catalog, and official 2026 off-plan price schedule.
        </p>

        {downloaded ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-gold/15 border border-gold text-gold mx-auto flex items-center justify-center mb-4">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="font-display text-xl text-white mb-2">
              Monograph Ready
            </h4>
            <p className="text-xs text-white/70 max-w-[320px] mx-auto mb-6">
              Thank you, {formData.name}. The complete specification package has been sent to {formData.email} and your WhatsApp.
            </p>
            <button
              onClick={handleClose}
              className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#070c16] bg-gold rounded-full hover:bg-gold-light transition-all"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-medium tracking-[0.1em] uppercase text-white/60 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                placeholder="Full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#070c16] border border-white/15 text-white px-4 py-3 text-sm focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium tracking-[0.1em] uppercase text-white/60 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="name@domain.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#070c16] border border-white/15 text-white px-4 py-3 text-sm focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium tracking-[0.1em] uppercase text-white/60 mb-1.5">
                WhatsApp Phone Number
              </label>
              <input
                type="tel"
                required
                placeholder="+234 / +44 / +1 ..."
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-[#070c16] border border-white/15 text-white px-4 py-3 text-sm focus:outline-none focus:border-gold"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 text-xs sm:text-sm font-semibold tracking-[0.08em] uppercase text-[#070c16] bg-gold hover:bg-gold-light transition-all flex items-center justify-center gap-2 mt-4 shadow-[0_4px_20px_rgba(212,175,55,0.25)]"
            >
              <Download className="w-4 h-4" />
              Download PDF Monograph (24MB)
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
