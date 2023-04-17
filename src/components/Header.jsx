import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import userImg from '../media/images/man.png';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  state = {
    showLoading: true,
    userName: '',
  };

  async componentDidMount() {
    const { name } = await getUser();
    this.setState({ userName: name, showLoading: false });
  }

  render() {
    const { showLoading, userName } = this.state;
    return (
      <div data-testid="header-component">
        {
          showLoading
            ? (<Loading />)
            : (
              <div className="Header">
                <nav>
                  <Link
                    data-testid="link-to-search"
                    to="/search"
                    className="Button"
                  >
                    Pesquisar

                  </Link>
                  <Link
                    data-testid="link-to-favorites"
                    to="/favorites"
                    className="Button"
                  >
                    Favoritos

                  </Link>
                  <Link
                    data-testid="link-to-profile"
                    to="/profile"
                    className="Button"
                  >
                    Perfil

                  </Link>
                </nav>
                <div className="user-data">
                  <h4 data-testid="header-user-name">{userName}</h4>
                  <img src={ userImg } alt={ userName } className="img__user" />
                </div>
              </div>
            )
        }
      </div>
    );
  }
}
