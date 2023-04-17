import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Swal from 'sweetalert2';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';

export default class Album extends Component {
  state = {
    musics: [],
    artistName: '',
    albumName: '',
    favorites: [],
    showLoading: true,
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    try {
      const favorites = await getFavoriteSongs();
      let musics = await getMusics(id);
      musics = musics.filter(({ trackName }) => trackName);
      this.setState({ musics,
        favorites,
        showLoading: false,
        artistName: musics[0].artistName,
        albumName: musics[0].collectionName });
    } catch (error) {
      Swal.fire({
        title: 'A requisição falhou',
        text: error.message,
        icon: 'error',
      });
    }
  }

  render() {
    const { musics, artistName, albumName,
      showLoading, favorites } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {
          showLoading ? <Loading />
            : (
              <div>
                <div>
                  <h2 data-testid="artist-name">{artistName}</h2>
                  <h3 data-testid="album-name">{albumName}</h3>
                </div>
                {
                  musics.map((music, index) => (
                    <MusicCard
                      key={ index }
                      music={ music }
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

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
