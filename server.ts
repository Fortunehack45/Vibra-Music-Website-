import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  parseDeezerChartAlbums,
  parseDeezerChartTracks,
  parseYouTubeMusicAlbums,
  type LiveMusicAlbum,
  type LiveMusicDiscoverPayload,
} from './src/utils/musicFeedParser.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);
const CACHE_TTL_MS = 10 * 60 * 1000; // 10-minute server cache

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

const discoverCacheMap = new Map<string, CacheEntry<LiveMusicDiscoverPayload>>();

const DEEZER_COUNTRY_IDS: Record<string, number> = {
  US: 2,
  GB: 13,
  FR: 7,
  DE: 8,
  CA: 24,
  BR: 20,
  MX: 27,
  ES: 9,
  IT: 10,
  AU: 23,
  NL: 14,
  SE: 16,
  NG: 0,
  ZA: 0,
  JP: 0,
};

async function fetchInnerTubeBrowse(browseId: string, gl = 'US'): Promise<unknown> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 7000);
  try {
    const response = await fetch('https://music.youtube.com/youtubei/v1/browse?prettyPrint=false', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        Origin: 'https://music.youtube.com',
        Referer: 'https://music.youtube.com/',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
      },
      body: JSON.stringify({
        context: {
          client: {
            clientName: 'WEB_REMIX',
            clientVersion: '1.20250101.01.00',
            hl: 'en',
            gl,
          },
        },
        browseId,
      }),
    });
    if (!response.ok) {
      throw new Error(`InnerTube ${browseId} HTTP ${response.status}`);
    }
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

async function fetchJsonWithTimeout(url: string): Promise<unknown> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 7000);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        'User-Agent': 'VibraMusicWebsite/1.8',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} for ${url}`);
    }
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

function parseCountryFromHeader(raw?: string | string[]): string | null {
  if (!raw) return null;
  const str = Array.isArray(raw) ? raw[0] : raw;
  const match = str.match(/[-_]([a-zA-Z]{2})\b/);
  return match ? match[1].toUpperCase() : null;
}

async function loadLiveDiscoverFeed(country = 'US'): Promise<LiveMusicDiscoverPayload> {
  const normCountry = (country || 'US').toUpperCase().slice(0, 2);
  const now = Date.now();
  const cached = discoverCacheMap.get(normCountry);
  if (cached && cached.expiresAt > now) {
    return cached.data;
  }

  const deezerChartId = DEEZER_COUNTRY_IDS[normCountry] ?? 0;

  const [ytmNewReleasesRes, ytmExploreRes, deezerTracksRes, deezerAlbumsRes] =
    await Promise.allSettled([
      fetchInnerTubeBrowse('FEmusic_new_releases', normCountry),
      fetchInnerTubeBrowse('FEmusic_explore', normCountry),
      fetchJsonWithTimeout(`https://api.deezer.com/chart/${deezerChartId}/tracks?limit=20`),
      fetchJsonWithTimeout(`https://api.deezer.com/chart/${deezerChartId}/albums?limit=12`),
    ]);

  const sources: string[] = [];

  const ytmNewAlbums =
    ytmNewReleasesRes.status === 'fulfilled'
      ? parseYouTubeMusicAlbums(ytmNewReleasesRes.value)
      : [];
  const ytmExploreAlbums =
    ytmExploreRes.status === 'fulfilled' ? parseYouTubeMusicAlbums(ytmExploreRes.value) : [];

  if (ytmNewAlbums.length > 0 || ytmExploreAlbums.length > 0) {
    sources.push('YouTube Music InnerTube');
  }

  const deezerTracksRaw =
    deezerTracksRes.status === 'fulfilled'
      ? ((deezerTracksRes.value as { data?: unknown[] })?.data ?? [])
      : [];
  const bestNewSongs = parseDeezerChartTracks(deezerTracksRaw as never).slice(0, 16);

  const deezerAlbumsRaw =
    deezerAlbumsRes.status === 'fulfilled'
      ? ((deezerAlbumsRes.value as { data?: unknown[] })?.data ?? [])
      : [];
  const deezerAlbums = parseDeezerChartAlbums(deezerAlbumsRaw as never);

  if (bestNewSongs.length > 0 || deezerAlbums.length > 0) {
    sources.push('Deezer Public Charts');
  }

  // Merge YouTube Music InnerTube albums cleanly without duplicates
  const mergedYtmAlbums: LiveMusicAlbum[] = [];
  const seenAlbumKeys = new Set<string>();
  for (const album of [...ytmNewAlbums, ...ytmExploreAlbums]) {
    const key = `${album.title.toLowerCase()}::${album.artist.toLowerCase()}`;
    if (seenAlbumKeys.has(key)) continue;
    seenAlbumKeys.add(key);
    mergedYtmAlbums.push(album);
  }

  // New This Week: prioritize fresh YouTube Music InnerTube releases, then blend Deezer chart albums
  const newThisWeek: LiveMusicAlbum[] = [...mergedYtmAlbums.slice(0, 10)];
  if (newThisWeek.length < 8) {
    for (const album of deezerAlbums) {
      if (newThisWeek.length >= 10) break;
      const key = `${album.title.toLowerCase()}::${album.artist.toLowerCase()}`;
      if (!seenAlbumKeys.has(key)) {
        seenAlbumKeys.add(key);
        newThisWeek.push(album);
      }
    }
  }

  // Recent Releases: combine mainstream chart albums + remaining YouTube Music InnerTube releases
  const recentReleases: LiveMusicAlbum[] = [];
  const usedInRecent = new Set<string>(
    newThisWeek.map((a) => `${a.title.toLowerCase()}::${a.artist.toLowerCase()}`)
  );

  for (const album of [...deezerAlbums, ...mergedYtmAlbums.slice(10)]) {
    if (recentReleases.length >= 10) break;
    const key = `${album.title.toLowerCase()}::${album.artist.toLowerCase()}`;
    if (usedInRecent.has(key)) continue;
    usedInRecent.add(key);
    recentReleases.push(album);
  }

  const payload: LiveMusicDiscoverPayload = {
    bestNewSongs,
    newThisWeek,
    recentReleases,
    fetchedAt: new Date().toISOString(),
    sources,
    country: normCountry,
  };

  if (bestNewSongs.length > 0 || newThisWeek.length > 0 || recentReleases.length > 0) {
    discoverCacheMap.set(normCountry, { data: payload, expiresAt: now + CACHE_TTL_MS });
  }

  return payload;
}

