import React, { useState, useEffect } from "react";
import Modal from "./Modal";

const Main = ({ Items, onClick, isModalVisible, toggleModal }) => {
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
        isAvailable: "isAvailable",
        tos: "isAvailable",
      };

      const orders = {
        descAZ: "forward",
        descZA: "reverse",
        brandAZ: "forward",
        brandZA: "reverse",
        priceAZ: "forward",
        priceZA: "reverse",
        isAvailable: "available",
        tos: "oos",
      };
      const sortProperty = types[type];
      const sortOrder = orders[type];

      if (sortOrder === "forward") {
        sorted = [...Items].sort((a, b) =>
          a[sortProperty] > b[sortProperty] ? 1 : -1
        );
      } else if (sortOrder === "reverse") {
        sorted = [...Items].sort((a, b) =>
          b[sortProperty] > a[sortProperty] ? 1 : -1
        );
      } else if (sortOrder === "available") {
        sorted = [...Items].filter((item) => item[sortProperty] === true);
        console.log(sorted);
      } else if (sortOrder === "oos") {
        sorted = [...Items].filter((item) => item[sortProperty] === false);
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
            toggleModal();
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
        <button onClick={toggleModal} className="btn btn__cancel">
          Close
        </button>
      </>
    );
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
            <option value="isAvailable">Available</option>
            <option value="tos">Temporarily Out of Stock</option>
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
                  toggleModal(prodId);
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
                onClick={(e) => {
                  e.preventDefault();
                  toggleModal(prodId);
                  setSelectedItem(item);
                }}
                className="btn btn__secondary"
              >
                View More
              </button>
            </div>
          );
        })}
      </main>
      {isModalVisible && (
        <Modal
          title={selectedItem.caption}
          content={renderContent()}
          actions={renderActions()}
          onDismiss={() => toggleModal()}
        />
      )}
    </>
  );
};

export default Main;
