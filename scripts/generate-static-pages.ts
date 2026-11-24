import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { LEGAL_DOCUMENTS, type LegalDocType, VIBRA_LINKS } from '../src/data/legalContent';
import { getPathForLegalDoc, getSeoMetadataForRoute } from '../src/utils/legalRoutes';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.resolve(rootDir, 'public');

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderLegalHtml(docType: LegalDocType, canonicalUrl: string): string {
  const doc = LEGAL_DOCUMENTS[docType];
  const seo = getSeoMetadataForRoute(docType);

  const sectionsHtml = doc.sections
    .map((section) => {
      const paragraphsHtml = section.paragraphs
        .map((p) => `<p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.72; color: #c7c5c2;">${escapeHtml(p)}</p>`)
        .join('');

      const bulletsHtml =
        section.bullets && section.bullets.length > 0
          ? `<ul style="margin: 20px 0 0 0; padding: 20px 0 0 0; list-style: none; border-top: 1px solid rgba(255,255,255,0.06);">
              ${section.bullets
                .map(
                  (b) =>
                    `<li style="margin-bottom: 16px; font-size: 14.5px; line-height: 1.68; color: #bcb9b6;">
                      <strong style="color: #efeeec; font-weight: 600;">${escapeHtml(b.label)}:</strong> ${escapeHtml(b.detail)}
                    </li>`
                )
                .join('')}
            </ul>`
          : '';

      return `
        <section id="${escapeHtml(section.id)}" style="padding-bottom: 36px; margin-bottom: 36px; border-bottom: 1px solid rgba(255,255,255,0.06);">
          <div style="display: flex; align-items: baseline; gap: 12px; margin-bottom: 16px;">
            <span style="font-size: 13px; color: #787573; font-variant-numeric: tabular-nums;">${escapeHtml(section.number)}.</span>
            <h2 style="margin: 0; font-size: 22px; font-weight: 500; color: #f2f1ef; letter-spacing: -0.015em;">${escapeHtml(section.heading)}</h2>
          </div>
          ${paragraphsHtml}
          ${bulletsHtml}
        </section>
      `;
    })
    .join('');

  const tocHtml = doc.sections
    .map(
      (section) => `
        <a href="#${escapeHtml(section.id)}" style="display: flex; align-items: baseline; gap: 10px; padding: 6px 0; font-size: 12.5px; color: #8c8986; text-decoration: none; transition: color 0.2s;">
          <span style="font-size: 11px; color: #5e5c5a; font-variant-numeric: tabular-nums;">${escapeHtml(section.number)}</span>
          <span>${escapeHtml(section.heading)}</span>
        </a>
      `
    )
    .join('');

  return `<!doctype html>
<html lang="en" class="dark" style="background-color: #080707; color: #f2f1ef;">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(seo.title)}</title>
    <meta name="description" content="${escapeHtml(seo.description)}" />
    <link rel="canonical" href="${escapeHtml(canonicalUrl)}" />
    <meta name="theme-color" content="#080707" />
    <meta name="robots" content="index, follow" />
    <link rel="icon" type="image/png" href="/assets/aistudio/Untitled_design_20261105_093330_0000_52b7f0b6.png" />
    <link rel="apple-touch-icon" href="/assets/aistudio/Untitled_design_20261105_093330_0000_52b7f0b6.png" />

    <!-- OpenGraph Tags -->
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="Vibra Music" />
    <meta property="og:title" content="${escapeHtml(seo.title)}" />
    <meta property="og:description" content="${escapeHtml(seo.description)}" />
    <meta property="og:url" content="${escapeHtml(canonicalUrl)}" />
    <meta property="og:image" content="https://vibramusic.store/assets/aistudio/Untitled_design_20261105_093330_0000_52b7f0b6.png" />

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

    <style>
      * { box-sizing: border-box; }
      body {
        margin: 0;
        padding: 0;
        background-color: #080707;
        color: #f2f1ef;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        -webkit-font-smoothing: antialiased;
      }
      a { color: inherit; }
      .container { max-width: 1160px; margin: 0 auto; padding: 0 20px; }
      @media (min-width: 640px) { .container { padding: 0 32px; } }
      @media (min-width: 1024px) {
        .layout-grid { display: grid; grid-template-columns: 280px 1fr; gap: 48px; }
        .toc-aside { position: sticky; top: 96px; height: fit-content; }
      }
    </style>
  </head>
  <body>
    <!-- Top Sticky Header -->
    <header style="position: sticky; top: 0; z-index: 30; border-bottom: 1px solid rgba(255,255,255,0.07); background-color: rgba(8,7,7,0.92); backdrop-filter: blur(12px);">
      <div class="container" style="display: flex; height: 56px; align-items: center; justify-content: space-between;">
        <a href="/" style="display: inline-flex; align-items: center; gap: 8px; font-size: 13px; color: #b5b2af; text-decoration: none;">
          <svg style="width: 16px; height: 16px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <img src="/assets/aistudio/Untitled_design_20261105_093330_0000_52b7f0b6.png" alt="" style="width: 14px; height: 14px; opacity: 0.85;" />
          <span>Vibra Music</span>
        </a>
        <a href="/" style="font-size: 12px; color: #8c8986; text-decoration: none;">Official Home</a>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container" style="padding-top: 40px; padding-bottom: 80px;">
      <!-- Title & Summary Header -->
      <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 32px; margin-bottom: 40px;">
        <div style="display: flex; flex-wrap: wrap; gap: 8px; font-size: 12px; color: #7c7977; margin-bottom: 12px;">
          <span>Vibra Music Official</span>
          <span>/</span>
          <span>${escapeHtml(doc.version)}</span>
          <span>·</span>
          <span>Effective ${escapeHtml(doc.effectiveDate)}</span>
        </div>
        <h1 style="margin: 0; font-size: 38px; font-weight: 400; font-family: 'Instrument Serif', Georgia, serif; letter-spacing: -0.02em; color: #f4f3f1; line-height: 1.1;">
          ${escapeHtml(doc.title)}
        </h1>
        <p style="margin: 10px 0 0 0; font-size: 16px; color: #9c9996;">
          ${escapeHtml(doc.subtitle)}
        </p>
        <p style="margin: 24px 0 0 0; max-width: 720px; font-size: 15px; line-height: 1.7; color: #cfcdca;">
          ${escapeHtml(doc.summary)}
        </p>
      </div>

      <!-- Layout Grid -->
      <div class="layout-grid">
        <!-- Sidebar Navigation -->
        <aside class="toc-aside" style="margin-bottom: 40px;">
          <p style="margin: 0 0 12px 0; font-size: 11.5px; font-weight: 600; color: #6f6d6b; text-transform: uppercase; letter-spacing: 0.05em;">On this page</p>
          <nav style="display: flex; flex-direction: column;">
            ${tocHtml}
          </nav>
        </aside>

        <!-- Main Articles -->
        <article>
          ${sectionsHtml}

          <div style="margin-top: 48px; padding-top: 32px; border-top: 1px solid rgba(255,255,255,0.08); display: flex; flex-wrap: wrap; gap: 16px; align-items: center; justify-content: space-between;">
            <a href="${escapeHtml(VIBRA_LINKS.github)}" target="_blank" rel="noopener noreferrer" style="font-size: 13px; color: #9c9996; text-decoration: none;">
              Inspect Repository on GitHub &rarr;
            </a>
            <a href="/" style="display: inline-flex; align-items: center; justify-content: center; border-radius: 8px; border: 1px solid rgba(255,255,255,0.12); background-color: rgba(255,255,255,0.04); padding: 8px 16px; font-size: 13px; font-weight: 500; color: #fff; text-decoration: none;">
              Back to Official Home
            </a>
          </div>
        </article>
      </div>
    </main>

    <!-- Footer -->
    <footer style="border-top: 1px solid rgba(255,255,255,0.07); padding: 40px 0; background-color: #060505;">
      <div class="container" style="display: flex; flex-wrap: wrap; justify-content: space-between; gap: 20px; font-size: 12px; color: #73706e;">
        <div>
          <p style="margin: 0 0 4px 0; color: #efeeec; font-weight: 500;">Vibra Music &copy; <span id="copyright-year">2026</span></p>
          <p style="margin: 0;">Open-Source Android Audio Client &middot; GNU General Public License v3.0</p>
        </div>
        <div style="display: flex; gap: 16px;">
          <a href="/privacy-policy" style="text-decoration: none; color: #a3a09d;">Privacy</a>
          <a href="/terms-and-conditions" style="text-decoration: none; color: #a3a09d;">Terms</a>
          <a href="/security" style="text-decoration: none; color: #a3a09d;">Security</a>
          <a href="/license" style="text-decoration: none; color: #a3a09d;">License</a>
        </div>
      </div>
    </footer>

    <!-- Dynamic Visitor-Local Year Sync -->
    <script>
      try {
        var el = document.getElementById('copyright-year');
        if (el) el.textContent = new Date().getFullYear();
      } catch (e) {}
    </script>

    <!-- Client-side React Hydration Fallback -->
    <div id="root" style="display:none;"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;
}

const targets: { docType: LegalDocType; routes: string[] }[] = [
  { docType: 'privacy', routes: ['privacy-policy', 'privacy'] },
  { docType: 'terms', routes: ['terms-and-conditions', 'terms'] },
  { docType: 'security', routes: ['security'] },
  { docType: 'license', routes: ['license'] },
];

for (const target of targets) {
  for (const route of target.routes) {
    const dir = path.resolve(publicDir, route);
    fs.mkdirSync(dir, { recursive: true });
    const filePath = path.resolve(dir, 'index.html');
    const canonicalUrl = `https://vibramusic.store/${route}`;
    const html = renderLegalHtml(target.docType, canonicalUrl);
    fs.writeFileSync(filePath, html, 'utf-8');
    console.log(`Generated: ${filePath}`);
  }
}
