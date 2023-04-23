import React, { Component } from 'react';
import gif from '../media/images/title_marching.gif';

export default class TitleSmall extends Component {
  render() {
    return (
      <div className="TitleSmall">
        <img src={ gif } alt="marching" className="TitleSmall__img" />
        <h2>The Tunes Parade</h2>
      </div>
    );
  }
}
