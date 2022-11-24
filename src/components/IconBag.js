import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class IconBag extends Component {
  render() {
    const { cartSize } = this.props;
    return (
      <div className="bag">
        <Link
          to="/cart"
          data-testid="shopping-cart-button"
          className="material-symbols-outlined"
        >
          shopping_bag
        </Link>
        <p data-testid="shopping-cart-size" className="cart-size">{cartSize}</p>
      </div>
    );
  }
}

IconBag.propTypes = {
  cartSize: PropTypes.number.isRequired,
};
