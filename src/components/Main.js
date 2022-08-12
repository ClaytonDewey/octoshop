import React, { useState, useEffect } from "react";
// import localStorage from "localStorage";

const Main = ({ Products }) => {
  const Items = Products.List;
  const [itemsInCart, setItemsInCart] = useState([]);

  // useEffect(() => {
  //   const loadItems = () => {
  //     setItemsInCart(JSON.parse(localStorage.getItem("cart")));
  //   };

  //   loadItems();
  // });

  // const showCart = () => {
  //   const cartItems = JSON.parse(localStorage.getItem("cart") || []);
  //   cartItems.map((item) => {
  //     return `
  //     <div class="cart__item">
  //       <button onclick="removeFromCart(${item.prodId})" class="btn btn-delete">-</button>
  //       <img class="cart__img" src="${item.image}" alt="${item.caption} />
  //       <span class="cart__price">${item.currency}${item.price}</span>
  //     </div>
  //   `;
  //   });
  // };

  const addToCart = (prodId, mediumImageURL, currency, price, caption) => {
    console.log(prodId, mediumImageURL, currency, price, caption);
    const itemToAdd = {
      prodId: prodId,
      mediumImageURL: mediumImageURL,
      currency: currency,
      price: price,
      caption: caption,
    };
    setItemsInCart([...itemsInCart, itemToAdd]);
    console.log(itemsInCart);
    localStorage.setItem("cart", JSON.stringify(itemsInCart));
  };

  return (
    <>
      <div id="loading" className="loading">
        Loading...
      </div>
      <main id="items" className="container">
        {Items.map((item) => {
          const {
            prodId,
            productUrl,
            mediumImageURL,
            currency,
            price,
            caption,
          } = item;
          return (
            <div key={`${prodId}`} className="card">
              <a href={`${productUrl}`} className="card__link">
                <img
                  src={`${mediumImageURL}`}
                  alt={`${caption}`}
                  className="card__img"
                />
                <h2 className="card__title">{`${caption}`}</h2>
              </a>
              <p className="card__price">
                ${currency}${price}
              </p>
              <button
                onClick={() =>
                  addToCart(prodId, mediumImageURL, currency, price, caption)
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
