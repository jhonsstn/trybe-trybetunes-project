import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      artwork: '',
      artistName: '',
      collectionName: '',
      musics: [],
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const response = await getMusics(id);

    // console.log(musicArray);
    this.setState({
      musics: response.filter((item) => item !== response[0]),
      artwork: response[0].artworkUrl100,
      artistName: response[0].artistName,
      collectionName: response[0].collectionName,
    });
  }

  removeFirst = ([, ...rest]) => rest;

  render() {
    const { artwork, artistName, collectionName, musics } = this.state;
    return (
      <section data-testid="page-album">
        <div>
          <img src={ artwork } alt={ collectionName } />
          <p data-testid="artist-name">{artistName}</p>
          <p data-testid="album-name">{collectionName}</p>
        </div>
        <div>
          {musics.map((music) => (
            <MusicCard key={ nanoid() } music={ music } />
          ))}
        </div>
      </section>
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
