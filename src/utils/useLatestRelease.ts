import { useEffect, useState } from 'react';
import { ReleaseBuildAsset, VIBRA_LINKS, VIBRA_RELEASE } from '../data/legalContent';

export interface DynamicReleaseState {
  version: string;
  releaseDate: string;
  minAndroid: string;
  packageId: string;
  license: string;
  builds: ReleaseBuildAsset[];
  latestReleaseUrl: string;
  checksumsUrl: string;
  isLiveUpdated: boolean;
}

const CACHE_KEY = 'vibra_github_release_cache_v1';
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

interface GitHubAsset {
  name: string;
  size: number;
  browser_download_url: string;
}

interface GitHubReleaseResponse {
  tag_name: string;
  published_at?: string;
  html_url?: string;
  assets?: GitHubAsset[];
}

function formatBytesToMB(bytes: number): string {
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(isoDate?: string): string {
  if (!isoDate) return VIBRA_RELEASE.releaseDate;
  try {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(isoDate));
  } catch {
    return VIBRA_RELEASE.releaseDate;
  }
}

function parseReleaseResponse(data: GitHubReleaseResponse): DynamicReleaseState {
  const version = data.tag_name || VIBRA_RELEASE.version;
  const releaseDate = formatDate(data.published_at);
  const assets = data.assets || [];

  const checksumsAsset = assets.find((a) => a.name.toLowerCase().includes('checksums'));
  const checksumsUrl =
    checksumsAsset?.browser_download_url ??
    `https://github.com/Fortunehack45/Vibra_Music_Releases/releases/download/${version}/checksums.txt`;

  const latestReleaseUrl =
    data.html_url ?? `https://github.com/Fortunehack45/Vibra_Music_Releases/releases/tag/${version}`;

  // Map over existing builds and update download URLs, filenames, and file sizes dynamically
  const updatedBuilds: ReleaseBuildAsset[] = VIBRA_RELEASE.builds.map((template) => {
    let matchedAsset: GitHubAsset | undefined;

    if (template.id === 'arm64') {
      matchedAsset = assets.find((a) => a.name.toLowerCase().includes('arm64-v8a'));
    } else if (template.id === 'universal') {
      matchedAsset = assets.find((a) => a.name.toLowerCase().includes('universal'));
    } else if (template.id === 'armeabi') {
      matchedAsset = assets.find(
        (a) => a.name.toLowerCase().includes('armeabi') || a.name.toLowerCase().includes('v7a'),
      );
    } else if (template.id === 'x86_64') {
      matchedAsset = assets.find((a) => a.name.toLowerCase().includes('x86_64'));
    }

    if (matchedAsset) {
      return {
        ...template,
        filename: matchedAsset.name,
        sizeMB: formatBytesToMB(matchedAsset.size),
        url: matchedAsset.browser_download_url,
      };
    }

    // Fallback if asset name convention changed
    return {
      ...template,
      url: `https://github.com/Fortunehack45/Vibra_Music_Releases/releases/download/${version}/${template.filename.replace(
        VIBRA_RELEASE.version,
        version,
      )}`,
    };
  });

  return {
    version,
    releaseDate,
    minAndroid: VIBRA_RELEASE.minAndroid,
    packageId: VIBRA_RELEASE.packageId,
    license: VIBRA_RELEASE.license,
    builds: updatedBuilds,
    latestReleaseUrl,
    checksumsUrl,
    isLiveUpdated: true,
  };
}

export function useLatestRelease(): DynamicReleaseState {
  const [release, setRelease] = useState<DynamicReleaseState>(() => {
    // Check localStorage cache on initialization for immediate zero-lag display
    if (typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (
            parsed &&
            typeof parsed === 'object' &&
            parsed.timestamp &&
            Date.now() - parsed.timestamp < CACHE_TTL_MS &&
            parsed.release
          ) {
            return parsed.release as DynamicReleaseState;
          }
        }
      } catch {
        // Ignore cache parse error
      }
    }
    return {
      ...VIBRA_RELEASE,
      latestReleaseUrl: VIBRA_LINKS.latestRelease,
      checksumsUrl: VIBRA_LINKS.checksums,
      isLiveUpdated: false,
    };
  });

  useEffect(() => {
    let cancelled = false;

    async function fetchRelease() {
      // Check cache validity
      if (typeof window !== 'undefined') {
        try {
          const raw = localStorage.getItem(CACHE_KEY);
          if (raw) {
            const parsed = JSON.parse(raw);
            if (parsed && parsed.timestamp && Date.now() - parsed.timestamp < CACHE_TTL_MS) {
              if (!cancelled && parsed.release) {
                setRelease(parsed.release);
                return;
              }
            }
          }
        } catch {
          // Ignore cache read error
        }
      }

      // Query GitHub API endpoint for releases
      const endpoints = [
        'https://api.github.com/repos/Fortunehack45/Vibra_Music_Releases/releases/latest',
        'https://api.github.com/repos/Fortunehack45/Vibra_Music/releases/latest',
      ];

      for (const url of endpoints) {
        try {
          const res = await fetch(url, {
            headers: {
              Accept: 'application/vnd.github.v3+json',
            },
          });
          if (!res.ok) continue;

          const data = (await res.json()) as GitHubReleaseResponse;
          if (data && data.tag_name) {
            const parsed = parseReleaseResponse(data);
            if (!cancelled) {
              setRelease(parsed);
              try {
                localStorage.setItem(
                  CACHE_KEY,
                  JSON.stringify({ timestamp: Date.now(), release: parsed }),
                );
              } catch {
                // Ignore localStorage quota errors
              }
            }
            return;
          }
        } catch {
          // Try next endpoint on network failure
        }
      }
    }

    fetchRelease();

    return () => {
      cancelled = true;
    };
  }, []);

  return release;
}
