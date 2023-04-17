import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
              <div>
                <nav>
                  <Link data-testid="link-to-search" to="/search">Pesquisar</Link>
                  <Link data-testid="link-to-favorites" to="/favorites">Favoritos</Link>
                  <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
                </nav>
                <h1 data-testid="header-user-name">{`Bem-vindo ${userName}`}</h1>
              </div>
            )
        }
      </div>
    );
  }
}
