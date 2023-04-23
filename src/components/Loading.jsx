import React, { Component } from 'react';
import { ScaleLoader } from 'react-spinners';

export default class Loading extends Component {
  render() {
    return (
      <div className="Loading">
        <p className="text__loading">Carregando...</p>
        <ScaleLoader color="#8927d5" />
      </div>
    );
  }
}
