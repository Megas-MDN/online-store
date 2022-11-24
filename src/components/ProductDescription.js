import React from 'react';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';
import './ProductDescription.css';
import Produto from './Produto';

const objPadrao = {
  email: '',
  rating: 0,
  text: '',
  cartSize: 0,
};
class ProductDescription extends React.Component {
  constructor() {
    super();
    this.state = {
      dado: {},
      ...objPadrao,
      invalidos: false,
      avaliacoes: [],
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const local = localStorage.getItem(id);
    getProductById(id)
      .then((response) => this.setState({
        dado: response,
        avaliacoes: (JSON.parse(local) || []),
      }));
    this.attCartSize();
  }

  addCart = () => {
    const { dado } = this.state;
    const local = localStorage.getItem('cart');
    if (local) {
      const arr = JSON.parse(local);
      const novoLocal = [...arr, dado];
      localStorage.setItem('cart', JSON.stringify(novoLocal));
    } else {
      localStorage.setItem('cart', JSON.stringify([dado]));
    }
    this.attCartSize();
    // });
  };

  pegaAvaliacoes = () => {
    const { dado } = this.state;
    const local = localStorage.getItem(dado.id);
    if (local) return JSON.parse(local);
    return [];
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  validaCampos = () => {
    const regx = /\S+@\S+\.\S+/;
    const { email, rating, text, dado } = this.state;
    // console.log(dado.id);
    const local = this.pegaAvaliacoes();
    const emailValido = regx.test(email);
    if (rating && emailValido) {
      const obj = { email, text, rating };
      localStorage.setItem(dado.id, JSON.stringify([...local, obj]));
      this.setState({
        ...objPadrao,
        invalidos: false,
        avaliacoes: this.pegaAvaliacoes(),
      });
    } else {
      this.setState({
        invalidos: true,
      });
    }
  };

  attCartSize = () => {
    const local = localStorage.getItem('cart');
    if (local) {
      const tam = JSON.parse(local).length;
      this.setState({
        cartSize: tam,
      });
    }
  };

  render() {
    const { dado, email, text, invalidos, avaliacoes, cartSize } = this.state;
    const { history } = this.props;
    console.log(dado);
    return (
      <div className="detail-container">
        <Produto dado={ dado } />
        <p data-testid="shopping-cart-size">{cartSize}</p>
        <button
          data-testid="shopping-cart-button"
          type="button"
          onClick={ () => history.push('/Cart') }
        >
          Carrinho de Compras
        </button>
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ this.addCart }
        >
          Adicionar ao carrinho
        </button>
        <form className="avaliacao">
          <label htmlFor="email" className="email">
            E-mail
            <input
              type="email"
              name="email"
              id="email"
              value={ email }
              onChange={ this.handleChange }
              data-testid="product-detail-email"
            />
          </label>
          <div className="nota">
            <label htmlFor="nota1">
              1
              <input
                type="radio"
                name="rating"
                id="nota1"
                value={ 1 }
                data-testid="1-rating"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="nota2">
              2
              <input
                type="radio"
                name="rating"
                id="nota2"
                value={ 2 }
                data-testid="2-rating"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="nota3">
              3
              <input
                type="radio"
                name="rating"
                id="nota3"
                value={ 3 }
                data-testid="3-rating"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="nota4">
              4
              <input
                type="radio"
                name="rating"
                id="nota4"
                value={ 4 }
                data-testid="4-rating"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="nota5">
              5
              <input
                type="radio"
                name="rating"
                id="nota5"
                value={ 5 }
                data-testid="5-rating"
                onChange={ this.handleChange }
              />
            </label>
          </div>
          <label htmlFor="text" className="cometario">
            Cometário
            <textarea
              name="text"
              id="text"
              cols="20"
              rows="7"
              data-testid="product-detail-evaluation"
              value={ text }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            data-testid="submit-review-btn"
            className="btn"
            onClick={ this.validaCampos }
          >
            Avaliar
          </button>
        </form>
        {invalidos && <p data-testid="error-msg">Campos inválidos</p>}
        <ul className="avaliacoes-dadas">
          <p>parte com as avaliações</p>
          {avaliacoes.map((el, i) => (
            <li key={ el.email + i }>
              <p data-testid="review-card-email">{el.email}</p>
              <p data-testid="review-card-rating">{el.rating}</p>
              <p data-testid="review-card-evaluation">{el.text}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
export default ProductDescription;
ProductDescription.defaultProps = {
  history: () => {},
  match: '',
};
ProductDescription.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};
