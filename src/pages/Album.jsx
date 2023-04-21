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
    artworkUrl100: '',
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
        albumName: musics[0].collectionName,
        artworkUrl100: musics[0].artworkUrl100 });
    } catch (error) {
      Swal.fire({
        title: 'A requisição falhou',
        text: error.message,
        icon: 'error',
      });
    }
  }

  handlePlayClick = (index) => {
    const { playSongClick } = this.props;
    const { musics } = this.state;

    playSongClick(musics, index);
  };

  render() {
    const { musics, artistName, albumName,
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
                    <h3 data-testid="artist-name">{artistName}</h3>
                    <h4 data-testid="album-name">{albumName}</h4>
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
