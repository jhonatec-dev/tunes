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

  handleFavoritar = async (event) => {
    const { target: { className } } = event;
    event.stopPropagation();
    this.setState({ showLoading: true });
    const { music, handleRemoveFromFavorites } = this.props;
    if (className.includes('isChecked')) {
      await removeSong(music);
      this.setState({ isFavorited: false });
    } else {
      await addSong(music);
      this.setState({ isFavorited: true });
    }
    this.setState({ showLoading: false });
    handleRemoveFromFavorites();
  };

  render() {
    const { music, playSongClick } = this.props;
    const { showLoading, isFavorited } = this.state;
    return (
      <div>
        {
          showLoading
            ? (<Loading />)
            : (
              <div
                data-testid="audio-component"
                className="MusicCard"
                onClick={ playSongClick }
                role="button"
                aria-hidden
              >
                <img src={ music.artworkUrl60 } alt="" />
                <span className="material-symbols-outlined play">
                  play_arrow
                </span>
                <div className="music__card__track">
                  <h4>{music.trackName}</h4>
                  <p>{`${music.collectionName} - ${music.artistName}`}</p>
                </div>
                <span
                  data-testid={ `checkbox-music-${music.trackId}` }
                  className={
                    `material-symbols-outlined favorite ${isFavorited ? 'isChecked' : ''}`
                  }
                  onClick={ this.handleFavoritar }
                  role="button"
                  aria-hidden
                >
                  favorite
                </span>

              </div>
            )
        }
      </div>
    );
  }
}

MusicCard.defaultProps = {
  handleRemoveFromFavorites: () => {},
  playSongClick: () => {},
};

MusicCard.propTypes = {
  music: PropTypes.shape({
    previewUrl: PropTypes.string,
    trackName: PropTypes.string,
    collectionName: PropTypes.string,
    artistName: PropTypes.string,
    trackId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    artworkUrl60: PropTypes.string,
  }).isRequired,
  isFavorited: PropTypes.bool.isRequired,
  handleRemoveFromFavorites: PropTypes.func,
  playSongClick: PropTypes.func,
};
