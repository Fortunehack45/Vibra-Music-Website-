import test from 'node:test';
import assert from 'node:assert/strict';
import { ARTISTS_CATALOG, SPACE_MEDIA_ITEMS } from '../data/nebulaData';
import {
  cycleIndex,
  filterArtists,
  formatListenerCount,
  getNextRoleFilter,
  getSpaceItems,
} from './nebulaLogic';

test('filterArtists returns full catalog when query is empty and filter is All', () => {
  const result = filterArtists(ARTISTS_CATALOG, '', 'All');
  assert.equal(result.length, ARTISTS_CATALOG.length);
  assert.equal(result[0].name, 'Hanumankind');
});

test('filterArtists matches artist name, origin, and role case-insensitively', () => {
  const byName = filterArtists(ARTISTS_CATALOG, 'dua', 'All');
  assert.equal(byName.length, 1);
  assert.equal(byName[0].name, 'Dua Lipa');

  const byOrigin = filterArtists(ARTISTS_CATALOG, 'nigeria', 'All');
  assert.equal(byOrigin.length, 1);
  assert.equal(byOrigin[0].name, 'Rema');

  const byRole = filterArtists(ARTISTS_CATALOG, '', 'Rapper and singer');
  assert.equal(byRole.length, 2);
  assert.deepEqual(
    byRole.map((a) => a.name),
    ['Hanumankind', 'Rema']
  );
});

test('filterArtists returns empty array when nothing matches', () => {
  const empty = filterArtists(ARTISTS_CATALOG, 'nonexistent-artist-xyz', 'All');
  assert.equal(empty.length, 0);
});

test('getNextRoleFilter cycles cleanly through all role filters', () => {
  assert.equal(getNextRoleFilter('All'), 'Rapper and singer');
  assert.equal(getNextRoleFilter('Rapper and singer'), 'Singer');
  assert.equal(getNextRoleFilter('Singer'), 'All');
});

test('getSpaceItems returns tab-specific items and resolves cross-tab search matches', () => {
  const yourSpace = getSpaceItems(SPACE_MEDIA_ITEMS, 'Your Space', '');
  assert.equal(yourSpace.length, 3);
  assert.equal(yourSpace[0].title, 'Birds of a feather');

  const podcasts = getSpaceItems(SPACE_MEDIA_ITEMS, 'Podcast', '');
  assert.equal(podcasts.length, 3);
  assert.equal(podcasts[0].category, 'Podcast');

  const searchResult = getSpaceItems(SPACE_MEDIA_ITEMS, 'Podcast', 'Billie');
  assert.equal(searchResult.length, 1);
  assert.equal(searchResult[0].title, 'Birds of a feather');
});

test('cycleIndex wraps positively and negatively without NaN', () => {
  assert.equal(cycleIndex(2, 3, 1), 0);
  assert.equal(cycleIndex(0, 3, -1), 2);
  assert.equal(cycleIndex(0, 0, 1), 0);
});

test('formatListenerCount adds comma separators for tabular display', () => {
  assert.equal(formatListenerCount(20234), '20,234');
  assert.equal(formatListenerCount(120), '120');
});
