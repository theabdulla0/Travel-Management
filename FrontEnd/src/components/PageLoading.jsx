
import React, { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";

export default function PageLoading({
  loading = false,
  messages = [
    "Boarding your trip…",
    "Taxiing to the runway…",
    "Cleared for takeoff…",
    "Approaching destination…",
  ],
  interval = 1200,
  subText = "",
  showDelayMs = 100,
  minShowMs = 1200,
  fadeMs = 450,
}) {
  const safeMessages = useMemo(
    () =>
      Array.isArray(messages) && messages.length ? messages : ["Loading…"],
    [messages]
  );

  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  const overlayRef = useRef(null);
  const charsRef = useRef([]);
  const tlRef = useRef(null);
  const showTimer = useRef(null);
  const hideTimer = useRef(null);
  const startTime = useRef(0);

  // Show/hide overlay
  useEffect(() => {
    if (showTimer.current) clearTimeout(showTimer.current);
    if (hideTimer.current) clearTimeout(hideTimer.current);

    if (loading) {
      showTimer.current = setTimeout(() => {
        startTime.current = Date.now();
        setVisible(true);
      }, showDelayMs);
    } else {
      const elapsed = Date.now() - (startTime.current || Date.now());
      const wait = Math.max(minShowMs - elapsed, 0);
      hideTimer.current = setTimeout(() => {
        if (overlayRef.current) {
          // fade out overlay smoothly
          gsap.to(overlayRef.current, {
            duration: fadeMs / 1000,
            autoAlpha: 0,
            scale: 0.95,
            ease: "power2.in",
            onComplete: () => setVisible(false),
          });
          // fade out characters
          const chars = charsRef.current.filter(Boolean);
          if (chars.length) {
            gsap.to(chars, {
              y: -20,
              opacity: 0,
              scale: 0.95,
              duration: 0.5,
              stagger: 0.02,
              ease: "power2.in",
            });
          }
        } else {
          setVisible(false);
        }
      }, wait);
    }

    return () => {
      if (showTimer.current) clearTimeout(showTimer.current);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [loading, showDelayMs, minShowMs, fadeMs]);

  // Fade in overlay
  useEffect(() => {
    if (!overlayRef.current || !visible) return;
    gsap.to(overlayRef.current, {
      duration: fadeMs / 1000,
      autoAlpha: 1,
      scale: 1,
      ease: "power2.out",
    });
  }, [visible, fadeMs]);

  // Cycle messages
  useEffect(() => {
    if (!visible) return;
    setIndex(0);
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % safeMessages.length);
    }, interval);
    return () => clearInterval(id);
  }, [visible, safeMessages.length, interval]);

  // Animate characters
  useEffect(() => {
    if (!visible) return;
    tlRef.current?.kill();

    const chars = charsRef.current.filter(Boolean);
    if (!chars.length) return;

    gsap.set(chars, { y: 20, opacity: 0, scale: 0.8, rotate: 0.0001 });
    tlRef.current = gsap.to(chars, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: "back.out(1.7)",
      stagger: 0.03,
    });

    return () => tlRef.current?.kill();
  }, [index, visible]);

  const setCharRef = (i) => (el) => {
    if (!charsRef.current) charsRef.current = [];
    charsRef.current[i] = el || null;
  };

  const currentText = safeMessages[index] || "";
  const characters = currentText.split("");

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      className="page-loader"
      aria-hidden={!visible}
      role="status"
      aria-live="assertive"
      style={{ pointerEvents: visible ? "auto" : "none" }}
    >
      <div className="content">
        <h1 className="headline" aria-label={currentText}>
          {characters.map((ch, i) => (
            <span
              key={`${index}-${i}`}
              ref={setCharRef(i)}
              className="char"
              aria-hidden="true"
            >
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </h1>
        {subText && <p className="subline">{subText}</p>}
      </div>

      <style>
        {`
          .page-loader {
            position: fixed;
            inset: 0;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #4ade80;
            opacity: 0;
            visibility: hidden;
          }
          .content { display: flex; flex-direction: column; align-items: center; gap: 12px; text-align: center; }
          .headline { margin:0; font-family:ui-sans-serif,system-ui; color:#052e16; font-weight:900; letter-spacing:0.4px; line-height:1.1; font-size:28px; text-shadow:0 1px 0 rgba(0,0,0,0.06); }
          .char { display:inline-block; white-space:pre; will-change:transform, opacity; }
          .subline { margin:4px 0 0; color:#065f46; font-size:14px; font-weight:600; }
          @media (min-width:480px){ .headline{ font-size:34px; } }
          @media (min-width:768px){ .headline{ font-size:44px; } }
          @media (prefers-reduced-motion:reduce){ .char{ transition:none !important; } }
        `}
      </style>
    </div>
  );
}
