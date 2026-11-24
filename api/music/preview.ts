import type { IncomingMessage, ServerResponse } from 'node:http';
import { fetchMusicPreview } from '../../src/utils/musicBackend.ts';

interface VercelRequest extends IncomingMessage {
  query?: Record<string, string | string[] | undefined>;
  cookies?: Record<string, string>;
}

interface VercelResponse extends ServerResponse {
  status: (code: number) => VercelResponse;
  json: (body: unknown) => void;
  send: (body: unknown) => void;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const url = new URL(req.url || '/', 'http://localhost');
    const queryQ = typeof req.query?.q === 'string' ? req.query.q : url.searchParams.get('q');
    const queryTitle =
      typeof req.query?.title === 'string' ? req.query.title : url.searchParams.get('title') || '';
    const queryArtist =
      typeof req.query?.artist === 'string'
        ? req.query.artist
        : url.searchParams.get('artist') || '';

    const q = (queryQ || `${queryTitle} ${queryArtist}`).trim();
    if (!q) {
      if (typeof res.status === 'function' && typeof res.json === 'function') {
        return res.status(400).json({ error: 'Missing query parameter q' });
      }
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({ error: 'Missing query parameter q' }));
    }

    const preview = await fetchMusicPreview(q);
    if (preview) {
      res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=604800');
      if (typeof res.json === 'function') {
        return res.json(preview);
      }
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify(preview));
    }

    if (typeof res.status === 'function' && typeof res.json === 'function') {
      return res.status(404).json({ error: 'No preview available' });
    }
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ error: 'No preview available' }));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Preview lookup failed';
    if (typeof res.status === 'function' && typeof res.json === 'function') {
      return res.status(502).json({ error: message });
    }
    res.statusCode = 502;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ error: message }));
  }
}
