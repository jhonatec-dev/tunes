import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AlbumCard from '../components/AlbumCard';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  state = {
    searchInputText: '',
    buttonDisabled: true,
    showLoading: false,
    artist: '',
    albums: [],
    hasRequested: false,
  };

  handleInputChange = ({ target: { value } }) => {
    this.setState({
      searchInputText: value,
      buttonDisabled: value.length < 2,
    });
  };

  handleSearchClick = async () => {
    const { searchInputText } = this.state;
    const artist = searchInputText;
    this.setState({ showLoading: true,
      searchInputText: '',
      buttonDisabled: true,
      artist: searchInputText,
      hasRequested: true });
    const albums = await searchAlbumsAPI(artist);
    this.setState({ showLoading: false, albums });
  };

  handleKeyDown = ({ keyCode }) => {
    const enterKC = 13;
    if (keyCode === enterKC) {
      this.handleSearchClick();
    }
  };

  render() {
    const { buttonDisabled, searchInputText, hasRequested,
      showLoading, artist, albums } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <div className="Search">
          <input
            data-testid="search-artist-input"
            type="text"
            name="searchInputText"
            id="search-artist-input"
            placeholder="Digite o artista/álbum"
            onChange={ this.handleInputChange }
            value={ searchInputText }
            onKeyDown={ this.handleKeyDown }
          />

          <button
            data-testid="search-artist-button"
            disabled={ buttonDisabled }
            onClick={ this.handleSearchClick }
            className="material-symbols-outlined"
          >

            search

          </button>
        </div>
        {
          showLoading ? (<Loading />)
            : (
              <div className="Albums">
                {
                  hasRequested
                  && (
                    <h2 className="result__search">
                      {
                        albums.length > 0 ? `Resultado de álbuns de: ${artist}`
                          : 'Nenhum álbum foi encontrado'
                      }
                    </h2>
                  )
                }

                {albums.map((album, index) => (
                  <Link
                    key={ index }
                    to={ `/album/${album.collectionId}` }
                    data-testid={ `link-to-album-${album.collectionId}` }
                  >
                    <AlbumCard { ...album } />
                  </Link>
                ))}
              </div>
            )
        }

      </div>
    );
  }
}
