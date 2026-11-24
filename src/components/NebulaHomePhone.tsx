import React from 'react';

export type HeroHighlightKey = 'lossless' | 'mix' | 'glass' | null;

interface NebulaHomePhoneProps {
  highlightedFeature: HeroHighlightKey;
}

const HERO_HAND_CUTOUT_SRC = '/assets/images/hero_hand_phone_cutout.png';
const HERO_LYRICS_VIDEO_SRC = '/assets/videos/hero_lyrics_loop.mp4';

export const NebulaHomePhone: React.FC<NebulaHomePhoneProps> = ({ highlightedFeature }) => {
  const reflectionGlow = highlightedFeature
    ? 'opacity-[0.70] scale-105'
    : 'opacity-[0.48] scale-100';

  return (
    <div
      data-testid="nebula-home-screen"
      className="relative mx-auto flex w-full max-w-[280px] xs:max-w-[320px] items-center justify-center sm:max-w-[420px] lg:max-w-[500px] select-none"
    >
      {/* Pure Atmospheric Purple Glow strictly behind the phone */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -inset-10 z-0 rounded-full blur-[76px] transition-all duration-700 ${reflectionGlow}`}
        style={{
          background:
            'radial-gradient(ellipse 70% 65% at 50% 45%, rgba(168, 85, 247, 0.35) 0%, rgba(139, 92, 246, 0.18) 45%, rgba(109, 40, 217, 0.04) 75%, transparent 100%)',
        }}
      />

      {/* Outer Edgeless Fade Container: Phone screen & bezel stay 100% solid & crisp, hand fades smoothly into background */}
      <div
        className="relative z-10 w-full"
        style={{
          WebkitMaskImage:
            'linear-gradient(to bottom, #000 0%, #000 76%, rgba(0,0,0,0.85) 80%, rgba(0,0,0,0.4) 84%, rgba(0,0,0,0.1) 86%, transparent 88%)',
          maskImage:
            'linear-gradient(to bottom, #000 0%, #000 76%, rgba(0,0,0,0.85) 80%, rgba(0,0,0,0.4) 84%, rgba(0,0,0,0.1) 86%, transparent 88%)',
        }}
      >
        {/* Frame Container keeping 682:1024 exact aspect ratio of the hand photo */}
        <div className="relative aspect-[682/1024] w-full">
          {/* Layer 1: Phone Screen Video (underlies screen opening with natural bezel overlap) */}
          <div
            className="absolute z-10 overflow-hidden bg-black"
            style={{
              left: '25.2%',
              top: '7.9%',
              width: '49.4%',
              height: '67.4%',
              borderRadius: 'clamp(20px, 9%, 36px)',
            }}
          >
            <video
              src={HERO_LYRICS_VIDEO_SRC}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              aria-label="Vibra Music word-synced live lyrics playing Treat You Better"
              className="h-full w-full object-cover object-top"
            />

            {/* Subtle Screen Glass Specular Sheen */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent"
            />
          </div>

          {/* Layer 2: Hand and Phone Bezel Overlay (Screen cutout lets video shine through, hand & bezel overlap on top) */}
          <img
            src={HERO_HAND_CUTOUT_SRC}
            alt="Hand holding smartphone running Vibra Music with live word-synced lyrics"
            className="pointer-events-none relative z-20 h-full w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};