async function startServer() {
  const app = express();
  app.disable('x-powered-by');

  app.get('/api/music/discover', async (req, res) => {
    try {
      const queryCountry = typeof req.query.country === 'string' ? req.query.country : null;
      const headerCountry =
        (req.headers['cf-ipcountry'] as string) ||
        parseCountryFromHeader(req.headers['accept-language']);
      const country = (queryCountry || headerCountry || 'US').toUpperCase().slice(0, 2);

      const feed = await loadLiveDiscoverFeed(country);
      res.setHeader('Cache-Control', 'public, max-age=300');
      res.json(feed);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to reach live music APIs';
      res.status(502).json({ error: message });
    }
  });

  // Fast on-demand 30-second audio preview lookup so clicks stay strictly on the site
  app.get('/api/music/preview', async (req, res) => {
    const q =
      (typeof req.query.q === 'string' ? req.query.q : '') ||
      `${typeof req.query.title === 'string' ? req.query.title : ''} ${typeof req.query.artist === 'string' ? req.query.artist : ''}`.trim();
    if (!q) {
      return res.status(400).json({ error: 'Missing query parameter q' });
    }
    try {
      const searchRes = (await fetchJsonWithTimeout(
        `https://api.deezer.com/search?q=${encodeURIComponent(q)}&limit=1`
      )) as {
        data?: Array<{
          preview?: string;
          title?: string;
          artist?: { name?: string };
          album?: { cover_big?: string };
        }>;
      };
      const item = searchRes?.data?.[0];
      if (item?.preview) {
        return res.json({
          previewUrl: item.preview,
          title: item.title,
          artist: item.artist?.name,
          artwork: item.album?.cover_big,
        });
      }
      return res.status(404).json({ error: 'No preview available' });
    } catch {
      return res.status(502).json({ error: 'Preview search failed' });
    }
  });

  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir, { index: false }));
    app.get('*', (_req, res) => {
      const indexPath = path.join(distDir, 'index.html');
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).send('Build not found');
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Vibra Music server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
