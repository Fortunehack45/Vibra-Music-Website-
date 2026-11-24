import React, { useCallback, useEffect, useRef, useState } from 'react';

interface EdgeRefractionScrollerProps {
  children: React.ReactNode;
  className?: string;
  scrollerRef?: React.RefObject<HTMLDivElement | null>;
  edgeWidthClassName?: string;
  refractionStrength?: 'standard' | 'gentle';
}

/**
 * Web optical equivalent of Vibra Music's `EdgeRefraction.kt` RuntimeShader modifier:
 * applies a curved liquid-glass blur, subtle chromatic rim refraction, and specular lift
 * only along scrollable edges. When scrolled to the start or end, that edge stays 100% clear.
 */
export const EdgeRefractionScroller: React.FC<EdgeRefractionScrollerProps> = ({
  children,
  className = '',
  scrollerRef,
  edgeWidthClassName = 'w-14 sm:w-20',
  refractionStrength = 'standard',
}) => {
  const internalRef = useRef<HTMLDivElement>(null);
  const containerRef = scrollerRef ?? internalRef;
  const [edges, setEdges] = useState({ left: false, right: false });

  const updateEdgeState = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const left = el.scrollLeft > 4;
    const right = maxScroll > 4 && el.scrollLeft < maxScroll - 4;
    setEdges((prev) => (prev.left === left && prev.right === right ? prev : { left, right }));
  }, [containerRef]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    updateEdgeState();

    const onScroll = () => updateEdgeState();
    el.addEventListener('scroll', onScroll, { passive: true });

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => updateEdgeState());
      ro.observe(el);
      if (el.firstElementChild) {
        ro.observe(el.firstElementChild);
      }
    }

    return () => {
      el.removeEventListener('scroll', onScroll);
      ro?.disconnect();
    };
  }, [containerRef, updateEdgeState, children]);

  const blurPx = refractionStrength === 'gentle' ? '3.5px' : '5.5px';
  const saturateVal = refractionStrength === 'gentle' ? '1.14' : '1.24';

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className={`no-scrollbar overflow-x-auto ${className}`}
      >
        {children}
      </div>

      {/* Left Optical Liquid-Glass Edge Refraction (active only when canScrollBackward) */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 left-0 z-20 transition-opacity duration-300 ${edgeWidthClassName} ${
          edges.left ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Curved Glass Blur + Saturation Smear */}
        <div
          className="absolute inset-0"
          style={{
            backdropFilter: `blur(${blurPx}) saturate(${saturateVal})`,
            WebkitBackdropFilter: `blur(${blurPx}) saturate(${saturateVal})`,
            maskImage:
              'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.68) 38%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage:
              'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.68) 38%, rgba(0,0,0,0) 100%)',
          }}
        />
        {/* Subtle Chromatic Aberration + Specular Glass Rim + Obsidian Melt */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(8,7,7,0.88) 0%, rgba(168,85,247,0.08) 18%, rgba(56,189,248,0.03) 42%, rgba(8,7,7,0) 100%)',
          }}
        />
        <div
          className="absolute inset-y-2 left-0 w-[1px]"
          style={{
            background:
              'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.09) 35%, rgba(192,132,252,0.12) 65%, transparent 100%)',
          }}
        />
      </div>

      {/* Right Optical Liquid-Glass Edge Refraction (active only when canScrollForward) */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 right-0 z-20 transition-opacity duration-300 ${edgeWidthClassName} ${
          edges.right ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Curved Glass Blur + Saturation Smear */}
        <div
          className="absolute inset-0"
          style={{
            backdropFilter: `blur(${blurPx}) saturate(${saturateVal})`,
            WebkitBackdropFilter: `blur(${blurPx}) saturate(${saturateVal})`,
            maskImage:
              'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.68) 38%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage:
              'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.68) 38%, rgba(0,0,0,0) 100%)',
          }}
        />
        {/* Subtle Chromatic Aberration + Specular Glass Rim + Obsidian Melt */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to left, rgba(8,7,7,0.88) 0%, rgba(168,85,247,0.08) 18%, rgba(56,189,248,0.03) 42%, rgba(8,7,7,0) 100%)',
          }}
        />
        <div
          className="absolute inset-y-2 right-0 w-[1px]"
          style={{
            background:
              'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.09) 35%, rgba(192,132,252,0.12) 65%, transparent 100%)',
          }}
        />
      </div>
    </div>
  );
};
