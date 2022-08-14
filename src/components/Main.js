import React, { useState, useEffect } from "react";
import Modal from "./Modal";

const Main = ({ Items, onClick }) => {
  const [isOpen, setOpen] = useState("false");
  const [selectedItem, setSelectedItem] = useState({});
  const [data, setData] = useState([]);
  const [sortType, setSortType] = useState("descAZ");

  useEffect(() => {
    const sortArray = (type) => {
      let sorted;
      const types = {
        descAZ: "caption",
        descZA: "caption",
        brandAZ: "brand",
        brandZA: "brand",
        priceAZ: "price",
        priceZA: "price",
      };

      const orders = {
        descAZ: "forward",
        descZA: "reverse",
        brandAZ: "forward",
        brandZA: "reverse",
        priceAZ: "forward",
        priceZA: "reverse",
      };
      const sortProperty = types[type];
      const sortOrder = orders[type];

      if (sortOrder === "forward") {
        sorted = [...Items].sort((a, b) =>
          a[sortProperty] > b[sortProperty] ? 1 : -1
        );
      } else {
        sorted = [...Items].sort((a, b) =>
          b[sortProperty] > a[sortProperty] ? 1 : -1
        );
      }
      setData(sorted);
    };

    sortArray(sortType);
  }, [sortType, Items]);
  const renderContent = () => {
    return (
      <>
        <div className="modal__content-img">
          <img src={selectedItem.mediumImageURL} alt={selectedItem.caption} />
        </div>
        <div className="modal__content-text">
          <p dangerouslySetInnerHTML={{ __html: selectedItem.description }}></p>
          <p>
            <strong>Brand:</strong> {selectedItem.brand}
          </p>
          <p>
            <strong>Item#:</strong> {selectedItem.prodId}
          </p>
          <p>
            <strong>Price:</strong> {selectedItem.currency}
            {selectedItem.price}
          </p>
          <a href={selectedItem.productUrl} className="btn btn__secondary">
            Read More <i className="fas fa-chevron-right"></i>
          </a>
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
      <div className="filter container">
        <div className="filter__item">
          <label htmlFor="sort-by">Sort By</label>
          <select
            onChange={(e) => setSortType(e.target.value)}
            id="sort-by"
            tabIndex="0"
            aria-label="Sort By"
          >
            <option value="descAZ">Description (A - Z)</option>
            <option value="descZA">Description (Z - A)</option>
            <option value="brandAZ">Brand (A - Z)</option>
            <option value="brandZA">Brand (Z - A)</option>
            <option value="priceAZ">Price (Low - High)</option>
            <option value="priceZA">Price (High - Low)</option>
          </select>
        </div>
      </div>

      <main id="items" className="container">
        {data.map((item) => {
          const {
            prodId,
            brand,
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
              <p>{brand}</p>
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
