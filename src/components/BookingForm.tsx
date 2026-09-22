"use client";

import React, { useState } from "react";
import { CheckCircle2, Send, Calendar, Clock, MessageSquare } from "lucide-react";

export const BookingForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preference: "1-Bedroom Executive Suite",
    consultationType: "In-Person Private Viewing",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-28 bg-[#070c16] relative">
      <div className="max-w-[1320px] mx-auto px-6 md:px-8">
        <div className="max-w-[860px] mx-auto bg-[#0c1424] border border-gold/30 p-8 sm:p-14 lg:p-16 relative shadow-2xl">
          {/* Section Index */}
          <span className="font-mono text-xs tracking-[0.24em] text-gold uppercase mb-3 block text-center">
            06 // Private Consultation
          </span>

          <h2 className="font-display text-3xl sm:text-4xl text-white text-center font-normal mb-4">
            Schedule Your Private VIP Viewing
          </h2>

          <p className="text-sm text-white/70 text-center max-w-[560px] mx-auto mb-10 leading-relaxed font-light">
            Experience the architectural scale model, review custom finishing samples, and discuss off-plan pricing incentives with our Senior Portfolio Advisors.
          </p>

          {submitted ? (
            <div className="p-8 sm:p-12 text-center bg-[#070c16] border border-gold/40 rounded-sm">
              <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold text-gold mx-auto flex items-center justify-center mb-6">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-display text-2xl text-white mb-2">
                Consultation Request Received
              </h3>
              <p className="text-sm text-white/70 max-w-[420px] mx-auto mb-6 leading-relaxed">
                Thank you, {formData.name || "valued guest"}. A Senior Portfolio Advisor will contact you directly via WhatsApp & Email within 15 minutes to confirm your private viewing.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 text-xs uppercase tracking-wider font-semibold text-gold border border-gold/40 rounded-full hover:bg-gold hover:text-[#070c16] transition-all"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[11px] font-medium tracking-[0.12em] uppercase text-white/60 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. / Mr. / Chief..."
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#070c16] border border-white/15 text-white px-4 py-3.5 text-sm rounded-none focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium tracking-[0.12em] uppercase text-white/60 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#070c16] border border-white/15 text-white px-4 py-3.5 text-sm rounded-none focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium tracking-[0.12em] uppercase text-white/60 mb-2">
                  Phone / WhatsApp (with Country Code)
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+234 / +44 / +1 ..."
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#070c16] border border-white/15 text-white px-4 py-3.5 text-sm rounded-none focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium tracking-[0.12em] uppercase text-white/60 mb-2">
                  Residence Preference
                </label>
                <div className="luxury-select-wrapper">
                  <select
                    value={formData.preference}
                    onChange={(e) => setFormData({ ...formData, preference: e.target.value })}
                    className="w-full bg-[#070c16] border border-white/15 text-white px-4 py-3.5 pr-10 text-sm rounded-none focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all appearance-none cursor-pointer"
                  >
                    <option value="1-Bedroom Executive Suite">1-Bedroom Executive Suite</option>
                    <option value="2-Bedroom Luxury Residence">2-Bedroom Luxury Residence</option>
                    <option value="3-Bedroom Family Suite">3-Bedroom Family Suite</option>
                    <option value="Signature Sky Penthouse">Signature Sky Penthouse</option>
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

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-medium tracking-[0.12em] uppercase text-white/60 mb-2">
                  Consultation Format
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {["In-Person Private Viewing (Sales Pavilion)", "Private Video Walkthrough (Zoom / Teams)"].map(
                    (type) => (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setFormData({ ...formData, consultationType: type })}
                        className={`px-4 py-3 text-xs text-left border transition-all ${
                          formData.consultationType === type
                            ? "bg-gold/15 border-gold text-gold font-medium"
                            : "bg-[#070c16] border-white/10 text-white/70 hover:border-white/30"
                        }`}
                      >
                        {type}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="sm:col-span-2 pt-4">
                <button
                  type="submit"
                  className="w-full py-4 text-sm font-semibold tracking-[0.08em] uppercase text-[#070c16] bg-gold hover:bg-gold-light transition-all duration-300 shadow-[0_4px_25px_rgba(212,175,55,0.3)] hover:shadow-[0_8px_35px_rgba(212,175,55,0.5)] flex items-center justify-center gap-2"
                >
                  Confirm Private Appointment
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
