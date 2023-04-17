import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Button extends Component {
  render() {
    const { text } = this.props;
    return (
      <button { ...this.props }>{text}</button>
    );
  }
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
};
