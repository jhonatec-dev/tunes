import defaultCollections from './defaultCollections';
import defaultMusicApi from './defaultMusicApi';

export const defaultUser = {
  name: 'User Test',
  email: 'email@test.com',
  description: 'Lorem ipsum',
  image: 'url-to-image',
};

export const searchAlbumDefaultResponse = defaultCollections.results

export const iTunesLookupAlbumResponse = { results:
  [
    {
      artistName: 'Artist Name',
      collectionName: 'Collection Name',
    },
    {
      trackId: 12,
      trackName: 'Track Name 1',
      previewUrl: 'preview-url-1',
      kind: 'song',
    },
    {
      trackId: 21,
      trackName: 'Track Name 2',
      previewUrl: 'preview-url-2',
      kind: 'song',
    },
    {
      trackId: 31,
      trackName: 'Track Name 3',
      previewUrl: 'preview-url-3',
      kind: 'song',
    },
    {
      trackId: 42,
      trackName: 'Track Name 4',
      previewUrl: 'preview-url-4',
      kind: 'song',
    },
] };

export const musicAPIDefaultResponse = defaultMusicApi.results;

export const favoriteSongsList = defaultMusicApi.results.slice(1, 3);
