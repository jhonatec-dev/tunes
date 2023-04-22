import PropTypes from 'prop-types';
import React, { Component } from 'react';
import AvatarSelect from '../components/AvatarSelect';
import Button from '../components/Button';
import Loading from '../components/Loading';
import Title from '../components/Title';
import avatars from '../data/avatars';
import { createUser } from '../services/userAPI';

export default class Login extends Component {
  state = {
    nameInput: '',
    buttonDisabled: true,
    showLoading: false,
    selIndexAvatar: 0,
  };

  handleNameInputChange = ({ target }) => {
    const minLength = 3;
    this.setState({
      nameInput: target.value,
      buttonDisabled: target.value.length < minLength,
    });
  };

  handleLoginClick = async () => {
    const { nameInput, selIndexAvatar } = this.state;
    const { history, setIsLogged } = this.props;
    this.setState({ showLoading: true });
    await createUser({ name: nameInput, image: avatars[selIndexAvatar].img });
    setIsLogged();
    history.push('/search');
  };

  handleKeyDown = ({ keyCode }) => {
    const enterKeyCode = 13;
    if (keyCode === enterKeyCode) {
      this.handleLoginClick();
    }
  };

  setSelIndexAvatar = (selIndexAvatar) => this.setState({ selIndexAvatar });

  render() {
    const { buttonDisabled, showLoading } = this.state;
    return (
      <div data-testid="page-login" className="Login__container">
        <Title />
        {showLoading
          ? (<Loading />)
          : (
            <div className="Login">
              <AvatarSelect setSelIndexAvatar={ this.setSelIndexAvatar } />
              <label htmlFor="login-name-input">Digite seu nome para entrar</label>
              <input
                type="text"
                name="login-name-input"
                id="login-name-input"
                placeholder="Digite aqui"
                data-testid="login-name-input"
                onChange={ this.handleNameInputChange }
                onKeyDown={ this.handleKeyDown }
              />
              <Button
                data-testid="login-submit-button"
                disabled={ buttonDisabled }
                onClick={ this.handleLoginClick }
                text="Entrar"
                icon="login"
                className="Button"
              />

            </div>
          )}

      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  setIsLogged: PropTypes.func.isRequired,
};
