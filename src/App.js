import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Player from './components/Player';
import './css/style.css';
import './index.css';
import welcomeAudioUrl from './media/sounds/Welcome.mp3';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

const welcomeAudio = new Audio(welcomeAudioUrl);

// Fallen Angel, come and kiss me kkkk
class App extends React.Component {
  state = {
    playlist: [],
    playing: 0,
    audio: new Audio(),
    music: {},
    isLogged: true,
    volume: 35,
    mainContentStyle: {},
  };

  playSongClick = (playlist, playing) => {
    welcomeAudio.pause();
    const { audio, volume } = this.state;
    audio.pause();
    const music = playlist[playing];
    const newAudio = new Audio(music.previewUrl);
    const reff = 100;
    newAudio.volume = volume / reff;
    newAudio.onended = this.nextSong;
    this.setState(
      { playlist,
        playing,
        music,
        audio: newAudio,
        mainContentStyle: {
          height: 'calc(100vh - var(--heigth))',
          overflowY: 'scroll',
        } },
      () => { newAudio.play(); },
    );
  };

  nextSong = () => {
    const { playlist, volume } = this.state;
    let { playing, audio } = this.state;
    audio.pause();
    if (playing < playlist.length - 1) {
      playing += 1;
    } else {
      playing = 0;
    }
    const music = playlist[playing];
    audio = new Audio(music.previewUrl);
    const reff = 100;
    audio.volume = volume / reff;
    audio.onended = this.nextSong;
    this.setState({ playlist, playing, music, audio }, () => { audio.play(); });
  };

  changeVolume = (_ev, volume) => {
    const reff = 100;
    this.setState({ volume });
    const { audio } = this.state;
    audio.volume = volume / reff;
  };

  setIsLogged = () => {
    this.setState({ isLogged: true });
  };

  render() {
    const { isLogged, music, audio, playlist, volume, mainContentStyle } = this.state;
    return (
      <main>
        {isLogged && playlist.length > 0
        && <Player
          music={ music }
          audio={ audio }
          volume={ volume }
          changeVolume={ this.changeVolume }
          nextSong={ this.nextSong }
        /> }
        <section className="main__content" style={ mainContentStyle }>
          <Switch>
            <Route
              exact
              path="/"
              render={
                (props) => (<Login
                  { ...props }
                  setIsLogged={ this.setIsLogged }
                  audio={ welcomeAudio }
                />)
              }
            />
            <Route exact path="/search" component={ Search } />
            <Route
              exact
              path="/album/:id"
              render={
                (props) => <Album { ...props } playSongClick={ this.playSongClick } />
              }
            />
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
        </section>

      </main>
    );
  }
}

export default App;
