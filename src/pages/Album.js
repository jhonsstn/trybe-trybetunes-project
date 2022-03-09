import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import {
  getFavoriteSongs,
  addSong,
  removeSong,
} from '../services/favoriteSongsAPI';

import Loading from './Loading';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      artwork: '',
      artistName: '',
      collectionName: '',
      musics: [],
      favoriteSongs: [],
      loading: false,
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    this.updateFavorites();
    const response = await getMusics(id);
    this.setState({
      // .filter((item) => item !== response[0]),
      musics: response,
      artwork: response[0].artworkUrl100,
      artistName: response[0].artistName,
      collectionName: response[0].collectionName,
    });
  }

  updateFavorites = async () => {
    const favorites = await getFavoriteSongs();
    this.setState({
      loading: true,
      favoriteSongs: [...favorites],
    });
  };

  handleFavorite = async (music) => {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ loading: false }, async () => {
      if (favoriteSongs.some((song) => music.trackId === song.trackId)) {
        await removeSong(music);
      } else {
        await addSong(music);
      }
      this.setState({ loading: true });
    });
  };

  isFavorite = (music) => {
    const { favoriteSongs } = this.state;
    console.log(favoriteSongs);
    return favoriteSongs.some((song) => song.trackId === music.trackId);
  };

  removeFirst = ([, ...rest]) => rest;

  render() {
    const {
      artwork,
      artistName,
      collectionName,
      musics,
      loading,
      favoriteSongs,
    } = this.state;

    return loading ? (
      <section data-testid="page-album">
        <div>
          <img src={ artwork } alt={ collectionName } />
          <p data-testid="artist-name">{artistName}</p>
          <p data-testid="album-name">{collectionName}</p>
        </div>
        <div>
          {musics.map((music) => {
            if (music.trackId === undefined) {
              return null;
            }
            if (favoriteSongs.some((song) => song.trackId === music.trackId)) {
              return (
                <MusicCard
                  key={ music.trackId }
                  music={ music }
                  isChecked
                  // isChecked={ () => isFavorite(music) }
                  // isChecked={ favoriteSongs.some(
                  //   (song) => song.trackId === music.trackId,
                  // ) }
                  handleFavorite={ this.handleFavorite }
                  favoriteSongs={ favoriteSongs }
                />
              );
            }
            return (
              <MusicCard
                key={ music.trackId }
                music={ music }
                isChecked={ false }
                // isChecked={ () => isFavorite(music) }
                // isChecked={ favoriteSongs.some(
                //   (song) => song.trackId === music.trackId,
                // ) }
                handleFavorite={ this.handleFavorite }
                favoriteSongs={ favoriteSongs }
              />
            );
          })}
        </div>
      </section>
    ) : (
      <Loading />
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
