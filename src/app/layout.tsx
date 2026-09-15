import type { Metadata } from "next";
import { Prata, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const prata = Prata({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-prata",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://maisonbe.com"),
  title: "Maison Be Residences — Prestigious Off-Plan Living | Nigeria",
  description:
    "An exclusive sanctuary of 1, 2, and 3-bedroom luxury residences and bespoke sky penthouses in Nigeria, engineered with panoramic glass, natural stone finishes, and five-star hospitality.",
  keywords: [
    "Maison Be Residences",
    "Luxury Apartments Nigeria",
    "Lagos Real Estate",
    "Off Plan Luxury Living",
    "Victoria Island Penthouses",
    "Ikoyi Luxury Real Estate",
  ],
  openGraph: {
    title: "Maison Be Residences — Prestigious Off-Plan Living",
    description: "Where Timeless Architecture Meets Prestigious Living.",
    images: ["/images/maison-be-logo.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${prata.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body className="bg-[#070c16] text-[#f5f6f8] font-body antialiased overflow-x-hidden selection:bg-[#d4af37] selection:text-[#070c16]">
        {children}
      </body>
    </html>
  );
}
