export interface LiveMusicTrack {
  id: string;
  title: string;
  artist: string;
  artwork: string;
  explicit: boolean;
  externalUrl: string;
  previewUrl?: string;
  source: 'YouTube Music' | 'Deezer';
}

export interface LiveMusicAlbum {
  id: string;
  title: string;
  artist: string;
  artwork: string;
  explicit: boolean;
  releaseType: string;
  externalUrl: string;
  source: 'YouTube Music' | 'Deezer';
}

export interface LiveMusicDiscoverPayload {
  bestNewSongs: LiveMusicTrack[];
  newThisWeek: LiveMusicAlbum[];
  recentReleases: LiveMusicAlbum[];
  fetchedAt: string;
  sources: string[];
  country?: string;
}

interface YtmRun {
  text?: string;
}

interface YtmThumbnail {
  url?: string;
  width?: number;
  height?: number;
}

interface YtmBadge {
  musicInlineBadgeRenderer?: {
    icon?: {
      iconType?: string;
    };
  };
}

interface YtmTwoRowRenderer {
  title?: { runs?: YtmRun[] };
  subtitle?: { runs?: YtmRun[] };
  subtitleBadges?: YtmBadge[];
  thumbnailRenderer?: {
    musicThumbnailRenderer?: {
      thumbnail?: { thumbnails?: YtmThumbnail[] };
    };
  };
  navigationEndpoint?: {
    browseEndpoint?: { browseId?: string };
    watchEndpoint?: { videoId?: string };
  };
}

interface YtmSectionContent {
  musicTwoRowItemRenderer?: YtmTwoRowRenderer;
}

interface YtmSection {
  musicCarouselShelfRenderer?: {
    header?: {
      musicCarouselShelfBasicHeaderRenderer?: {
        title?: { runs?: YtmRun[] };
      };
    };
    contents?: YtmSectionContent[];
  };
}

interface YtmBrowseResponse {
  contents?: {
    singleColumnBrowseResultsRenderer?: {
      tabs?: Array<{
        tabRenderer?: {
          content?: {
            sectionListRenderer?: {
              contents?: YtmSection[];
            };
          };
        };
      }>;
    };
  };
}

export interface DeezerChartTrack {
  id?: number | string;
  title?: string;
  title_short?: string;
  explicit_lyrics?: boolean;
  link?: string;
  preview?: string;
  artist?: { name?: string };
  album?: { cover_medium?: string; cover_big?: string; cover_xl?: string };
}

export interface DeezerChartAlbum {
  id?: number | string;
  title?: string;
  record_type?: string;
  explicit_lyrics?: boolean;
  link?: string;
  cover_big?: string;
  cover_xl?: string;
  artist?: { name?: string };
}

function joinRuns(runs?: YtmRun[]): string {
  if (!Array.isArray(runs)) return '';
  return runs
    .map((r) => r.text ?? '')
    .join('')
    .trim();
}

function pickBestThumbnail(thumbnails?: YtmThumbnail[]): string {
  if (!Array.isArray(thumbnails) || thumbnails.length === 0) return '';
  const best = thumbnails[thumbnails.length - 1]?.url ?? thumbnails[0]?.url ?? '';
  // Upgrade YouTube Music square thumbnail resolution cleanly if needed
  return best.replace(/=w\d+-h\d+-l\d+-rj$/, '=w544-h544-l90-rj');
}

function hasExplicitBadge(badges?: YtmBadge[]): boolean {
  if (!Array.isArray(badges)) return false;
  return badges.some(
    (b) => b.musicInlineBadgeRenderer?.icon?.iconType === 'MUSIC_EXPLICIT_BADGE'
  );
}

/**
 * Parses YouTube Music InnerTube browse responses (`FEmusic_new_releases` / `FEmusic_explore`)
 * into clean album release items matching Vibra Music's ShelfCard structure.
 */
