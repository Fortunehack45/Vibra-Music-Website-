import React from 'react';

export type HeroHighlightKey = 'lossless' | 'mix' | 'glass' | null;

interface NebulaHomePhoneProps {
  highlightedFeature: HeroHighlightKey;
}

const HERO_HAND_CUTOUT_SRC = '/assets/images/hero_hand_phone_cutout.png';
const HERO_LYRICS_VIDEO_SRC = '/assets/videos/hero_lyrics_loop.mp4';
const HERO_PHONE_POSTER_SRC = '/assets/images/hero_phone_poster.jpg';

export const NebulaHomePhone: React.FC<NebulaHomePhoneProps> = ({ highlightedFeature }) => {
  const reflectionGlow = highlightedFeature
    ? 'opacity-[0.70] scale-105'
    : 'opacity-[0.48] scale-100';

  return (
    <div
      data-testid="nebula-home-screen"
      className="relative mx-auto flex w-full max-w-[280px] min-[360px]:max-w-[320px] items-center justify-center sm:max-w-[420px] lg:max-w-[500px] select-none -translate-y-2 sm:-translate-y-4 lg:-translate-y-6"
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

      {/* Outer Edgeless Fade Container: Phone and hand remain 100% solid, only lower wrist fades seamlessly into background */}
      <div
        className="relative z-10 w-full"
        style={{
          WebkitMaskImage:
            'linear-gradient(to bottom, #000 0%, #000 85%, rgba(0,0,0,0.85) 89%, rgba(0,0,0,0.35) 94%, transparent 98%)',
          maskImage:
            'linear-gradient(to bottom, #000 0%, #000 85%, rgba(0,0,0,0.85) 89%, rgba(0,0,0,0.35) 94%, transparent 98%)',
        }}
      >
        {/* Frame Container keeping 682:1024 exact aspect ratio of the hand photo */}
        <div className="relative aspect-[682/1024] w-full">
          {/* Layer 1: Solid Black Phone Frame Underlay (Prevents any atmospheric purple glow from leaking through) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute z-0 bg-black"
            style={{
              left: '22.8%',
              top: '6.7%',
              width: '53.8%',
              height: '69.8%',
              borderRadius: 'clamp(24px, 11%, 44px)',
            }}
          />

          {/* Layer 2: Phone Screen Video (Fits active OLED display opening with natural black bezel border) */}
          <div
            className="absolute z-10 overflow-hidden bg-black"
            style={{
              left: '26.1%',
              top: '8.4%',
              width: '47.5%',
              height: '66.4%',
              borderRadius: 'clamp(18px, 10.4%, 34px)',
            }}
          >
            <video
              src={HERO_LYRICS_VIDEO_SRC}
              poster={HERO_PHONE_POSTER_SRC}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              aria-label="Vibra Music word-synced live lyrics playing Treat You Better"
              className="h-full w-full object-cover object-top"
            >
              <source src={HERO_LYRICS_VIDEO_SRC} type="video/mp4" />
            </video>

            {/* Subtle Screen Glass Specular Sheen */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent"
            />
          </div>

          {/* Layer 3: Hand and Phone Bezel Overlay (Screen cutout lets video shine through, hand & bezel overlap on top) */}
          <img
            src={HERO_HAND_CUTOUT_SRC}
            width={682}
            height={1024}
            decoding="async"
            fetchPriority="high"
            alt="Hand holding smartphone running Vibra Music with live word-synced lyrics"
            className="pointer-events-none relative z-20 h-full w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};
