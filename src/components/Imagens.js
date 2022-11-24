import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Imagens extends Component {
  render() {
    const { imagens, mudaUrl } = this.props;
    return (
      <div className="flex-linha">
        {
          imagens.map((imag) => (
            <img
              key={ imag.id }
              src={ imag.url }
              alt={ imag.id }
              onMouseDownCapture={ mudaUrl }
              name={ imag.url }
            />
          ))
        }
      </div>
    );
  }
}

Imagens.propTypes = {
  imagens: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
  mudaUrl: PropTypes.func.isRequired,
};
