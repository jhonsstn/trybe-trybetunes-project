import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AlbumCard extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { collectionId, collectionName, artistName, artworkUrl100 } = this.props;
    return (
      <div>
        <Link
          data-testid={ `link-to-album-${collectionId}` }
          to={ `/album/${collectionId}` }
        >
          <img src={ artworkUrl100 } alt={ `${artistName} - ${collectionName}` } />
          <h1>{collectionName}</h1>
          <p>{artistName}</p>
        </Link>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  artistName: PropTypes.string.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
  collectionName: PropTypes.string.isRequired,
};

export default AlbumCard;
