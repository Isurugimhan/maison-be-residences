"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll with luxury easing
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.4,
      infinite: false,
    });

    lenisRef.current = lenis;
    // @ts-ignore
    window.lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // 2. Smooth scrolling for internal anchor links (#vision, #residences, etc.)
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      // Handle pure hashes (#section) and root hashes (/#section on homepage)
      let hash = "";
      if (href.startsWith("#")) {
        hash = href;
      } else if (href.startsWith("/#") && window.location.pathname === "/") {
        hash = href.replace("/", "");
      }

      if (hash && hash !== "#") {
        const elem = document.querySelector(hash);
        if (elem) {
          e.preventDefault();
          lenis.scrollTo(elem as HTMLElement, {
            offset: -80,
            duration: 1.2,
          });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    // 3. Subtle, whisper-quiet scroll reveal observer ("barely visible animation")
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const targetSelectors = [
      ".reveal-on-scroll",
      "section:not(.hero-viewport) > .container > .section-header",
      ".vision-grid",
      ".unit-display-card",
      ".amenities-grid",
      ".residence-story-item",
      ".consultation-split-grid",
    ].join(", ");

    const elements = document.querySelectorAll(targetSelectors);
    elements.forEach((el) => {
      el.classList.add("reveal-on-scroll");
      const rect = el.getBoundingClientRect();
      // If already visible on initial load, reveal immediately
      if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
        el.classList.add("is-revealed");
      } else {
        observer.observe(el);
      }
    });

    // Fallback safeguard: reveal all after 1.8s
    const fallbackTimer = setTimeout(() => {
      elements.forEach((el) => el.classList.add("is-revealed"));
    }, 1800);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", handleAnchorClick);
      clearTimeout(fallbackTimer);
      observer.disconnect();
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Reset scroll position on route change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    // Observe any new reveal elements after page transition
    const newRevealElements = document.querySelectorAll(
      ".reveal-on-scroll:not(.is-revealed)"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    newRevealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return <>{children}</>;
}