export function parseYouTubeMusicAlbums(payload: unknown): LiveMusicAlbum[] {
  const data = payload as YtmBrowseResponse;
  const sections =
    data?.contents?.singleColumnBrowseResultsRenderer?.tabs?.[0]?.tabRenderer?.content
      ?.sectionListRenderer?.contents ?? [];

  const results: LiveMusicAlbum[] = [];
  const seen = new Set<string>();

  for (const section of sections) {
    const shelf = section.musicCarouselShelfRenderer;
    if (!shelf?.contents) continue;

    const headerTitle = joinRuns(
      shelf.header?.musicCarouselShelfBasicHeaderRenderer?.title?.runs
    ).toLowerCase();

    // Only accept real album/single release shelves (ignore moods/podcasts/videos)
    if (
      headerTitle &&
      !headerTitle.includes('album') &&
      !headerTitle.includes('single') &&
      !headerTitle.includes('release')
    ) {
      continue;
    }

    for (const entry of shelf.contents) {
      const renderer = entry.musicTwoRowItemRenderer;
      if (!renderer) continue;

      const title = joinRuns(renderer.title?.runs);
      const rawSubtitle = joinRuns(renderer.subtitle?.runs);
      const artwork = pickBestThumbnail(
        renderer.thumbnailRenderer?.musicThumbnailRenderer?.thumbnail?.thumbnails
      );
      const browseId = renderer.navigationEndpoint?.browseEndpoint?.browseId;
      const videoId = renderer.navigationEndpoint?.watchEndpoint?.videoId;

      if (!title || !artwork) continue;
      const dedupeKey = `${title.toLowerCase()}::${rawSubtitle.toLowerCase()}`;
      if (seen.has(dedupeKey)) continue;
      seen.add(dedupeKey);

      const subtitleParts = rawSubtitle.split('•').map((p) => p.trim()).filter(Boolean);
      const isTypedSubtitle =
        subtitleParts.length >= 2 && /^(album|single|ep)$/i.test(subtitleParts[0]);
      const releaseType = isTypedSubtitle ? subtitleParts[0] : 'Release';
      const artist = isTypedSubtitle
        ? subtitleParts.slice(1).join(' · ')
        : rawSubtitle || 'Various Artists';

      const externalUrl = browseId
        ? `https://music.youtube.com/browse/${encodeURIComponent(browseId)}`
        : videoId
          ? `https://music.youtube.com/watch?v=${encodeURIComponent(videoId)}`
          : 'https://music.youtube.com/explore';

      results.push({
        id: `ytm-${browseId ?? videoId ?? results.length}`,
        title,
        artist,
        artwork,
        explicit: hasExplicitBadge(renderer.subtitleBadges),
        releaseType,
        externalUrl,
        source: 'YouTube Music',
      });
    }
  }

  return results;
}

/**
 * Parses Deezer public chart tracks into real songs with playable 30-second MP3 previews.
 */
export function parseDeezerChartTracks(tracks: DeezerChartTrack[]): LiveMusicTrack[] {
  if (!Array.isArray(tracks)) return [];
  const results: LiveMusicTrack[] = [];
  const seen = new Set<string>();

  for (const t of tracks) {
    const title = (t.title_short || t.title || '').trim();
    const artist = (t.artist?.name || '').trim();
    const artwork = t.album?.cover_big || t.album?.cover_medium || t.album?.cover_xl || '';
    if (!title || !artist || !artwork) continue;

    const key = `${title.toLowerCase()}::${artist.toLowerCase()}`;
    if (seen.has(key)) continue;
    seen.add(key);

    results.push({
      id: `dz-track-${t.id ?? results.length}`,
      title,
      artist,
      artwork,
      explicit: Boolean(t.explicit_lyrics),
      externalUrl:
        t.link || `https://music.youtube.com/search?q=${encodeURIComponent(`${title} ${artist}`)}`,
      previewUrl: t.preview || undefined,
      source: 'Deezer',
    });
  }

  return results;
}

/**
 * Parses Deezer public chart albums for authentic mainstream releases.
 */
export function parseDeezerChartAlbums(albums: DeezerChartAlbum[]): LiveMusicAlbum[] {
  if (!Array.isArray(albums)) return [];
  const results: LiveMusicAlbum[] = [];
  const seen = new Set<string>();

  for (const a of albums) {
    const title = (a.title || '').trim();
    const artist = (a.artist?.name || '').trim();
    const artwork = a.cover_big || a.cover_xl || '';
    if (!title || !artist || !artwork) continue;

    const key = `${title.toLowerCase()}::${artist.toLowerCase()}`;
    if (seen.has(key)) continue;
    seen.add(key);

    const recordType = a.record_type
      ? a.record_type.charAt(0).toUpperCase() + a.record_type.slice(1)
      : 'Album';

    results.push({
      id: `dz-album-${a.id ?? results.length}`,
      title,
      artist,
      artwork,
      explicit: Boolean(a.explicit_lyrics),
      releaseType: recordType,
      externalUrl:
        a.link || `https://music.youtube.com/search?q=${encodeURIComponent(`${title} ${artist}`)}`,
      source: 'Deezer',
    });
  }

  return results;
}
