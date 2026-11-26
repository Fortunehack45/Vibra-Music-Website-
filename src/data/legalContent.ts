export type LegalDocType = 'privacy' | 'terms' | 'security' | 'license';

export interface LegalSection {
  id: string;
  number: string;
  heading: string;
  paragraphs: string[];
  bullets?: { label: string; detail: string }[];
}

export interface LegalDocumentData {
  type: LegalDocType;
  shortLabel: string;
  title: string;
  subtitle: string;
  effectiveDate: string;
  version: string;
  packageId: string;
  summary: string;
  sections: LegalSection[];
}

export interface ReleaseBuildAsset {
  id: string;
  abi: string;
  label: string;
  description: string;
  filename: string;
  sizeMB: string;
  url: string;
  recommended?: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const VIBRA_LINKS = {
  github: 'https://github.com/Fortunehack45/Vibra_Music',
  releases: 'https://github.com/Fortunehack45/Vibra_Music_Releases/releases',
  latestRelease: 'https://github.com/Fortunehack45/Vibra_Music_Releases/releases/tag/v1.8.186',
  checksums:
    'https://github.com/Fortunehack45/Vibra_Music_Releases/releases/download/v1.8.186/checksums.txt',
  securityAdvisories: 'https://github.com/Fortunehack45/Vibra_Music/security/advisories',
  telegram: 'https://t.me/vibramusictg',
  website: 'https://vibramusic.store',
  twitter: 'https://x.com/OnNerd_eth',
  mixDocs: 'https://github.com/Fortunehack45/Vibra_Music/blob/main/docs/MIX_ARCHITECTURE.md',
  contributing: 'https://github.com/Fortunehack45/Vibra_Music/blob/main/CONTRIBUTING.md',
  securitySource: 'https://github.com/Fortunehack45/Vibra_Music/blob/main/SECURITY.md',
  licenseSource: 'https://github.com/Fortunehack45/Vibra_Music/blob/main/LICENSE',
  webApp: 'https://app.vibramusic.store',
  trace: 'https://trace.vibramusic.store',
  recognition: 'https://trace.vibramusic.store',
} as const;

export const VIBRA_RELEASE = {
  version: 'v1.8.186',
  releaseDate: 'November 23, 2026',
  minAndroid: 'Android 8.0 (API 26)+',
  packageId: 'com.fortune.vibramusic',
  license: 'GNU GPLv3',
  builds: [
    {
      id: 'arm64',
      abi: 'arm64-v8a',
      label: 'Modern 64-bit Android',
      description: 'Best fit for virtually all Android smartphones released since 2018.',
      filename: 'VibraMusic-v1.8.186-arm64-v8a.apk',
      sizeMB: '60.4 MB',
      url: 'https://github.com/Fortunehack45/Vibra_Music_Releases/releases/download/v1.8.186/VibraMusic-v1.8.186-arm64-v8a.apk',
      recommended: true,
    },
    {
      id: 'universal',
      abi: 'Universal',
      label: 'All Devices (Universal APK)',
      description: 'Includes all native DSP & ONNX binaries if you are unsure of your CPU architecture.',
      filename: 'VibraMusic-v1.8.186-Universal-AllDevices.apk',
      sizeMB: '151.1 MB',
      url: 'https://github.com/Fortunehack45/Vibra_Music_Releases/releases/download/v1.8.186/VibraMusic-v1.8.186-Universal-AllDevices.apk',
    },
    {
      id: 'armeabi',
      abi: 'armeabi-v7a',
      label: 'Legacy 32-bit ARM',
      description: 'Optimized for older 32-bit Android handsets and compact media devices.',
      filename: 'VibraMusic-v1.8.186-armeabi-v7a.apk',
      sizeMB: '51.7 MB',
      url: 'https://github.com/Fortunehack45/Vibra_Music_Releases/releases/download/v1.8.186/VibraMusic-v1.8.186-armeabi-v7a.apk',
    },
    {
      id: 'x86_64',
      abi: 'x86_64',
      label: 'x86_64 Tablets & Emulators',
      description: 'Compiled for Intel/AMD Android tablets, ChromeOS containers, and emulators.',
      filename: 'VibraMusic-v1.8.186-x86_64.apk',
      sizeMB: '66.1 MB',
      url: 'https://github.com/Fortunehack45/Vibra_Music_Releases/releases/download/v1.8.186/VibraMusic-v1.8.186-x86_64.apk',
    },
  ] satisfies ReleaseBuildAsset[],
};

export const VIBRA_FAQS: FaqItem[] = [
  {
    id: 'free-open-source',
    question: 'Is Vibra Music completely free and open source?',
    answer:
      'Yes. Vibra Music is free, open-source software licensed under the GNU General Public License v3.0 (GPLv3). There are no ads, no behavioral trackers, and no subscription paywalls—every line of client and Listen Together relay code is auditable on GitHub.',
  },
  {
    id: 'google-account',
    question: 'Do I need a Google or YouTube Music account to listen?',
    answer:
      'No. You can search, explore releases, play tracks, download offline copies, and use DSP Mix anonymously immediately after installation. Signing in with your Google account is strictly optional and only needed if you want personalized recommendations and synced playlists.',
  },
  {
    id: 'lossless-and-mix',
    question: 'How do Hi-Res lossless audio (FLAC/ALAC) and DSP Mix work?',
    answer:
      'Vibra Music pairs YouTube Music fallback streaming with pluggable QuickJS module sources capable of delivering Hi-Res FLAC and ALAC streams. Its Mix engine runs quantized neural models directly on your phone via ONNX Runtime (beat_this_int8.onnx and vocals_umxhq_int8.onnx) alongside native JNI DSP code to match tempo, align Camelot harmonic keys, isolate vocal stems, and blend seamless 0–12 second crossfades.',
  },
  {
    id: 'listen-together',
    question: 'How does Listen Together sync playback, and is room data stored?',
    answer:
      'Listen Together connects up to five devices via a six-character room code over a TLS-encrypted WebSocket relay (defaulting to party.vibramusic.store, or any self-hosted instance you configure). The Go relay runs entirely in volatile RAM with zero database—it exchanges only track IDs, millisecond playhead anchors, and clock pings, discarding room state the moment a session closes.',
  },
  {
    id: 'apk-safety',
    question: 'Is sideloading the APK safe? How can I verify my download?',
    answer:
      'Official signed APKs are published exclusively on the Fortunehack45/Vibra_Music_Releases repository together with a checksums.txt file containing SHA-256 digests for every ABI. Download the arm64-v8a build for modern Android phones, verify its SHA-256 hash if desired, and allow "Install unknown apps" for your browser or file manager.',
  },
  {
    id: 'ecosystem-support',
    question: 'Does Vibra Music work with Android Auto, Wear OS, Cast, and scrobbling?',
    answer:
      'Yes. Built-in support includes Android Auto media browsing, a Wear OS watch bridge and companion installer, Google Cast remote speakers, Samsung One UI Now Bar, Discord Rich Presence, Last.fm and ListenBrainz scrobbling, Spotify Canvas & playlist import, scheduled Google Drive backups, and personal WebDAV libraries.',
  },
  {
    id: 'lyrics-and-platforms',
    question: 'Where do word-synced lyrics come from, and what about iOS or Desktop?',
    answer:
      'Vibra Music supports reorderable multi-provider lyrics including Musixmatch RichSync, LRCLIB, KuGou, Genius, and YouTube captions—with syllable-level Apple-style animations, offline embedded tags, and live translation. Android is the primary signed release today, while shared Kotlin Multiplatform and Swift (VibraMusicKit) modules are actively developed in the repository.',
  },
];

export const LEGAL_DOCUMENTS: Record<LegalDocType, LegalDocumentData> = {
  privacy: {
    type: 'privacy',
    shortLabel: 'Privacy Policy',
    title: 'Privacy Policy',
    subtitle: 'Data Handling, On-Device Architecture & Third-Party Integrations',
    effectiveDate: 'November 23, 2026',
    version: 'Rev. 2.1 — com.fortune.vibramusic',
    packageId: 'com.fortune.vibramusic',
    summary:
      'Vibra Music is built as a local-first, open-source Android audio client licensed under GNU GPLv3. We operate no user account database, deploy no advertising or behavioral analytics SDKs, and perform neural DSP audio analysis strictly on your device. Any external transmission occurs only when you stream media, enable optional integrations, or join a Listen Together session.',
    sections: [
      {
        id: 'scope-and-posture',
        number: '01',
        heading: 'Scope & Local-First Data Posture',
        paragraphs: [
          'This Privacy Policy governs the handling of information in connection with the Vibra Music Android application (application identifier com.fortune.vibramusic), the optional Listen Together synchronization relay, and this official Vibra Music website (collectively, the "Software").',
          'Vibra Music is maintained as free, open-source software by independent contributors. Unlike commercial streaming platforms, Vibra Music maintains no centralized user registry, operates no social graph, and does not harvest, aggregate, sell, or broker personal data. Subject to the opt-in third-party services detailed below, your library, playback history, acoustic mix profiles, and preferences remain resident on your device.',
        ],
      },
      {
        id: 'on-device-processing',
        number: '02',
        heading: 'Information Stored & Processed Strictly On-Device',
        paragraphs: [
          'Core playback, organization, and DSP features execute locally without transmitting records to Vibra Music maintainers:',
        ],
        bullets: [
          {
            label: 'Playback History, Playlists & Statistics',
            detail:
              'Listening records, play counts, custom playlists, cached artwork, and user-supplied lyrics (CustomLyricsStore) are stored in local application databases on your Android device.',
          },
          {
            label: 'On-Device Neural DSP & Mix Analysis',
            detail:
              'Beat tracking, vocal stem isolation, harmonic Camelot key detection, and crossfade planning run locally via ONNX Runtime models (beat_this_int8.onnx and vocals_umxhq_int8.onnx) and native JNI audio libraries. Raw audio files and acoustic fingerprints are never uploaded to external Vibra servers.',
          },
          {
            label: 'Hardware-Backed Credential Storage',
            detail:
              'Authentication tokens and session cookies you optionally provide (such as YouTube Music, Spotify sp_dc, Discord, Last.fm, ListenBrainz, Google Drive, or WebDAV credentials) are persisted inside EncryptedSharedPreferences wrapped by Google Tink keysets bound to the Android Keystore, which never leaves the device. On certain OEM Android builds where hardware Keystore verification is unavailable, the application degrades to private app-sandboxed preferences rather than failing launch.',
          },
        ],
      },
      {
        id: 'listen-together',
        number: '03',
        heading: 'Ephemeral Data in "Listen Together" Sessions',
        paragraphs: [
          'If you voluntarily create or join a Listen Together room using a six-character invite code, your device opens a TLS-encrypted WebSocket connection to the configured party relay (by default https://party.vibramusic.store, or any self-hosted server address you enter in settings).',
          'The Listen Together Go relay server operates strictly in volatile memory with no backing database. It processes only transient synchronization payloads necessary to keep up to five connected devices aligned: track identifiers, playhead position (positionMs), monotonic server clock anchors (anchorMs), play/pause state, and NTP-style round-trip clock pings. Room state is discarded immediately upon session termination and is never persisted or mined.',
        ],
      },
      {
        id: 'third-party-integrations',
        number: '04',
        heading: 'Direct Third-Party Services, Google API Limited Use & Optional Integrations',
        paragraphs: [
          'Vibra Music\'s use and transfer to any other app of information received from Google APIs adheres to the Google API Services User Data Policy, including the Limited Use requirements.',
          'When you stream content or explicitly enable external connectors, your device communicates directly with the respective third-party provider over HTTPS (cleartext HTTP traffic is disabled at the manifest level via usesCleartextTraffic="false"). Vibra Music does not proxy or log your credentials through intermediary developer servers. Each external provider acts as an independent data controller governed by its own privacy terms:',
        ],
        bullets: [
          {
            label: 'Google APIs & YouTube Data Limited Use Compliance',
            detail:
              'When you choose to sign in with your Google or YouTube account, credentials and OAuth tokens are stored exclusively inside hardware-wrapped Android Keystore EncryptedSharedPreferences on your local device. We access your account strictly to retrieve your playlists, liked tracks, and listening suggestions. We do NOT transfer, sell, disclose, or broker your Google user data to any third party, data broker, advertising network, or analytics vendor. Google user data is NEVER used for serving advertisements or promotional profiling. You can disconnect your Google account at any time in app settings or revoke access via Google Account Permissions (https://myaccount.google.com/permissions).',
          },
          {
            label: 'YouTube Music & Audio Playback',
            detail:
              'Search queries, audio stream requests, PoToken session generation, and playback interactions communicate directly between your device and official YouTube / Google InnerTube endpoints.',
          },
          {
            label: 'Google Drive Backup (Opt-In)',
            detail:
              'If enabled under Settings → Backup and Restore, Vibra Music writes encrypted structured backups of your listening statistics and preferences directly into your private Google Drive application folder (drive.appdata scope) on your chosen cadence (Off, Daily, Weekly, or Monthly). Maintainers have zero visibility into your Google Drive files, and no Google Drive files are accessible to third parties.',
          },
          {
            label: 'Discord Rich Presence (Opt-In)',
            detail:
              'When authenticated in-app, your client transmits your active track title, artist, album metadata, and elapsed playback timestamps directly to Discord gateways.',
          },
          {
            label: 'Last.fm & ListenBrainz Scrobbling (Opt-In)',
            detail:
              'When configured, track playback completions ("scrobbles") and "now playing" status updates are sent directly to Last.fm or ListenBrainz using your session credentials.',
          },
          {
            label: 'Spotify Web Session & Canvas (Opt-In)',
            detail:
              'If you supply a Spotify session cookie (sp_dc) to retrieve animated album canvases or import playlists, requests go directly from your device to Spotify endpoints. You may revoke access at any time via Spotify\'s "Sign out everywhere" control or by clearing local tokens in Vibra Music settings.',
          },
          {
            label: 'Pluggable Module Sources, Lyrics Providers & WebDAV',
            detail:
              'Vibra Music supports user-installed JavaScript module sources (executed via QuickJS), external word-synced lyrics sources (such as Musixmatch, LRCLIB, KuGou, and Genius), and personal WebDAV servers. Any network requests initiated by a module or custom server you configure are directed solely to those configured endpoints.',
          },
        ],
      },
      {
        id: 'android-permissions',
        number: '05',
        heading: 'Android System Permissions & Purpose Limitation',
        paragraphs: [
          'Vibra Music declares only permissions directly required for audio playback, local library management, and hardware interoperability:',
        ],
        bullets: [
          {
            label: 'INTERNET & ACCESS_NETWORK_STATE',
            detail:
              'Required to stream media, resolve artwork/lyrics, and enforce your separate Wi-Fi versus mobile data audio quality ceilings.',
          },
          {
            label: 'FOREGROUND_SERVICE (Media Playback & Data Sync), WAKE_LOCK & POST_NOTIFICATIONS',
            detail:
              'Maintains uninterrupted background playback, Android Auto / Wear OS / Samsung Now Bar media controls, and reliable offline downloads after you leave the screen.',
          },
          {
            label: 'READ_MEDIA_AUDIO (and Legacy Storage on Android ≤ 12)',
            detail:
              'Reads your local device audio library and saves offline tracks with embedded metadata to the shared Music directory via Android MediaStore.',
          },
          {
            label: 'BLUETOOTH_CONNECT (Android 12+)',
            detail:
              'Requested only when you first open the audio output picker so paired headsets display their actual device names instead of generic system labels. Declining it does not impair playback.',
          },
          {
            label: 'RECORD_AUDIO & Speech Recognition',
            detail:
              'Invoked solely upon explicit user action for voice search queries or audio-reactive features. Microphone input is never captured or transmitted in the background.',
          },
          {
            label: 'VIBRATE',
            detail:
              'Provides subtle tactile feedback while respecting your operating system\'s global haptics toggle.',
          },
        ],
      },
      {
        id: 'retention-and-control',
        number: '06',
        heading: 'Data Retention, Erasure & Your Rights',
        paragraphs: [
          'Because Vibra Music stores no centralized copies of your personal data, you exercise direct, immediate control over retention and erasure. At any time, you may sign out of individual integrations, purge cached media, delete local listening history, or uninstall the application to permanently erase all local databases and Android Keystore-wrapped credentials.',
          'Note regarding Android System Backup: The application manifest permits standard Android backup rules (backup_rules.xml / data_extraction_rules.xml). Hardware-wrapped Tink keysets cannot be unwrapped after transfer to a new device; you may disable OS-level backup for Vibra Music inside your Android device settings at any time.',
          'Depending on your jurisdiction (including residents of the EEA, UK, California, or Nigeria under the NDPA), you hold statutory rights of access, correction, portability, and deletion. For data held by third-party services you connected (such as Google, Discord, Last.fm, ListenBrainz, or Spotify), please exercise those rights directly through the respective provider\'s privacy portal.',
        ],
      },
      {
        id: 'children-and-changes',
        number: '07',
        heading: 'Children\'s Privacy, Amendments & Contact',
        paragraphs: [
          'Vibra Music is a general-purpose audio client not directed to children under the age of 13 (or the minimum digital consent age in your jurisdiction). We do not knowingly collect personal information from minors.',
          'We may revise this Privacy Policy as the codebase evolves—for instance, when new opt-in integrations or permissions are introduced. Material revisions will be reflected in the effective date above and committed transparently to the public repository history.',
          'Questions, security disclosures, or privacy inquiries may be submitted via our public GitHub repository (Fortunehack45/Vibra_Music), our dedicated Security Policy page, or the official Telegram community.',
        ],
      },
    ],
  },
  terms: {
    type: 'terms',
    shortLabel: 'Terms & Conditions',
    title: 'Terms & Conditions',
    subtitle: 'Open-Source Software License, Acceptable Use & Legal Disclaimers',
    effectiveDate: 'November 23, 2026',
    version: 'Rev. 2.1 — GNU GPLv3',
    packageId: 'com.fortune.vibramusic',
    summary:
      'By downloading, compiling, installing, or using Vibra Music (com.fortune.vibramusic) or accessing this official website, you agree to these Terms & Conditions and the governing GNU General Public License v3.0 (GPLv3). Vibra Music is an independent, non-affiliated third-party audio player and client that hosts no copyrighted media.',
    sections: [
      {
        id: 'acceptance-and-license',
        number: '01',
        heading: 'Acceptance of Terms & GNU GPLv3 License',
        paragraphs: [
          'These Terms & Conditions ("Terms") govern your access to and use of the Vibra Music Android application (com.fortune.vibramusic), its optional Listen Together synchronization server, and this official website (collectively, "Vibra Music" or the "Software"). If you do not agree to these Terms, do not install or use the Software.',
          'Vibra Music is free, open-source software licensed under the GNU General Public License version 3.0 ("GPLv3"). Subject to strict compliance with the GPLv3, you are granted the right to run, study, modify, and redistribute the Software, provided that any distributed copy or derivative work is accompanied by the Corresponding Source under the same GPLv3 license and preserves all copyright notices, attribution (including third-party lyrics animation and Material UI contributors), and warranty disclaimers. In the event of any conflict between these Terms and the GPLv3 with respect to source code redistribution rights, the GPLv3 controls.',
        ],
      },
      {
        id: 'non-affiliation',
        number: '02',
        heading: 'Independent Client & Non-Affiliation Disclaimer',
        paragraphs: [
          'Vibra Music is an independent, community-driven software project. It is NOT affiliated with, sponsored by, endorsed by, or officially connected to Google LLC, YouTube, YouTube Music, Spotify AB, Discord Inc., Last.fm Ltd., MetaBrainz Foundation (ListenBrainz), Musixmatch S.p.A., Deezer S.A., or Telegram Messenger Inc.',
          'All third-party product names, logos, trademarks, album artwork, lyrics, and audio recordings remain the exclusive property of their respective rights holders and appear strictly through user-initiated client playback or local device scanning.',
        ],
      },
      {
        id: 'no-media-hosting',
        number: '03',
        heading: 'No Media Hosting, Copyright & User Responsibility',
        paragraphs: [
          'Vibra Music operates solely as a client-side media player and interface. Vibra Music and its maintainers do NOT host, upload, index for redistribution, cache on developer servers, or store copyrighted music files, lyrics, or audiovisual works.',
        ],
        bullets: [
          {
            label: 'Lawful Use & Fair-Use Compliance',
            detail:
              'The Software is provided for personal, educational, and lawful media playback purposes. You bear sole legal responsibility for ensuring that your streaming, offline caching, format conversion, and use of third-party APIs comply with applicable copyright laws in your jurisdiction and the Terms of Service of any upstream platform you access.',
          },
          {
            label: 'No Ad-Blocking or Circumvention Guarantee',
            detail:
              'While Vibra Music prioritizes a clean, distraction-free listening interface, the Software makes no representation, promise, or guarantee of permanent bypasses, ad-blocking, or uninterrupted compatibility with commercial third-party platform restrictions or API changes.',
          },
          {
            label: 'Offline Downloads',
            detail:
              'Offline caching functionality is intended exclusively for personal, non-commercial playback on your own device in accordance with applicable law and source platform rights.',
          },
        ],
      },
      {
        id: 'pluggable-modules',
        number: '04',
        heading: 'Pluggable Module Sources & User-Supplied Integrations',
        paragraphs: [
          'Vibra Music includes an extensible architecture capable of executing user-configured JavaScript module sources (via QuickJS), connecting to personal WebDAV servers, and authenticating optional accounts (YouTube Music, Spotify, Discord, Last.fm, ListenBrainz, Google Drive).',
          'Vibra Music maintainers do not author, host, audit, endorse, or assume liability for third-party modules, external repositories, or user-supplied API endpoints. Installing or executing an untrusted third-party module is entirely at your own risk. You are solely responsible for safeguarding your personal credentials, API keys, and session cookies.',
        ],
      },
      {
        id: 'listen-together-terms',
        number: '05',
        heading: 'Listen Together Relay & Acceptable Use',
        paragraphs: [
          'Access to the public Listen Together synchronization server (party.vibramusic.store) is provided on a best-effort, complimentary basis with no Service Level Agreement (SLA) or uptime guarantee. Maintainers reserve the right to rate-limit, suspend, or discontinue the public relay at any time; users may self-host the open-source Go backend independently.',
          'When using Vibra Music or its community infrastructure, you agree NOT to: (a) launch automated denial-of-service traffic, socket flooding, or unauthorized probing against the Listen Together relay; (b) repackage or distribute tampered APK binaries misrepresenting official developer signatures; or (c) use the Software in violation of applicable local, national, or international law.',
        ],
      },
      {
        id: 'warranty-disclaimer',
        number: '06',
        heading: 'Disclaimer of Warranties',
        paragraphs: [
          'TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW AND CONSISTENT WITH SECTIONS 15 AND 16 OF THE GNU GPLV3, VIBRA MUSIC, ITS SOURCE CODE, COMPILED BINARIES, DSP MODELS, AND ACCOMPANYING SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE," WITHOUT WARRANTY OF ANY KIND, EXPRESS, IMPLIED, OR STATUTORY, INCLUDING WITHOUT LIMITATION IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, ACCURACY, QUIET ENJOYMENT, OR NON-INFRINGEMENT.',
          'THE ENTIRE RISK AS TO THE QUALITY, COMPATIBILITY WITH THIRD-PARTY APIS, AUDIO OUTPUT PERFORMANCE, AND SECURITY OF THIRD-PARTY MODULES RESTS WITH YOU. SHOULD THE SOFTWARE PROVE DEFECTIVE, YOU ASSUME THE COST OF ALL NECESSARY SERVICING OR CORRECTION.',
        ],
      },
      {
        id: 'limitation-of-liability',
        number: '07',
        heading: 'Limitation of Liability & Indemnification',
        paragraphs: [
          'IN NO EVENT, UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING, SHALL THE MAINTAINERS, AUTHORS, OR CONTRIBUTORS OF VIBRA MUSIC BE LIABLE TO YOU FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, PUNITIVE, OR CONSEQUENTIAL DAMAGES (INCLUDING LOSS OF DATA, DEVICE DAMAGE, ACCOUNT SUSPENSION BY THIRD-PARTY PLATFORMS, LOSS OF GOODWILL, OR SERVICE INTERRUPTION) ARISING OUT OF THE USE OR INABILITY TO USE THE SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.',
          'You agree to indemnify and hold harmless the Vibra Music maintainers and contributors from any third-party claims, damages, or liabilities arising out of your unlawful use of the Software, your violation of third-party platform terms, or any unauthorized module sources you install.',
        ],
      },
      {
        id: 'general-provisions',
        number: '08',
        heading: 'Modifications, Severability & Contact',
        paragraphs: [
          'We reserve the right to update these Terms to reflect architectural changes, new integrations, or legal requirements. Continued use of the Software following publication of revised Terms constitutes your acceptance of the updated provisions.',
          'If any provision of these Terms is held unenforceable by a court of competent jurisdiction, that provision shall be enforced to the maximum extent permissible and the remaining provisions shall continue in full force and effect.',
          'For official signed releases, source code disclosures, licensing inquiries, or legal notices, refer to github.com/Fortunehack45/Vibra_Music, github.com/Fortunehack45/Vibra_Music_Releases, or vibramusic.store.',
        ],
      },
    ],
  },
  security: {
    type: 'security',
    shortLabel: 'Security Policy',
    title: 'Security Policy',
    subtitle: 'Vulnerability Disclosure, Cryptographic Storage & Release Integrity',
    effectiveDate: 'November 23, 2026',
    version: 'Supported Branch — v1.8.x',
    packageId: 'com.fortune.vibramusic',
    summary:
      'Vibra Music enforces strict client-side security hygiene: zero hardcoded production secrets in source control, TLS-only transport, hardware-backed Android Keystore encryption for local tokens, and verifiable SHA-256 checksums on every signed release APK.',
    sections: [
      {
        id: 'supported-versions',
        number: '01',
        heading: 'Supported Versions & Patch Policy',
        paragraphs: [
          'Security fixes and dependency hardening patches are actively maintained exclusively on the current minor release line. Older releases do not receive backported security updates and users are advised to stay on the latest signed release.',
        ],
        bullets: [
          {
            label: 'Version 1.8.x (Current: v1.8.186)',
            detail:
              'Actively supported. Receives security advisories, cryptographic library updates, and timely patch builds via Vibra_Music_Releases.',
          },
          {
            label: 'Versions < 1.8',
            detail:
              'Unsupported (End of Life). Users running legacy builds should upgrade to the current signed v1.8.x APK.',
          },
        ],
      },
      {
        id: 'reporting-vulnerabilities',
        number: '02',
        heading: 'Responsible Vulnerability Disclosure',
        paragraphs: [
          'If you discover a security vulnerability, credential leakage risk, QuickJS sandbox escape, or cryptographic flaw within Vibra Music or the Listen Together relay, please report it privately rather than opening a public GitHub issue or posting exploits in community chats.',
          'Submit reports through GitHub Security Advisories on Fortunehack45/Vibra_Music or private maintainer channels. Maintainers aim to acknowledge legitimate vulnerability reports within 48 hours and coordinate a verified fix prior to public disclosure.',
        ],
        bullets: [
          {
            label: 'Required Report Details',
            detail:
              'Include a clear technical description of the defect, reproducible steps or proof-of-concept material, affected build/commit hash, and an objective assessment of potential user impact.',
          },
          {
            label: 'Coordinated Remediation',
            detail:
              'We commit to transparent credit in release advisories (unless anonymity is requested) once patched binaries and SHA-256 digests are published.',
          },
        ],
      },
      {
        id: 'on-device-security-architecture',
        number: '03',
        heading: 'Client Transport & On-Device Keystore Architecture',
        paragraphs: [
          'Vibra Music is architected to minimize its attack surface across both network transport and local persistence:',
        ],
        bullets: [
          {
            label: 'Strict TLS Transport Enforcement',
            detail:
              'Cleartext HTTP traffic is blocked globally in AndroidManifest.xml via android:usesCleartextTraffic="false", ensuring media metadata, authentication exchanges, and Listen Together WebSockets traverse encrypted HTTPS/WSS channels.',
          },
          {
            label: 'Android Keystore + Google Tink Encryption',
            detail:
              'Sensitive user tokens in EncryptedPrefs.kt are encrypted using EncryptedSharedPreferences backed by Google Tink AES-256 keysets hardware-bound to the device Android Keystore.',
          },
          {
            label: 'Zero Hardcoded Production Secrets',
            detail:
              'Optional developer or CI build keys (SUPABASE_URL, SUPABASE_ANON_KEY, SPOTIFY_SPDC, LASTFM_API_KEY, LASTFM_SECRET) are injected exclusively at build time via gitignored local.properties or GitHub Actions Secrets and never committed to source control.',
          },
        ],
      },
      {
        id: 'credential-rotation',
        number: '04',
        heading: 'Credential Rotation & Incident Revocation',
        paragraphs: [
          'If a user or self-host contributor suspects that an optional third-party token or environment secret has been exposed, follow the repository remediation procedure immediately:',
        ],
        bullets: [
          {
            label: 'Spotify Session Tokens (sp_dc)',
            detail:
              'Revoke active web sessions immediately via Spotify Account Overview ("Sign out everywhere") and wipe stored local tokens inside Vibra Music settings (clearSpotifyWebSession()).',
          },
          {
            label: 'Supabase / Self-Hosted Sync Keys',
            detail:
              'Rotate exposed project keys inside the Supabase dashboard and enforce Row Level Security (RLS) policies so anonymous keys can never query unauthorized records.',
          },
          {
            label: 'Git History Sanitization (Contributors)',
            detail:
              'Removing a secret in a follow-up commit does not erase prior history. Contributors must rotate compromised credentials server-side immediately and use git-filter-repo or BFG Repo-Cleaner if sanitizing fork history.',
          },
        ],
      },
      {
        id: 'apk-integrity',
        number: '05',
        heading: 'Verifying Official Signed Releases',
        paragraphs: [
          'Official Vibra Music binaries are distributed strictly through github.com/Fortunehack45/Vibra_Music_Releases. Do not install repackaged APKs from unofficial mirror sites or third-party download aggregators.',
          'Before sideloading, compare the SHA-256 digest of your downloaded APK (arm64-v8a, armeabi-v7a, x86_64, or Universal) against the checksums.txt asset published alongside each tagged release.',
        ],
      },
    ],
  },
  license: {
    type: 'license',
    shortLabel: 'GNU GPLv3 License',
    title: 'GNU GPLv3 License',
    subtitle: 'Free Copyleft Software License, Freedoms & Attribution Notices',
    effectiveDate: 'June 29, 2007 (Version 3)',
    version: 'GNU General Public License v3.0',
    packageId: 'com.fortune.vibramusic',
    summary:
      'Vibra Music is free, copyleft open-source software licensed under the GNU General Public License version 3.0. You are free to run, study, share, and modify the program—provided that any redistributed binary or derivative work grants recipients those same freedoms and complete source code under GPLv3.',
    sections: [
      {
        id: 'gpl-preamble',
        number: '01',
        heading: 'Preamble & Core Software Freedoms',
        paragraphs: [
          'Copyright (C) 2007 Free Software Foundation, Inc. (https://fsf.org/). Everyone is permitted to copy and distribute verbatim copies of the GNU General Public License document, but changing it is not allowed.',
          'When we speak of free software, we are referring to freedom, not price. The GNU General Public License is designed to guarantee your freedom to share and change all versions of Vibra Music—to make sure it remains free software for all its users:',
        ],
        bullets: [
          {
            label: 'Freedom to Run',
            detail:
              'You may run Vibra Music (com.fortune.vibramusic) for any lawful purpose on any compatible device without license fees or restrictive telemetry.',
          },
          {
            label: 'Freedom to Study & Modify',
            detail:
              'You have full access to the complete Kotlin, Jetpack Compose, C++ JNI DSP, Swift, and Go Listen Together relay source code to audit behavior, build privately, or improve features.',
          },
          {
            label: 'Freedom to Redistribute (Copyleft)',
            detail:
              'You may distribute verbatim or modified copies, provided you prominently display copyright notices, state any modifications, license the complete derivative work under GNU GPLv3, and furnish the Corresponding Source.',
          },
        ],
      },
      {
        id: 'copyleft-obligations',
        number: '02',
        heading: 'Key Conditions for Redistribution & Derivative Works',
        paragraphs: [
          'Under Sections 4, 5, and 6 of the GNU GPLv3, anyone conveying verbatim or modified copies of Vibra Music (whether as source code or compiled Android APK/AAB binaries) must comply with the following binding conditions:',
        ],
        bullets: [
          {
            label: 'Preserve Notices & License Text',
            detail:
              'Keep intact all copyright notices, notices stating that GPLv3 applies, and all absence-of-warranty notices, and deliver a copy of the GPLv3 license with the program.',
          },
          {
            label: 'Corresponding Source Requirement',
            detail:
              'Whenever you distribute a compiled APK or object code, you must simultaneously make the complete machine-readable Corresponding Source (including build scripts and interface definitions) available under GPLv3.',
          },
          {
            label: 'No Additional Restrictions & Anti-Tivoization',
            detail:
              'You may not impose further legal or technical restrictions (such as DRM or proprietary signing lockouts on consumer devices) that abridge rights granted by GPLv3.',
          },
        ],
      },
      {
        id: 'third-party-attributions',
        number: '03',
        heading: 'Third-Party Open-Source Acknowledgements',
        paragraphs: [
          'Vibra Music stands on the work of the open-source audio and mobile ecosystem. Key upstream attributions preserved in the repository include:',
        ],
        bullets: [
          {
            label: 'Apple-Style Lyrics Animation',
            detail:
              'Word- and syllable-synced lyrics motion architecture credited to binimum (github.com/binimum/am-lyrics).',
          },
          {
            label: 'On-Device Neural DSP & Runtime Stack',
            detail:
              'ONNX Runtime (quantized beat tracking and vocal stem isolation models), QuickJS embedded JavaScript engine for pluggable modules, and Jetpack Media3 / ExoPlayer.',
          },
          {
            label: 'UI, Graphics & Cryptography Libraries',
            detail:
              'Jetpack Compose Material 3, Haze frosted-glass backdrop rendering, Coil 3 asynchronous artwork loading, and Google Tink for Android Keystore-backed EncryptedSharedPreferences.',
          },
        ],
      },
      {
        id: 'gpl-warranty-liability',
        number: '04',
        heading: 'Sections 15 & 16 — Disclaimer of Warranty & Limitation of Liability',
        paragraphs: [
          'THERE IS NO WARRANTY FOR THE PROGRAM, TO THE EXTENT PERMITTED BY APPLICABLE LAW. EXCEPT WHEN OTHERWISE STATED IN WRITING THE COPYRIGHT HOLDERS AND/OR OTHER PARTIES PROVIDE THE PROGRAM "AS IS" WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM IS WITH YOU. SHOULD THE PROGRAM PROVE DEFECTIVE, YOU ASSUME THE COST OF ALL NECESSARY SERVICING, REPAIR OR CORRECTION.',
          'IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING WILL ANY COPYRIGHT HOLDER, OR ANY OTHER PARTY WHO MODIFIES AND/OR CONVEYS THE PROGRAM AS PERMITTED ABOVE, BE LIABLE TO YOU FOR DAMAGES, INCLUDING ANY GENERAL, SPECIAL, INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR INABILITY TO USE THE PROGRAM (INCLUDING BUT NOT LIMITED TO LOSS OF DATA OR DATA BEING RENDERED INACCURATE OR LOSSES SUSTAINED BY YOU OR THIRD PARTIES OR A FAILURE OF THE PROGRAM TO OPERATE WITH ANY OTHER PROGRAMS), EVEN IF SUCH HOLDER OR OTHER PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.',
        ],
      },
      {
        id: 'verbatim-source-notice',
        number: '05',
        heading: 'Authoritative License Text & Repository Reference',
        paragraphs: [
          'The complete, unabridged verbatim text of the GNU General Public License Version 3 (29 June 2007) is distributed at the root of the Vibra Music source repository in the LICENSE file (github.com/Fortunehack45/Vibra_Music/blob/main/LICENSE) and published by the Free Software Foundation at https://www.gnu.org/licenses/gpl-3.0.en.html.',
          'All contributions submitted via Pull Request to Fortunehack45/Vibra_Music are accepted under the same GNU GPLv3 terms in accordance with CONTRIBUTING.md.',
        ],
      },
    ],
  },
};
