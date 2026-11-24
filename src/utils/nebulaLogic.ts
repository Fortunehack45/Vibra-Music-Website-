import type { ArtistProfile, SpaceMediaItem } from '../data/nebulaData';

export type SpaceTab = 'Your Space' | 'Podcast' | 'Playlists';
export type ArtistRoleFilter = 'All' | 'Rapper and singer' | 'Singer';

export function filterArtists(
  artists: ArtistProfile[],
  searchQuery: string,
  roleFilter: ArtistRoleFilter
): ArtistProfile[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return artists.filter((artist) => {
    const matchesRole = roleFilter === 'All' || artist.role === roleFilter;
    if (!matchesRole) return false;
    if (!normalizedQuery) return true;

    return (
      artist.name.toLowerCase().includes(normalizedQuery) ||
      artist.role.toLowerCase().includes(normalizedQuery) ||
      artist.origin.toLowerCase().includes(normalizedQuery) ||
      artist.featuredTrack.toLowerCase().includes(normalizedQuery)
    );
  });
}

export function getNextRoleFilter(current: ArtistRoleFilter): ArtistRoleFilter {
  if (current === 'All') return 'Rapper and singer';
  if (current === 'Rapper and singer') return 'Singer';
  return 'All';
}

export function getSpaceItems(
  items: SpaceMediaItem[],
  activeTab: SpaceTab,
  searchQuery: string
): SpaceMediaItem[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const tabItems = items.filter((item) => item.category === activeTab);

  if (!normalizedQuery) {
    return tabItems;
  }

  const queryMatchesAll = items.filter(
    (item) =>
      item.title.toLowerCase().includes(normalizedQuery) ||
      item.subtitle.toLowerCase().includes(normalizedQuery) ||
      item.aiContext.toLowerCase().includes(normalizedQuery)
  );

  return queryMatchesAll.length > 0 ? queryMatchesAll : tabItems;
}

export function cycleIndex(currentIndex: number, length: number, step = 1): number {
  if (length <= 0) return 0;
  return (((currentIndex + step) % length) + length) % length;
}

export function formatListenerCount(value: number): string {
  return value.toLocaleString('en-US');
}
