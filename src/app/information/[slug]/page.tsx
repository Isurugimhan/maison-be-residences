import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";

interface PageData {
  title: string;
  eyebrow: string;
  lead?: string;
  sections: {
    heading?: string;
    body?: string;
    list?: string[];
    isOrdered?: boolean;
  }[];
}

const PAGES_DATA: Record<string, PageData> = {
  "cancellation-refund-policy": {
    title: "Cancellation & Refund Policy",
    eyebrow: "Maison Be Residences • Policies",
    lead: "We understand that plans may change. This policy applies to all reservations made directly with Maison BE Residence unless different terms are stated in the booking confirmation.",
    sections: [
      {
        heading: "Cancellation and Refund Schedule",
        list: [
          "14 days or more before check-in: 50% refund of the accommodation payment.",
          "7–13 days before check-in: 50% refund of the accommodation payment.",
          "Less than 7 days before check-in: No refund.",
          "No-show: The full booking amount will be forfeited.",
        ],
      },
      {
        body: "Cancellation periods are calculated from the official check-in time stated in the booking confirmation. Non-refundable bank, card-processing, currency-conversion or transfer charges may be deducted from the refundable amount.",
      },
      {
        heading: "Rescheduling",
        body: "As an alternative to cancellation, guests may request to reschedule their stay under the following conditions:",
        list: [
          "The request must be submitted at least 7 days before check-in.",
          "Only one date change is permitted per reservation.",
          "The rescheduled stay must be completed within 6 months of the original check-in date.",
          "New dates are subject to availability and any applicable minimum-stay requirements.",
          "If the new rate is higher, the guest must pay the difference.",
          "If the new rate is lower, the difference will not be refunded.",
          "Rescheduled bookings cannot subsequently be cancelled for a cash refund.",
        ],
      },
      {
        heading: "Early Departure",
        body: "Guests who check out before their confirmed departure date will remain responsible for the full cost of the original reservation. No refund, credit or rescheduling will be provided for unused nights.",
      },
      {
        heading: "Non-Refundable and Promotional Bookings",
        body: "Reservations made under non-refundable, promotional, discounted or special-event rates cannot be cancelled, refunded or rescheduled unless otherwise stated in writing.",
      },
      {
        heading: "Penthouse, Group and Extended-Stay Reservations",
        body: "Penthouse reservations, group bookings, extended stays, full-property bookings and reservations during holidays, festive periods or major events may be subject to separate cancellation terms. Any special conditions will be communicated before payment and stated in the booking confirmation.",
      },
      {
        heading: "Exceptional Circumstances",
        body: "Requests resulting from genuine emergencies, government-imposed travel restrictions, natural disasters or other exceptional circumstances will be reviewed individually. Supporting documentation may be required.",
      },
      {
        heading: "Cancellations by Maison BE Residence",
        body: "If Maison BE Residence is unable to honour a confirmed reservation, the guest will be offered suitable alternative dates or accommodation, or a full refund of all accommodation payments received for the affected reservation.",
      },
      {
        heading: "Security Deposit",
        body: "Security deposits are separate from accommodation payments. Following a satisfactory inspection after check-out, the deposit will be released within 48 hours, subject to the processing time of the guest's bank or payment provider. Deductions may be made for damage, missing items, excessive cleaning, smoking violations, unpaid charges or breaches of the residence rules.",
      },
      {
        heading: "Cancellation Procedure & Refund Processing",
        body: "All cancellation and rescheduling requests must be submitted in writing through an official Maison BE Residence booking channel. Approved refunds will be returned through the original payment method within 7–14 business days.",
      },
    ],
  },
  "house-rules": {
    title: "House Rules",
    eyebrow: "Maison Be Residences • Guest Standards",
    lead: "Maison BE Residence is located within a private residential estate in Ikoyi, Lagos. These rules are designed to preserve the peaceful, secure and refined environment for all residents and guests.",
    sections: [
      {
        heading: "Community & Residence Standards",
        isOrdered: true,
        list: [
          "Noise Control: Excessive noise, loud music, outdoor speakers, shouting and unnecessary vehicle horns are prohibited throughout the premises. Quiet hours are 10:00 PM – 8:00 AM.",
          "Guests and Visitors: Only registered guests may stay overnight. All visitors must be registered and approved by Management, and apartment occupancy limits must be observed.",
          "Parties and Events: Parties, large gatherings, events and commercial shoots require prior written approval from Management.",
          "Smoking and Prohibited Activities: Smoking, vaping and shisha are strictly prohibited inside the apartments. Illegal drugs, weapons and unlawful activities are strictly forbidden.",
          "Pets: Pets are not permitted anywhere within Maison BE Residence.",
          "Property and Valuables: Guests are responsible for any damage, loss or missing items arising from their stay. A personal safe is provided in every apartment, and guests are encouraged to secure all valuables.",
          "Respectful Conduct: All staff, guests, visitors and neighbours must be treated with dignity and respect. Harassment, intimidation, discrimination, threats, abusive language or physical aggression will not be tolerated.",
          "Housekeeping: Housekeeping services are available until 7:00 PM daily. Guests are encouraged to submit cleaning requests before this time.",
          "Safety and Facilities: Keys, access cards and security codes must not be shared. Children must be supervised, particularly around the swimming pool and balconies. All facility rules must be followed, and glassware is prohibited around the pool.",
          "Check-In, Check-Out and Compliance: Check-in is from 2:00 PM, and check-out is by 12:00 noon. Violations may result in additional charges or termination of the stay without refund.",
        ],
      },
    ],
  },
  "terms-of-use": {
    title: "Terms of Use",
    eyebrow: "Maison Be Residences • Legal Framework",
    lead: "By accessing the Maison BE Residence website or confirming a reservation, you acknowledge and agree to the following terms and conditions:",
    sections: [
      {
        heading: "Reservations and Payments",
        body: "Reservations are subject to availability and are confirmed only after the required payment has been received and official written confirmation issued. Guests must provide accurate information and present valid government identification at check-in. Rates are displayed in the stated currency. Applicable taxes, security deposits and additional charges will be clearly communicated before confirmation.",
      },
      {
        heading: "Cancellations and Changes",
        body: "All cancellations, refunds, date changes and no-shows are governed by the cancellation policy attached to the selected booking. Approved changes remain subject to availability and any applicable rate difference.",
      },
      {
        heading: "Check-in and Occupancy",
        body: "The primary guest must be at least 18 years old. Only registered guests may occupy an apartment, and the stated maximum occupancy must not be exceeded. Visitors are subject to MBR security and registration procedures.",
      },
      {
        heading: "Guest Conduct",
        body: "Maison BE Residence is situated within a prestigious residential estate. Guests must respect the privacy and comfort of others and avoid excessive noise or disruptive conduct. Smoking, illegal drugs, unauthorised parties, unlawful activities and possession of dangerous items are strictly prohibited.",
      },
      {
        heading: "Property and Damages",
        body: "Guests are responsible for the apartment, furnishings, equipment, keys and access cards throughout their stay. Any damage, loss, missing items or excessive cleaning caused by a guest or their visitors will be charged to the booking guest.",
      },
      {
        heading: "Website and Intellectual Property",
        body: "Our website may be used only for lawful enquiries and reservations. All MBR names, logos, photographs, designs and written content remain the exclusive property of Maison BE Residence and may not be reproduced without prior written permission.",
      },
      {
        heading: "Governing Law",
        body: "These Terms are governed by the laws of the Federal Republic of Nigeria. Any unresolved dispute will be subject to the exclusive jurisdiction of the appropriate courts in Lagos State.",
      },
    ],
  },
  "about-us": {
    title: "About Maison Be Residences",
    eyebrow: "Ikoyi, Lagos • Boutique Apart-Hotel",
    lead: "Maison BE Residence is a contemporary boutique apart-hotel in the heart of Ikoyi, Lagos, offering beautifully designed residences where refined luxury meets the comfort of home.",
    sections: [
      {
        heading: "Our Vision",
        body: "Thoughtfully created for privacy, exceptional comfort and impeccable hospitality, every stay is designed to feel effortless, personal and memorable.",
      },
      {
        heading: "A Place to Belong",
        body: "Built around comfort, trust and understated luxury, our residence offers a warm, composed home away from home for short stays, extended visits and every moment in between. Welcome to Maison BE — Live Beautifully.",
      },
      {
        heading: "The Enclave",
        body: "Set in a tranquil, highly secure residential avenue in Ikoyi, guests enjoy convenient proximity to Victoria Island's commercial hubs, premier restaurants, and art galleries, while retreating into absolute calm at the end of the day.",
      },
    ],
  },
  "events": {
    title: "Amenities & Events",
    eyebrow: "Beyond Your Residence",
    lead: "From quiet mornings at the café to afternoons by the pool, Maison Be offers thoughtful spaces to stay, meet, and celebrate in Lagos.",
    sections: [
      {
        heading: "01 / Maison Be Café",
        body: "A warm, art-filled setting for breakfast, artisanal coffee, conversation, and an unhurried start to the day. Flexible café seating makes room for private conversations and relaxed moments together.",
      },
      {
        heading: "02 / Poolside Hours",
        body: "An open-air swimming pool and sun deck designed for quiet afternoons, easy gatherings, and time at your own pace.",
      },
      {
        heading: "03 / Vivez en beauté",
        body: "Colour, calm, and a little escape in the middle of Lagos. A secluded garden courtyard framed by lush flora.",
      },
      {
        heading: "04 / A Considered Arrival",
        body: "A welcoming gated entrance framed by greenery, with 24/7 security and dedicated valet service setting the tone for your stay.",
      },
      {
        heading: "Private Gatherings & Brand Shoots",
        body: "Selected shared spaces and our signature Belvedere Penthouse salon are available for intimate executive dinners, brand presentations, and editorial productions upon prior management approval.",
      },
    ],
  },
  "contact": {
    title: "Contact Concierge & Reservations",
    eyebrow: "Maison Be Reservations",
    lead: "Whether you are planning a short visit, an extended stay, or need help choosing the right residence, our reservations team is ready to assist you.",
    sections: [
      {
        heading: "Reservations Channels",
        list: [
          "Official Email: reservations@maisonberesidences.com",
          "Direct Telephone: +234 906 500 7079",
          "WhatsApp Concierge: +234 906 500 7079 (24/7 Chat & Instant Availability)",
          "Location: Ikoyi, Lagos, Nigeria",
        ],
      },
      {
        heading: "Check-in & Check-out Hours",
        body: "Official check-in commences at 2:00 PM. Check-out is by 12:00 noon. Early check-in or late departure may be requested in advance and is subject to suite availability.",
      },
      {
        heading: "Special Inquiries",
        body: "Send us your preferred arrival dates, number of guests, and any bespoke concierge requirements (airport transfer, private chef, dedicated chauffeur). We will respond promptly with availability and residence options.",
      },
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const page = PAGES_DATA[params.slug];
  if (!page) {
    return { title: "Policy | Maison Be Residences" };
  }
  return {
    title: `${page.title} | Maison Be Residences`,
    description: page.lead || "Maison Be Residences information and policies.",
  };
}

export default function PolicyInformationPage({
  params,
}: {
  params: { slug: string };
}) {
  const page = PAGES_DATA[params.slug];

  if (!page) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#06112e] text-[#f5f6f8] selection:bg-[#c6a87d] selection:text-[#06112e]">
      {/* ─── UNIFIED SITE HEADER ─── */}
      <SiteHeader />

      {/* ─── EDITORIAL ARTICLE CONTENT ─── */}
      <main className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-white/50 mb-8">
          <Link href="/" className="hover:text-[#c6a87d] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span>Information</span>
          <span>/</span>
          <span className="text-[#c6a87d]">{page.title}</span>
        </div>

        {/* Header Block */}
        <div className="border-b border-white/10 pb-8 mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-[#c6a87d] font-semibold mb-3">
            {page.eyebrow}
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-normal leading-tight mb-6">
            {page.title}
          </h1>
          {page.lead && (
            <p className="text-base md:text-lg text-white/80 font-light leading-relaxed">
              {page.lead}
            </p>
          )}
        </div>

        {/* Content Sections */}
        <div className="space-y-10 text-sm md:text-base text-white/70 font-light leading-relaxed">
          {page.sections.map((section, idx) => (
            <section key={idx} className="space-y-4">
              {section.heading && (
                <h2 className="font-display text-2xl md:text-3xl text-white font-normal pt-2">
                  {section.heading}
                </h2>
              )}
              {section.body && <p className="leading-relaxed">{section.body}</p>}
              {section.list && (
                section.isOrdered ? (
                  <ol className="space-y-3.5 pl-5 list-decimal text-white/80">
                    {section.list.map((item, i) => (
                      <li key={i} className="pl-2 leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ol>
                ) : (
                  <ul className="space-y-3 pl-5 list-disc text-white/80">
                    {section.list.map((item, i) => (
                      <li key={i} className="pl-1 leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                )
              )}
            </section>
          ))}
        </div>

        {/* Quick Navigation Cards */}
        <div className="mt-16 pt-10 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/information/cancellation-refund-policy"
            className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#c6a87d]/40 transition-colors block"
          >
            <div className="text-[11px] text-[#c6a87d] uppercase tracking-wider mb-1">Policy</div>
            <div className="text-white text-sm font-medium">Cancellation & Refunds →</div>
          </Link>
          <Link
            href="/information/house-rules"
            className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#c6a87d]/40 transition-colors block"
          >
            <div className="text-[11px] text-[#c6a87d] uppercase tracking-wider mb-1">Standards</div>
            <div className="text-white text-sm font-medium">House Rules →</div>
          </Link>
          <Link
            href="/information/terms-of-use"
            className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#c6a87d]/40 transition-colors block"
          >
            <div className="text-[11px] text-[#c6a87d] uppercase tracking-wider mb-1">Legal</div>
            <div className="text-white text-sm font-medium">Terms of Use →</div>
          </Link>
        </div>

        {/* Back Link */}
        <div className="mt-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#c6a87d] hover:text-white transition-colors"
          >
            <span>←</span> Back to Maison Be Residences
          </Link>
        </div>
      </main>

      {/* ─── FOOTER ─── */}
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
                <li><Link href="/#residences">Belvedere — Penthouse</Link></li>
                <li><Link href="/#residences">Beaufort Suite</Link></li>
                <li><Link href="/#residences">Berkeley Suite</Link></li>
                <li><Link href="/#residences">Bellamy Suite</Link></li>
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
              <h4 className="footer-heading">Reservations & Contact</h4>
              <ul className="footer-links">
                <li><a href="mailto:reservations@maisonberesidences.com">reservations@maisonberesidences.com</a></li>
                <li><a href="tel:+2349065007079">+234 906 500 7079</a></li>
                <li><a href="https://wa.me/2349065007079" target="_blank" rel="noopener noreferrer">WhatsApp Concierge</a></li>
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
