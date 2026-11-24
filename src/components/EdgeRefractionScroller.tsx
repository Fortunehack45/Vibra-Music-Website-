import React from 'react';

export interface EdgeRefractionScrollerProps {
  children: React.ReactNode;
  className?: string;
  scrollerRef?: React.RefObject<HTMLDivElement | null>;
  edgeWidthClassName?: string;
  overlayHeightClassName?: string;
  refractionStrength?: 'standard' | 'gentle';
  autoScroll?: boolean;
  marqueeAnimationClass?: string;
  isPaused?: boolean;
}

/**
 * Vibra Music clean infinite scroller:
 * - Pure, smooth, lag-free slide with GPU compositor animation.
 * - Pauses cleanly on hover or when audio preview is active.
 * - Zero edge reflection overlays or blur artifacts — slides normally and cleanly.
 */
export const EdgeRefractionScroller: React.FC<EdgeRefractionScrollerProps> = ({
  children,
  className = '',
  scrollerRef,
  autoScroll = false,
  marqueeAnimationClass = 'animate-vibra-screens-slide',
  isPaused = false,
}) => {
  return (
    <div className="group pause-on-hover relative w-full overflow-hidden py-3 sm:py-4 -my-3 sm:-my-4 select-none">
      {autoScroll ? (
        <div
          ref={scrollerRef}
          data-marquee-track
          className={marqueeAnimationClass}
          style={{
            animationPlayState: isPaused ? 'paused' : undefined,
          }}
        >
          {/* Set 1 */}
          <div className={`flex shrink-0 items-start ${className}`}>{children}</div>
          {/* Set 2 (seamless gapless loop) */}
          <div
            aria-hidden="true"
            inert
            className={`flex shrink-0 items-start ${className}`}
          >
            {children}
          </div>
        </div>
      ) : (
        <div
          ref={scrollerRef}
          className={`no-scrollbar flex overflow-x-auto scroll-smooth ${className}`}
          style={{
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};
