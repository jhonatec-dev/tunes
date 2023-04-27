import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Checkbox } from '@mui/material';
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
    const { target: { checked } } = event;
    event.stopPropagation();
    this.setState({ showLoading: true });
    const { music, handleRemoveFromFavorites } = this.props;
    if (checked) {
      await addSong(music);
    } else {
      await removeSong(music);
    }
    this.setState({ showLoading: false, isFavorited: checked });
    handleRemoveFromFavorites();
  };

  render() {
    const { music, playSongClick } = this.props;
    const { showLoading, isFavorited } = this.state;
    return (
      <div>

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
          <div className="favorite--container">
            {
              showLoading
                ? (<Loading />)
                : (
                  <Checkbox
                    className="CheckFavorite"
                    onChange={ this.handleFavoritar }
                    icon={ <FavoriteBorder /> }
                    checkedIcon={ <Favorite sx={ { color: 'var(--ligth-color)' } } /> }
                    checked={ isFavorited }
                    sx={ { color: 'var(--ligth-color)',
                      transition: '300ms',
                      ':hover': {
                        transform: 'scale(1.5)',
                      } } }
                  />
                )
            }
          </div>

        </div>

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
