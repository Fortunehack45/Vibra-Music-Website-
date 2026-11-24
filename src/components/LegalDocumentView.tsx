import React, { useEffect } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { VIBRA_LINKS, type LegalDocType } from '../data/legalContent';
import { getLegalDocument, getPathForLegalDoc } from '../utils/legalRoutes';
import { Footer } from './Footer';

interface LegalDocumentViewProps {
  docType: LegalDocType;
  logoSrc: string;
  onSwitchDoc: (doc: LegalDocType) => void;
  onBack: () => void;
}

const DOC_NAV_ITEMS: { type: LegalDocType; label: string }[] = [
  { type: 'privacy', label: 'Privacy' },
  { type: 'terms', label: 'Terms' },
  { type: 'security', label: 'Security' },
  { type: 'license', label: 'License' },
];

const UPSTREAM_SOURCE_MAP: Record<LegalDocType, { label: string; url: string }> = {
  privacy: { label: 'Inspect Repository on GitHub', url: VIBRA_LINKS.github },
  terms: { label: 'Inspect Repository on GitHub', url: VIBRA_LINKS.github },
  security: { label: 'View SECURITY.md on GitHub', url: VIBRA_LINKS.securitySource },
  license: { label: 'View Verbatim LICENSE on GitHub', url: VIBRA_LINKS.licenseSource },
};

