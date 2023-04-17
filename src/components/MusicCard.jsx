import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  state = {
    showLoading: false,
    isFavorited: false,
  };

  componentDidMount() {
    const { isFavorited } = this.props;
    this.setState({ isFavorited });
  }

  handleFavoritar = async ({ target: { checked } }) => {
    this.setState({ showLoading: true });
    const { music, handleRemoveFromFavorites } = this.props;
    if (checked) {
      await addSong(music);
      this.setState({ isFavorited: true });
    } else {
      await removeSong(music);
      this.setState({ isFavorited: false });
    }
    this.setState({ showLoading: false });
    handleRemoveFromFavorites();
  };

  render() {
    const { music } = this.props;
    const { showLoading, isFavorited } = this.state;
    return (
      <div>
        {
          showLoading
            ? (<Loading />)
            : (
              <div>
                <h3>{music.trackName}</h3>
                <audio
                  data-testid="audio-component"
                  src={ music.previewUrl }
                  controls
                >
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  {' '}
                  {' '}
                  <code>audio</code>
                  .
                </audio>
                <label
                  htmlFor={ music.trackId }
                  data-testid={ `checkbox-music-${music.trackId}` }
                >
                  Favorita
                  <input
                    type="checkbox"
                    name=""
                    checked={ isFavorited }
                    id={ music.trackId }
                    onChange={ this.handleFavoritar }
                  />
                </label>
              </div>
            )
        }
      </div>
    );
  }
}

MusicCard.defaultProps = {
  handleRemoveFromFavorites: () => {},
};

MusicCard.propTypes = {
  music: PropTypes.shape({
    previewUrl: PropTypes.string,
    trackName: PropTypes.string,
    trackId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }).isRequired,
  isFavorited: PropTypes.bool.isRequired,
  handleRemoveFromFavorites: PropTypes.func,
};
