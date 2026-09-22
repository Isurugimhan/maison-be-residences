"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

interface HeroBookingBarProps {
  onCheckAvailability?: (data: {
    checkIn: string;
    checkOut: string;
    guests: number;
    rooms: number;
    summary: string;
  }) => void;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const DAYS_SHORT = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export default function HeroBookingBar({ onCheckAvailability }: HeroBookingBarProps) {
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Dates in YYYY-MM-DD
  const [checkInDate, setCheckInDate] = useState<string>("");
  const [checkOutDate, setCheckOutDate] = useState<string>("");
  const [activePicker, setActivePicker] = useState<"checkIn" | "checkOut" | null>(null);

  // Guests & Rooms state
  const [isGuestsOpen, setIsGuestsOpen] = useState<boolean>(false);
  const [guestsCount, setGuestsCount] = useState<number>(2);
  const [roomsCount, setRoomsCount] = useState<number>(1);

  // Calendar navigation state
  const [viewYear, setViewYear] = useState<number>(new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState<number>(new Date().getMonth());

  // Error modal/popup state
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [invalidAttemptDate, setInvalidAttemptDate] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Lock background scroll when mobile modal is open
  useEffect(() => {
    if (isMobile && (activePicker || isGuestsOpen || errorMessage)) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isMobile, activePicker, isGuestsOpen, errorMessage]);

  // Set default check-in (tomorrow) and check-out (+3 days = 2 nights)
  useEffect(() => {
    const today = new Date();
    const inDate = new Date(today);
    inDate.setDate(today.getDate() + 1);

    const outDate = new Date(today);
    outDate.setDate(today.getDate() + 3); // 2 nights minimum

    const toISO = (d: Date) => {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    setCheckInDate(toISO(inDate));
    setCheckOutDate(toISO(outDate));
    setViewYear(inDate.getFullYear());
    setViewMonth(inDate.getMonth());
  }, []);

  // Close popovers on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isMobile) return;
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setActivePicker(null);
        setIsGuestsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile]);

  // Format YYYY-MM-DD to display string (e.g. "Thu, 15 Oct")
  const formatDateDisplay = (dateStr: string) => {
    if (!dateStr) return "Select date";
    const [y, m, d] = dateStr.split("-").map(Number);
    const date = new Date(y, m - 1, d);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  // Calculate nights count
  const getNights = (inStr: string, outStr: string) => {
    if (!inStr || !outStr) return 0;
    const [y1, m1, d1] = inStr.split("-").map(Number);
    const [y2, m2, d2] = outStr.split("-").map(Number);
    const dStart = new Date(y1, m1 - 1, d1).getTime();
    const dEnd = new Date(y2, m2 - 1, d2).getTime();
    return Math.round((dEnd - dStart) / (1000 * 60 * 60 * 24));
  };

  const nightsCount = getNights(checkInDate, checkOutDate);

  // Month navigation
  const prevMonth = () => {
    const today = new Date();
    const isCurrentMonth =
      viewYear === today.getFullYear() && viewMonth === today.getMonth();
    if (isCurrentMonth) return; // Prevent navigating to past months

    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  // Calendar dates generator
  const getCalendarDays = () => {
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();

    const days: Array<{
      dateStr: string;
      dayNumber: number;
      isCurrentMonth: boolean;
      isPast: boolean;
    }> = [];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Padding for days before the 1st
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push({
        dateStr: "",
        dayNumber: 0,
        isCurrentMonth: false,
        isPast: true,
      });
    }

    // Days of current month
    for (let d = 1; d <= daysInMonth; d++) {
      const monthStr = String(viewMonth + 1).padStart(2, "0");
      const dayStr = String(d).padStart(2, "0");
      const dateStr = `${viewYear}-${monthStr}-${dayStr}`;

      const dateObj = new Date(viewYear, viewMonth, d);
      dateObj.setHours(0, 0, 0, 0);

      days.push({
        dateStr,
        dayNumber: d,
        isCurrentMonth: true,
        isPast: dateObj < today,
      });
    }

    return days;
  };

  // Handle clicking a date on the calendar
  const handleDateClick = (dateStr: string) => {
    if (!dateStr) return;

    if (activePicker === "checkIn") {
      setCheckInDate(dateStr);
      setErrorMessage(null);
      setInvalidAttemptDate(null);

      // If existing check-out is before or less than 2 nights from new check-in
      if (checkOutDate) {
        const nights = getNights(dateStr, checkOutDate);
        if (nights < 2) {
          // Auto-adjust check-out to checkIn + 2 nights for convenience
          const [y, m, d] = dateStr.split("-").map(Number);
          const autoOut = new Date(y, m - 1, d);
          autoOut.setDate(autoOut.getDate() + 2);
          const autoOutStr = `${autoOut.getFullYear()}-${String(autoOut.getMonth() + 1).padStart(2, "0")}-${String(autoOut.getDate()).padStart(2, "0")}`;
          setCheckOutDate(autoOutStr);
        }
      }
      // Switch focus to checkOut picker
      setActivePicker("checkOut");
    } else if (activePicker === "checkOut") {
      if (!checkInDate) {
        setCheckInDate(dateStr);
        setActivePicker("checkOut");
        return;
      }

      const nights = getNights(checkInDate, dateStr);

      if (nights < 2) {
        setInvalidAttemptDate(dateStr);
        if (nights < 0) {
          setErrorMessage(
            `Check-out date (${formatDateDisplay(dateStr)}) cannot be earlier than your check-in date (${formatDateDisplay(checkInDate)}). Maison Be Residences requires a minimum reservation of 2 nights.`
          );
        } else if (nights === 0) {
          setErrorMessage(
            `Check-out date cannot be the same as your check-in date (${formatDateDisplay(checkInDate)}). Maison Be Residences requires a minimum reservation of 2 nights.`
          );
        } else {
          setErrorMessage(
            `Selected stay is only 1 night (${formatDateDisplay(checkInDate)} to ${formatDateDisplay(dateStr)}). Maison Be Residences requires a minimum reservation of 2 nights.`
          );
        }
        return;
      }

      // Valid check-out selection
      setCheckOutDate(dateStr);
      setErrorMessage(null);
      setInvalidAttemptDate(null);
      setActivePicker(null);
    }
  };

  const handleCheckAvailability = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!checkInDate || !checkOutDate) {
      setErrorMessage("Please select both your check-in and check-out dates.");
      return;
    }

    const nights = getNights(checkInDate, checkOutDate);
    if (nights < 2) {
      setErrorMessage(
        "Maison Be Residences requires a minimum reservation of 2 nights. Please select a valid check-out date."
      );
      return;
    }

    if (onCheckAvailability) {
      onCheckAvailability({
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guests: guestsCount,
        rooms: roomsCount,
        summary: `${guestsCount} Guest${guestsCount > 1 ? "s" : ""}, ${roomsCount} Room${roomsCount > 1 ? "s" : ""}`,
      });
    }

    const queryParams = new URLSearchParams({
      checkin: checkInDate,
      checkout: checkOutDate,
      guests: guestsCount.toString(),
      rooms: roomsCount.toString(),
    });
    router.push(`/apartments?${queryParams.toString()}`);
  };

