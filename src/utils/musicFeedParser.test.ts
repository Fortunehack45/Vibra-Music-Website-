import test from 'node:test';
import assert from 'node:assert/strict';
import {
  parseDeezerChartAlbums,
  parseDeezerChartTracks,
  parseYouTubeMusicAlbums,
} from './musicFeedParser.ts';

test('parseYouTubeMusicAlbums extracts album title, artist, explicit flag, 544px thumb, and browse URL', () => {
  const samplePayload = {
    contents: {
      singleColumnBrowseResultsRenderer: {
        tabs: [
          {
            tabRenderer: {
              content: {
                sectionListRenderer: {
                  contents: [
                    {
                      musicCarouselShelfRenderer: {
                        header: {
                          musicCarouselShelfBasicHeaderRenderer: {
                            title: { runs: [{ text: 'Albums & singles' }] },
                          },
                        },
                        contents: [
                          {
                            musicTwoRowItemRenderer: {
                              title: { runs: [{ text: 'In Tunez We Trust Vol. 1' }] },
                              subtitle: { runs: [{ text: 'Album • DJ Tunez' }] },
                              subtitleBadges: [
                                {
                                  musicInlineBadgeRenderer: {
                                    icon: { iconType: 'MUSIC_EXPLICIT_BADGE' },
                                  },
                                },
                              ],
                              thumbnailRenderer: {
                                musicThumbnailRenderer: {
                                  thumbnail: {
                                    thumbnails: [
                                      {
                                        url: 'https://yt3.googleusercontent.com/abc=w226-h226-l90-rj',
                                      },
                                    ],
                                  },
                                },
                              },
                              navigationEndpoint: {
                                browseEndpoint: { browseId: 'MPREb_12345' },
                              },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            },
          },
        ],
      },
    },
  };

  const albums = parseYouTubeMusicAlbums(samplePayload);
  assert.equal(albums.length, 1);
  assert.equal(albums[0].title, 'In Tunez We Trust Vol. 1');
  assert.equal(albums[0].artist, 'DJ Tunez');
  assert.equal(albums[0].releaseType, 'Album');
  assert.equal(albums[0].explicit, true);
  assert.match(albums[0].artwork, /=w544-h544-l90-rj$/);
  assert.equal(albums[0].externalUrl, 'https://music.youtube.com/browse/MPREb_12345');
  assert.equal(albums[0].source, 'YouTube Music');
});

test('parseDeezerChartTracks deduplicates and preserves previewUrl and explicit flag', () => {
  const tracks = parseDeezerChartTracks([
    {
      id: 1,
      title_short: 'Dracula',
      explicit_lyrics: true,
      link: 'https://www.deezer.com/track/1',
      preview: 'https://cdnt-preview.dzcdn.net/sample.mp3',
      artist: { name: 'Tame Impala' },
      album: { cover_big: 'https://cdn-images.dzcdn.net/cover.jpg' },
    },
    {
      id: 2,
      title_short: 'Dracula',
      explicit_lyrics: true,
      artist: { name: 'Tame Impala' },
      album: { cover_big: 'https://cdn-images.dzcdn.net/cover.jpg' },
    },
  ]);

  assert.equal(tracks.length, 1);
  assert.equal(tracks[0].title, 'Dracula');
  assert.equal(tracks[0].artist, 'Tame Impala');
  assert.equal(tracks[0].explicit, true);
  assert.equal(tracks[0].previewUrl, 'https://cdnt-preview.dzcdn.net/sample.mp3');
});

test('parseDeezerChartAlbums maps record type and skips incomplete entries', () => {
  const albums = parseDeezerChartAlbums([
    {
      id: 10,
      title: 'Hurry Up Tomorrow',
      record_type: 'album',
      explicit_lyrics: true,
      cover_big: 'https://cdn-images.dzcdn.net/album.jpg',
      artist: { name: 'The Weeknd' },
    },
    {
      id: 11,
      title: 'Missing Art',
      artist: { name: 'Unknown' },
    },
  ]);

  assert.equal(albums.length, 1);
  assert.equal(albums[0].releaseType, 'Album');
  assert.equal(albums[0].source, 'Deezer');
});
