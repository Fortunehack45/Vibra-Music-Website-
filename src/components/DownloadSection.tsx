import React from 'react';
import { ArrowDownToLine, ArrowUpRight, Sparkles } from 'lucide-react';
import { useLatestRelease } from '../utils/useLatestRelease';

interface DownloadSectionProps {
  appIconSrc: string;
  onOpenSecurity: () => void;
  onOpenLicense: () => void;
}

export const DownloadSection: React.FC<DownloadSectionProps> = ({
  appIconSrc,
  onOpenSecurity,
  onOpenLicense,
}) => {
  const release = useLatestRelease();
  const primaryBuild =
    release.builds.find((b) => b.recommended) ?? release.builds[0];

  return (
    <section
      id="download"
      aria-labelledby="download-heading"
      className="relative z-20 mx-auto max-w-[1280px] border-t border-white/[0.08] px-5 py-16 sm:px-10 sm:py-24 lg:px-14 lg:py-28"
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start lg:gap-14">
        {/* Left Editorial Column — Pure Typography, Zero Boxed SaaS Slop */}
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3.5">
            <img
              src={appIconSrc}
              alt="Vibra Music Android icon"
              className="h-11 w-11 rounded-[12px] object-cover ring-1 ring-white/15"
            />
            <div>
              <div className="flex items-center gap-2">
                <p className="text-[12px] text-[#8a8784]">Release {release.version}</p>
                {release.isLiveUpdated && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400 ring-1 ring-emerald-500/20">
                    <Sparkles className="h-2.5 w-2.5" />
                    Latest
                  </span>
                )}
              </div>
              <p className="text-[12px] text-[#5e5c5a]">
                {release.minAndroid} · {release.packageId}
              </p>
            </div>
          </div>

          <h2
            id="download-heading"
            className="font-display mt-6 text-[32px] font-normal leading-[1.08] tracking-[-0.03em] text-[#f4f3f1] sm:text-[42px]"
          >
            Get Vibra for Android.
          </h2>

          <p className="mt-4 max-w-[380px] text-[14.5px] leading-[1.68] text-[#9c9996]">
            Signed APKs are compiled directly from source and published with SHA-256 checksums. Free
            under GNU GPLv3 — no ads, no trackers, no account required.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href={primaryBuild.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-[44px] items-center gap-2.5 border-b border-white/80 pb-1 text-[15px] font-medium text-white transition-colors hover:border-[#c084fc] hover:text-[#e9d5ff] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a855f7]"
            >
              <ArrowDownToLine
                className="h-4 w-4 text-[#c084fc] transition-transform duration-200 group-hover:translate-y-0.5"
                aria-hidden="true"
              />
              <span>Download {primaryBuild.abi}</span>
              <span className="tabular-nums text-[13px] font-normal text-[#8a8784]">
                ({primaryBuild.sizeMB})
              </span>
            </a>

            <a
              href={release.latestReleaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-1 text-[13.5px] text-[#8a8784] transition-colors hover:text-white"
            >
              <span>Release notes</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>

          <p className="mt-6 max-w-[380px] text-[12.5px] leading-[1.6] text-[#666462]">
            Sideloading requires allowing <span className="text-[#8f8c89]">Install unknown apps</span>{' '}
            for your browser or file manager in Android settings.
          </p>
        </div>

        {/* Right Column — Clean Architectural Release Builds Table */}
        <div className="lg:col-span-7">
          <div className="flex items-baseline justify-between border-b border-white/[0.08] pb-3 text-[12px] text-[#6f6d6b]">
            <span>Signed Android Packages ({release.version})</span>
            <span className="tabular-nums">Size</span>
          </div>

          <ul className="divide-y divide-white/[0.06] border-b border-white/[0.08]">
            {release.builds.map((build) => (
              <li key={build.id}>
                <a
                  href={build.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 py-4 transition-colors hover:bg-white/[0.02] sm:px-2"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
                      <span className="font-display text-[15px] font-medium text-[#efeeec] transition-colors group-hover:text-white">
                        {build.abi}
                      </span>
                      <span className="text-[12.5px] text-[#7c7977]">{build.label}</span>
                      {build.recommended && (
                        <span className="text-[11px] font-medium text-[#c084fc]">Recommended</span>
                      )}
                    </div>
                    <p className="mt-1 text-[12.5px] text-[#6f6d6b]">{build.description}</p>
                  </div>

                  <div className="flex shrink-0 items-center gap-3 text-[13px] text-[#9c9996] transition-colors group-hover:text-white">
                    <span className="tabular-nums">{build.sizeMB}</span>
                    <ArrowDownToLine
                      className="h-3.5 w-3.5 text-[#686563] transition-colors group-hover:text-[#c084fc]"
                      aria-hidden="true"
                    />
                  </div>
                </a>
              </li>
            ))}
          </ul>

          {/* Quiet Integrity & Licensing Footer Line */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[12.5px] text-[#7c7977]">
            <a
              href={release.checksumsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#a8a5a2] transition-colors hover:text-white"
            >
              <span>SHA-256 checksums.txt</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-[#686563]" aria-hidden="true" />
            </a>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <button
                type="button"
                onClick={onOpenSecurity}
                className="transition-colors hover:text-white"
              >
                Security Policy
              </button>
              <span aria-hidden="true" className="text-[#454341]">
                ·
              </span>
              <button
                type="button"
                onClick={onOpenLicense}
                className="transition-colors hover:text-white"
              >
                GNU GPLv3 License
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
