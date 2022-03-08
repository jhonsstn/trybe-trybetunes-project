import React, { Component } from 'react';
import Input from '../components/Input';
import Loading from './Loading';

class Search extends Component {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {
    this.setState({ isMounted: false });
  }

  componentWillUnmount() {
    this.setState({ isMounted: true });
  }

  render() {
    const { isMounted } = this.state;
    return isMounted ? (
      <Loading />
    ) : (
      <div data-testid="page-search">
        <Input />
      </div>
    );
  }
}

export default Search;
