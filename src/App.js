import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Player from './components/Player';
import './css/style.css';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

// Fallen Angel, come and kiss me kkkk
class App extends React.Component {
  state = {
    playlist: [{}],
    playing: 0,
  };

  playSongClick = (playlist, playing) => {
    this.setState({ playlist, playing });
  };

  render() {
    return (
      <main>
        <Player { ...this.state } />
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/search" component={ Search } />
          <Route exact path="/album/:id" component={ Album } />
          <Route
            exact
            path="/favorites"
            render={
              (props) => <Favorites { ...props } playSongClick={ this.playSongClick } />
            }
          />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </main>
    );
  }
}

export default App;
