import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Loading from '../pages/Loading';

class MusicCards extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.setState({ loading: false });
  }

  componentWillUnmount() {
    this.setState({ loading: true });
  }

  render() {
    const { music, handleFavorite, isChecked } = this.props;
    const { loading } = this.state;

    return loading ? (
      <Loading />
    ) : (
      <section>
        <p>{music.trackName}</p>
        <audio data-testid="audio-component" src={ music.previewUrl } controls>
          <track kind="captions" />
        </audio>
        <label htmlFor="favorite">
          Favorita
          <input
            data-testid={ `checkbox-music-${music.trackId}` }
            type="checkbox"
            name="favorite"
            defaultChecked={ isChecked }
            onClick={ () => handleFavorite(music) }
          />
        </label>
      </section>
    );
  }
}

MusicCards.propTypes = {
  handleFavorite: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
  music: PropTypes.shape({
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
    trackName: PropTypes.string,
  }).isRequired,
};

export default MusicCards;
