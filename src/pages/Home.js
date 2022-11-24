import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import IconBag from '../components/IconBag';
import Titulo from '../components/Titulo';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import './Home.css';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      apiData: [],
      apiResponse: [],
      cart: [],
      cartSize: 0,
    };
  }

  componentDidMount() {
    const local = localStorage.getItem('cart');
    getCategories()
      .then((result) => this.setState({
        apiData: result,
        cart: (local) ? JSON.parse(local) : [],
      }));
    this.attCartSize();
  }

  attCartSize = () => {
    const local = localStorage.getItem('cart');
    if (local) {
      const tam = JSON.parse(local).length;
      this.setState({
        cartSize: tam,
      });
    }
  };

  randomCart = ({ target: { id } }) => {
    this.setState((prev) => ({
      cart: [...prev.cart, JSON.parse(id)],
    }), () => {
      const { cart } = this.state;
      window.localStorage.setItem('cart', JSON.stringify(cart));
      this.attCartSize();
    });
  };

  handleApi = (inputName, inputValue) => {
    getProductsFromCategoryAndQuery(inputName, inputValue)
      .then((response) => this.setState({
        apiResponse: response.results,
      }));
  };

  handleClick = (event) => {
    const inputValue = event.target.parentNode.firstChild.value;
    this.handleApi(null, inputValue);
  };

  handleCategories = (event) => {
    const inputName = event.target.name;
    this.handleApi(inputName);
  };

  render() {
    const { apiData, apiResponse, cartSize } = this.state;
    return (
      <>
        <Titulo />
        <div className="lists home-container">
          <ul className="cat">
            {
              apiData.map((element) => (
                <li key={ element.id }>
                  <button
                    className="buttons-category"
                    data-testid="category"
                    type="button"
                    name={ element.id }
                    onClick={ this.handleCategories }
                  >
                    { element.name }
                  </button>
                </li>
              ))
            }
          </ul>
          <div className="produtos-e-pesquisa">
            <div className="inputs">
              <input
                type="text"
                data-testid="query-input"
              />
              <button
                className="buttons"
                onClick={ this.handleClick }
                data-testid="query-button"
                type="button"
              >
                Buscar
              </button>
              <IconBag cartSize={ cartSize } />
            </div>
            <p
              className="style-p-search"
              data-testid="home-initial-message"
            >
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
            <ul className="list-product">
              {
                apiResponse.length > 0 ? apiResponse.map((element) => (
                  <li data-testid="product" key={ element.id } className="card">
                    <Link
                      data-testid="product-detail-link"
                      to={ `/ProductDescription/${element.id}` }
                    >
                      {element.shipping.free_shipping && (
                        <p
                          data-testid="free-shipping"
                          className="frete-gratis"
                        >
                          Frete Grátis

                        </p>
                      )}
                      {!element.shipping.free_shipping && (
                        <p
                          data-testid="free-shipping"
                          className="frete-padrao"
                        >
                          Frete Padrão

                        </p>
                      )}
                      <p className="title-p">{element.title}</p>

                      <img
                        className="img"
                        src={ element.thumbnail }
                        alt={ element.title }
                      />

                      <p>{element.price}</p>
                    </Link>
                    <div className="Button-add">
                      <button
                        className="buttons"
                        data-testid="product-add-to-cart"
                        id={ JSON.stringify(element) }
                        type="button"
                        onClick={ this.randomCart }
                        name={ element.id }
                      >
                        Adiciona ao carrinho
                      </button>

                    </div>
                  </li>
                )) : <li className="empty">Nenhum produto foi encontrado</li>
              }
            </ul>
          </div>
        </div>
      </>
    );
  }
}
export default Home;
