import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={ (props) => <Login { ...props } /> } />
          <Route
            path="/search"
            render={ () => (
              <Header>
                <Search />
              </Header>
            ) }
          />
          <Route
            path="/album/:id"
            render={ () => (
              <Header>
                <Album />
              </Header>
            ) }
          />
          <Route
            path="/favorites"
            render={ () => (
              <Header>
                <Favorites />
              </Header>
            ) }
          />
          <Route
            path="/profile/edit"
            render={ () => (
              <Header>
                <ProfileEdit />
              </Header>
            ) }
          />
          <Route
            path="/profile"
            render={ () => (
              <Header>
                <Profile />
              </Header>
            ) }
          />
          <Route path="*" render={ () => <NotFound /> } />
        </Switch>
      </Router>
    );
  }
}

export default App;
