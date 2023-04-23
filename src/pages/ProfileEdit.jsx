import PropTypes from 'prop-types';
import React, { Component } from 'react';
import validator from 'validator';
import AvatarSelect from '../components/AvatarSelect';
import Button from '../components/Button';
import Header from '../components/Header';
import Loading from '../components/Loading';
import avatars from '../data/avatars';
import { getUser, updateUser } from '../services/userAPI';

export default class ProfileEdit extends Component {
  state = {
    name: '',
    description: '',
    email: '',
    showLoading: true,
    buttonDisabled: true,
    selIndexAvatar: 0,
  };

  async componentDidMount() {
    const { name = '', description = '', image = '', email = '' } = await getUser();
    const selIndexAvatar = avatars.findIndex((av) => av.img === image) || 0;
    this.setState({
      name,
      description,
      selIndexAvatar,
      email,
      showLoading: false,
    });
  }

  handleSaveButtonClick = () => {
    const { history } = this.props;
    history.push('/profile');
    this.setState({ showLoading: true });
    const { description, email, name, selIndexAvatar } = this.state;
    updateUser({ description, email, image: avatars[selIndexAvatar].img, name });
  };

  validateFormValues = () => {
    const { name, description, email } = this.state;
    const valName = !validator.isEmpty(name);
    const valEmail = validator.isEmail(email);
    const valDescription = !validator.isEmpty(description);
    // const valImage = !validator.isEmpty(image);

    this.setState({
      buttonDisabled: !(valName && valEmail && valDescription),
    });
  };

  handleInputChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    });
    this.validateFormValues();
  };

  setSelIndexAvatar = (selIndexAvatar) => {
    this.setState({ selIndexAvatar });
    this.validateFormValues();
  };

  render() {
    const { showLoading, buttonDisabled, selIndexAvatar,
      name, description, email } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {
          showLoading ? <Loading />
            : (
              <div>
                <div className="ProfileEdit">
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
                  <AvatarSelect
                    setSelIndexAvatar={ this.setSelIndexAvatar }
                    initialIndex={ selIndexAvatar }
                  />
                  {/* <label htmlFor="edit-input-image">Imagem</label>
                  <input
                    type="text"
                    name="image"
                    value={ image }
                    id="edit-input-image"
                    data-testid="edit-input-image"
                    required
                    onChange={ this.handleInputChange }
                  /> */}
                  <Button
                    data-testid="edit-button-save"
                    onClick={ this.handleSaveButtonClick }
                    disabled={ buttonDisabled }
                    text="Salvar"
                    icon="save"
                    className="Button"
                  />
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
