import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Imagens from './Imagens';

export default class Produto extends Component {
  state = {
    url: '',
  };

  mudaUrl = ({ target }) => {
    console.log('entrou');
    this.setState({
      url: target.name,
    });
  };

  render() {
    const { url } = this.state;
    const { dado } = this.props;
    if (Object.keys(dado).length === 0) return null;
    console.log(dado);
    return (
      <div className="card-detalhes">
        <p data-testid="product-detail-name">
          {dado.title}
        </p>
        <div className="image-detalhes">
          <div className="images-container">
            <Imagens imagens={ dado.pictures } mudaUrl={ this.mudaUrl } />
            <img
              className="display-img"
              data-testid="product-detail-image"
              src={ (url || dado.pictures[0].url) }
              alt={ dado.title }
            />
          </div>
          <ul className="detalhes">
            {
              dado?.attributes.map((prod) => (
                <li key={ prod.id }>
                  <p>
                    {prod.name}
                    {' '}
                    <span>{prod.value_name}</span>
                  </p>
                </li>
              ))
            }
          </ul>
        </div>
        <p data-testid="product-detail-price">
          <span>R$</span>
          {' '}
          {dado.price}
        </p>
        {dado?.shipping?.free_shipping && (
          <p data-testid="free-shipping">
            Frete Grátis
          </p>
        )}
      </div>
    );
  }
}

Produto.propTypes = {
  dado: PropTypes.shape({
    attributes: PropTypes.shape({
      map: PropTypes.func,
    }),
    pictures: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    shipping: PropTypes.shape({
      free_shipping: PropTypes.bool,
    }).isRequired,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};
