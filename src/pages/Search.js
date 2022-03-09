import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import AlbumCard from '../components/AlbumCard';
import Input from '../components/Input';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
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
      isMounted: true,
    };
  }

  componentDidMount() {
    this.setState({ isMounted: false });
  }

  componentWillUnmount() {
    this.setState({ isMounted: true });
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
    const {
      isMounted,
      albums,
      isReady,
      artist,
      isEmpty,
      isSearched,
      search,
      isDisabled,
    } = this.state;

    return isMounted ? (
      <Loading />
    ) : (
      <>
        <div data-testid="page-search">
          <Input
            handleInputChange={ this.handleInputChange }
            enableButton={ this.enableButton }
            handleClick={ this.handleClick }
            search={ search }
            isDisabled={ isDisabled }
          />
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

export default Search;
