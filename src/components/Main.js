import React, { useState } from "react";
import Modal from "./Modal";

const Main = ({ Products, onClick }) => {
  const Items = Products.List;
  const [isOpen, setOpen] = useState("false");
  const [selectedItem, setSelectedItem] = useState({});

  const renderContent = () => {
    return (
      <>
        <div className="modal__content-img">
          <img src={selectedItem.mediumImageURL} alt={selectedItem.caption} />
        </div>
        <div className="modal__content-text">
          <p>{selectedItem.description}</p>
          <p>{selectedItem.brand}</p>
          <p>Item: {selectedItem.prodId}</p>
          <p>
            {selectedItem.currency}
            {selectedItem.price}
          </p>
        </div>
      </>
    );
  };

  const renderActions = () => {
    return (
      <>
        <button className="btn btn__primary">Add to Cart</button>
        <button onClick={handleToggle} className="btn btn__cancel">
          Close
        </button>
      </>
    );
  };

  const handleToggle = () => {
    setOpen(!isOpen);
  };

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
              <a
                href={`${productUrl}`}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedItem(item);
                  handleToggle(prodId);
                }}
                className="card__link"
              >
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
      <Modal
        title={selectedItem.caption}
        content={renderContent()}
        actions={renderActions()}
        isOpen={isOpen}
        onDismiss={() => handleToggle()}
      />
    </>
  );
};

export default Main;
