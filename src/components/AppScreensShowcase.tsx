import React, { useRef } from 'react';
import { EdgeRefractionScroller } from './EdgeRefractionScroller';
import { FourDotBadge } from './FourDotBadge';
import { ShowcasePhoneFrame } from './ShowcasePhoneFrame';

export interface ShowcaseScreenItem {
  id: string;
  src: string;
  label: string;
  eyebrow: string;
  title: string;
  caption: string;
  alt: string;
}

const PRIMARY_NOW_PLAYING: ShowcaseScreenItem = {
  id: 'now-playing',
  src: '/assets/aistudio/Screenshot_20261124-014915_231d188c.jpg',
  label: 'Now Playing screen',
  eyebrow: '01 / Now Playing',
  title: 'Now Playing & Dynamic Artwork',
  caption:
    'Artwork-extracted Material palette, live lyric preview line, lossless output picker, and true gapless crossfade controls.',
  alt: 'Vibra Music Now Playing screen playing NOKIA by Drake with dynamic olive-emerald artwork palette',
};

const PRIMARY_ARTIST_PAGE: ShowcaseScreenItem = {
  id: 'artist-page',
  src: '/assets/aistudio/Screenshot_20261124-015021_d3c53647.jpg',
  label: 'Artist page screen',
  eyebrow: '02 / Artist Profile',
  title: 'Artist Pages & Frosted Haze Navigation',
  caption:
    'Immersive full-bleed artist portraits, recent album spotlight cards, top tracks, and translucent Haze bottom navigation.',
  alt: 'Vibra Music Artist page for Michael Jackson with dynamic warm copper theming and frosted-glass floating dock',
};

const EXTENDED_SCREENS: ShowcaseScreenItem[] = [
  {
    id: 'lyrics',
    src: '/assets/aistudio/Screenshot_20261124-015359_b9018f38.jpg',
    label: 'Word-Synced Lyrics screen',
    eyebrow: '01 / Synced Lyrics',
    title: 'Word-Synced Lyrics & Translation',
    caption:
      'Syllable-level Apple-style kinetic highlight with instant translation across Musixmatch, LRCLIB, lrc.red, and embedded tags.',
    alt: 'Vibra Music live word-synced lyrics view for Lemon Scent by Dead Sara with translation toggle',
  },
  {
    id: 'queue-autoplay',
    src: '/assets/aistudio/Screenshot_20261124-015437_dc825629.jpg',
    label: 'Queue & AutoPlay screen',
    eyebrow: '02 / Up Next & AutoPlay',
    title: 'Smart Queue & Infinite AutoPlay',
    caption:
      'Drag-to-reorder playback queue with intelligent AutoPlay continuity, shuffle, repeat, and persistent dynamic backdrop.',
    alt: 'Vibra Music Queue and AutoPlay screen for Paranoid by Black Sabbath showing upcoming rock tracks',
  },
  {
    id: 'album-page',
    src: '/assets/aistudio/Screenshot_20261124-015509_dd76d6b6.jpg',
    label: 'Album View screen',
    eyebrow: '03 / Album Experience',
    title: 'Editorial Album Pages',
    caption:
      'Full-bleed cover hero, release notes, complete tracklist, and persistent frosted-glass mini-player.',
    alt: 'Vibra Music Album view for Illuminate by Shawn Mendes with release details and floating mini-player',
  },
  {
    id: 'explore-moods',
    src: '/assets/aistudio/Screenshot_20261124-015217_ecf9c827.jpg',
    label: 'Explore Moods & Genres screen',
    eyebrow: '04 / Explore',
    title: 'Moods & Genres Grid',
    caption:
      'Color-coded curated mood cards — Chill, Commute, Focus, Gaming, Party, Romance — anchored by a frosted glass bottom dock.',
    alt: 'Vibra Music Explore screen displaying curated mood cards and frosted translucent bottom navigation bar',
  },
];

interface AppScreensShowcaseProps {
  onInspectScreen: (screen: { src: string; title: string; caption: string }) => void;
}

