import PropTypes from 'prop-types';
import React, { Component } from 'react';
import validator from 'validator';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

export default class ProfileEdit extends Component {
  state = {
    name: '',
    description: '',
    image: '',
    email: '',
    showLoading: true,
    buttonDisabled: true,
  };

  async componentDidMount() {
    const { name = '', description = '', image = '', email = '' } = await getUser();

    this.setState({
      name,
      description,
      image,
      email,
      showLoading: false,
    });
  }

  handleSaveButtonClick = async () => {
    this.setState({ showLoading: true });
    const { description, email, image, name } = this.state;
    await updateUser({ description, email, image, name });
    const { history } = this.props;
    history.push('/profile');
  };

  validateFormValues = () => {
    const { name, description, image, email } = this.state;
    const valName = !validator.isEmpty(name);
    const valEmail = validator.isEmail(email);
    const valDescription = !validator.isEmpty(description);
    const valImage = !validator.isEmpty(image);

    this.setState({
      buttonDisabled: !(valName && valEmail && valDescription && valImage),
    });
  };

  handleInputChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    });
    this.validateFormValues();
  };

  render() {
    const { showLoading, buttonDisabled,
      name, description, image, email } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {
          showLoading ? <Loading />
            : (
              <div>
                <div className="form">
                  <label htmlFor="edit-input-name">Nome</label>
                  <input
                    type="text"
                    name="name"
                    id="edit-input-name"
                    data-testid="edit-input-name"
                    required
                    value={ name }
                    onChange={ this.handleInputChange }
                  />
                  <label htmlFor="edit-input-email">E-mail</label>
                  <input
                    type="email"
                    name="email"
                    value={ email }
                    id="edit-input-email"
                    data-testid="edit-input-email"
                    required
                    onChange={ this.handleInputChange }
                  />
                  <label htmlFor="edit-input-description">Descrição</label>
                  <input
                    type="text"
                    value={ description }
                    name="description"
                    id="edit-input-description"
                    data-testid="edit-input-description"
                    required
                    onChange={ this.handleInputChange }
                  />
                  <label htmlFor="edit-input-image">Imagem</label>
                  <input
                    type="text"
                    name="image"
                    value={ image }
                    id="edit-input-image"
                    data-testid="edit-input-image"
                    required
                    onChange={ this.handleInputChange }
                  />
                  <button
                    data-testid="edit-button-save"
                    onClick={ this.handleSaveButtonClick }
                    disabled={ buttonDisabled }
                  >
                    Enviar

                  </button>
                </div>
              </div>
            )
        }
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
