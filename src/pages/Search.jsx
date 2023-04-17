import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
      artist: searchInputText });
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
    const { buttonDisabled, searchInputText, showLoading, artist, albums } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <div className="Search">
          <input
            data-testid="search-artist-input"
            type="text"
            name="searchInputText"
            id="search-artist-input"
            placeholder="Digite o artista/música"
            onChange={ this.handleInputChange }
            value={ searchInputText }
            onKeyDown={ this.handleKeyDown }
          />

          <button
            data-testid="search-artist-button"
            disabled={ buttonDisabled }
            onClick={ this.handleSearchClick }
          >
            <span className="material-symbols-outlined">
              search
            </span>
          </button>
        </div>
        {
          showLoading ? (<Loading />)
            : (
              <div>
                <h3>
                  {
                    albums.length > 0 ? `Resultado de álbuns de: ${artist}`
                      : 'Nenhum álbum foi encontrado'
                  }
                </h3>
                {albums.map((album, index) => (
                  <Link
                    key={ index }
                    to={ `/album/${album.collectionId}` }
                    data-testid={ `link-to-album-${album.collectionId}` }
                  >
                    <div
                      className="album--card"
                      key={ index }
                    >
                      {album.collectionName}

                    </div>
                  </Link>
                ))}
              </div>
            )
        }

      </div>
    );
  }
}
