import React, { useState } from "react";
import ShoppingCart from "./ShoppingCart";

const Header = ({ itemsInCart, onClick }) => {
  const [isOpen, setOpen] = useState("false");

  const handleToggle = () => {
    setOpen(!isOpen);
  };

  return (
    <header className="header">
      <nav className="nav__primary">
        <h1>
          <a href="/">Octo-Shop</a>
        </h1>
        <button onClick={handleToggle} type="button" className="cart">
          <span className="cart__name">cart</span>
          <em className="fas fa-shopping-cart" aria-hidden="true"></em>
          <span className="cart__count">
            <span id="ItemCount" className="Count">
              0
            </span>
          </span>
        </button>
        <div
          id="cart__dropdown"
          className={`cart__dropdown ${isOpen ? "" : "open"}`}
        >
          <ShoppingCart itemsInCart={itemsInCart} onClick={onClick} />
        </div>
      </nav>
    </header>
  );
};

export default Header;
