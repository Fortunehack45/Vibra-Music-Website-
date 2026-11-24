import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  fetchMusicPreview,
  loadLiveDiscoverFeed,
  parseCountryFromHeader,
} from './src/utils/musicBackend.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);

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
      const result = await fetchMusicPreview(q);
      if (result) {
        return res.json(result);
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
