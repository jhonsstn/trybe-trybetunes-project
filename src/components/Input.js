import React, { Component } from 'react';

class Input extends Component {
  constructor() {
    super();

    this.state = {
      search: '',
      isDisabled: true,
    };
  }

  handleInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState(
      {
        [name]: value,
      },
      () => this.enableButton(value),
    );
  };

  enableButton = (value) => {
    const minChars = 2;
    if (value.length >= minChars) {
      this.setState({
        isDisabled: false,
      });
    }
  };

  render() {
    const { search, isDisabled } = this.state;
    return (
      <div>
        <input
          data-testid="search-artist-input"
          name="search"
          type="text"
          value={ search }
          onChange={ this.handleInputChange }
        />
        <button
          data-testid="search-artist-button"
          type="button"
          disabled={ isDisabled }
        >
          Procurar
        </button>
      </div>
    );
  }
}

export default Input;
