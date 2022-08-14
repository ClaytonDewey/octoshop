import React from "react";

const ShoppingCart = ({ itemsInCart, onClick }) => {
  return (
    <>
      {itemsInCart.length ? (
        itemsInCart.map((item) => {
          return (
            <div key={item.prodId} className="cart__item">
              <button
                onClick={() => onClick(item.prodId)}
                className="btn btn__delete"
              >
                <i className="fas fa-times"></i>
              </button>
              <img
                className="cart__img"
                src={item.mediumImageURL}
                alt={item.caption}
              />
              <span className="cart__price">
                {item.currency}
                {item.price}
              </span>
            </div>
          );
        })
      ) : (
        <h2>Your Cart is Empty</h2>
      )}
      <div className="cart__button">
        <button type="button" href="/" className="btn btn__primary">
          Checkout
        </button>
      </div>
    </>
  );
};

export default ShoppingCart;
