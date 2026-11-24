import React from 'react';

export type HeroHighlightKey = 'lossless' | 'mix' | 'glass' | null;

interface NebulaHomePhoneProps {
  highlightedFeature: HeroHighlightKey;
}

const HERO_HAND_CUTOUT_SRC = '/assets/images/hero_hand_phone_cutout.png';
const HERO_LYRICS_VIDEO_SRC = '/assets/videos/hero_lyrics_loop.mp4';

export const NebulaHomePhone: React.FC<NebulaHomePhoneProps> = ({ highlightedFeature }) => {
  const reflectionGlow = highlightedFeature
    ? 'opacity-[0.65] scale-105'
    : 'opacity-[0.45] scale-100';

  return (
    <div
      data-testid="nebula-home-screen"
      className="relative mx-auto flex w-full max-w-[320px] items-center justify-center sm:max-w-[420px] lg:max-w-[500px] select-none"
    >
      {/* Vibra Atmospheric Glow & Orbital Halos strictly behind the phone */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -inset-10 z-0 rounded-full blur-[72px] transition-all duration-700 ${reflectionGlow}`}
        style={{
          background:
            'radial-gradient(ellipse 70% 65% at 50% 45%, rgba(168, 85, 247, 0.32) 0%, rgba(139, 92, 246, 0.18) 45%, rgba(109, 40, 217, 0.04) 75%, transparent 100%)',
        }}
      />

      {/* Outer Edgeless Fade Container: Multi-direction feathered fade ensuring zero harsh borders */}
      <div
        className="relative z-10 w-full"
        style={{
          WebkitMaskImage:
            'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 75%, rgba(0,0,0,0.55) 88%, rgba(0,0,0,0) 99%)',
          maskImage:
            'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 75%, rgba(0,0,0,0.55) 88%, rgba(0,0,0,0) 99%)',
        }}
      >
        {/* Frame Container keeping 682:1024 exact aspect ratio of the hand photo */}
        <div className="relative aspect-[682/1024] w-full">
          {/* Layer 1: Phone Screen Video (aligned perfectly with phone inner bezel: left 23.46%, top 1.95%, width 52.49%, height 77.15%) */}
          <div
            className="absolute z-10 overflow-hidden bg-black"
            style={{
              left: '23.46%',
              top: '1.95%',
              width: '52.49%',
              height: '77.15%',
              borderRadius: '8.8% / 4.1%',
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
