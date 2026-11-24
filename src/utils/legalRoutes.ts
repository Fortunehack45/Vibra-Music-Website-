import { LEGAL_DOCUMENTS, type LegalDocType, type LegalDocumentData } from '../data/legalContent';

export interface RouteSeoMetadata {
  title: string;
  description: string;
  canonicalPath: string;
}

const ROUTE_SEGMENTS: Record<LegalDocType, string> = {
  privacy: '/privacy-policy',
  terms: '/terms-and-conditions',
  security: '/security',
  license: '/license',
};

function normalizeToken(raw: string): string {
  return raw
    .replace(/^#/, '')
    .replace(/^\/+/, '')
    .replace(/\/+$/, '')
    .trim()
    .toLowerCase();
}

export function parseLegalHash(hash: string): LegalDocType | null {
  const normalized = normalizeToken(hash);
  if (normalized === 'privacy' || normalized === 'privacy-policy') {
    return 'privacy';
  }
  if (normalized === 'terms' || normalized === 'terms-and-conditions') {
    return 'terms';
  }
  if (normalized === 'security' || normalized === 'security-policy') {
    return 'security';
  }
  if (normalized === 'license' || normalized === 'gplv3' || normalized === 'gpl-3.0') {
    return 'license';
  }
  return null;
}

export function parseLegalRoute(pathname: string, hash: string = ''): LegalDocType | null {
  const fromPath = parseLegalHash(pathname);
  if (fromPath) return fromPath;
  return parseLegalHash(hash);
}

export function getPathForLegalDoc(doc: LegalDocType | null): string {
  if (!doc) return '/';
  return ROUTE_SEGMENTS[doc];
}

export function getHashForLegalDoc(doc: LegalDocType | null): string {
  if (doc === 'privacy') return '#privacy-policy';
  if (doc === 'terms') return '#terms-and-conditions';
  if (doc === 'security') return '#security';
  if (doc === 'license') return '#license';
  return '#top';
}

export function getLegalDocument(doc: LegalDocType): LegalDocumentData {
  return LEGAL_DOCUMENTS[doc];
}

export function getSeoMetadataForRoute(doc: LegalDocType | null): RouteSeoMetadata {
  if (!doc) {
    return {
      title: 'Vibra Music — Official Aesthetic Music Player for Android',
      description:
        'Download Vibra Music, the free open-source music player and YouTube Music client with Hi-Res FLAC audio, on-device DSP Mix, word-synced lyrics, and frosted-glass UI.',
      canonicalPath: '/',
    };
  }

  const documentData = LEGAL_DOCUMENTS[doc];
  return {
    title: `${documentData.title} — Vibra Music Official`,
    description: documentData.summary.slice(0, 158),
    canonicalPath: getPathForLegalDoc(doc),
  };
}
