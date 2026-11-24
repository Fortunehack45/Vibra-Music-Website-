import React from 'react';

export type HeroHighlightKey = 'lossless' | 'mix' | 'glass' | null;

interface NebulaHomePhoneProps {
  highlightedFeature: HeroHighlightKey;
}

const HERO_LYRICS_VIDEO_SRC = '/assets/videos/hero_lyrics_loop.mp4';
const HERO_PHONE_POSTER_SRC = '/assets/images/hero_phone_poster.jpg';

export const NebulaHomePhone: React.FC<NebulaHomePhoneProps> = ({ highlightedFeature }) => {
  const reflectionGlow = highlightedFeature
    ? 'opacity-[0.75] scale-105'
    : 'opacity-[0.50] scale-100';

  return (
    <div
      data-testid="nebula-home-screen"
      className="relative mx-auto flex w-full max-w-[270px] min-[360px]:max-w-[290px] sm:max-w-[320px] md:max-w-[340px] lg:max-w-[350px] items-center justify-center select-none"
    >
      {/* Atmospheric Purple Glow strictly behind the phone */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -inset-8 sm:-inset-12 z-0 rounded-full blur-[72px] sm:blur-[88px] transition-all duration-700 ${reflectionGlow}`}
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.40) 0%, rgba(139, 92, 246, 0.22) 45%, rgba(109, 40, 217, 0.05) 75%, transparent 100%)',
        }}
      />

      {/* Flagship Obsidian Smartphone Chassis */}
      <div className="relative z-10 w-full rounded-[44px] sm:rounded-[48px] border border-[#2e2c2b] bg-[#0c0b0b] p-[7px] sm:p-[8px] shadow-[0_30px_90px_rgba(0,0,0,0.95),0_0_60px_rgba(168,85,247,0.18)] transition-all duration-500 hover:border-[#4a4745]">
        {/* Subtle metallic titanium chamfer highlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[44px] sm:rounded-[48px] ring-1 ring-inset ring-white/[0.10]"
        />

        {/* Side physical button accents */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-[2px] top-[90px] sm:top-[105px] h-7 sm:h-8 w-[2px] rounded-l-sm bg-[#3a3736]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-[2px] top-[130px] sm:top-[150px] h-11 sm:h-13 w-[2px] rounded-l-sm bg-[#3a3736]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[2px] top-[110px] sm:top-[125px] h-12 sm:h-14 w-[2px] rounded-r-sm bg-[#3a3736]"
        />

        {/* Exact 9:20 Smartphone Display Container */}
        <div className="relative aspect-[9/20] w-full overflow-hidden rounded-[37px] sm:rounded-[41px] bg-black">
          {/* Word-Synced Lyrics Video - Clean, pure, edge-to-edge */}
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
            className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent"
          />
        </div>
      </div>
    </div>
  );
};
