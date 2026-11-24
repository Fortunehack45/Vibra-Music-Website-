import React, { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import type { ArtistProfile } from '../data/nebulaData';
import {
  filterArtists,
  formatListenerCount,
  getNextRoleFilter,
  type ArtistRoleFilter,
} from '../utils/nebulaLogic';
import { PhoneStatusBar } from './PhoneStatusBar';

interface ArtistsDirectoryPhoneProps {
  artists: ArtistProfile[];
  selectedArtistId: string;
  onSelectArtist: (artist: ArtistProfile) => void;
}

type DirectoryTab = 'Playlist' | 'Artists' | 'Premium';

export const ArtistsDirectoryPhone: React.FC<ArtistsDirectoryPhoneProps> = ({
  artists,
  selectedArtistId,
  onSelectArtist,
}) => {
  const [activeTab, setActiveTab] = useState<DirectoryTab>('Artists');
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<ArtistRoleFilter>('All');

  const filteredArtists = filterArtists(artists, searchQuery, roleFilter);

  const handleResetFilters = () => {
    setSearchQuery('');
    setRoleFilter('All');
  };

  return (
    <div
      data-testid="artists-directory-phone"
      className="relative w-[274px] sm:w-[292px] shrink-0 rounded-[44px] border border-[#2d2b2a] bg-[#0a0909] p-[9px] shadow-[0_28px_80px_rgba(0,0,0,0.9)]"
    >
      {/* Subtle metallic bezel highlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[44px] ring-1 ring-inset ring-white/[0.07]"
      />

      {/* Inner Phone Screen */}
      <div className="relative flex h-[566px] w-full flex-col overflow-hidden rounded-[36px] bg-[#0a0909] text-white">
        {/* Dynamic Island */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-2.5 z-30 h-[17px] w-[72px] -translate-x-1/2 rounded-full bg-black"
        />

        {/* Top soft backlit portrait ambience behind header */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#2c3336]/55 via-[#141414]/40 to-transparent"
        />

        {/* Status Bar */}
        <div className="relative z-20">
          <PhoneStatusBar />
        </div>

        {/* Top Category Navigation Row */}
        <div
          role="tablist"
          aria-label="Explore sections"
          className="relative z-20 mt-2 flex items-center justify-between px-3 pb-2.5 text-[11px]"
        >
          {(['Playlist', 'Artists', 'Premium'] as DirectoryTab[]).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap px-2 py-0.5 font-medium transition-colors ${
                  isActive
                    ? 'text-white'
                    : tab === 'Playlist'
                    ? 'text-[#5b5957] hover:text-[#a6a29e]'
                    : 'text-[#6e6b69] hover:text-[#b8b4b0]'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Active Role Filter Chip (only shown when non-default filter is active) */}
        {roleFilter !== 'All' && (
          <div className="relative z-20 flex items-center justify-between px-4 pb-1.5 text-[9px] text-[#f97316]">
            <span>Filtered: {roleFilter}</span>
            <button
              type="button"
              onClick={() => setRoleFilter('All')}
              className="text-white/70 hover:text-white"
            >
              Clear
            </button>
          </div>
        )}

        {/* Alternating 2-Column Artist Checkerboard Grid */}
        <div className="no-scrollbar relative z-10 flex-1 overflow-y-auto px-3.5 pb-16">
          {filteredArtists.length === 0 ? (
            <div className="flex h-64 flex-col items-center justify-center px-4 text-center">
              <p className="text-xs font-medium text-white/85">No artists found</p>
              <p className="mt-1 text-[10px] text-[#7c7977]">
                Try another name, role, or origin.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="mt-3 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[10px] font-medium text-white transition-colors hover:bg-white/10"
              >
                Reset search
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {filteredArtists.map((artist, idx) => {
                const photoOnLeft = idx % 2 === 0;
                const isSelected = artist.id === selectedArtistId;

                const photoTile = (
                  <button
                    type="button"
                    onClick={() => onSelectArtist(artist)}
                    aria-label={`Inspect ${artist.name} artwork`}
                    className={`group relative aspect-square w-full overflow-hidden rounded-[11px] border bg-[#161515] text-left transition-all duration-200 ${
                      isSelected
                        ? 'border-white/25'
                        : 'border-white/[0.07] hover:border-white/25'
                    }`}
                  >
                    <img
                      src={artist.gridTileImage}
                      alt={`${artist.name} portrait`}
                      width={120}
                      height={120}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-110 ${
                        artist.id === 'billie-eilish' ? 'scale-[1.32] object-top' : ''
                      }`}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/15" />
                    {artist.showVisitTag && (
                      <span className="absolute right-1.5 top-2 rounded-full border border-white/15 bg-black/55 px-2 py-[2px] text-[7.5px] font-medium text-white/90 backdrop-blur-sm">
                        Visit Artist
                      </span>
                    )}
                  </button>
                );

                const infoTile = (
                  <button
                    type="button"
                    onClick={() => onSelectArtist(artist)}
                    aria-label={`Select artist ${artist.name}`}
                    className="flex aspect-square w-full flex-col justify-between rounded-[11px] p-1.5 text-left transition-colors duration-150 hover:bg-white/[0.04]"
                  >
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="truncate font-display text-[10.5px] font-semibold tracking-tight text-white">
                          {artist.name}
                        </span>
                        {artist.verified && (
                          <span
                            aria-hidden="true"
                            className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#e8502c]"
                          />
                        )}
                      </div>
                      <p className="mt-0.5 text-[7.5px] text-[#7c7977]">{artist.role}</p>
                    </div>

                    <div className="flex items-end justify-between gap-1 pt-2">
                      <div>
                        <p className="text-[9px] font-medium tabular-nums text-white/85">
                          {formatListenerCount(artist.directoryListeners)}
                        </p>
                        <p className="text-[7px] text-[#6d6a68]">Listeners</p>
                      </div>
                      <span className="text-[7.5px] text-[#8d8986]">{artist.origin}</span>
                    </div>
                  </button>
                );

                return (
                  <div key={artist.id} className="grid grid-cols-2 gap-2.5">
                    {photoOnLeft ? (
                      <>
                        {photoTile}
                        {infoTile}
                      </>
                    ) : (
                      <>
                        {infoTile}
                        {photoTile}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Bottom Gradient Fade + Floating Search Bar & Orange Filter Button */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-[#0a0909] via-[#0a0909]/92 to-transparent px-3.5 pb-4 pt-8">
          <div className="pointer-events-auto flex items-center gap-2">
            <div className="flex flex-1 items-center gap-1.5 rounded-full border border-white/12 bg-[#161515]/95 px-3 py-2 backdrop-blur-md focus-within:border-[#f97316]/60">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search Artists"
                placeholder="Search Artists"
                className="w-full min-w-0 bg-transparent text-[10px] text-white placeholder-[#777471] outline-none"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear artist search"
                  className="text-[#8e8b88] hover:text-white"
                >
                  <X className="h-3 w-3" />
                </button>
              ) : (
                <Search className="h-3 w-3 shrink-0 text-[#8e8b88]" aria-hidden="true" />
              )}
            </div>

            <button
              type="button"
              onClick={() => setRoleFilter((prev) => getNextRoleFilter(prev))}
              aria-label={`Filter artists by role (current: ${roleFilter})`}
              title={`Filter: ${roleFilter}`}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#ff7a29] to-[#e65512] text-white shadow-[0_6px_18px_rgba(249,115,22,0.45)] transition-transform duration-150 hover:scale-105 active:scale-95"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* iOS Home Indicator */}
        <div
          aria-hidden="true"
          className="absolute bottom-1.5 left-1/2 z-30 h-[3.5px] w-24 -translate-x-1/2 rounded-full bg-white/25"
        />
      </div>
    </div>
  );
};
