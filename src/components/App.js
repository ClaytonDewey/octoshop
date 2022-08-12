import React, { useEffect, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

import Products from "../ListJSONTest.json";
import "./App.scss";

const App = () => {
  const [itemsInCart, setItemsInCart] = useState([]);

  useEffect(() => {
    const items = window.localStorage.getItem("cart");
    if (items !== null) setItemsInCart(JSON.parse(items));
  }, []);

  useEffect(() => {
    if (itemsInCart.length) {
      window.localStorage.setItem("cart", JSON.stringify(itemsInCart));
    }
  }, [itemsInCart]);

  const addToCart = (prodId, mediumImageURL, currency, price, caption) => {
    const itemToAdd = {
      prodId: prodId,
      mediumImageURL: mediumImageURL,
      currency: currency,
      price: price,
      caption: caption,
    };
    setItemsInCart([...itemsInCart, itemToAdd]);
  };

  const removeFromCart = (prodId) => {
    const updatedCart = itemsInCart.filter((item) => item.prodId !== prodId);
    console.log(updatedCart);
    setItemsInCart(updatedCart);
  };

  return (
    <>
      <Header itemsInCart={itemsInCart} onClick={removeFromCart} />
      <Main Products={Products} onClick={addToCart} />
      <Footer />
    </>
  );
};

export default App;
