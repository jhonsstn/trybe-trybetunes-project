import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      isDisabled: true,
      isMounted: false,
    };
  }

  handleInputChange = ({ target }) => {
    const { type, name, value, checked } = target;
    this.setState(
      {
        [name]: type === 'checkbox' ? checked : value,
      },
      () => this.enableButton(value),
    );
  };

  handleLogin = async () => {
    this.setState({ isMounted: true });
    const { name } = this.state;
    const { history } = this.props;
    await createUser({ name });
    history.push('/search');
  };

  enableButton = (value) => {
    const minChars = 3;
    if (value.length >= minChars) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  };

  render() {
    const { name, isDisabled, isMounted } = this.state;
    return isMounted ? (
      <Loading />
    ) : (
      <div data-testid="page-login">
        <input
          data-testid="login-name-input"
          name="name"
          type="text"
          value={ name }
          onChange={ this.handleInputChange }
        />

        <button
          data-testid="login-submit-button"
          type="button"
          onClick={ this.handleLogin }
          disabled={ isDisabled }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
