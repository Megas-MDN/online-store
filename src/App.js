import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ProductDescription from './components/ProductDescription';
import './App.css';

import Cart from './pages/Cart';
import Home from './pages/Home';
import Checkout from './components/Checkout';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/checkout" component={ Checkout } />
          <Route path="/ProductDescription/:id" component={ ProductDescription } />
          <Route path="/cart" component={ Cart } />
          <Route exact path="/" component={ Home } />
        </Switch>
      </BrowserRouter>
    );
  }
}
