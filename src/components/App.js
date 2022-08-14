import React, { useEffect, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
// https://dev.to/ramonak/react-how-to-dynamically-sort-an-array-of-objects-using-the-dropdown-with-react-hooks-195p
import Products from "../ListJSONTest.json";
import "./App.scss";

const App = () => {
  const [itemsInCart, setItemsInCart] = useState([]);
  const cartCount = itemsInCart.length;
  const Items = Products.List;

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

    window.localStorage.setItem("cart", JSON.stringify(updatedCart));
    setItemsInCart(updatedCart);
  };

  return (
    <>
      <Header
        itemsInCart={itemsInCart}
        onClick={removeFromCart}
        cartCount={cartCount}
      />
      <Main Items={Items} onClick={addToCart} />
      <Footer />
    </>
  );
};

export default App;
