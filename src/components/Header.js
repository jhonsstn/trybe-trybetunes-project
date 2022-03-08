import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      isLoading: true,
    };
  }

  async componentDidMount() {
    const user = await getUser();
    const { name } = user;
    this.setState({
      name,
      isLoading: false,
    });
  }

  render() {
    const { name, isLoading } = this.state;
    const { children } = this.props;
    return isLoading ? (
      <Loading />
    ) : (
      <>
        <header data-testid="header-component">
          <div>
            <h2>Header</h2>
            <span data-testid="header-user-name">{name}</span>
          </div>
        </header>
        <Link data-testid="link-to-search" to="/search">
          Buscar
        </Link>
        <Link data-testid="link-to-favorites" to="/favorites">
          Favoritas
        </Link>
        <Link data-testid="link-to-profile" to="/profile">
          Perfil
        </Link>
        <div>{children}</div>
      </>
    );
  }
}

Header.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Header;
