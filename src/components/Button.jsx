import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Button extends Component {
  render() {
    const { text, icon } = this.props;
    return (
      <button { ...this.props }>
        {icon.length > 0 && <span className="material-symbols-outlined">{icon}</span>}
        {text.length > 0 && <span>{text}</span>}
      </button>
    );
  }
}

Button.defaultProps = {
  icon: '',
  text: '',
};

Button.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.string,
};
