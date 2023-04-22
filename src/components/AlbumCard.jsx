import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class AlbumCard extends Component {
  render() {
    const { artistName, collectionName,
      artworkUrl100, releaseDate, trackCount } = this.props;
    const endOfYear = 4;
    return (
      <div className="AlbumCard">
        <img src={ artworkUrl100 } alt={ collectionName } />
        <span className="material-symbols-outlined">
          open_in_full
        </span>
        <div>
          <h4>{collectionName}</h4>
          <p>
            {
              `${artistName} - ${releaseDate.slice(0, endOfYear)} - ${trackCount} músicas`
            }
          </p>
        </div>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  artistName: PropTypes.string.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  trackCount: PropTypes.number.isRequired,
};
