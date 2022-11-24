import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      email: '',
      cpf: '',
      phone: '',
      cep: '',
      endereço: '',
      drone: false,
      forms: true,
    };
  }

  validateForm = () => {
    const { nome, email, cpf, phone, cep, endereço, drone } = this.state;
    if (nome.length === 0 || email.length === 0 || cpf.length === 0 || phone.length === 0
        || cep.length === 0 || endereço.length === 0 || !drone) return true;
  };

  onInputChange = (event) => {
    const { name, type, checked } = event.target;
    const value = type === 'radio' ? checked : event.target.value;
    this.setState({
      [name]: value,
    });
  };

  handleClick = (event) => {
    const { history } = this.props;
    event.preventDefault();
    if (this.validateForm()) {
      this.setState({
        forms: false,
      });
    } else {
      history.push('/');
      localStorage.clear();
    }
  };

  filterArray = () => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const newArray = [];
    cart.forEach((element) => {
      if (!(newArray.some((e) => e.id === element.id))) newArray.push(element);
    });
    return newArray;
  };

  render() {
    const cartItems = this.filterArray();
    const { nome, email, cpf, phone, cep, endereço, forms } = this.state;
    return (
      <>
        {
          cartItems.map((element) => (
            <p key={ element.id }>{ element.title }</p>
          ))
        }
        <form>
          <label htmlFor="input_name">
            Nome
            <input
              onChange={ this.onInputChange }
              value={ nome }
              type="text"
              data-testid="checkout-fullname"
              id="input_name"
              name="nome"
              required
            />
          </label>
          <label htmlFor="input_email">
            Email
            <input
              onChange={ this.onInputChange }
              value={ email }
              name="email"
              type="text"
              data-testid="checkout-email"
              id="input_email"
              required
            />
          </label>
          <label htmlFor="input_cpf">
            CPF
            <input
              onChange={ this.onInputChange }
              value={ cpf }
              name="cpf"
              type="text"
              data-testid="checkout-cpf"
              id="input_cpf"
              required
            />
          </label>
          <label htmlFor="input_phone">
            Telefone
            <input
              onChange={ this.onInputChange }
              value={ phone }
              name="phone"
              type="text"
              data-testid="checkout-phone"
              id="input_phone"
              required
            />
          </label>
          <label htmlFor="input_cep">
            CEP
            <input
              onChange={ this.onInputChange }
              value={ cep }
              name="cep"
              type="text"
              data-testid="checkout-cep"
              id="input_cep"
              required
            />
          </label>
          <label htmlFor="input_address">
            Endereço
            <input
              onChange={ this.onInputChange }
              value={ endereço }
              name="endereço"
              type="text"
              data-testid="checkout-address"
              id="input_address"
              required
            />
          </label>
          <fieldset>
            <legend>Selecione o metodo de pagamento</legend>
            <label htmlFor="boleto">
              <input
                onChange={ this.onInputChange }
                data-testid="ticket-payment"
                type="radio"
                id="boleto"
                name="drone"
                value="boleto"
                required
              />
              Boleto

            </label>

            <label htmlFor="visa">
              <input
                onChange={ this.onInputChange }
                data-testid="visa-payment"
                type="radio"
                id="visa"
                name="drone"
                value="visa"
                required
              />
              Visa

            </label>

            <label htmlFor="master">
              <input
                onChange={ this.onInputChange }
                data-testid="master-payment"
                type="radio"
                id="master"
                name="drone"
                value="master"
                required
              />
              Mastercard

            </label>

            <label htmlFor="elo">
              <input
                onChange={ this.onInputChange }
                data-testid="elo-payment"
                type="radio"
                id="elo"
                name="drone"
                value="elo"
                required
              />
              Elo
            </label>

          </fieldset>
          <button
            type="submit"
            data-testid="checkout-btn"
            onClick={ this.handleClick }
          >
            Checkout

          </button>
          {
            forms || <p data-testid="error-msg">Campos inválidos</p>
          }
        </form>
      </>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
