import PropTypes from 'prop-types';
import React, { Component } from 'react';
import avatars from '../data/avatars';
import Button from './Button';

export default class AvatarSelect extends Component {
  state = {
    selIndex: 0,
  };

  componentDidMount() {
    const { initialIndex } = this.props;
    this.setState({ selIndex: initialIndex });
  }

  nextImg = () => {
    const { selIndex } = this.state;
    this.setState({
      selIndex: selIndex < avatars.length - 1 ? selIndex + 1 : 0,
    }, this.sendIndexAvatar);
  };

  prevImg = () => {
    const { selIndex } = this.state;
    this.setState({
      selIndex: selIndex === 0 ? avatars.length - 1 : selIndex - 1,
    }, this.sendIndexAvatar);
  };

  sendIndexAvatar = () => {
    const { setSelIndexAvatar } = this.props;
    const { selIndex } = this.state;
    setSelIndexAvatar(selIndex);
  };

  render() {
    const { selIndex } = this.state;
    return (
      <div className="AvatarSelect">
        <div>
          <h3>Avatar</h3>
          <p>{avatars[selIndex].name}</p>
        </div>
        <div className="avatar__carrousel">
          <Button icon="chevron_left" className="Button" onClick={ this.prevImg } />
          <img src={ avatars[selIndex].img } alt="avatar" />
          <Button icon="chevron_right" className="Button" onClick={ this.nextImg } />
        </div>
      </div>
    );
  }
}

AvatarSelect.defaultProps = {
  initialIndex: 0,
};

AvatarSelect.propTypes = {
  initialIndex: PropTypes.number,
  setSelIndexAvatar: PropTypes.func.isRequired,
};
