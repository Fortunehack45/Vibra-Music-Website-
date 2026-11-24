import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { VIBRA_LINKS, type LegalDocType } from '../data/legalContent';
import { getPathForLegalDoc } from '../utils/legalRoutes';

interface FooterProps {
  logoSrc: string;
  onOpenLegal: (doc: LegalDocType) => void;
  onGoHome?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ logoSrc, onOpenLegal, onGoHome }) => {
  const handleLegalClick = (event: React.MouseEvent<HTMLAnchorElement>, doc: LegalDocType) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return;
    }
    event.preventDefault();
    onOpenLegal(doc);
  };

  const handleHomeClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!onGoHome) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return;
    }
    event.preventDefault();
    onGoHome();
  };

  return (
    <footer className="relative z-20 bg-[#080707]">
      <div className="mx-auto max-w-[1280px] px-5 pt-14 pb-10 sm:px-10 lg:px-14 lg:pt-18 lg:pb-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-5">
            <a
              href={onGoHome ? '/' : '#top'}
              onClick={handleHomeClick}
              className="inline-flex items-center gap-2.5 text-[14px] font-medium tracking-wide text-[#f2f1ef] transition-colors hover:text-white"
            >
              <img src={logoSrc} alt="Vibra Music logo" className="h-4.5 w-4.5 opacity-90" />
              <span>Vibra Music</span>
            </a>
            <p className="mt-3.5 max-w-[330px] text-[13px] leading-[1.6] text-[#8a8784]">
              The official open-source aesthetic music player and YouTube Music client for Android —
              Hi-Res lossless audio, on-device neural DSP Mix, word-synced lyrics, and frosted-glass
              Material 3 design.
            </p>
            <p className="mt-4 text-[11.5px] text-[#5e5c5a]">
              com.fortune.vibramusic · v1.8.186 · GNU GPLv3
            </p>
          </div>

          {/* Project Links */}
          <div className="lg:col-span-2">
            <h3 className="text-[12px] font-medium text-[#6f6d6b]">Project</h3>
            <ul className="mt-3.5 space-y-1 text-[13px] text-[#b8b5b2]">
              <li>
                <a
                  href={VIBRA_LINKS.latestRelease}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[38px] items-center gap-1 py-1 transition-colors hover:text-white"
                >
                  <span>Download APK</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-[#686563]" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={VIBRA_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[38px] items-center gap-1 py-1 transition-colors hover:text-white"
                >
                  <span>GitHub Source</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-[#686563]" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={VIBRA_LINKS.mixDocs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[38px] items-center gap-1 py-1 transition-colors hover:text-white"
                >
                  <span>DSP Mix Docs</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-[#686563]" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={VIBRA_LINKS.contributing}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[38px] items-center gap-1 py-1 transition-colors hover:text-white"
                >
                  <span>Contributing</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-[#686563]" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>

          {/* Community Links */}
          <div className="lg:col-span-2">
            <h3 className="text-[12px] font-medium text-[#6f6d6b]">Community</h3>
            <ul className="mt-3.5 space-y-1 text-[13px] text-[#b8b5b2]">
              <li>
                <a
                  href={VIBRA_LINKS.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[38px] items-center gap-1 py-1 transition-colors hover:text-white"
                >
                  <span>Telegram</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-[#686563]" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={VIBRA_LINKS.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[38px] items-center gap-1 py-1 transition-colors hover:text-white"
                >
                  <span>Developer (X)</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-[#686563]" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={VIBRA_LINKS.releases}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[38px] items-center gap-1 py-1 transition-colors hover:text-white"
                >
                  <span>All Releases</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-[#686563]" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={VIBRA_LINKS.checksums}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[38px] items-center gap-1 py-1 transition-colors hover:text-white"
                >
                  <span>SHA-256 Checksums</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-[#686563]" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>

          {/* Dedicated Standalone Legal, Security & Licensing Pages */}
          <div className="lg:col-span-3">
            <h3 className="text-[12px] font-medium text-[#6f6d6b]">Legal &amp; Trust</h3>
            <ul className="mt-3.5 space-y-1 text-[13px] text-[#b8b5b2]">
              <li>
                <a
                  href={getPathForLegalDoc('privacy')}
                  onClick={(e) => handleLegalClick(e, 'privacy')}
                  className="inline-flex min-h-[38px] items-center py-1 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a855f7]"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href={getPathForLegalDoc('terms')}
                  onClick={(e) => handleLegalClick(e, 'terms')}
                  className="inline-flex min-h-[38px] items-center py-1 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a855f7]"
                >
                  Terms &amp; Conditions
                </a>
              </li>
              <li>
                <a
                  href={getPathForLegalDoc('security')}
                  onClick={(e) => handleLegalClick(e, 'security')}
                  className="inline-flex min-h-[38px] items-center py-1 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a855f7]"
                >
                  Security Policy
                </a>
              </li>
              <li>
                <a
                  href={getPathForLegalDoc('license')}
                  onClick={(e) => handleLegalClick(e, 'license')}
                  className="inline-flex min-h-[38px] items-center py-1 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a855f7]"
                >
                  GNU GPLv3 License
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Hairline Bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/[0.06] pt-6 text-[12px] text-[#666462] sm:flex-row sm:items-center sm:justify-between">
          <p className="leading-relaxed">
            Not affiliated with Google LLC, YouTube Music, Spotify, Discord, Musixmatch, or Deezer.
          </p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 shrink-0">
            <a
              href={getPathForLegalDoc('privacy')}
              onClick={(e) => handleLegalClick(e, 'privacy')}
              className="min-h-[36px] py-1 text-[#8f8c89] transition-colors hover:text-white whitespace-nowrap"
            >
              Privacy
            </a>
            <span aria-hidden="true" className="text-[#454341]">
              ·
            </span>
            <a
              href={getPathForLegalDoc('terms')}
              onClick={(e) => handleLegalClick(e, 'terms')}
              className="min-h-[36px] py-1 text-[#8f8c89] transition-colors hover:text-white whitespace-nowrap"
            >
              Terms
            </a>
            <span aria-hidden="true" className="text-[#454341]">
              ·
            </span>
            <a
              href={getPathForLegalDoc('security')}
              onClick={(e) => handleLegalClick(e, 'security')}
              className="min-h-[36px] py-1 text-[#8f8c89] transition-colors hover:text-white whitespace-nowrap"
            >
              Security
            </a>
            <span aria-hidden="true" className="text-[#454341]">
              ·
            </span>
            <a
              href={getPathForLegalDoc('license')}
              onClick={(e) => handleLegalClick(e, 'license')}
              className="min-h-[36px] py-1 text-[#8f8c89] transition-colors hover:text-white whitespace-nowrap"
            >
              License
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
