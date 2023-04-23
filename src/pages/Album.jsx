import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Swal from 'sweetalert2';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { tracksJhon } from '../data/hidden';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';

export default class Album extends Component {
  state = {
    musics: [],
    artistName: '',
    albumName: '',
    year: '',
    artworkUrl100: '',
    favorites: [],
    showLoading: true,
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    try {
      const favorites = await getFavoriteSongs();
      let musics;
      if (id === 'jhonatec') {
        musics = tracksJhon;
      } else {
        musics = await getMusics(id);
      }
      const endOfYear = 4;
      musics = musics.filter(({ trackName }) => trackName);
      this.setState({ musics,
        favorites,
        showLoading: false,
        artistName: musics[0].artistName,
        albumName: musics[0].collectionName,
        year: musics[0].releaseDate.slice(0, endOfYear),
        artworkUrl100: musics[0].artworkUrl100 });
    } catch (error) {
      Swal.fire({
        title: 'A requisição falhou',
        text: error.message,
        icon: 'error',
        background: '#3a0767',
        color: 'white',
        iconColor: '#8927d5',
      });
    }
  }

  handlePlayClick = (index) => {
    const { playSongClick } = this.props;
    const { musics } = this.state;

    playSongClick(musics, index);
  };

  render() {
    const { musics, artistName, albumName, year,
      showLoading, favorites, artworkUrl100 } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {
          showLoading ? <Loading />
            : (
              <div className="AlbumDetailed">
                <div className="album__data">
                  <img src={ artworkUrl100 } alt={ albumName } />
                  <div>
                    <h2 data-testid="artist-name">{artistName}</h2>
                    <h3 data-testid="album-name">{albumName}</h3>
                    <h4>{year}</h4>
                  </div>

                </div>
                {
                  musics.map((music, index) => (
                    <MusicCard
                      key={ index }
                      music={ music }
                      playSongClick={ () => this.handlePlayClick(index) }
                      isFavorited={
                        favorites.some(({ trackId }) => trackId === music.trackId)
                      }
                    />))
                }
              </div>
            )
        }

      </div>
    );
  }
}

Album.defaultProps = {
  playSongClick: () => {},
};

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  playSongClick: PropTypes.func,
};
