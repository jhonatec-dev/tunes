import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

export default class Login extends Component {
  state = {
    nameInput: '',
    buttonDisabled: true,
    showLoading: false,
  };

  handleNameInputChange = ({ target }) => {
    const minLength = 3;
    this.setState({
      nameInput: target.value,
      buttonDisabled: target.value.length < minLength,
    });
  };

  handleLoginClick = async () => {
    const { nameInput } = this.state;
    const { history } = this.props;
    this.setState({ showLoading: true });
    await createUser({ name: nameInput });
    history.push('/search');
  };

  render() {
    const { buttonDisabled, showLoading } = this.state;
    return (
      <div data-testid="page-login">
        {showLoading
          ? (<Loading />)
          : (
            <div className="Login">
              <label htmlFor="login-name-input">Digite seu nome para entrar</label>
              <input
                type="text"
                name="login-name-input"
                id="login-name-input"
                placeholder="Digite aqui"
                data-testid="login-name-input"
                onChange={ this.handleNameInputChange }
              />
              <button
                data-testid="login-submit-button"
                disabled={ buttonDisabled }
                onClick={ this.handleLoginClick }
              >
                Entrar

              </button>
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
};
