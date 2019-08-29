import React, { Component } from 'react';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
  NavItem,
  NavLink
} from 'reactstrap';

export default class CartSummary extends Component {
  renderSummary = () => (
    <UncontrolledDropdown nav inNavbar>
      <DropdownToggle nav caret>
        Your Cart
      </DropdownToggle>
      <DropdownMenu right>
        {this.props.cart.map(cartItem => (
          <DropdownItem key={cartItem.product.id}>
            <Badge
              color="danger"
              onClick={() => this.props.removeFromCart(cartItem.product)}
            >
              X
            </Badge>
            {cartItem.product.productName} -{' '}
            <Badge color="success">{cartItem.quantity} unit</Badge>
          </DropdownItem>
        ))}
        <DropdownItem divider />
        <DropdownItem>Reset</DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );

  renderEmptyCart = () => (
    <NavItem>
      <NavLink>Cart is Empty</NavLink>
    </NavItem>
  );

  render() {
    return (
      <div>
        {this.props.cart.length > 0
          ? this.renderSummary()
          : this.renderEmptyCart()}
      </div>
    );
  }
}
