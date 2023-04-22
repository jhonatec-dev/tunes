import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactSlider from 'react-slider';
import thumbImg from '../media/images/thumb.gif';
import Button from './Button';

export default class Player extends Component {
  state = {
    time: '',
    duration: '',
    currentTime: 0,
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
      duration: this.convertSeconds(durationAudio),
      currentTime: audio.currentTime });
  };

  playPauseMusic = () => {
    const { audio } = this.props;
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  };

  onAfterChangeTrackBar = (value) => {
    const { audio } = this.props;
    audio.currentTime = value;
  };

  renderTrackBar = () => {
    const { audio } = this.props;
    const { currentTime } = this.state;
    const durationAudio = Number.isNaN(audio.duration) ? 0 : Math.floor(audio.duration);
    return (<ReactSlider
      className="horizontal-slider"
      thumbClassName="example-thumb"
      trackClassName="example-track"
      onAfterChange={ this.onAfterChangeTrackBar }
      max={ durationAudio }
      value={ currentTime }
      renderThumb={ (props) => (
        <div { ...props }>
          <img className="example-thumb-img" src={ thumbImg } alt="thumb" />
        </div>) }
    />);
  };

  getVolumeIconText = (vol) => {
    let result;
    const volume = vol;
    const mute = 0;
    const down = 35;
    if (volume === mute) {
      result = 'volume_mute';
    } else if (volume < down) {
      result = 'volume_down';
    } else {
      result = 'volume_up';
    }

    return result;
  };

  volIconClick = () => {
    const { volume, changeVolume } = this.props;
    const minVol = 35;
    const newVolume = volume === 0 ? minVol : 0;
    changeVolume(newVolume);
  };

  renderVolumeTrackBar = () => {
    const { volume, changeVolume } = this.props;
    const volumeIconText = this.getVolumeIconText(volume);
    return (
      <div className="volume-slider-container">
        <span
          className="material-symbols-outlined volume-slider-icon"
          onClick={ this.volIconClick }
          role="button"
          aria-hidden
        >
          {
            volumeIconText
          }
        </span>
        <ReactSlider
          className="volume-slider"
          thumbClassName="volume-thumb"
          trackClassName="volume-track"
          onAfterChange={ changeVolume }
          max={ 100 }
          value={ volume }
          renderThumb={ (props) => <div { ...props }>J</div> }
        />
      </div>);
  };

  render() {
    const { music, nextSong, audio } = this.props;
    const { time, duration } = this.state;
    return (
      <div className="Player__container">
        <div className="Slider">
          {this.renderTrackBar()}
        </div>
        <div className="Player">
          <div>
            <img src={ music.artworkUrl60 } alt={ music.trackName } />
          </div>
          <div className="track__info">
            <h3>{music.trackName}</h3>
            <p>{`${music.collectionName} - ${music.artistName}`}</p>
            <p>{`${time} / ${duration}`}</p>
          </div>
          <div className="play__next__buttons">
            <div style={ { display: 'flex', justifyContent: 'flex-end' } }>
              <Button
                className="material-symbols-outlined Button"
                text=""
                icon={ audio.paused ? 'play_arrow' : 'pause' }
                onClick={ this.playPauseMusic }
              />
              <Button
                className="material-symbols-outlined Button"
                text=""
                icon="skip_next"
                onClick={ nextSong }
              />

            </div>
            {this.renderVolumeTrackBar()}
          </div>

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
    collectionName: PropTypes.string,
  }).isRequired,
  nextSong: PropTypes.func.isRequired,
  volume: PropTypes.number.isRequired,
  changeVolume: PropTypes.func.isRequired,
};