  const isSelectedIn = (dateStr: string) => dateStr === checkInDate;
  const isSelectedOut = (dateStr: string) => dateStr === checkOutDate;
  const isInRange = (dateStr: string) => {
    if (!checkInDate || !checkOutDate || !dateStr) return false;
    return dateStr > checkInDate && dateStr < checkOutDate;
  };

  const calendarDays = getCalendarDays();

  const renderCalendarContent = () => (
    <div className="relative w-full">
      <div className="luxury-calendar-header">
        <div className="calendar-header-title-group">
          <span className="cal-header-step">
            {activePicker === "checkIn" ? "STEP 1 OF 2" : "STEP 2 OF 2"}
          </span>
          <span className="cal-header-title">
            {activePicker === "checkIn" ? "Select Check-in Date" : "Select Check-out Date"}
          </span>
        </div>

        <button
          type="button"
          className="cal-close-btn"
          onClick={() => {
            setActivePicker(null);
            setErrorMessage(null);
            setInvalidAttemptDate(null);
          }}
          aria-label="Close Calendar"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <div className="calendar-month-nav">
        <button
          type="button"
          onClick={prevMonth}
          className="month-nav-btn"
          aria-label="Previous Month"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div className="current-month-title">
          {MONTH_NAMES[viewMonth]} <span className="font-light text-gold/80">{viewYear}</span>
        </div>
        <button
          type="button"
          onClick={nextMonth}
          className="month-nav-btn"
          aria-label="Next Month"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <div className="calendar-weekdays">
        {DAYS_SHORT.map((day) => (
          <div key={day} className="weekday-header">
            {day}
          </div>
        ))}
      </div>

      <div className="calendar-grid">
        {calendarDays.map((item, idx) => {
          if (!item.isCurrentMonth) {
            return <div key={`empty-${idx}`} className="cal-day empty" />;
          }

          const isStart = isSelectedIn(item.dateStr);
          const isEnd = isSelectedOut(item.dateStr);
          const inRange = isInRange(item.dateStr);

          return (
            <button
              key={item.dateStr}
              type="button"
              disabled={item.isPast}
              onClick={() => handleDateClick(item.dateStr)}
              className={`cal-day ${item.isPast ? "is-past" : ""} ${
                isStart ? "is-start" : ""
              } ${isEnd ? "is-end" : ""} ${inRange ? "in-range" : ""}`}
            >
              <span className="day-number">{item.dayNumber}</span>
              {isStart && <span className="day-tag">IN</span>}
              {isEnd && <span className="day-tag">OUT</span>}
            </button>
          );
        })}
      </div>

      <div className="calendar-footer">
        <div className="footer-stay-summary">
          {checkInDate && checkOutDate && nightsCount > 0 ? (
            <span>
              Stay length: <strong className="text-gold">{nightsCount} nights</strong>
            </span>
          ) : (
            <span>Select your stay dates</span>
          )}
        </div>
        <button
          type="button"
          className="cal-done-btn"
          onClick={() => {
            setActivePicker(null);
            setErrorMessage(null);
            setInvalidAttemptDate(null);
          }}
        >
          Done
        </button>
      </div>

      {/* ─── MINIMUM STAY POLICY OVERLAY DIRECTLY OVER THE DATES ─── */}
      {errorMessage && (
        <div
          className="absolute inset-0 z-50 bg-[#080f1e]/98 border border-[#d4af37]/60 p-5 flex flex-col items-center justify-center text-center animate-fadeIn"
          style={{ minHeight: "100%" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-12 h-12 mb-3 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h4 className="font-heading text-lg font-medium text-white mb-2 tracking-wide">
            Minimum Stay Policy
          </h4>
          <p className="text-xs text-white/75 leading-relaxed mb-5 max-w-[280px]">
            {errorMessage}
          </p>
          <div className="flex flex-col gap-2.5 w-full max-w-[280px]">
            <button
              type="button"
              className="w-full py-2.5 px-4 bg-[#d4af37] hover:bg-[#e6c35c] text-[#070c16] text-xs font-semibold uppercase tracking-wider transition-colors shadow-lg shadow-[#d4af37]/20"
              onClick={() => {
                if (checkInDate) {
                  const [y, m, d] = checkInDate.split("-").map(Number);
                  const newOut = new Date(y, m - 1, d);
                  newOut.setDate(newOut.getDate() + 2);
                  const newOutStr = `${newOut.getFullYear()}-${String(newOut.getMonth() + 1).padStart(2, "0")}-${String(newOut.getDate()).padStart(2, "0")}`;
                  setCheckOutDate(newOutStr);
                }
                setErrorMessage(null);
                setInvalidAttemptDate(null);
                setActivePicker(null);
              }}
            >
              Set to 2 Nights Stay
            </button>
            {invalidAttemptDate && invalidAttemptDate < checkInDate && (
              <button
                type="button"
                className="w-full py-2.5 px-4 bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs font-medium transition-colors"
                onClick={() => {
                  setCheckInDate(invalidAttemptDate);
                  const [y, m, d] = invalidAttemptDate.split("-").map(Number);
                  const newOut = new Date(y, m - 1, d);
                  newOut.setDate(newOut.getDate() + 2);
                  const newOutStr = `${newOut.getFullYear()}-${String(newOut.getMonth() + 1).padStart(2, "0")}-${String(newOut.getDate()).padStart(2, "0")}`;
                  setCheckOutDate(newOutStr);
                  setErrorMessage(null);
                  setInvalidAttemptDate(null);
                  setActivePicker("checkOut");
                }}
              >
                Set Check-in to {formatDateDisplay(invalidAttemptDate)}
              </button>
            )}
            <button
              type="button"
              className="w-full py-2 px-4 text-white/60 hover:text-white text-xs underline underline-offset-4 transition-colors"
              onClick={() => {
                setErrorMessage(null);
                setInvalidAttemptDate(null);
                setActivePicker("checkOut");
              }}
            >
              Choose Later Date
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderGuestsContent = () => (
    <>
      <div className="guests-popover-title">Guests & Suites</div>

      {/* Stepper: Guests */}
      <div className="guests-stepper-row">
        <div>
          <div className="stepper-label">Number of Guests</div>
          <div className="stepper-sublabel">Adults & children</div>
        </div>
        <div className="stepper-controls">
          <button
            type="button"
            className="stepper-btn"
            disabled={guestsCount <= 1}
            onClick={() => setGuestsCount(Math.max(1, guestsCount - 1))}
          >
            −
          </button>
          <span className="stepper-val">{guestsCount}</span>
          <button
            type="button"
            className="stepper-btn"
            disabled={guestsCount >= 10}
            onClick={() => setGuestsCount(Math.min(10, guestsCount + 1))}
          >
            +
          </button>
        </div>
      </div>

      {/* Stepper: Suites / Rooms */}
      <div className="guests-stepper-row">
        <div>
          <div className="stepper-label">Suites Required</div>
          <div className="stepper-sublabel">Max 4 suites</div>
        </div>
        <div className="stepper-controls">
          <button
            type="button"
            className="stepper-btn"
            disabled={roomsCount <= 1}
            onClick={() => setRoomsCount(Math.max(1, roomsCount - 1))}
          >
            −
          </button>
          <span className="stepper-val">{roomsCount}</span>
          <button
            type="button"
            className="stepper-btn"
            disabled={roomsCount >= 4}
            onClick={() => setRoomsCount(Math.min(4, roomsCount + 1))}
          >
            +
          </button>
        </div>
      </div>

      {/* Quick presets */}
      <div className="quick-presets">
        <div className="presets-label">Popular Arrangements</div>
        <div className="preset-buttons">
          <button
            type="button"
            className={`preset-chip ${guestsCount === 2 && roomsCount === 1 ? "active" : ""}`}
            onClick={() => {
              setGuestsCount(2);
              setRoomsCount(1);
            }}
          >
            2 Guests • 1 Suite
          </button>
          <button
            type="button"
            className={`preset-chip ${guestsCount === 4 && roomsCount === 2 ? "active" : ""}`}
            onClick={() => {
              setGuestsCount(4);
              setRoomsCount(2);
            }}
          >
            4 Guests • 2 Suites
          </button>
          <button
            type="button"
            className={`preset-chip ${guestsCount === 7 && roomsCount === 3 ? "active" : ""}`}
            onClick={() => {
              setGuestsCount(7);
              setRoomsCount(3);
            }}
          >
            7 Guests • Penthouse
          </button>
        </div>
      </div>

      <div className="guests-popover-actions">
        <button
          type="button"
          className="btn-apply-guests"
          onClick={() => setIsGuestsOpen(false)}
        >
          Confirm Selection
        </button>
      </div>
    </>
  );

  const renderErrorModal = () => (
    <div
      className="fixed inset-0 z-[20000] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
      style={{ zIndex: 20000 }}
      onClick={() => {
        setErrorMessage(null);
        setInvalidAttemptDate(null);
      }}
    >
      <div
        className="luxury-error-modal relative z-[20001] max-w-[420px] w-full bg-[#091326] border border-[#d4af37]/50 p-6 md:p-8 shadow-2xl"
        style={{ zIndex: 20001 }}
        onClick={(e) => e.stopPropagation()}
        role="alertdialog"
        aria-modal="true"
      >
        <div className="luxury-error-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h3 className="luxury-error-title">Minimum Stay Policy</h3>
        <p className="luxury-error-text">{errorMessage}</p>
        <div className="luxury-error-actions">
          <button
            type="button"
            className="btn-error-primary"
            onClick={() => {
              if (checkInDate) {
                const [y, m, d] = checkInDate.split("-").map(Number);
                const newOut = new Date(y, m - 1, d);
                newOut.setDate(newOut.getDate() + 2);
                const newOutStr = `${newOut.getFullYear()}-${String(newOut.getMonth() + 1).padStart(2, "0")}-${String(newOut.getDate()).padStart(2, "0")}`;
                setCheckOutDate(newOutStr);
              }
              setErrorMessage(null);
              setInvalidAttemptDate(null);
              setActivePicker(null);
            }}
          >
            Set to 2 Nights Stay
          </button>
          {invalidAttemptDate && invalidAttemptDate < checkInDate && (
            <button
              type="button"
              className="btn-error-secondary"
              onClick={() => {
                setCheckInDate(invalidAttemptDate);
                const [y, m, d] = invalidAttemptDate.split("-").map(Number);
                const newOut = new Date(y, m - 1, d);
                newOut.setDate(newOut.getDate() + 2);
                const newOutStr = `${newOut.getFullYear()}-${String(newOut.getMonth() + 1).padStart(2, "0")}-${String(newOut.getDate()).padStart(2, "0")}`;
                setCheckOutDate(newOutStr);
                setErrorMessage(null);
                setInvalidAttemptDate(null);
                setActivePicker("checkOut");
              }}
            >
              Set Check-in to {formatDateDisplay(invalidAttemptDate)}
            </button>
          )}
          <button
            type="button"
            className="btn-error-secondary"
            onClick={() => {
              setErrorMessage(null);
              setInvalidAttemptDate(null);
              setActivePicker("checkOut");
            }}
          >
            Choose Later Date
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="luxury-booking-bar-wrapper" ref={containerRef}>
      <div className="hero-booking-bar">
        {/* CHECK-IN COLUMN */}
        <div
          className={`hero-booking-col luxury-col-clickable ${
            activePicker === "checkIn" ? "is-active" : ""
          }`}
          onClick={() => {
            setIsGuestsOpen(false);
            setActivePicker(activePicker === "checkIn" ? null : "checkIn");
          }}
        >
          <span className="hero-booking-label">CHECK-IN</span>
          <div className="luxury-booking-value">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--gold)"
              strokeWidth="2"
              className="mr-1.5 shrink-0 opacity-80"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span className="value-text">{formatDateDisplay(checkInDate)}</span>
          </div>
        </div>

        {/* CHECK-OUT COLUMN (Clean label: "CHECK-OUT" without cluttered "(MIN 2 NIGHTS)") */}
        <div
          className={`hero-booking-col luxury-col-clickable ${
            activePicker === "checkOut" ? "is-active" : ""
          }`}
          onClick={() => {
            setIsGuestsOpen(false);
            setActivePicker(activePicker === "checkOut" ? null : "checkOut");
          }}
        >
          <span className="hero-booking-label">CHECK-OUT</span>
          <div className="luxury-booking-value">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--gold)"
              strokeWidth="2"
              className="mr-1.5 shrink-0 opacity-80"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span className="value-text">{formatDateDisplay(checkOutDate)}</span>
          </div>
        </div>

        {/* ROOMS & GUESTS COLUMN */}
        <div
          className={`hero-booking-col hero-booking-col-guests luxury-col-clickable ${
            isGuestsOpen ? "is-active" : ""
          }`}
          onClick={() => {
            setActivePicker(null);
            setIsGuestsOpen(!isGuestsOpen);
          }}
        >
          <span className="hero-booking-label">ROOMS & GUESTS</span>
          <div className="luxury-booking-value">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--gold)"
              strokeWidth="2"
              className="mr-1.5 shrink-0 opacity-80"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span className="value-text">
              {guestsCount} Guest{guestsCount > 1 ? "s" : ""}, {roomsCount} Suite
              {roomsCount > 1 ? "s" : ""}
            </span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={`chevron-icon ${isGuestsOpen ? "rotate-180" : ""}`}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          onClick={handleCheckAvailability}
          className="hero-booking-btn"
          type="button"
        >
          <span>Check Availability</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>

      {/* ─── DESKTOP INLINE CALENDAR & GUESTS (window >= 1024px) ─── */}
      {!isMobile && activePicker && (
        <div
          className={`luxury-calendar-popover ${
            activePicker === "checkOut" ? "desktop-checkout-align" : ""
          }`}
        >
          {renderCalendarContent()}
        </div>
      )}

      {!isMobile && isGuestsOpen && (
        <div className="luxury-guests-popover">
          {renderGuestsContent()}
        </div>
      )}

      {/* ─── MOBILE & TABLET PORTAL MODALS (window < 1024px) ─── */}
      {mounted && isMobile && activePicker &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
            onClick={() => setActivePicker(null)}
          >
            <div
              className="luxury-calendar-popover-modal"
              onClick={(e) => e.stopPropagation()}
            >
              {renderCalendarContent()}
            </div>
          </div>,
          document.body
        )}

      {mounted && isMobile && isGuestsOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
            onClick={() => setIsGuestsOpen(false)}
          >
            <div
              className="luxury-guests-popover-modal"
              onClick={(e) => e.stopPropagation()}
            >
              {renderGuestsContent()}
            </div>
          </div>,
          document.body
        )}

      {/* ─── LUXURY ERROR MODAL IN PORTAL ─── */}
      {mounted && errorMessage && createPortal(renderErrorModal(), document.body)}
    </div>
  );
}
