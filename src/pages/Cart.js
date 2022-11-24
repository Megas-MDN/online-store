import React, { Component } from 'react';
import './Cart.css';
import PropTypes from 'prop-types';

export default class Cart extends Component {
  constructor() {
    super();
    this.state = {
      cart: [],
    };
  }

  componentDidMount() {
    this.getNoLocalStorage();
    this.setState({
      ...this.objUnico(),
    });
  }

  getNoLocalStorage = () => {
    const cartItens = JSON.parse(window.localStorage.getItem('cart'));
    if (cartItens) {
      this.setState(({
        cart: [...cartItens],
      }));
    }
  };

  objUnico = () => {
    const cart = JSON.parse(window.localStorage.getItem('cart'));
    if (cart) {
      const objItems = cart.reduce((a, b) => (
        { ...a,
          [b.id]: (a[b.id] + 1 || 1),
        }), {});
      return objItems;
    }
    return {};
  };

  filterArray = () => {
    const { cart } = this.state;
    const newArray = [];
    cart.forEach((element) => {
      if (!(newArray.some((e) => e.id === element.id))) newArray.push(element);
    });
    return newArray;
  };

  addItem = ({ target: { name } }) => {
    const obj = JSON.parse(name);
    const { state } = this;
    // console.log(obj.available_quantity); // requisito 14
    if (state[obj.id] < obj.available_quantity) {
      this.setState((prev) => ({
        [obj.id]: prev[obj.id] + 1,
      }));
    }
  };

  substractItem = ({ target: { name } }) => {
    const { state } = this;
    const obj = JSON.parse(name);

    if (state[obj.id] > 1) {
      this.setState((prev) => ({
        [obj.id]: prev[obj.id] - 1,
      }));
    }
  };

  handleCheckout = () => {
    const { history } = this.props;
    history.push('/checkout');
  };

  removeItems = ({ target: { name } }) => {
    const { cart } = this.state;
    const obj = JSON.parse(name);
    console.log(obj.id);
    const arrSemOItem = cart.filter((prod) => prod.id !== obj.id);
    localStorage.setItem('cart', JSON.stringify(arrSemOItem));
    this.getNoLocalStorage();
  };

  render() {
    const { state } = this;
    const { cart } = state;
    const arrUnico = this.filterArray();
    //
    //
    // const myArrUnico = cart.reduce((a, b) => ({
    //   ...a,
    //   [b?.id]: b,
    // }), {});
    // console.log('Arr de obj Unico', myArrUnico);
    // console.log('Array do cart', cart);
    //
    //
    //
    return (
      <div className="cart-container">
        {
          cart.length > 0
            ? arrUnico.map((element, i) => (
              <div key={ `${i}a` } className="o-cart">
                <div className="card-cart">
                  <p
                    data-testid="shopping-cart-product-name"
                  >
                    {element.title}
                  </p>
                  <img src={ element.thumbnail } alt={ element.title } />
                  <p data-testid="shopping-cart-product-quantity">
                    { state[element.id] }
                  </p>
                  <p>
                    {element.price}
                  </p>

                </div>
                <div className="botoes-do-cart">
                  <button
                    type="button"
                    data-testid="product-increase-quantity"
                    onClick={ this.addItem }
                    name={ JSON.stringify(element) }
                  >
                    Acrescentar
                  </button>
                  <button
                    type="button"
                    data-testid="product-decrease-quantity"
                    onClick={ this.substractItem }
                    name={ JSON.stringify(element) }
                  >
                    Diminuir
                  </button>
                  <button
                    type="button"
                    data-testid="remove-product"
                    onClick={ this.removeItems }
                    name={ JSON.stringify(element) }
                  >
                    Remover
                  </button>
                </div>
              </div>
            )) : <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        }
        <button
          data-testid="checkout-products"
          onClick={ this.handleCheckout }
          type="button"
        >
          Checkout

        </button>
      </div>
    );
  }
}

Cart.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
