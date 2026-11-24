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

let discoverCache: CacheEntry<LiveMusicDiscoverPayload> | null = null;

async function fetchInnerTubeBrowse(browseId: string): Promise<unknown> {
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
            gl: 'US',
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

async function loadLiveDiscoverFeed(): Promise<LiveMusicDiscoverPayload> {
  const now = Date.now();
  if (discoverCache && discoverCache.expiresAt > now) {
    return discoverCache.data;
  }

  const [ytmNewReleasesRes, ytmExploreRes, deezerTracksRes, deezerAlbumsRes] =
    await Promise.allSettled([
      fetchInnerTubeBrowse('FEmusic_new_releases'),
      fetchInnerTubeBrowse('FEmusic_explore'),
      fetchJsonWithTimeout('https://api.deezer.com/chart/0/tracks?limit=20'),
      fetchJsonWithTimeout('https://api.deezer.com/chart/0/albums?limit=12'),
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
  };

  if (bestNewSongs.length > 0 || newThisWeek.length > 0 || recentReleases.length > 0) {
    discoverCache = { data: payload, expiresAt: now + CACHE_TTL_MS };
  }

  return payload;
}

async function startServer() {
  const app = express();
  app.disable('x-powered-by');

  app.get('/api/music/discover', async (_req, res) => {
    try {
      const feed = await loadLiveDiscoverFeed();
      res.setHeader('Cache-Control', 'public, max-age=300');
      res.json(feed);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to reach live music APIs';
      res.status(502).json({ error: message });
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
