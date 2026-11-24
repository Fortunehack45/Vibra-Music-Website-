import React from 'react';

export interface EdgeRefractionScrollerProps {
  children: React.ReactNode;
  className?: string;
  scrollerRef?: React.RefObject<HTMLDivElement | null>;
  autoScroll?: boolean;
  marqueeAnimationClass?: string;
  isPaused?: boolean;
  fadeEdges?: boolean;
}

/**
 * Vibra Music clean infinite scroller:
 * - Pure, smooth, lag-free slide with GPU compositor animation.
 * - Pauses cleanly on hover or when audio preview is active.
 * - Smooth fade-in edge blur at both ends so content dissolves seamlessly into background.
 */
export const EdgeRefractionScroller: React.FC<EdgeRefractionScrollerProps> = ({
  children,
  className = '',
  scrollerRef,
  autoScroll = false,
  marqueeAnimationClass = 'animate-vibra-screens-slide',
  isPaused = false,
  fadeEdges = true,
}) => {
  return (
    <div className="group pause-on-hover relative w-full overflow-hidden py-3 sm:py-4 -my-3 sm:-my-4 select-none">
      {fadeEdges && (
        <>
          {/* Left Edge Progressive Feather & Blur */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-20 w-14 sm:w-24 lg:w-32"
            style={{
              background:
                'linear-gradient(to right, #080707 0%, rgba(8, 7, 7, 0.88) 25%, rgba(8, 7, 7, 0.5) 55%, rgba(8, 7, 7, 0.15) 80%, transparent 100%)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
              maskImage: 'linear-gradient(to right, black 0%, black 30%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, black 0%, black 30%, transparent 100%)',
            }}
          />

          {/* Right Edge Progressive Feather & Blur */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-20 w-14 sm:w-24 lg:w-32"
            style={{
              background:
                'linear-gradient(to left, #080707 0%, rgba(8, 7, 7, 0.88) 25%, rgba(8, 7, 7, 0.5) 55%, rgba(8, 7, 7, 0.15) 80%, transparent 100%)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
              maskImage: 'linear-gradient(to left, black 0%, black 30%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to left, black 0%, black 30%, transparent 100%)',
            }}
          />
        </>
      )}

      <div className={fadeEdges ? 'scroller-edge-fade w-full' : 'w-full'}>
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
    </div>
  );
};
