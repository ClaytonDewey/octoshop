import React from "react";

const Main = ({ Products, onClick }) => {
  const Items = Products.List;

  return (
    <>
      {/* <div id="loading" className="loading">
        Loading...
      </div> */}
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
                  onClick(prodId, mediumImageURL, currency, price, caption)
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
