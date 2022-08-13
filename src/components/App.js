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
  const [sortedItems, setSortedItems] = useState([].concat(Products.List));

  useEffect(() => {
    const items = window.localStorage.getItem("cart");
    if (items !== null) setItemsInCart(JSON.parse(items));
  }, []);

  useEffect(() => {
    if (itemsInCart.length) {
      window.localStorage.setItem("cart", JSON.stringify(itemsInCart));
    }
  }, [itemsInCart]);

  useEffect(() => {}, [sortedItems]);

  const sortItems = (e) => {
    const { value } = e.target;

    switch (value) {
      case 1:
        const sortedZA = [...sortedItems].sort((a, b) =>
          a.caption < b.caption ? 1 : -1
        );
        console.log(value, sortedZA);
        setSortedItems(sortedZA);
        break;
      case 2:
        const sortedBrandAZ = sortedItems.sort((a, b) =>
          a.brand > b.brand ? 1 : -1
        );
        setSortedItems(sortedBrandAZ);
        console.log(value, sortedItems);
        break;
      case 3:
        const sortedBrandZA = sortedItems.sort((a, b) =>
          a.brand < b.brand ? 1 : -1
        );
        setSortedItems(sortedBrandZA);
        console.log(value, sortedItems);
        break;
      case 4:
        const sortedLowHi = sortedItems.sort((a, b) =>
          a.price > b.price ? 1 : -1
        );
        setSortedItems(sortedLowHi);
        console.log(value, sortedItems);
        break;
      case 5:
        const sortedHiLow = sortedItems.sort((a, b) =>
          a.price < b.price ? 1 : -1
        );
        setSortedItems(sortedHiLow);
        console.log(value, sortedItems);
        break;
      default:
        console.log(value, sortedItems);
        return sortedItems;
    }
  };

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
      <Header
        itemsInCart={itemsInCart}
        onClick={removeFromCart}
        cartCount={cartCount}
      />
      <Main
        sortedItems={sortedItems}
        onClick={addToCart}
        sortItems={sortItems}
      />
      <Footer />
    </>
  );
};

export default App;
