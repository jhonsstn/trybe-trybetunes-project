import PropTypes from 'prop-types';
import React, { Component } from 'react';

class MusicCards extends Component {
  render() {
    const { music } = this.props;
    return (
      <section>
        <p>{music.trackName}</p>
        <audio data-testid="audio-component" src={ music.previewUrl } controls>
          <track kind="captions" />
        </audio>
      </section>
    );
  }
}

MusicCards.propTypes = {
  music: PropTypes.shape({
    previewUrl: PropTypes.string,
    trackName: PropTypes.string,
  }).isRequired,
};

export default MusicCards;