export const AppScreensShowcase: React.FC<AppScreensShowcaseProps> = ({ onInspectScreen }) => {
  const galleryRef = useRef<HTMLDivElement>(null);

  // Duplicated screens array for continuous, seamless infinite loop
  const infiniteScreens = [...EXTENDED_SCREENS, ...EXTENDED_SCREENS];

  return (
    <div id="screens">
      {/* PRIMARY DUAL IPHONE SHOWCASE — NOKIA (NOW PLAYING) & MICHAEL JACKSON (ARTIST PAGE) */}
      <section
        aria-label="Vibra Music Now Playing and Artist Page showcase"
        className="relative pb-16 pt-4 sm:pb-24 lg:pb-28"
      >
        <div className="relative z-10 mx-auto max-w-[1280px] px-5 sm:px-10 lg:px-14">
          <div className="flex flex-col items-center gap-10 sm:gap-12 lg:flex-row lg:items-end lg:justify-center lg:gap-14">
            {/* Two Flagship Screens Side-by-Side */}
            <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:justify-center sm:gap-10 lg:gap-16 lg:pl-[12%]">
              <ShowcasePhoneFrame
                imageSrc={PRIMARY_NOW_PLAYING.src}
                alt={PRIMARY_NOW_PLAYING.alt}
                label={PRIMARY_NOW_PLAYING.label}
                testId="vibra-now-playing-phone"
                onInspect={() =>
                  onInspectScreen({
                    src: PRIMARY_NOW_PLAYING.src,
                    title: PRIMARY_NOW_PLAYING.title,
                    caption: PRIMARY_NOW_PLAYING.caption,
                  })
                }
              />
              <ShowcasePhoneFrame
                imageSrc={PRIMARY_ARTIST_PAGE.src}
                alt={PRIMARY_ARTIST_PAGE.alt}
                label={PRIMARY_ARTIST_PAGE.label}
                testId="vibra-artist-phone"
                onInspect={() =>
                  onInspectScreen({
                    src: PRIMARY_ARTIST_PAGE.src,
                    title: PRIMARY_ARTIST_PAGE.title,
                    caption: PRIMARY_ARTIST_PAGE.caption,
                  })
                }
              />
            </div>

            {/* Bottom-Right "Player & Artists /" Editorial Annotation */}
            <div className="flex w-full max-w-[290px] flex-col items-start sm:max-w-[260px] lg:mb-6 lg:w-[218px] lg:shrink-0">
              <FourDotBadge />
              <p className="mt-4 text-[12px] font-normal text-[#6f6d6b]">Player &amp; Artists /</p>
              <p className="mt-2 text-[13px] sm:text-[12.5px] leading-[1.55] text-[#d9d7d5]">
                Dynamic artwork-driven theming adapts every screen with animated album canvases,
                word-synced lyrics, and frosted-glass artist pages for effortless discovery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* EXTENDED MULTI-SCREEN GALLERY — INFINITE LOOP SLIDE WITH VIBRA OPTICAL EDGE REFRACTION */}
      <section
        aria-labelledby="more-screens-heading"
        className="relative mx-auto max-w-[1280px] border-t border-white/[0.06] px-5 py-16 sm:px-10 sm:py-22 lg:px-14"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[12px] font-normal text-[#6f6d6b]">Interface / Full Experience</p>
            <h2
              id="more-screens-heading"
              className="font-display mt-1.5 text-[26px] font-normal leading-[1.14] tracking-[-0.025em] text-[#f4f3f1] sm:text-[34px]"
            >
              Every surface, tuned to the track.
            </h2>
          </div>
        </div>

        <div className="-mx-5 mt-10 sm:mx-0">
          <EdgeRefractionScroller
            scrollerRef={galleryRef}
            refractionStrength="standard"
            edgeWidthClassName="w-14 sm:w-24"
            overlayHeightClassName="top-0 bottom-auto h-[440px] sm:h-[480px]"
            autoScroll={true}
            autoScrollSpeed={0.55}
            className="flex gap-7 px-5 pb-4 sm:gap-9 sm:px-1"
          >
            {infiniteScreens.map((screen, idx) => (
              <div
                key={`${screen.id}-${idx}`}
                className="flex w-[256px] shrink-0 flex-col items-center sm:w-[276px]"
              >
                <ShowcasePhoneFrame
                  imageSrc={screen.src}
                  alt={screen.alt}
                  label={screen.label}
                  testId={`vibra-screen-${screen.id}-${idx}`}
                  onInspect={() =>
                    onInspectScreen({
                      src: screen.src,
                      title: screen.title,
                      caption: screen.caption,
                    })
                  }
                />
                <div className="mt-5 w-full px-1 text-left">
                  <p className="text-[11.5px] font-normal text-[#6f6d6b]">{screen.eyebrow}</p>
                  <p className="font-display mt-1 text-[15px] font-medium text-[#f2f1ef]">
                    {screen.title}
                  </p>
                  <p className="mt-1.5 text-[12.5px] leading-[1.55] text-[#8a8784]">
                    {screen.caption}
                  </p>
                </div>
              </div>
            ))}
          </EdgeRefractionScroller>
        </div>
      </section>
    </div>
  );
};
