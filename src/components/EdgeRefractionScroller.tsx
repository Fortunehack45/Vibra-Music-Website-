import React, { useEffect, useRef } from 'react';

export interface EdgeRefractionScrollerProps {
  children: React.ReactNode;
  className?: string;
  scrollerRef?: React.RefObject<HTMLDivElement | null>;
  edgeWidthClassName?: string;
  overlayHeightClassName?: string;
  refractionStrength?: 'standard' | 'gentle';
  autoScroll?: boolean;
  autoScrollSpeed?: number; // pixels per animation frame (default 0.55)
  isPaused?: boolean;
}

/**
 * Vibra Music optical liquid-glass horizontal scroller:
 * - Emulates Android's `EdgeRefraction.kt` RuntimeShader with curved barrel lens refraction,
 *   chromatic aberration split (cyan/magenta), specular glass highlight, and saturation boost.
 * - Supports continuous infinite auto-scrolling marquee with instantaneous seamless loop and pause-on-hover.
 * - Prevents dark bottom cutoffs over text captions (as requested in user review).
 */
export const EdgeRefractionScroller: React.FC<EdgeRefractionScrollerProps> = ({
  children,
  className = '',
  scrollerRef,
  edgeWidthClassName = 'w-16 sm:w-24',
  overlayHeightClassName = 'inset-y-0',
  refractionStrength = 'standard',
  autoScroll = false,
  autoScrollSpeed = 0.55,
  isPaused = false,
}) => {
  const internalRef = useRef<HTMLDivElement>(null);
  const containerRef = scrollerRef ?? internalRef;
  const isHoveredRef = useRef(false);
  const isInteractingRef = useRef(false);
  const resumeTimerRef = useRef<number | null>(null);

  // Optical parameters matching Android EdgeRefraction.kt (edge, lift, chroma, smear)
  const blurPx = refractionStrength === 'gentle' ? '4px' : '6px';
  const saturateVal = refractionStrength === 'gentle' ? '1.2' : '1.38';

  // Cleanup resume timer on unmount
  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) {
        window.clearTimeout(resumeTimerRef.current);
      }
    };
  }, []);

  // Infinite continuous auto-scroll loop
  useEffect(() => {
    if (!autoScroll) return;

    let animId: number;

    const tick = () => {
      const el = containerRef.current;
      if (el && !isHoveredRef.current && !isInteractingRef.current && !isPaused) {
        const halfWidth = el.scrollWidth / 2;
        if (halfWidth > 0) {
          el.scrollLeft += autoScrollSpeed;
          // Instantaneous seamless wrap-around without animated rewind
          if (el.scrollLeft >= halfWidth) {
            el.scrollTo({
              left: el.scrollLeft - halfWidth,
              behavior: 'instant' as ScrollBehavior,
            });
          } else if (el.scrollLeft <= 0) {
            el.scrollTo({
              left: el.scrollLeft + halfWidth,
              behavior: 'instant' as ScrollBehavior,
            });
          }
        }
      }
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [autoScroll, autoScrollSpeed, isPaused, containerRef]);

  const handlePointerEnter = () => {
    isHoveredRef.current = true;
  };

  const handlePointerLeave = () => {
    isHoveredRef.current = false;
  };

  const handlePointerDown = () => {
    isInteractingRef.current = true;
    if (resumeTimerRef.current) {
      window.clearTimeout(resumeTimerRef.current);
    }
  };

  const handlePointerUp = () => {
    if (resumeTimerRef.current) {
      window.clearTimeout(resumeTimerRef.current);
    }
    resumeTimerRef.current = window.setTimeout(() => {
      isInteractingRef.current = false;
    }, 1200);
  };

  return (
    <div
      className="relative select-none"
      onMouseEnter={handlePointerEnter}
      onMouseLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onTouchStart={handlePointerDown}
      onTouchEnd={handlePointerUp}
      onTouchCancel={handlePointerUp}
    >
      {/* Scrollable Container with hardware-accelerated momentum.
          Note: scroll-smooth is intentionally excluded when autoScroll is true
          to avoid 60fps frame contention and backward rewind stutter during wrap-around. */}
      <div
        ref={containerRef}
        className={`no-scrollbar overflow-x-auto ${autoScroll ? '' : 'scroll-smooth'} ${className}`}
        style={{
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {children}
      </div>

      {/* Left Optical Liquid-Glass Lens Refraction */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute left-0 z-20 ${overlayHeightClassName} ${edgeWidthClassName}`}
      >
        {/* Curved Barrel Lens Glass Blur + Saturation Smear */}
        <div
          className="absolute inset-0"
          style={{
            backdropFilter: `blur(${blurPx}) saturate(${saturateVal})`,
            WebkitBackdropFilter: `blur(${blurPx}) saturate(${saturateVal})`,
            maskImage:
              'radial-gradient(ellipse 110% 100% at 0% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 42%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 110% 100% at 0% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 42%, rgba(0,0,0,0) 100%)',
          }}
        />

        {/* Chromatic Aberration Dispersion Rim (Cyan and Magenta Split) */}
        <div
          className="absolute inset-0 mix-blend-screen opacity-70"
          style={{
            background:
              'linear-gradient(to right, rgba(56,189,248,0.22) 0%, rgba(168,85,247,0.18) 35%, rgba(56,189,248,0.03) 70%, transparent 100%)',
          }}
        />

        {/* Feathered Obsidian Glass Gradient (Gentle fade, zero solid boxes) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(8,7,7,0.65) 0%, rgba(8,7,7,0.2) 38%, rgba(8,7,7,0) 100%)',
          }}
        />

        {/* Specular Hairline Glass Reflection Ridge */}
        <div
          className="absolute inset-y-1 left-0 w-[1.5px]"
          style={{
            background:
              'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.25) 20%, rgba(192,132,252,0.4) 50%, rgba(56,189,248,0.25) 80%, transparent 100%)',
          }}
        />
      </div>

      {/* Right Optical Liquid-Glass Lens Refraction */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute right-0 z-20 ${overlayHeightClassName} ${edgeWidthClassName}`}
      >
        {/* Curved Barrel Lens Glass Blur + Saturation Smear */}
        <div
          className="absolute inset-0"
          style={{
            backdropFilter: `blur(${blurPx}) saturate(${saturateVal})`,
            WebkitBackdropFilter: `blur(${blurPx}) saturate(${saturateVal})`,
            maskImage:
              'radial-gradient(ellipse 110% 100% at 100% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 42%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 110% 100% at 100% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 42%, rgba(0,0,0,0) 100%)',
          }}
        />

        {/* Chromatic Aberration Dispersion Rim (Cyan and Magenta Split) */}
        <div
          className="absolute inset-0 mix-blend-screen opacity-70"
          style={{
            background:
              'linear-gradient(to left, rgba(56,189,248,0.22) 0%, rgba(168,85,247,0.18) 35%, rgba(56,189,248,0.03) 70%, transparent 100%)',
          }}
        />

        {/* Feathered Obsidian Glass Gradient (Gentle fade, zero solid boxes) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to left, rgba(8,7,7,0.65) 0%, rgba(8,7,7,0.2) 38%, rgba(8,7,7,0) 100%)',
          }}
        />

        {/* Specular Hairline Glass Reflection Ridge */}
        <div
          className="absolute inset-y-1 right-0 w-[1.5px]"
          style={{
            background:
              'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.25) 20%, rgba(192,132,252,0.4) 50%, rgba(56,189,248,0.25) 80%, transparent 100%)',
          }}
        />
      </div>
    </div>
  );
};
