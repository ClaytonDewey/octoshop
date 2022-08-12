import React from "react";
import ShoppingCart from "./ShoppingCart";

const Header = ({ itemsInCart, onClick }) => {
  return (
    <header className="header">
      <nav className="nav__primary">
        <h1>
          <a href="/">Octo-Shop</a>
        </h1>
        <a className="cart" href="https://www.uwbookstore.com/shoppingcart">
          <span className="cart__name">cart</span>{" "}
          <em className="fas fa-shopping-cart" aria-hidden="true"></em>
          <span className="cart__count">
            <span id="ItemCount" className="Count">
              0
            </span>
          </span>
        </a>
        <ShoppingCart itemsInCart={itemsInCart} onClick={onClick} />
      </nav>
    </header>
  );
};

export default Header;
