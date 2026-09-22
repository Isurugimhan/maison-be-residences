"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface StoryPhotoSliderProps {
  gallery: string[];
  fallbackImage?: string;
  residenceTitle: string;
  alt: string;
  autoPlayInterval?: number;
}

export default function StoryPhotoSlider({
  gallery,
  fallbackImage,
  residenceTitle,
  alt,
  autoPlayInterval = 4500,
}: StoryPhotoSliderProps) {
  const images = gallery.length > 0 ? gallery : (fallbackImage ? [fallbackImage] : []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const transitionTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Preload upcoming images so transitions are instant with zero loading flash
  useEffect(() => {
    if (images.length <= 1) return;
    const next1 = new Image();
    next1.src = images[(currentIndex + 1) % images.length];
    const next2 = new Image();
    next2.src = images[(currentIndex + 2) % images.length];
  }, [currentIndex, images]);

  const goToSlide = useCallback((newIdx: number) => {
    if (newIdx === currentIndex || images.length <= 1) return;
    setPrevIndex(currentIndex);
    setCurrentIndex(newIdx);

    // After the crossfade transition finishes (1100ms), sync the base layer
    if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    transitionTimerRef.current = setTimeout(() => {
      setPrevIndex(newIdx);
    }, 1150);
  }, [currentIndex, images.length]);

  const handlePrev = useCallback(() => {
    const prev = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    goToSlide(prev);
  }, [currentIndex, images.length, goToSlide]);

  const handleNext = useCallback(() => {
    const next = (currentIndex + 1) % images.length;
    goToSlide(next);
  }, [currentIndex, images.length, goToSlide]);

  // Smooth auto-play timer that pauses when hovered
  useEffect(() => {
    if (images.length <= 1 || isHovering) return;
    const timer = setInterval(() => {
      handleNext();
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [images.length, isHovering, autoPlayInterval, handleNext]);

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    };
  }, []);

  const currentImgSrc = images[currentIndex] || fallbackImage;
  const prevImgSrc = images[prevIndex] || fallbackImage;

  return (
    <div
      className="residence-story-img-frame"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* ─── Base Layer: Previous photo stays 100% visible underneath ─── */}
      {prevImgSrc && (
        <img
          src={prevImgSrc}
          alt={alt}
          className="residence-story-image residence-story-image-base"
        />
      )}

      {/* ─── Top Layer: Incoming photo seamlessly crossfades in over base ─── */}
      {currentImgSrc && (
        <img
          key={currentIndex}
          src={currentImgSrc}
          alt={alt}
          className="residence-story-image residence-story-image-top"
        />
      )}

      {/* Title Tag */}
      <span className="residence-story-title-tag">
        {residenceTitle}
      </span>

      {/* Manual Prev / Next Controls */}
      {images.length > 1 && (
        <div className="residence-story-controls">
          <button
            type="button"
            onClick={handlePrev}
            className="residence-story-btn"
            aria-label={`Previous ${residenceTitle} photo`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="residence-story-btn"
            aria-label={`Next ${residenceTitle} photo`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      )}

      {/* Counter Badge */}
      <div className="residence-story-badge">
        {images.length > 0 ? `${currentIndex + 1} / ${images.length} photos` : residenceTitle}
      </div>
    </div>
  );
}
