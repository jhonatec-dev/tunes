import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import TitleSmall from './TitleSmall';

export default class Header extends Component {
  state = {
    showLoading: true,
    user: '',
  };

  async componentDidMount() {
    const user = await getUser();
    this.setState({ user, showLoading: false });
  }

  render() {
    const { showLoading, user } = this.state;
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
                </nav>
                <TitleSmall />
                <Link
                  className="user-data"
                  data-testid="link-to-profile"
                  to="/profile"
                >
                  <h4 data-testid="header-user-name">{user.name}</h4>
                  <img src={ user.image } alt={ user.name } className="img__user" />
                </Link>
              </div>
            )
        }
      </div>
    );
  }
}
