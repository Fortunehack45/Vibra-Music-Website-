import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { AppScreensShowcase } from './components/AppScreensShowcase';
import { DownloadSection } from './components/DownloadSection';
import { EcosystemMarquee } from './components/EcosystemMarquee';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { FourDotBadge } from './components/FourDotBadge';
import { LegalDocumentView } from './components/LegalDocumentView';
import { NebulaHomePhone, type HeroHighlightKey } from './components/NebulaHomePhone';
import { VibraDiscoveryShelves } from './components/VibraDiscoveryShelves';
import type { LegalDocType } from './data/legalContent';
import {
  getPathForLegalDoc,
  getSeoMetadataForRoute,
  parseLegalRoute,
} from './utils/legalRoutes';

const VIBRA_LOGO_SRC = '/assets/vibra/logo-transparent.svg';
const VIBRA_APP_ICON_SRC = '/assets/aistudio/Untitled_design_20261105_093330_0000_52b7f0b6.png';

const AMBIENT_HERO_GLOW: Record<Exclude<HeroHighlightKey, null> | 'default', string> = {
  default:
    'radial-gradient(620px circle at 68% 46%, rgba(139, 92, 246, 0.16) 0%, rgba(109, 40, 217, 0.08) 32%, rgba(59, 7, 100, 0.025) 56%, rgba(8, 7, 7, 0) 78%)',
  lossless:
    'radial-gradient(640px circle at 66% 36%, rgba(168, 85, 247, 0.21) 0%, rgba(126, 34, 206, 0.1) 34%, rgba(59, 7, 100, 0.03) 58%, rgba(8, 7, 7, 0) 78%)',
  mix: 'radial-gradient(640px circle at 68% 48%, rgba(192, 132, 252, 0.19) 0%, rgba(139, 92, 246, 0.09) 34%, rgba(59, 7, 100, 0.03) 58%, rgba(8, 7, 7, 0) 78%)',
  glass:
    'radial-gradient(640px circle at 70% 56%, rgba(147, 51, 234, 0.2) 0%, rgba(107, 33, 168, 0.09) 36%, rgba(46, 16, 101, 0.03) 58%, rgba(8, 7, 7, 0) 78%)',
};

const MOBILE_AMBIENT_GLOW =
  'radial-gradient(420px circle at 52% 62%, rgba(139, 92, 246, 0.17) 0%, rgba(109, 40, 217, 0.08) 34%, rgba(59, 7, 100, 0.025) 58%, rgba(8, 7, 7, 0) 78%)';

const RIBBON_REPEAT_COUNT = 8;

interface LightboxScreen {
  src: string;
  title: string;
  caption: string;
}

function updateMetaTag(selector: string, attribute: string, value: string) {
  const el = document.querySelector(selector);
  if (el) {
    el.setAttribute(attribute, value);
  }
}

