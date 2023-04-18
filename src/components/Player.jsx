import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Player extends Component {
  state = {
    playlist: [],
    playing: 0,
    time: '',
    duration: '',
    volume: 0.2,
    audio: new Audio(''),
  };

  componentDidUpdate() {
    const { playlist: propPlaylist, playing: propPlaying } = this.props;
    const { playlist: statePlaylist, playing: statePlaying, volume, audio } = this.state;
    if (this.comparePL(propPlaylist, propPlaying, statePlaylist, statePlaying)) {
      audio.pause();
      const newSong = new Audio(propPlaylist[propPlaying].previewUrl);
      newSong.volume = volume;
      this.setState({
        playlist: propPlaylist,
        playing: propPlaying,
        audio: newSong,
      });
    }
    return true;
  }

  convertSeconds = (seg) => {
    const totalSeconds = Math.floor(seg);
    const oneMinute = 60;
    // 👇️ get the number of full minutes
    const minutes = Math.floor(totalSeconds / oneMinute);

    // 👇️ get the remainder of the seconds
    const seconds = totalSeconds % oneMinute;

    function padTo2Digits(num) {
      return num.toString().padStart(2, '0');
    }

    // ✅ format as MM:SS
    const result = `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
    return result; // 👉️ "09:25"
  };

  comparePL = (propPL, propP, statePL, statP) => JSON.stringify(statePL)
  !== JSON.stringify(propPL)
    || JSON.stringify(statP)
    !== JSON.stringify(propP);

  renderAudioInfo = () => {
    const { audio } = this.state;
    this.setState({ time: this.convertSeconds(audio.currentTime),
      duration: this.convertSeconds(audio.duration) });
  };

  playMusic = () => {
    const { audio } = this.state;
    audio.play();
    const timer = 500;
    setInterval(this.renderAudioInfo, timer);
  };

  getTime = () => {
    const { playing } = this.state;
    this.setState({ time: (playing.currentTime) });
  };

  render() {
    const { time, playlist, duration } = this.state;
    return (
      <div>
        Player
        <h1>Teste</h1>
        <button onClick={ this.playMusic }>Play</button>
        {playlist.length > 0 && <h2>DEU BOM EIN</h2> }
        <button onClick={ this.getTime }>playing</button>
        <h2>
          Time
          <span>{` ${time}/${duration}`}</span>
        </h2>
      </div>
    );
  }
}

Player.propTypes = {
  playing: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  playlist: PropTypes.arrayOf(PropTypes.shape({
    previewUrl: PropTypes.string,
  })).isRequired,
};
