import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactSlider from 'react-slider';
import Button from './Button';

export default class Player extends Component {
  state = {
    time: '',
    duration: '',
    // volume: 0.1,
    // nextButtonClicked: false,
    // slider: '',
  };

  componentDidMount() {
    const timer = 300;
    setInterval(this.renderAudioInfo, timer);
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

  renderAudioInfo = () => {
    const { audio } = this.props;
    const durationAudio = Number.isNaN(audio.duration) ? 0 : audio.duration;
    this.setState({ time: this.convertSeconds(audio.currentTime),
      duration: this.convertSeconds(durationAudio) });
  };

  playPauseMusic = () => {
    const { audio } = this.props;
    if (audio.paused) {
      audio.play();
      this.setState({ statusButton: 'pause' });
    } else {
      audio.pause();
      this.setState({ statusButton: 'play_arrow' });
    }
  };

  render() {
    const { music, nextSong, audio } = this.props;
    const { time, duration } = this.state;
    return (
      <div className="Player">
        <div className="Slider">
          <ReactSlider
            className="horizontal-slider"
            thumbClassName="example-thumb"
            trackClassName="example-track"
            renderThumb={ (props, state) => <div { ...props }>{state.valueNow}</div> }
          />
        </div>

        <img src={ music.artworkUrl60 } alt={ music.trackName } />
        <div className="track__info">
          <h3>{music.trackName}</h3>
          <p>{music.artistName}</p>
        </div>
        <div className="play__next__buttons">
          <p className="time__song">{` ${time}/${duration}`}</p>
          <Button
            className="material-symbols-outlined Button isChecked"
            text={ audio.paused ? 'play_arrow' : 'pause' }
            onClick={ this.playPauseMusic }
          />
          <Button
            className="material-symbols-outlined Button isChecked"
            text="skip_next"
            onClick={ nextSong }
          />
        </div>

      </div>
    );
  }
}

Player.propTypes = {
  audio: PropTypes.shape({
    currentTime: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    duration: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    pause: PropTypes.func,
    paused: PropTypes.bool,
    play: PropTypes.func,
  }).isRequired,
  music: PropTypes.shape({
    artistName: PropTypes.string,
    artworkUrl100: PropTypes.string,
    artworkUrl60: PropTypes.string,
    trackName: PropTypes.string,
  }).isRequired,
  nextSong: PropTypes.func.isRequired,
};
