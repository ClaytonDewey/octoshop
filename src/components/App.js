import React, { useEffect, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

import Products from "../ListJSONTest.json";
import "./App.scss";

const App = () => {
  return (
    <>
      <Header />
      <Main Products={Products} />
      <Footer />
    </>
  );
};

export default App;
