import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  state = {
    showLoading: false,
    favorites: [],
  };

  componentDidMount() {
    this.handleFavorites();
  }

  handleFavorites = async () => {
    this.setState({ showLoading: true });
    const favorites = await getFavoriteSongs();
    this.setState({ favorites, showLoading: false });
  };

  render() {
    const { showLoading, favorites } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {
          showLoading ? (<Loading />)
            : (
              <div>
                {
                  favorites.map((fav) => (<MusicCard
                    key={ fav.trackId }
                    music={ fav }
                    isFavorited
                    handleRemoveFromFavorites={ this.handleFavorites }
                  />))
                }
              </div>
            )
        }
      </div>
    );
  }
}
