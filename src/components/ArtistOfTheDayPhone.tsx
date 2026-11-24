import React from 'react';
import { ChevronRight, Pause, Star } from 'lucide-react';
import type { ArtistProfile } from '../data/nebulaData';
import { formatListenerCount } from '../utils/nebulaLogic';
import { PhoneStatusBar } from './PhoneStatusBar';

interface ArtistOfTheDayPhoneProps {
  artist: ArtistProfile;
  isListening: boolean;
  onToggleListen: () => void;
}

export const ArtistOfTheDayPhone: React.FC<ArtistOfTheDayPhoneProps> = ({
  artist,
  isListening,
  onToggleListen,
}) => {
  return (
    <div
      data-testid="artist-of-the-day-phone"
      className="relative w-[274px] sm:w-[292px] shrink-0 rounded-[44px] border border-[#2d2b2a] bg-[#0a0909] p-[9px] shadow-[0_28px_80px_rgba(0,0,0,0.9)]"
    >
      {/* Subtle metallic side highlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[44px] ring-1 ring-inset ring-white/[0.07]"
      />

      {/* Inner Phone Screen */}
      <div className="relative flex h-[566px] w-full flex-col overflow-hidden rounded-[36px] bg-[#090808] text-white">
        {/* Dynamic Island */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-2.5 z-20 h-[17px] w-[72px] -translate-x-1/2 rounded-full bg-black"
        />

        {/* Golden Radial Spotlight Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 50% 48%, rgba(212, 152, 42, 0.34) 0%, rgba(164, 108, 22, 0.16) 36%, rgba(9, 8, 8, 0) 70%)',
          }}
        />

        {/* Status Bar */}
        <div className="relative z-10">
          <PhoneStatusBar />
        </div>

        {/* Title Header with Sparkle */}
        <div className="relative z-10 mt-6 flex flex-col items-center text-center">
          <svg
            className="mb-1 h-3 w-3 text-[#f5c85c]"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 1L14.3 9.7L23 12L14.3 14.3L12 23L9.7 14.3L1 12L9.7 9.7L12 1Z" />
          </svg>
          <h3 className="font-display bg-gradient-to-b from-[#f6cc68] via-[#e2ad42] to-[#9b6c1c] bg-clip-text text-[22px] font-medium leading-[1.12] tracking-tight text-transparent">
            Artist
            <br />
            of the Day
          </h3>
        </div>

        {/* Center Featured Artist Card */}
        <div className="relative z-10 mx-auto mt-6 w-[184px]">
          {/* Subtle decorative dust particles around card */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-2 -right-3 h-1 w-1 rounded-full bg-[#f5c85c]/70"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-14 -right-5 h-[3px] w-[3px] rounded-full bg-[#f5c85c]/50"
          />

          {/* Floating Golden Star Medallion overlapping left edge */}
          <div
            aria-hidden="true"
            className="absolute -left-5 top-8 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-[#fce39c]/60 bg-[radial-gradient(circle_at_35%_30%,#fef0b3_0%,#eab308_55%,#854d0e_100%)] shadow-[0_8px_22px_rgba(234,179,8,0.45)]"
          >
            <Star className="h-5 w-5 fill-[#5c3504] text-[#5c3504]" />
          </div>

          {/* Artist Portrait Container */}
          <div className="relative overflow-hidden rounded-t-[18px] border border-b-0 border-white/15 bg-[#111517]">
            <div className="relative aspect-[1.06/1] w-full overflow-hidden">
              <img
                src={artist.spotlightImage}
                alt={artist.name}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition-transform duration-300"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#12110f] via-black/20 to-transparent" />
              <p className="absolute inset-x-0 bottom-2.5 px-3 text-center font-display text-[13px] font-semibold tracking-tight text-white">
                {artist.name}
              </p>
            </div>
          </div>

          {/* Translucent Stats Card */}
          <div className="rounded-b-[18px] border border-t border-white/10 bg-[#1a1815]/85 px-3.5 py-3 backdrop-blur-md">
            <p className="text-center text-[9px] text-[#8d8983]">{artist.role}</p>

            <div className="mt-2.5 flex items-end justify-between border-t border-white/[0.06] pt-2.5">
              <div>
                <p className="font-display text-[14px] font-semibold tabular-nums text-white">
                  {formatListenerCount(artist.monthlyListeners)}
                </p>
                <p className="text-[7.5px] text-[#84807b]">Monthly Listeners</p>
              </div>
              <div className="text-right">
                <p className="font-display text-[14px] font-semibold tabular-nums text-white">
                  {artist.tracks}
                </p>
                <p className="text-[7.5px] text-[#84807b]">Tracks</p>
              </div>
            </div>
          </div>

          {/* Subtle Audio Status / Scroll Indicator */}
          <div className="mt-3.5 flex h-5 items-center justify-center">
            {isListening ? (
              <div className="flex items-center gap-2 text-[9px] text-[#f5c85c]">
                <span className="flex h-2.5 items-end gap-[2px]" aria-hidden="true">
                  <span className="animate-eq-1 h-full w-[2px] rounded-full bg-[#f5c85c]" />
                  <span className="animate-eq-2 h-full w-[2px] rounded-full bg-[#f5c85c]" />
                  <span className="animate-eq-3 h-full w-[2px] rounded-full bg-[#f5c85c]" />
                </span>
                <span className="truncate max-w-[140px]">Now Playing: {artist.featuredTrack}</span>
              </div>
            ) : (
              <span
                aria-hidden="true"
                className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-white/15 text-[8px] text-white/35"
              >
                ⌄
              </span>
            )}
          </div>
        </div>

        {/* Bottom Listen Now CTA */}
        <div className="relative z-10 mt-auto flex justify-center pb-7">
          <button
            type="button"
            onClick={onToggleListen}
            aria-label={isListening ? `Pause ${artist.name}` : `Listen Now to ${artist.name}`}
            className={`inline-flex items-center gap-1.5 rounded-full border px-5 py-2 text-[10.5px] font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5c85c] ${
              isListening
                ? 'border-[#f5c85c]/50 bg-[#2a2214] text-[#fce39c]'
                : 'border-white/12 bg-[#232120]/90 text-white/90 hover:border-white/25 hover:bg-[#2c2a28]'
            }`}
          >
            {isListening ? (
              <>
                <Pause className="h-3 w-3 fill-current" />
                <span>Pause Preview</span>
              </>
            ) : (
              <>
                <span>Listen Now</span>
                <ChevronRight className="h-3 w-3 text-white/60" />
              </>
            )}
          </button>
        </div>

        {/* iOS Home Indicator */}
        <div
          aria-hidden="true"
          className="absolute bottom-2 left-1/2 h-[3.5px] w-24 -translate-x-1/2 rounded-full bg-white/25"
        />
      </div>
    </div>
  );
};
