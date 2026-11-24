export interface ArtistProfile {
  id: string;
  name: string;
  role: 'Rapper and singer' | 'Singer';
  monthlyListeners: number;
  directoryListeners: number;
  tracks: number;
  origin: string;
  spotlightImage: string;
  gridTileImage: string;
  featuredTrack: string;
  verified: boolean;
  showVisitTag?: boolean;
}

export interface SpaceMediaItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Your Space' | 'Podcast' | 'Playlists';
  image: string;
  duration: string;
  aiContext: string;
  trackCount: number;
}

export interface LiveHost {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  currentTrack: string;
  listenersOnline: number;
}

export const ASSETS = {
  heroHandPhone: '/src/assets/images/hero_hand_phone_1795476991106.jpg',
  billieCyan: '/src/assets/images/cover_billie_cyan_1795476985595.jpg',
  redShades: '/src/assets/images/cover_red_shades_1795476985592.jpg',
  hanumankind: '/src/assets/images/artist_hanumankind_1795476988194.jpg',
  remaPink: '/src/assets/images/artist_rema_pink_1795476995314.jpg',
  duaDuotone: '/src/assets/images/artist_dua_duotone_1795476983979.jpg',
  liveHost1: '/src/assets/images/avatar_live_host_1_1795476989993.jpg',
  liveHost2: '/src/assets/images/avatar_live_host_2_1795476988686.jpg',
} as const;

export const AI_SEARCH_PROMPTS: string[] = [
  "Good morning, Anul, What's your pick?",
  'Upbeat tracks for your 8AM gym session',
  'Play moody late-night alt-pop picks',
  'Queue Hanumankind & global hip-hop',
];

export const SPACE_MEDIA_ITEMS: SpaceMediaItem[] = [
  {
    id: 'birds-of-a-feather',
    title: 'Birds of a feather',
    subtitle: 'Billie Eilish',
    category: 'Your Space',
    image: ASSETS.billieCyan,
    duration: '3:30',
    aiContext: 'Based on your 8AM gym session',
    trackCount: 26,
  },
  {
    id: 'neon-illusion',
    title: 'Houdini Echoes',
    subtitle: 'Dua Lipa',
    category: 'Your Space',
    image: ASSETS.duaDuotone,
    duration: '3:06',
    aiContext: 'Trending in your high-energy mix',
    trackCount: 22,
  },
  {
    id: 'crimson-horizon',
    title: 'After Hours Pulse',
    subtitle: 'The Weeknd',
    category: 'Your Space',
    image: ASSETS.redShades,
    duration: '4:02',
    aiContext: 'Matched to your evening drive tempo',
    trackCount: 18,
  },
  {
    id: 'podcast-sonic-lab',
    title: 'Sonic Architecture',
    subtitle: 'Sound Design Daily',
    category: 'Podcast',
    image: ASSETS.liveHost2,
    duration: '42:15',
    aiContext: 'Picked from your morning commute',
    trackCount: 14,
  },
  {
    id: 'podcast-synth-tales',
    title: 'Midnight Mixtapes',
    subtitle: 'Studio Sessions',
    category: 'Podcast',
    image: ASSETS.hanumankind,
    duration: '36:50',
    aiContext: 'New episode dropped 2h ago',
    trackCount: 9,
  },
  {
    id: 'podcast-rhythm-deep',
    title: 'Behind the 808',
    subtitle: 'Beatmakers Collective',
    category: 'Podcast',
    image: ASSETS.remaPink,
    duration: '51:10',
    aiContext: 'Recommended for hip-hop listeners',
    trackCount: 19,
  },
  {
    id: 'playlist-day-starter',
    title: 'Day-Starter Mix',
    subtitle: 'Curated by Nebula AI',
    category: 'Playlists',
    image: ASSETS.billieCyan,
    duration: '1h 24m',
    aiContext: 'Based on your 8AM gym session',
    trackCount: 26,
  },
  {
    id: 'playlist-night-orbit',
    title: 'Orbital Focus',
    subtitle: 'Ambient & Synth',
    category: 'Playlists',
    image: ASSETS.duaDuotone,
    duration: '58m',
    aiContext: 'Deep work cadence at 112 BPM',
    trackCount: 16,
  },
  {
    id: 'playlist-global-heat',
    title: 'Global Pulse',
    subtitle: 'Top 50 Worldwide',
    category: 'Playlists',
    image: ASSETS.remaPink,
    duration: '2h 05m',
    aiContext: 'Updated live from global charts',
    trackCount: 50,
  },
];

export const ARTISTS_CATALOG: ArtistProfile[] = [
  {
    id: 'hanumankind',
    name: 'Hanumankind',
    role: 'Rapper and singer',
    monthlyListeners: 20234,
    directoryListeners: 23340,
    tracks: 120,
    origin: 'Indian',
    spotlightImage: ASSETS.hanumankind,
    gridTileImage: ASSETS.remaPink,
    featuredTrack: 'Big Dawgs',
    verified: true,
  },
  {
    id: 'rema',
    name: 'Rema',
    role: 'Rapper and singer',
    monthlyListeners: 22340,
    directoryListeners: 22340,
    tracks: 86,
    origin: 'Nigeria',
    spotlightImage: ASSETS.remaPink,
    gridTileImage: ASSETS.duaDuotone,
    featuredTrack: 'Calm Down',
    verified: true,
    showVisitTag: true,
  },
  {
    id: 'dua-lipa',
    name: 'Dua Lipa',
    role: 'Singer',
    monthlyListeners: 45320,
    directoryListeners: 45320,
    tracks: 94,
    origin: 'Canada',
    spotlightImage: ASSETS.duaDuotone,
    gridTileImage: ASSETS.billieCyan,
    featuredTrack: 'Houdini',
    verified: true,
  },
  {
    id: 'billie-eilish',
    name: 'Billie Eilish',
    role: 'Singer',
    monthlyListeners: 12343,
    directoryListeners: 12343,
    tracks: 78,
    origin: 'English',
    spotlightImage: ASSETS.billieCyan,
    gridTileImage: ASSETS.redShades,
    featuredTrack: 'Birds of a feather',
    verified: true,
  },
  {
    id: 'the-weeknd',
    name: 'The Weeknd',
    role: 'Singer',
    monthlyListeners: 64180,
    directoryListeners: 64180,
    tracks: 142,
    origin: 'Canada',
    spotlightImage: ASSETS.redShades,
    gridTileImage: ASSETS.hanumankind,
    featuredTrack: 'Blinding Lights',
    verified: true,
  },
];

export const LIVE_HOSTS: LiveHost[] = [
  {
    id: 'host-arjun',
    name: 'Anul',
    handle: '@anul.wav',
    avatar: ASSETS.liveHost1,
    currentTrack: 'Birds of a feather — Billie Eilish',
    listenersOnline: 412,
  },
  {
    id: 'host-marcus',
    name: 'Devon',
    handle: '@devon.mix',
    avatar: ASSETS.liveHost2,
    currentTrack: 'Big Dawgs — Hanumankind',
    listenersOnline: 412,
  },
];
