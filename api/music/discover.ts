import type { IncomingMessage, ServerResponse } from 'node:http';
import { loadLiveDiscoverFeed, parseCountryFromHeader } from '../../src/utils/musicBackend.ts';

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
    const queryCountry =
      (typeof req.query?.country === 'string'
        ? req.query.country
        : url.searchParams.get('country')) || null;
    const headerCountry =
      (req.headers['x-vercel-ip-country'] as string) ||
      (req.headers['cf-ipcountry'] as string) ||
      parseCountryFromHeader(req.headers['accept-language']);
    const country = (queryCountry || headerCountry || 'US').toUpperCase().slice(0, 2);

    const feed = await loadLiveDiscoverFeed(country);
    res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=600');
    if (typeof res.json === 'function') {
      res.json(feed);
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(feed));
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to load live music feeds';
    if (typeof res.status === 'function' && typeof res.json === 'function') {
      res.status(502).json({ error: message });
    } else {
      res.statusCode = 502;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: message }));
    }
  }
}
