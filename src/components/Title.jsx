import PropTypes from 'prop-types';
import React, { Component } from 'react';
import gif from '../media/images/title_marching.gif';

export default class Title extends Component {
  render() {
    const { text } = this.props;
    return (
      <div className="Title">
        <img src={ gif } alt="marching" className="title__gif" />
        <h1>The Tunes Parade</h1>
        {text.length > 0 && <p>{text}</p>}
      </div>
    );
  }
}

Title.defaultProps = {
  text: '',
};

Title.propTypes = {
  text: PropTypes.string,
};
