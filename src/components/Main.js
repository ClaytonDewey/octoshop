import React, { useState, useEffect } from "react";

const Main = ({ Products }) => {
  const Items = Products.List;
  const [itemsInCart, setItemsInCart] = useState([]);
  console.log(itemsInCart);

  const addToCart = (prodId, image, currency, price, caption) => {
    const itemToAdd = {
      prodId,
      image,
      currency,
      price,
      caption,
    };
    setItemsInCart([...itemsInCart, itemToAdd]);
  };

  return (
    <>
      <div id="loading" className="loading">
        Loading...
      </div>
      <main id="items" className="container">
        {Items.map((item) => {
          return (
            <div key={`${item.prodId}`} className="card">
              <a href={`${item.productLink.href}`} className="card__link">
                <img
                  src={`${item.mediumImageURL}`}
                  alt={`${item.caption}`}
                  className="card__img"
                />
                <h2 className="card__title">{`${item.caption}`}</h2>
              </a>
              <p className="card__price">
                ${item.currency}${item.price}
              </p>
              <button
                onClick={() =>
                  addToCart(
                    `${item.prodId}, '${item.mediumImageURL}', '${item.currency}', ${item.price}, '${item.caption}'`
                  )
                }
                className="btn btn__primary"
              >
                Add to Cart
              </button>
            </div>
          );
        })}
      </main>
    </>
  );
};

export default Main;
