import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

export default class Profile extends Component {
  state = {
    showLoading: false,
    description: '',
    email: '',
    image: '',
    name: '',
  };

  componentDidMount() {
    this.getUser();
  }

  getUser = async () => {
    this.setState({ showLoading: true });
    const { description, email, image, name } = await getUser();
    this.setState({ showLoading: false, description, email, image, name });
  };

  render() {
    const { showLoading, description, email, image, name } = this.state;

    return (
      <div data-testid="page-profile">
        <Header />
        {
          showLoading ? <Loading />
            : (
              <div>
                <img
                  data-testid="profile-image"
                  src={ image }
                  alt={ name }
                />
                <h3>Nome</h3>
                <p>{name}</p>
                <h3>Descrição</h3>
                <p>{description}</p>
                <h3>E-MAIL</h3>
                <p>{email}</p>
                <Link to="/profile/edit">Editar perfil</Link>
              </div>
            )
        }
      </div>
    );
  }
}
