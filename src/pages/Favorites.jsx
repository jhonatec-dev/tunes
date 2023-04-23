import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import Title from '../components/Title';
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

  handlePlayClick = (index) => {
    const { playSongClick } = this.props;
    const { favorites } = this.state;

    playSongClick(favorites, index);
  };

  render() {
    const { showLoading, favorites } = this.state;
    const { match: { url } } = this.props;
    return (
      <div data-testid="page-favorites">
        <Header url={ url } />
        {
          showLoading ? (<Loading />)
            : (
              <div>
                {
                  favorites.length === 0 ? <Title
                    text="Você ainda não possui nenhum favorito salvo!"
                  />
                    : (
                      <div>
                        {
                          favorites.map((fav, index) => (<MusicCard
                            key={ index }
                            music={ fav }
                            isFavorited
                            playSongClick={ () => this.handlePlayClick(index) }
                            handleRemoveFromFavorites={ this.handleFavorites }
                          />))
                        }
                      </div>
                    )
                }
              </div>
            )
        }
      </div>
    );
  }
}

Favorites.propTypes = {
  playSongClick: PropTypes.func.isRequired,
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
};
