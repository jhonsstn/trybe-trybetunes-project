import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Input extends Component {
  render() {
    const { handleClick, handleInputChange, search, isDisabled } = this.props;

    return (
      <div>
        <input
          data-testid="search-artist-input"
          name="search"
          type="text"
          value={ search }
          onChange={ handleInputChange }
        />
        <button
          data-testid="search-artist-button"
          type="button"
          disabled={ isDisabled }
          onClick={ handleClick }
        >
          Procurar
        </button>
      </div>
    );
  }
}

Input.propTypes = {
  handleClick: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  search: PropTypes.string.isRequired,
};

export default Input;
