import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Pause, Volume2 } from 'lucide-react';
import type {
  LiveMusicAlbum,
  LiveMusicDiscoverPayload,
  LiveMusicTrack,
} from '../utils/musicFeedParser';
import { EdgeRefractionScroller } from './EdgeRefractionScroller';

const TRACKS_PER_COLUMN = 4;

function chunkIntoColumns<T>(items: T[], size: number): T[][] {
  const cols: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    cols.push(items.slice(i, i + size));
  }
  return cols;
}

const ExplicitMark: React.FC = () => (
  <span
    aria-label="Explicit"
    className="inline-flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-[3px] bg-white/[0.18] text-[9px] font-bold leading-none text-[#d8d6d4]"
  >
    E
  </span>
);

interface AlbumShelfProps {
  title: string;
  albums: LiveMusicAlbum[];
  loading: boolean;
}

const AlbumReleaseSlide: React.FC<AlbumShelfProps> = ({ title, albums, loading }) => {
  const scrollerRef = useRef<HTMLDivElement>(null);

  // Duplicated albums for seamless infinite loop
  const infiniteAlbums = albums.length > 0 ? [...albums, ...albums] : [];

  return (
    <div className="mt-10 sm:mt-12">
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-display text-[17px] font-semibold tracking-[-0.015em] text-[#f4f3f1] sm:text-[19px]">
          {title}
        </h3>
      </div>

      {/* Horizontal Album Slide with Vibra Music Optical Liquid-Glass Edge Refraction */}
      <div className="-mx-5 mt-4 sm:mx-0">
        <EdgeRefractionScroller
          scrollerRef={scrollerRef}
          autoScroll={!loading && infiniteAlbums.length > 0}
          autoScrollSpeed={0.5}
          overlayHeightClassName="top-0 bottom-auto h-[166px] sm:h-[208px] lg:h-[228px]"
          className="flex gap-4 px-5 pb-2 sm:gap-5 sm:px-0"
        >
          {loading
            ? Array.from({ length: 6 }).map((_, idx) => (
                <div
                  key={idx}
                  className="w-[166px] shrink-0 animate-pulse sm:w-[208px] lg:w-[228px]"
                >
                  <div className="aspect-square w-full rounded-[10px] border border-white/[0.07] bg-white/[0.04]" />
                  <div className="mt-2.5 h-3.5 w-3/4 rounded bg-white/[0.07]" />
                  <div className="mt-1.5 h-3 w-1/2 rounded bg-white/[0.04]" />
                </div>
              ))
            : infiniteAlbums.map((album, idx) => (
                <a
                  key={`${album.id}-${idx}`}
                  href={album.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-[166px] shrink-0 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a855f7] sm:w-[208px] lg:w-[228px]"
                >
                  <div className="relative aspect-square w-full overflow-hidden rounded-[10px] border border-white/[0.09] bg-[#141313] transition-transform duration-300 group-hover:scale-[1.015]">
                    <img
                      src={album.artwork}
                      alt={`${album.title} by ${album.artist}`}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="mt-2.5 flex items-center gap-1.5">
                    <span className="truncate text-[13.5px] font-medium leading-tight text-[#f2f1ef] transition-colors group-hover:text-white">
                      {album.title}
                    </span>
                    {album.explicit && <ExplicitMark />}
                  </div>
                  <p className="mt-0.5 truncate text-[12.5px] text-[#8a8784]">{album.artist}</p>
                </a>
              ))}
        </EdgeRefractionScroller>
      </div>
    </div>
  );
};

export const VibraDiscoveryShelves: React.FC = () => {
  const [feed, setFeed] = useState<LiveMusicDiscoverPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [playingTrack, setPlayingTrack] = useState<LiveMusicTrack | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const songsScrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    fetch('/api/music/discover')
      .then(async (res) => {
        if (!res.ok) throw new Error(`Feed unavailable (${res.status})`);
        return (await res.json()) as LiveMusicDiscoverPayload;
      })
      .then((data) => {
        if (!active) return;
        setFeed(data);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (!active) return;
        setError(err instanceof Error ? err.message : 'Unable to load live music catalog');
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  const handleToggleTrack = (track: LiveMusicTrack) => {
    const audio = audioRef.current;
    if (playingTrack?.id === track.id) {
      if (audio) {
        audio.pause();
      }
      setPlayingTrack(null);
      setIsAudioPlaying(false);
      return;
    }

    setPlayingTrack(track);
    if (audio && track.previewUrl) {
      audio.src = track.previewUrl;
      audio
        .play()
        .then(() => setIsAudioPlaying(true))
        .catch(() => setIsAudioPlaying(false));
    } else {
      setIsAudioPlaying(false);
    }
  };

  const trackColumns = chunkIntoColumns(feed?.bestNewSongs ?? [], TRACKS_PER_COLUMN);
  const infiniteColumns = trackColumns.length > 0 ? [...trackColumns, ...trackColumns] : [];

  return (
    <section
      id="discover"
      aria-labelledby="discover-heading"
      className="relative z-10 mx-auto max-w-[1280px] border-t border-white/[0.06] px-5 pt-16 pb-10 sm:px-10 sm:pt-22 lg:px-14 lg:pt-26"
    >
      {/* Hidden HTML5 audio element for real 30-second song previews */}
      <audio
        ref={audioRef}
        onEnded={() => {
          setPlayingTrack(null);
          setIsAudioPlaying(false);
        }}
      />

      {/* Editorial Section Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[12px] font-normal text-[#6f6d6b]">Discover / Live Catalog</p>
          <h2
            id="discover-heading"
            className="font-display mt-1.5 text-[28px] font-normal leading-[1.12] tracking-[-0.025em] text-[#f4f3f1] sm:text-[36px]"
          >
            Built around the music, never the clutter.
          </h2>
        </div>

        {playingTrack ? (
          <div className="inline-flex items-center gap-3 self-start border-b border-[#a855f7]/45 pb-1.5 text-[12.5px] sm:self-auto">
            <button
              type="button"
              onClick={() => handleToggleTrack(playingTrack)}
              aria-label={`Pause preview of ${playingTrack.title}`}
              className="inline-flex items-center gap-1.5 text-[#c084fc] transition-colors hover:text-[#d8b4fe]"
            >
              {isAudioPlaying ? (
                <Pause className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <Volume2 className="h-3.5 w-3.5" aria-hidden="true" />
              )}
              <span className="max-w-[175px] truncate font-medium text-[#f2f1ef]">
                {playingTrack.title}
              </span>
            </button>
            <span className="text-[#6f6d6b]">·</span>
            <a
              href={playingTrack.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 text-[#9c9996] transition-colors hover:text-white whitespace-nowrap"
            >
              <span>Open</span>
              <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
            </a>
          </div>
        ) : (
          <p className="max-w-[330px] text-[13px] leading-[1.55] text-[#8a8784]">
            Streamed live from YouTube Music InnerTube &amp; public charts — tap any track to hear a
            real preview or open the release.
          </p>
        )}
      </div>

      {error && !loading && (
        <div className="mt-8 border-y border-white/[0.08] py-6 text-[13.5px] text-[#9c9996]">
          Live music feeds are temporarily unreachable ({error}). Refresh the page to retry.
        </div>
      )}

      {/* 1. Best New Songs — 4-Row Horizontal Multi-Column Track Shelf with Edge Refraction */}
      {(!error || loading) && (
        <>
          <div className="mt-10 sm:mt-12">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-display text-[17px] font-semibold tracking-[-0.015em] text-[#f4f3f1] sm:text-[19px]">
                Best New Songs
              </h3>
            </div>

            <div className="-mx-5 mt-4 sm:mx-0">
              <EdgeRefractionScroller
                scrollerRef={songsScrollerRef}
                autoScroll={!loading && infiniteColumns.length > 0}
                autoScrollSpeed={0.5}
                isPaused={isAudioPlaying}
                overlayHeightClassName="inset-y-0"
                className="flex gap-6 px-5 pb-2 sm:gap-8 sm:px-0"
              >
                {loading
                  ? Array.from({ length: 4 }).map((_, colIdx) => (
                      <div
                        key={colIdx}
                        className="flex w-[280px] shrink-0 animate-pulse flex-col sm:w-[308px]"
                      >
                        {Array.from({ length: 4 }).map((__, rowIdx) => (
                          <div
                            key={rowIdx}
                            className={`flex items-center gap-3.5 py-2.5 ${
                              rowIdx < 3 ? 'border-b border-white/[0.06]' : ''
                            }`}
                          >
                            <div className="h-12 w-12 shrink-0 rounded-[7px] bg-white/[0.05]" />
                            <div className="flex-1 space-y-2">
                              <div className="h-3.5 w-3/4 rounded bg-white/[0.07]" />
                              <div className="h-3 w-1/2 rounded bg-white/[0.04]" />
                            </div>
                          </div>
                        ))}
                      </div>
                    ))
                  : infiniteColumns.map((column, colIdx) => (
                      <div
                        key={colIdx}
                        className="flex w-[280px] shrink-0 flex-col sm:w-[308px]"
                      >
                        {column.map((track, rowIdx) => {
                          const isActive = playingTrack?.id === track.id;
                          const isLast = rowIdx === column.length - 1;
                          return (
                            <button
                              key={`${track.id}-${colIdx}-${rowIdx}`}
                              type="button"
                              onClick={() => handleToggleTrack(track)}
                              className={`group flex w-full items-center gap-3.5 py-2.5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a855f7] ${
                                !isLast ? 'border-b border-white/[0.06]' : ''
                              }`}
                            >
                              {/* 48x48 rounded-[7px] + hairline thumbnailBorder matching HomeScreen.kt */}
                              <div
                                className={`relative h-12 w-12 shrink-0 overflow-hidden rounded-[7px] border bg-[#141313] ${
                                  isActive ? 'border-[#a855f7]/70' : 'border-white/[0.09]'
                                }`}
                              >
                                <img
                                  src={track.artwork}
                                  alt={`${track.title} by ${track.artist}`}
                                  loading="lazy"
                                  referrerPolicy="no-referrer"
                                  className="h-full w-full object-cover"
                                />
                                {isActive && (
                                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                                    <div
                                      className="flex h-3.5 items-end gap-[2px]"
                                      aria-hidden="true"
                                    >
                                      <span className="animate-eq-1 h-full w-[2.5px] rounded-full bg-[#c084fc]" />
                                      <span className="animate-eq-2 h-full w-[2.5px] rounded-full bg-[#c084fc]" />
                                      <span className="animate-eq-3 h-full w-[2.5px] rounded-full bg-[#c084fc]" />
                                    </div>
                                  </div>
                                )}
                              </div>

                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-1.5">
                                  <span
                                    className={`truncate text-[14px] font-medium leading-snug transition-colors ${
                                      isActive
                                        ? 'text-[#c084fc]'
                                        : 'text-[#f2f1ef] group-hover:text-white'
                                    }`}
                                  >
                                    {track.title}
                                  </span>
                                  {track.explicit && <ExplicitMark />}
                                </div>
                                <p className="mt-0.5 truncate text-[12.5px] text-[#8a8784]">
                                  {track.artist}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    ))}
              </EdgeRefractionScroller>
            </div>
          </div>

          {/* 2. New This Week — Live YouTube Music InnerTube Releases */}
          <AlbumReleaseSlide
            title="New This Week"
            albums={feed?.newThisWeek ?? []}
            loading={loading}
          />

          {/* 3. Recent Releases — Live Public Releases */}
          <AlbumReleaseSlide
            title="Recent Releases"
            albums={feed?.recentReleases ?? []}
            loading={loading}
          />
        </>
      )}
    </section>
  );
};
