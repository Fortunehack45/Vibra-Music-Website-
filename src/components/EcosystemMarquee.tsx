import React from 'react';

interface IntegrationItem {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const INTEGRATIONS: IntegrationItem[] = [
  {
    id: 'youtube-music',
    name: 'YouTube Music',
    icon: (
      <svg viewBox="0 0 24 24" className="h-[19px] w-[19px]" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9.25" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="12" cy="12" r="5.5" stroke="currentColor" strokeWidth="1.2" opacity="0.65" />
        <path d="M10.5 9.4 15.2 12l-4.7 2.6V9.4Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'spotify',
    name: 'Spotify',
    icon: (
      <svg viewBox="0 0 24 24" className="h-[19px] w-[19px]" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9.25" fill="currentColor" />
        <path
          d="M7.6 9.9c2.9-.85 6.4-.65 9.1.75M8.4 12.8c2.3-.65 5.1-.45 7.3.65M9.1 15.5c1.8-.45 4-.3 5.7.5"
          stroke="#080707"
          strokeWidth="1.55"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: 'discord',
    name: 'Discord',
    icon: (
      <svg viewBox="0 0 24 24" className="h-[19px] w-[19px]" fill="currentColor" aria-hidden="true">
        <path d="M19.3 5.9A15.4 15.4 0 0 0 15.5 4.7c-.2.3-.3.7-.5 1a14.2 14.2 0 0 0-6 0c-.1-.3-.3-.7-.5-1a15.3 15.3 0 0 0-3.8 1.2C2.3 9.5 1.7 13 2 16.5a15.6 15.6 0 0 0 4.7 2.4c.4-.5.7-1.1 1-1.7-.6-.2-1.1-.5-1.6-.8l.4-.3c3.1 1.4 6.5 1.4 9.6 0l.4.3c-.5.3-1 .6-1.6.8.3.6.6 1.2 1 1.7a15.5 15.5 0 0 0 4.7-2.4c.4-4-.7-7.5-1.3-10.6ZM8.7 14.3c-.9 0-1.6-.8-1.6-1.8s.7-1.8 1.6-1.8 1.7.8 1.6 1.8c0 1-.7 1.8-1.6 1.8Zm6.6 0c-.9 0-1.6-.8-1.6-1.8s.7-1.8 1.6-1.8 1.7.8 1.6 1.8c0 1-.7 1.8-1.6 1.8Z" />
      </svg>
    ),
  },
  {
    id: 'lastfm',
    name: 'Last.fm',
    icon: (
      <svg viewBox="0 0 24 24" className="h-[19px] w-[19px]" fill="none" aria-hidden="true">
        <path
          d="M10.5 14.5a3.5 3.5 0 1 1-1.3-5.2c1.4.8 2.2 2.9 3.1 4.8.7 1.5 1.8 2.4 3.5 2.4 1.9 0 3.2-1.1 3.2-2.7 0-1.5-1-2.3-2.6-2.8l-1.3-.4c-1-.3-1.4-.7-1.4-1.3 0-.8.7-1.3 1.7-1.3 1 0 1.7.4 2.1 1.1"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 'listenbrainz',
    name: 'ListenBrainz',
    icon: (
      <svg viewBox="0 0 24 24" className="h-[19px] w-[19px]" fill="none" aria-hidden="true">
        <path
          d="M12 3 4.5 7.3v9.4L12 21l7.5-4.3V7.3L12 3Z"
          fill="currentColor"
          fillOpacity="0.18"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M12 3v18" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'musixmatch',
    name: 'Musixmatch',
    icon: (
      <svg viewBox="0 0 24 24" className="h-[19px] w-[19px]" fill="none" aria-hidden="true">
        <path
          d="M5 17.5V6.5l7 5.5 7-5.5v11l-7-5.5-7 5.5Z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 'lrclib',
    name: 'LRCLIB',
    icon: (
      <svg viewBox="0 0 24 24" className="h-[19px] w-[19px]" fill="none" aria-hidden="true">
        <path
          d="M5 7h10M5 12h14M5 17h8"
          stroke="currentColor"
          strokeWidth="1.85"
          strokeLinecap="round"
        />
        <circle cx="18.5" cy="17" r="1.75" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'google-cast',
    name: 'Google Cast',
    icon: (
      <svg viewBox="0 0 24 24" className="h-[19px] w-[19px]" fill="none" aria-hidden="true">
        <path
          d="M3 8.5V6.8A1.8 1.8 0 0 1 4.8 5h14.4A1.8 1.8 0 0 1 21 6.8v10.4a1.8 1.8 0 0 1-1.8 1.8H14"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
        />
        <path
          d="M3 16a3 3 0 0 1 3 3M3 12.2A6.8 6.8 0 0 1 9.8 19M3 19h.01"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: 'android-auto',
    name: 'Android Auto',
    icon: (
      <svg viewBox="0 0 24 24" className="h-[19px] w-[19px]" fill="none" aria-hidden="true">
        <path
          d="M12 4 4.5 19l7.5-3.2L19.5 19 12 4Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 'wear-os',
    name: 'Wear OS',
    icon: (
      <svg viewBox="0 0 24 24" className="h-[19px] w-[19px]" fill="none" aria-hidden="true">
        <rect x="6.5" y="6.5" width="11" height="11" rx="3.2" stroke="currentColor" strokeWidth="1.65" />
        <path d="M9.5 3.5h5M9.5 20.5h5" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'google-drive',
    name: 'Google Drive',
    icon: (
      <svg viewBox="0 0 24 24" className="h-[19px] w-[19px]" fill="none" aria-hidden="true">
        <path
          d="M8.8 4.8h6.4l5.3 9.2-3.2 5.2H6.7L3.5 14l5.3-9.2Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M8.8 4.8 15.2 19.2M3.5 14h17" stroke="currentColor" strokeWidth="1.35" opacity="0.7" />
      </svg>
    ),
  },
  {
    id: 'webdav',
    name: 'WebDAV',
    icon: (
      <svg viewBox="0 0 24 24" className="h-[19px] w-[19px]" fill="none" aria-hidden="true">
        <rect x="4" y="5" width="16" height="5.2" rx="1.6" stroke="currentColor" strokeWidth="1.6" />
        <rect x="4" y="13.8" width="16" height="5.2" rx="1.6" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="7.5" cy="7.6" r="0.9" fill="currentColor" />
        <circle cx="7.5" cy="16.4" r="0.9" fill="currentColor" />
      </svg>
    ),
  },
];

export const EcosystemMarquee: React.FC = () => {
  return (
    <section
      aria-labelledby="ecosystem-heading"
      className="relative z-20 py-14 sm:py-20"
    >
      <div className="mx-auto max-w-[1280px] px-5 sm:px-10 lg:px-14">
        <div className="mx-auto max-w-[580px] text-center">
          <h2
            id="ecosystem-heading"
            className="font-display text-[22px] font-medium tracking-[-0.02em] text-[#f4f3f1] sm:text-[26px]"
          >
            Plays nicely with everything you already use.
          </h2>
          <p className="mt-2.5 text-[14px] leading-[1.6] text-[#8a8784] sm:text-[15px]">
            Scrobbling, Discord presence, Spotify Canvas, word-synced lyrics, Wear OS, Cast, and
            cloud backups — all built in.
          </p>
        </div>
      </div>

      {/* Seamless GPU-accelerated infinite horizontal loop */}
      <div className="marquee-hover-pause marquee-edge-fade mt-10 overflow-hidden sm:mt-12">
        <div className="animate-ecosystem-marquee">
          {[0, 1].map((duplicateIndex) => (
            <div
              key={duplicateIndex}
              aria-hidden={duplicateIndex === 1}
              className="flex shrink-0 items-center gap-10 pr-10 sm:gap-14 sm:pr-14"
            >
              {INTEGRATIONS.map((item) => (
                <div
                  key={`${duplicateIndex}-${item.id}`}
                  className="inline-flex shrink-0 items-center gap-2.5 text-[#c8c5c2] transition-colors duration-200 hover:text-white"
                >
                  <span className="text-[#efeeec] opacity-90">{item.icon}</span>
                  <span className="font-display text-[14.5px] font-medium tracking-[-0.01em] whitespace-nowrap sm:text-[15.5px]">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