export const LegalDocumentView: React.FC<LegalDocumentViewProps> = ({
  docType,
  logoSrc,
  onSwitchDoc,
  onBack,
}) => {
  const doc = getLegalDocument(docType);
  const currentIndex = DOC_NAV_ITEMS.findIndex((item) => item.type === docType);
  const nextDocItem = DOC_NAV_ITEMS[(currentIndex + 1) % DOC_NAV_ITEMS.length];
  const nextDocFull = getLegalDocument(nextDocItem.type);
  const upstreamRef = UPSTREAM_SOURCE_MAP[docType];

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [docType]);

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, target: LegalDocType) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return;
    }
    event.preventDefault();
    onSwitchDoc(target);
  };

  const handleBackClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return;
    }
    event.preventDefault();
    onBack();
  };

  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-[#080707] text-[#f2f1ef]">
      {/* Official Standalone Page Top Navigation Bar */}
      <header className="sticky top-0 z-30 border-b border-white/[0.07] bg-[#080707]/92 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[1160px] items-center justify-between gap-3 px-4 sm:px-8 lg:px-12">
          <a
            href="/"
            onClick={handleBackClick}
            className="inline-flex min-h-[40px] items-center gap-2 text-[13px] text-[#b5b2af] transition-colors hover:text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a855f7]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <img src={logoSrc} alt="" aria-hidden="true" className="h-3.5 w-3.5 opacity-85" />
            <span>Vibra Music</span>
          </a>

          {/* Standalone Page Switcher (Privacy / Terms / Security / License) */}
          <nav
            aria-label="Official legal and policy pages"
            className="no-scrollbar flex items-center gap-1 overflow-x-auto rounded-lg border border-white/[0.08] bg-[#121111] p-1"
          >
            {DOC_NAV_ITEMS.map((item) => {
              const isCurrent = item.type === docType;
              return (
                <a
                  key={item.type}
                  href={getPathForLegalDoc(item.type)}
                  aria-current={isCurrent ? 'page' : undefined}
                  onClick={(e) => handleNavClick(e, item.type)}
                  className={`rounded-md px-2.5 py-1.5 text-[12px] font-medium transition-colors whitespace-nowrap shrink-0 sm:px-3 ${
                    isCurrent
                      ? 'bg-white/[0.11] text-white'
                      : 'text-[#8a8784] hover:text-[#d8d6d4]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1160px] flex-1 px-5 pt-10 pb-20 sm:px-8 sm:pt-14 lg:px-12 lg:pt-16">
        {/* Breadcrumb + Document Header */}
        <div className="border-b border-white/[0.08] pb-8 sm:pb-10">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[12px] text-[#7c7977]">
            <span>Vibra Music Official</span>
            <span aria-hidden="true">/</span>
            <span>{doc.version}</span>
            <span aria-hidden="true">·</span>
            <span>Effective {doc.effectiveDate}</span>
          </div>
          <h1 className="font-display mt-3 text-[34px] font-normal leading-[1.08] tracking-[-0.03em] text-[#f4f3f1] sm:text-[46px]">
            {doc.title}
          </h1>
          <p className="mt-2.5 text-[15px] text-[#9c9996] sm:text-[17px]">{doc.subtitle}</p>
          <p className="mt-6 max-w-[70ch] text-[14.5px] leading-[1.7] text-[#cfcdca] sm:text-[15px]">
            {doc.summary}
          </p>
        </div>

        {/* Two-Column Editorial Reading Layout (Desktop) / Clean Stack (Mobile) */}
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Table of Contents Sidebar */}
          <aside aria-label="Document sections" className="lg:col-span-3">
            <div className="lg:sticky lg:top-24">
              <p className="text-[11.5px] font-medium text-[#6f6d6b]">On this page</p>
              <nav className="mt-3 flex flex-col gap-1">
                {doc.sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="group flex items-baseline gap-2.5 py-1.5 text-[12.5px] leading-snug text-[#8c8986] transition-colors hover:text-white"
                  >
                    <span className="tabular-nums text-[11px] text-[#5e5c5a] group-hover:text-[#c084fc]">
                      {section.number}
                    </span>
                    <span>{section.heading}</span>
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Legal Prose */}
          <article className="space-y-10 lg:col-span-9">
            {doc.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-20 border-b border-white/[0.06] pb-9 last:border-b-0"
              >
                <div className="flex items-baseline gap-3">
                  <span className="tabular-nums text-[12px] text-[#787573]">{section.number}.</span>
                  <h2 className="font-display text-[20px] font-medium leading-snug tracking-[-0.015em] text-[#f2f1ef] sm:text-[22px]">
                    {section.heading}
                  </h2>
                </div>

                <div className="mt-4 max-w-[68ch] space-y-4 text-[14.5px] leading-[1.72] text-[#c7c5c2] sm:text-[15px]">
                  {section.paragraphs.map((paragraph, idx) => (
                    <p key={idx} className="break-words">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {section.bullets && section.bullets.length > 0 && (
                  <ul className="mt-5 max-w-[68ch] space-y-4 border-t border-white/[0.05] pt-5">
                    {section.bullets.map((item) => (
                      <li
                        key={item.label}
                        className="text-[14px] leading-[1.68] text-[#bcb9b6] sm:text-[14.5px]"
                      >
                        <span className="font-medium text-[#efeeec]">{item.label}: </span>
                        <span className="break-words">{item.detail}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {/* Next Document & Upstream Reference Bar */}
            <div className="flex flex-col gap-4 border-t border-white/[0.08] pt-8 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px]">
                <a
                  href={getPathForLegalDoc(nextDocItem.type)}
                  onClick={(e) => handleNavClick(e, nextDocItem.type)}
                  className="inline-flex min-h-[40px] items-center py-1 font-medium text-[#c084fc] transition-colors hover:text-[#d8b4fe]"
                >
                  Next: {nextDocFull.title} →
                </a>
                <a
                  href={upstreamRef.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[40px] items-center gap-1 py-1 text-[#9c9996] transition-colors hover:text-white"
                >
                  <span>{upstreamRef.label}</span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>

              <a
                href="/"
                onClick={handleBackClick}
                className="inline-flex min-h-[42px] items-center justify-center rounded-lg border border-white/12 bg-white/[0.04] px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-white/[0.08]"
              >
                Back to Official Home
              </a>
            </div>
          </article>
        </div>
      </main>

      {/* Complete Standalone Official Page Footer */}
      <Footer logoSrc={logoSrc} onOpenLegal={onSwitchDoc} onGoHome={onBack} />
    </div>
  );
};