export default function App() {
  const [highlightedFeature, setHighlightedFeature] = useState<HeroHighlightKey>(null);
  const [lightboxScreen, setLightboxScreen] = useState<LightboxScreen | null>(null);
  const [activeLegalDoc, setActiveLegalDoc] = useState<LegalDocType | null>(() =>
    typeof window !== 'undefined'
      ? parseLegalRoute(window.location.pathname, window.location.hash)
      : null
  );

  const handleToggleHighlight = (feature: Exclude<HeroHighlightKey, null>) => {
    setHighlightedFeature((prev) => (prev === feature ? null : feature));
  };

  const handleOpenLegal = (doc: LegalDocType) => {
    setActiveLegalDoc(doc);
    window.history.pushState(null, '', getPathForLegalDoc(doc));
  };

  const handleCloseLegal = () => {
    setActiveLegalDoc(null);
    window.history.pushState(null, '', '/');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  // Keep standalone page routing synced with browser Back/Forward and hash links
  useEffect(() => {
    const syncFromLocation = () => {
      setActiveLegalDoc(parseLegalRoute(window.location.pathname, window.location.hash));
    };
    window.addEventListener('hashchange', syncFromLocation);
    window.addEventListener('popstate', syncFromLocation);
    return () => {
      window.removeEventListener('hashchange', syncFromLocation);
      window.removeEventListener('popstate', syncFromLocation);
    };
  }, []);

  // Keep SEO title, meta description, canonical URL, and absolute social preview image synced per page
  useEffect(() => {
    const seo = getSeoMetadataForRoute(activeLegalDoc);
    const origin = window.location.origin;
    const canonicalUrl = `${origin}${seo.canonicalPath}`;
    const absolutePreviewImg = `${origin}${VIBRA_APP_ICON_SRC}`;

    document.title = seo.title;
    updateMetaTag('meta[name="description"]', 'content', seo.description);
    updateMetaTag('meta[property="og:title"]', 'content', seo.title);
    updateMetaTag('meta[property="og:description"]', 'content', seo.description);
    updateMetaTag('meta[property="og:url"]', 'content', canonicalUrl);
    updateMetaTag('meta[property="og:image"]', 'content', absolutePreviewImg);
    updateMetaTag('meta[name="twitter:title"]', 'content', seo.title);
    updateMetaTag('meta[name="twitter:description"]', 'content', seo.description);
    updateMetaTag('meta[name="twitter:image"]', 'content', absolutePreviewImg);
    updateMetaTag('link[rel="canonical"]', 'href', canonicalUrl);
  }, [activeLegalDoc]);

  useEffect(() => {
    if (!lightboxScreen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLightboxScreen(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxScreen]);

  // Dedicated standalone page view for /privacy-policy, /terms-and-conditions, /security, /license
  if (activeLegalDoc) {
    return (
      <LegalDocumentView
        docType={activeLegalDoc}
        logoSrc={VIBRA_LOGO_SRC}
        onSwitchDoc={handleOpenLegal}
        onBack={handleCloseLegal}
      />
    );
  }

  const activeAmbientBackground = highlightedFeature
    ? AMBIENT_HERO_GLOW[highlightedFeature]
    : AMBIENT_HERO_GLOW.default;

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#080707] text-[#f2f1ef]">
      {/* Full-Bleed Unclipped Gentle Purple Atmospheric Wash Behind Hero (Desktop) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 hidden h-[1180px] transition-all duration-500 lg:block"
        style={{ background: activeAmbientBackground }}
      />

      {/* Full-Bleed Unclipped Gentle Purple Atmospheric Wash Behind Hero (Mobile & Tablet) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[1080px] lg:hidden"
        style={{ background: MOBILE_AMBIENT_GLOW }}
      />

      {/* Minimal Architectural Header — Pure Typography, Zero Pill Slop */}
      <header className="relative z-30 mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-5 py-5 sm:px-10 sm:py-7 lg:px-14">
        <a
          href="#top"
          className="inline-flex min-h-[40px] items-center gap-2 text-[13px] font-medium tracking-wide text-[#e8e6e3] transition-colors hover:text-white whitespace-nowrap shrink-0"
        >
          <img src={VIBRA_LOGO_SRC} alt="Vibra Music logo" className="h-4 w-4 opacity-90" />
          <span>Vibra Music</span>
        </a>

        <nav
          aria-label="Primary sections"
          className="hidden items-center gap-7 text-[12.5px] text-[#7c7977] md:flex"
        >
          <a href="#screens" className="transition-colors hover:text-white whitespace-nowrap">
            Screens
          </a>
          <a href="#discover" className="transition-colors hover:text-white whitespace-nowrap">
            Discover
          </a>
          <a href="#faq" className="transition-colors hover:text-white whitespace-nowrap">
            FAQ
          </a>
        </nav>

        <a
          href="#download"
          className="inline-flex min-h-[40px] items-center border-b border-transparent text-[12.5px] font-medium tracking-wide text-[#cfcdca] transition-colors hover:border-white/40 hover:text-white whitespace-nowrap shrink-0"
        >
          Get Vibra
        </a>
      </header>

      <main id="top" className="relative z-10">
        {/* SECTION 1: HERO — UI DESIGN & HOME SCREEN SHOWCASE */}
        <section
          aria-labelledby="hero-heading"
          className="relative mx-auto max-w-[1280px] px-5 pt-4 pb-12 sm:px-10 sm:pt-8 sm:pb-16 lg:px-14 lg:pt-12"
        >
          {/* Top 3-Column Typographic Row */}
          <div className="relative z-30 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-12 md:items-start">
            {/* Far Left Index Label */}
            <div className="md:col-span-2">
              <p className="text-[12px] font-normal text-[#5a5856]">v1.8 /</p>
              <p className="mt-1 text-[13px] font-normal text-[#d8d6d4]">Sound &amp; Glass</p>
            </div>

            {/* Center-Left Primary Display Headline */}
            <div className="md:col-span-5">
              <h1
                id="hero-heading"
                className="font-display text-[36px] font-normal leading-[1.06] tracking-[-0.03em] sm:text-[52px] lg:text-[60px]"
              >
                <span className="block text-[#f4f3f1]">Boring</span>
                <span className="block text-[#f4f3f1]">music apps?</span>
                <span className="block text-[#787573]">Not with</span>
                <span className="block text-[#787573]">Vibra!</span>
              </h1>
            </div>

            {/* Right Editorial Subheadline */}
            <div className="md:col-span-5 md:pl-8 lg:pl-14">
              <p className="font-display text-[20px] font-normal leading-[1.22] tracking-[-0.02em] sm:text-[26px] lg:text-[30px]">
                <span className="block text-[#efeeec]">Skip the flat players.</span>
                <span className="block text-[#787573]">Step into frosted glass,</span>
                <span className="block text-[#787573]">lossless sound &amp; Mix.</span>
              </p>
            </div>
          </div>

          {/* Main Hero Composition: Floating Live Duo + Listen Now Annotation + Hand Holding Phone */}
          <div className="relative mt-8 grid grid-cols-1 items-center gap-8 sm:gap-10 lg:mt-[-48px] lg:grid-cols-12">
            {/* Left Column: Listen Now Annotation */}
            <div className="relative z-20 flex flex-col justify-end lg:col-span-5 lg:pt-20">
              {/* Listen Now / Annotation Block */}
              <div className="flex items-start gap-4 sm:gap-5 pl-0 lg:pl-14">
                <FourDotBadge className="mt-0.5" />
                <div className="max-w-[260px] sm:max-w-[238px]">
                  <p className="text-[12px] font-normal text-[#6f6d6b]">Listen Now /</p>
                  <p className="mt-2 text-[13px] sm:text-[12.5px] leading-[1.55] text-[#d9d7d5]">
                    Frosted-glass Material 3 home screen with personalized YouTube Music picks,
                    local library sync, Hi-Res FLAC audio, and DJ-style DSP Mix transitions.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Rim-Lit Hand Holding Tilted Smartphone */}
            <div className="relative z-10 lg:col-span-7 lg:-mr-6">
              <NebulaHomePhone highlightedFeature={highlightedFeature} />
            </div>
          </div>

          {/* Bottom-Left Feature Breadcrumb Strip */}
          <div className="relative z-20 mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11.5px] text-[#6a6866] lg:mt-[-14px]">
            <button
              type="button"
              onClick={() => handleToggleHighlight('lossless')}
              aria-pressed={highlightedFeature === 'lossless'}
              className={`min-h-[36px] py-1 whitespace-nowrap transition-colors hover:text-[#d8d6d4] ${
                highlightedFeature === 'lossless' ? 'text-[#c084fc]' : ''
              }`}
            >
              Hi-Res Lossless Audio
            </button>
            <span aria-hidden="true" className="text-[#4a4847]">
              /
            </span>
            <button
              type="button"
              onClick={() => handleToggleHighlight('mix')}
              aria-pressed={highlightedFeature === 'mix'}
              className={`min-h-[36px] py-1 whitespace-nowrap transition-colors hover:text-[#d8d6d4] ${
                highlightedFeature === 'mix' ? 'text-[#c084fc]' : ''
              }`}
            >
              DSP Mix Transitions
            </button>
            <span aria-hidden="true" className="text-[#4a4847]">
              /
            </span>
            <button
              type="button"
              onClick={() => handleToggleHighlight('glass')}
              aria-pressed={highlightedFeature === 'glass'}
              className={`min-h-[36px] py-1 whitespace-nowrap transition-colors hover:text-[#d8d6d4] ${
                highlightedFeature === 'glass' ? 'text-[#c084fc]' : ''
              }`}
            >
              Frosted-Glass UI
            </button>
          </div>
        </section>

        {/* SECTION 2: ECOSYSTEM INTEGRATIONS INFINITE MARQUEE (RIGHT AFTER HERO) */}
        <EcosystemMarquee />

        {/* SECTION 3: EDITORIAL STATEMENT */}
        <section
          aria-labelledby="statement-heading"
          className="relative mx-auto max-w-[1280px] px-5 pt-16 pb-10 sm:px-10 sm:pt-24 sm:pb-16 lg:px-14 lg:pt-28 lg:pb-20"
        >
          <div className="lg:pl-[16.6%]">
            <h2
              id="statement-heading"
              className="font-display max-w-[540px] text-[30px] font-normal leading-[1.12] tracking-[-0.025em] sm:text-[44px] lg:text-[50px]"
            >
              <span className="block text-[#f0efed]">Music should look</span>
              <span className="block text-[#c8c6c4]">and sound as good</span>
              <span className="block text-[#807e7c]">as it feels. Lossless,</span>
              <span className="block text-[#636160]">synced, and open.</span>
            </h2>
          </div>
        </section>

        {/* SECTION 4: DUAL FLAGSHIP PHONES (NOKIA & MICHAEL JACKSON) + CURATED 4-SCREEN GALLERY WITH EDGE REFRACTION */}
        <AppScreensShowcase onInspectScreen={setLightboxScreen} />

        {/* SECTION 5: REAL LIVE YOUTUBE MUSIC & PUBLIC CHART SHELVES WITH EDGE REFRACTION */}
        <VibraDiscoveryShelves />

        {/* SECTION 6: EDITORIAL DOWNLOAD SECTION (SIGNED APK v1.8.186) */}
        <DownloadSection
          appIconSrc={VIBRA_APP_ICON_SRC}
          onOpenSecurity={() => handleOpenLegal('security')}
          onOpenLicense={() => handleOpenLegal('license')}
        />

        {/* SECTION 7: FREQUENTLY ASKED QUESTIONS */}
        <FaqSection />

        {/* RELOCATED KINETIC "VIBRA" INFINITE WORDMARK RIBBON — MONUMENTAL CLOSING SIGNATURE ABOVE FOOTER */}
        <div
          aria-hidden="true"
          className="pointer-events-none relative w-full overflow-hidden py-8 select-none sm:py-12"
        >
          <div className="animate-vibra-ribbon font-display text-[64px] font-normal leading-none tracking-[-0.03em] text-white/[0.065] sm:text-[96px] lg:text-[118px]">
            {[0, 1].map((trackCopy) => (
              <div key={trackCopy} className="flex shrink-0 items-center whitespace-nowrap">
                {Array.from({ length: RIBBON_REPEAT_COUNT }).map((_, idx) => (
                  <span key={`${trackCopy}-${idx}`} className="pr-10 sm:pr-16">
                    Vibra
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Official Editorial Footer with Standalone Legal, Security & License Page Links */}
      <Footer logoSrc={VIBRA_LOGO_SRC} onOpenLegal={handleOpenLegal} />

      {/* Clean Lightbox Viewer When User Clicks Any Showcase Phone */}
      {lightboxScreen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightboxScreen.title}
          onClick={() => setLightboxScreen(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-6 backdrop-blur-md"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[92vh] w-full max-w-md flex-col items-center rounded-3xl border border-white/10 bg-[#121111] p-4 sm:p-5 shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setLightboxScreen(null)}
              aria-label="Close screen preview"
              className="absolute right-3.5 top-3.5 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white/85 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="h-[62vh] max-h-[580px] overflow-hidden rounded-[26px] border border-white/10 bg-black">
              <img
                src={lightboxScreen.src}
                alt={lightboxScreen.title}
                referrerPolicy="no-referrer"
                className="h-full w-auto object-contain"
              />
            </div>
            <div className="mt-4 px-2 text-center">
              <p className="font-display text-sm font-medium text-white">{lightboxScreen.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-[#9a9693]">
                {lightboxScreen.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
