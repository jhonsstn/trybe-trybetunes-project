import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../pages/Loading';
import AlbumCard from './AlbumCard';

class Input extends Component {
  constructor() {
    super();

    this.state = {
      search: '',
      isDisabled: true,
      albums: [],
      isReady: false,
      isEmpty: true,
      isSearched: false,
      artist: '',
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
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  };

  handleClick = async () => {
    const { search } = this.state;
    this.setState({
      search: '',
      isReady: true,
      artist: search,
    });
    const searchResult = await searchAlbumsAPI(search);
    if (searchResult.length > 0) {
      this.setState({ isEmpty: false });
    }
    this.setState({
      albums: [...searchResult],
      isReady: false,
      isSearched: true,
    });
  };

  render() {
    const { search, isDisabled, albums, isReady } = this.state;
    const { artist, isEmpty, isSearched } = this.state;
    return (
      <>
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
            onClick={ this.handleClick }
          >
            Procurar
          </button>
        </div>
        {isSearched ? (
          <>
            {isReady || isEmpty ? <p>Nenhum álbum foi encontrado</p> : null}
            {isReady ? (
              <Loading />
            ) : (
              <section>
                {!isEmpty || isReady ? (
                  <>
                    <p>{`Resultado de álbuns de: ${artist}`}</p>
                    {albums.map((album) => (
                      <AlbumCard
                        collectionId={ album.collectionId }
                        key={ nanoid() }
                        collectionName={ album.collectionName }
                        artistName={ album.artistName }
                        artworkUrl100={ album.artworkUrl100 }
                      />
                    ))}
                  </>
                ) : null}
              </section>
            )}
          </>
        ) : null}
      </>
    );
  }
}

export default Input;
