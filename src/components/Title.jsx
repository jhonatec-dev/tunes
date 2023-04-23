import React, { Component } from 'react';
import gif from '../media/images/title_marching.gif';

export default class Title extends Component {
  render() {
    return (
      <div className="Title">
        <img src={ gif } alt="marching" className="title__gif" />
        <h1>The Tunes Parade</h1>
      </div>
    );
  }
}
