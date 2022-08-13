import React, { useState } from "react";
import Modal from "./Modal";

const Main = ({ Products, onClick }) => {
  const Items = Products.List;
  const [isOpen, setOpen] = useState("false");
  const [selectedItem, setSelectedItem] = useState({});

  const sortItems = (e) => {
    console.log(e.target.value);
  };

  const renderContent = () => {
    return (
      <>
        <div className="modal__content-img">
          <img src={selectedItem.mediumImageURL} alt={selectedItem.caption} />
        </div>
        <div className="modal__content-text">
          <p dangerouslySetInnerHTML={{ __html: selectedItem.description }}></p>
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
        <button
          onClick={() => {
            setOpen("false");
            onClick(
              selectedItem.prodId,
              selectedItem.mediumImageURL,
              selectedItem.currency,
              selectedItem.price,
              selectedItem.caption
            );
          }}
          className="btn btn__primary"
        >
          Add to Cart
        </button>
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
      <div className="filter">
        <div className="filter__item">
          <label htmlFor="sort-by">Sort By</label>
          <select
            id="sort-by"
            tabIndex="0"
            aria-label="Sort By"
            onChange={sortItems}
          >
            <option value="0" className="subject-option">
              Description(A - Z)
            </option>
            <option value="1" className="subject-option">
              Description(Z - A)
            </option>
            <option value="2" className="subject-option">
              Brand(A - Z)
            </option>
            <option value="3" className="subject-option">
              Brand(Z - A)
            </option>
            <option value="4" className="subject-option">
              Price(Low - High)
            </option>
            <option value="5" className="subject-option">
              Price(High - Low)
            </option>
          </select>
        </div>
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
                {currency}
                {price}
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
