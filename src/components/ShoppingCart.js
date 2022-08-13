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
                -
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
    </>
  );
};

export default ShoppingCart;
