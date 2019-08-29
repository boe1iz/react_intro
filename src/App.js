import React, { Component } from 'react';
import Navi from './Navi';
import CategoryList from './CategoryList';
import ProductList from './ProductList';
import { Container, Row, Col } from 'reactstrap';
import alertify from 'alertifyjs';

export default class App extends Component {
  state = { currentCategory: '', products: [], cart: [] };

  changeCategory = category => {
    this.setState({
      currentCategory: category.categoryName
    });
    this.getProducts(category.id);
  };

  getProducts = categoryId => {
    let url = 'http://localhost:3000/products';
    if (categoryId) {
      url += '/?categoryId=' + categoryId;
    }
    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({ products: data }));
  };

  addToCart = product => {
    let newCart = this.state.cart;
    let addedItem = newCart.find(c => c.product.id === product.id);
    if (addedItem) {
      addedItem.quantity += 1;
    } else {
      newCart.push({ product, quantity: 1 });
    }
    this.setState({ cart: newCart });
    alertify.success(product.productName + ' added to cart.');
  };

  removeFromCart = product => {
    let newCart = this.state.cart.filter(c => c.product.id !== product.id);
    this.setState({ cart: newCart });
    alertify.error(product.productName + ' removed from cart.');
  };

  componentDidMount() {
    this.getProducts();
  }

  render() {
    let productInfo = { title: 'Product List' };
    let categooryInfo = { title: 'Category List' };

    return (
      <div>
        <Container>
          <Navi cart={this.state.cart} removeFromCart={this.removeFromCart} />
          <Row>
            <Col xs="3">
              <CategoryList
                currentCategory={this.state.currentCategory}
                changeCategory={this.changeCategory}
                info={categooryInfo}
              ></CategoryList>
            </Col>
            <Col xs="9">
              <ProductList
                products={this.state.products}
                addToCart={this.addToCart}
                currentCategory={this.state.currentCategory}
                info={productInfo}
              ></ProductList>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
