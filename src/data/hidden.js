import fallenAngelImg from '../media/images/fallenAngel.png';
import jhonatecImg from '../media/images/jhonatecAlbum.png';
import jhonatecImg60 from '../media/images/jhonatecAlbum60.png';
import jsImg from '../media/images/js.png';
import fallenAngel from '../media/sounds/FallenAngel.mp3';
import frio from '../media/sounds/Frio.mp3';
import intro from '../media/sounds/Intro.mp3';
import javaScriptation from '../media/sounds/JavaScriptation.mp3';

const releaseDateJhon = '2023-04-22';

const albumsJhon = [
  {
    artistName: 'Jhonatec',
    artworkUrl100: jhonatecImg,
    collectionName: 'Supreme',
    releaseDate: releaseDateJhon,
    trackCount: 4,
    collectionId: 'jhonatec',

  },
];

const tracksJhon = [
  {
    previewUrl: intro,
    trackName: 'Intro',
    collectionName: 'Supreme',
    artistName: 'Jhonatec',
    trackId: '1993141003',
    artworkUrl60: jhonatecImg60,
    releaseDate: releaseDateJhon,
    artworkUrl100: jhonatecImg,
  },
  {
    previewUrl: javaScriptation,
    trackName: 'JavaScriptation',
    collectionName: 'Supreme',
    artistName: 'Jhonatec',
    trackId: '1993141004',
    artworkUrl60: jsImg,
    releaseDate: releaseDateJhon,
    artworkUrl100: jhonatecImg,
  },
  {
    previewUrl: fallenAngel,
    trackName: 'Fallen Angel',
    collectionName: 'Supreme',
    artistName: 'Jhonatec',
    trackId: '1993141001',
    artworkUrl60: fallenAngelImg,
    releaseDate: releaseDateJhon,
    artworkUrl100: jhonatecImg,
  },
  {
    previewUrl: frio,
    trackName: 'Frio',
    collectionName: 'Supreme',
    artistName: 'Jhonatec',
    trackId: '1993141002',
    artworkUrl60: jhonatecImg60,
    releaseDate: releaseDateJhon,
    artworkUrl100: jhonatecImg,
  },

];

export { albumsJhon, tracksJhon };
