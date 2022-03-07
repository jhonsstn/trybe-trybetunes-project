import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Album extends Component {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {
    const { toggleLoading } = this.props;
    toggleLoading(false);
  }

  render() {
    return <div data-testid="page-album">Album</div>;
  }
}

Album.propTypes = {
  toggleLoading: PropTypes.func.isRequired,
};

export default Album;
