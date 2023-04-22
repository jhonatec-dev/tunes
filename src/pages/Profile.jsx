import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
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
              <div className="UserCard">
                <img
                  data-testid="profile-image"
                  src={ image }
                  alt={ name }
                />
                <h3>Nome</h3>
                <h2>{name}</h2>
                <h3>Descrição</h3>
                <h2>{description}</h2>
                <h3>E-mail</h3>
                <h2>{email}</h2>
                <Link to="/profile/edit">
                  <Button
                    className="Button"
                    text="Editar perfil"
                    icon="manage_accounts"
                  />

                </Link>
              </div>
            )
        }
      </div>
    );
  }
}
