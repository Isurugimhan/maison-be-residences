# MEMORY.md — Maison Be Residences Project Knowledge Base

> **Last Updated:** September 2026  
> **Status:** Production Live  
> **Live URL:** [https://maison-be-residences.vercel.app](https://maison-be-residences.vercel.app)  
> **GitHub Repo:** [https://github.com/Isurugimhan/maison-be-residences](https://github.com/Isurugimhan/maison-be-residences)  

---

## 1. Project Overview & Business Context

- **Brand:** **Maison Be Residences**
- **Location & Market:** Prime Luxury Real Estate Development in Nigeria (Ikoyi / Victoria Island, Lagos).
- **Target Audience:** High-Net-Worth Individuals (HNWI), luxury homeowners, C-suite executives, and international Nigerian diaspora investors seeking high-yield capital appreciation.
- **Design Inspiration:** World-class luxury real estate benchmarks (**Aman, Edition, DAMAC, Emaar, Foster + Partners**).
- **Core Aesthetic:** High-end architectural minimalism, classical symmetry, deep midnight palette, champagne gold accents, and editorial typography.

---

## 2. Technology Stack & Deployment

- **Framework:** Next.js 14 (App Router) + React 18 + TypeScript
- **Styling:** Tailwind CSS + Vanilla CSS custom properties (`src/app/globals.css`)
- **Typography:** Google Fonts loaded via `next/font/google`:
  - `Prata` (`--font-display`): Luxury Editorial Serif for titles, headlines, and milestone percentages.
  - `Plus Jakarta Sans` (`--font-body`): Clean modern sans-serif for body copy and UI elements.
  - `JetBrains Mono` (`--font-mono`): Monospace for specification labels, area figures, and technical tags.
- **Hosting & CI/CD:**
  - **Vercel Production:** `https://maison-be-residences.vercel.app`
  - **GitHub Repository:** `https://github.com/Isurugimhan/maison-be-residences` (`main` branch)
- **Local Development:** Run `npm run dev` at `http://localhost:3000`.

---

## 3. Strict Design Rules & User Preferences (CRITICAL)

When modifying or expanding this codebase, strictly follow these non-negotiable guidelines:

1. **STRICTLY NO EMOJIS ANYWHERE**:
   - The user explicitly requested **zero emojis** across all components (no emojis in headings, chips, buttons, chat popups, or badges). Emojis dilute the luxury brand aesthetic and look "super AI".
2. **Color Palette Integrity**:
   - **Deep Midnight Navy:** `#070c16` (primary background), `#0c1424` (surface), `#101a2e` (elevated).
   - **Champagne Gold:** `#d4af37` (accent), `rgba(212, 175, 55, 0.45 - 0.7)` (borders and lines).
   - **Typography Neutral:** Crisp white `#ffffff` and soft off-white `rgba(245, 246, 248, 0.7)`.
   - **Forbidden:** No muddy orange-brown or warm beige washes.
3. **Architectural Frames & Hover Animations**:
   - Signature architectural images (Section 01 & Section 02) use an **offset champagne gold outline frame** (`::before`) shifted bottom-right.
   - **The outer gold frame must remain static on hover** (no translation, no scaling, no drop shadows).
   - The image inside uses `overflow: hidden` and zooms in subtly (`transform: scale(1.04)`) with a silky transition (`cubic-bezier(0.25, 1, 0.5, 1)`).
4. **Header Brand Alignment**:
   - The brand name `MAISON BE` and `RESIDENCES` are stacked in two lines and width-justified so both lines form an exact rectangular bounding box.
   - Nav menu hover uses a sleek bottom gold underline (`::after` line) only—**no pill or circular background shadows**.
5. **No Isolated Boxed Cards**:
   - Avoid generic floating SaaS-like card boxes. Use open, contiguous architectural layouts with hairline gold dividers (`1px solid rgba(255, 255, 255, 0.08)` and `rgba(212, 175, 55, 0.4)`).

---

## 4. Section Breakdown & Components

### `Header` (`src/app/page.tsx`, `globals.css`)
- Fixed sticky navigation header with glassmorphism backdrop blur.
- Exact two-line box-aligned brand typography (`MAISON BE` / `RESIDENCES`).
- Navigation links with active scrollspy tracking and champagne gold underline hover animation.
- Responsive mobile drawer menu (`<= 1024px`) with hamburger toggle.

### `Hero`
- Automatic 5-second cross-fade background image slideshow.
- CAD architectural blueprint watermark overlay (`CAD // REF: MB-2026-NIG`).
- Primary action CTAs: "Explore Residences" and "Schedule Private Viewing".
- Bottom-right slideshow control boxes intentionally removed for a minimal, cinematic look.

### `Section 01 // Architectural Narrative (The Vision)`
- 2-column grid layout.
- Left column: Editorial philosophy with 2 pillars (*01 Panoramic Glass*, *02 Smart Automation*) separated by a minimal champagne gold vertical divider (no box backgrounds).
- Right column: Showcase image with static offset gold frame (`.vision-media-stack::before`) and contained smooth hover zoom.

### `Section 02 // The Collection (Residences & Floor Plans)`
- Interactive unit selector tabs: *1-Bedroom Suite*, *2-Bedroom Luxury*, *3-Bedroom Family*, *Signature Sky Penthouse*.
- Left column: Unit photo encased in `.unit-media-stack` with offset gold frame and contained smooth hover zoom.
- Right column: Unit badge, title, description, specifications matrix (Internal Area, Bedrooms & Bath, Terrace Deck, Parking Bay), and action buttons.

### `Section 03 // Private Club & Amenities`
- 4-column contiguous architectural linear matrix with top champagne gold line and delicate hairline dividers.
- Monospace category indices (`01 AQUATICS`, `02 HYDROTHERAPY`, `03 PERFORMANCE`, `04 EXECUTIVE`).
- Refined serif titles: *Horizon Infinity Pool*, *Thermal Spa & Steam*, *Technogym Studio*, *Executive Boardroom*.
- Dashed bottom specification tags highlighting luxury amenities.

### `Section 04 // Capital Security & Milestone Investment`
- 2-column architectural split:
  - Left column: Capital preservation narrative and 3 security pillars (*01 Independent Escrow Protection*, *02 Freehold Deed & Title Registration*, *03 Projected Capital Appreciation (28% – 35%)*).
  - Right column: Vertical milestone timeline connected by a thin gold spine:
    - **10%** — Reservation Deposit (Priority allocation & locked pricing).
    - **40%** — Construction Milestones (Quarterly verified civil engineering).
    - **10%** — Structure Completion (Top-out & external facade).
    - **40%** — Key Handover & Title (Deed perfection & move-in).

### `Section 05 // VIP Consultation (Private Viewing)`
- Seamless 2-column layout (no isolated card wrapper):
  - Left column: Editorial invitation, sales gallery address (*45 Alexander Road, Ikoyi / Victoria Island*), direct VIP concierge contacts, and complimentary chauffeur transfer notice.
  - Right column: Minimalist 2-column booking form with dark translucent inputs, gold focus states, and instant confirmation handling.

### `Section 06 // Footer`
- 4-column luxury footer with brand summary, quick navigation anchors, sales gallery information, and legal copyright notices.

### `Interactive WhatsApp Concierge Widget`
- Floating dark WhatsApp button with pulse indicator.
- Clicking opens a realistic dark WhatsApp chat pop-up window:
  - Official Maison Be Concierge avatar, verified badge, and online status.
  - Welcome greeting message.
  - Monochrome interactive topic chips (strictly zero emojis).
  - Editable message input field with character count.
  - Direct redirect to WhatsApp API (`https://wa.me/2348000000000?text=...`).

### `Brochure & Blueprint Modal`
- Lead generation modal triggered from header, unit cards, or footer.
- Captures investor details and provides immediate simulated download confirmation.

---

## 5. File Structure Reference

```
/Volumes/Isuru/work/Residences web/
├── public/
│   └── images/
│       └── maison-be-logo.jpeg       # Official Maison Be gold monogram logo
├── src/
│   ├── app/
│   │   ├── globals.css               # Complete styling, animations, media queries
│   │   ├── layout.tsx                # App layout, metadata, Google Fonts setup
│   │   └── page.tsx                  # Main single-page interactive landing page
│   └── components/                   # Modular components (Header, Hero, Vision, etc.)
├── Maison-Be-Residences-Luxury-Landing-Page/
│   └── maison-be-residences-prata-hero-3.html  # Reference design export
├── MAISON_BE_RESIDENCES_BLUEPRINT.md # Comprehensive strategic blueprint
├── MEMORY.md                         # This project memory and reference document
├── README.md                         # Project documentation and quick start
├── next.config.mjs                   # Next.js configuration
├── package.json                      # Project dependencies & scripts
├── tailwind.config.ts                # Tailwind CSS theme configuration
└── tsconfig.json                     # TypeScript compiler configuration
```

---

## 6. How to Deploy Updates

To deploy new changes to both GitHub and Vercel:

```bash
# 1. Verify build
npm run build

# 2. Commit & push to GitHub
git add .
git commit -m "feat: your update description"
git push origin main

# 3. Deploy to Vercel Production
vercel --prod --yes
```
