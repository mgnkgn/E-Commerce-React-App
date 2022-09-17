import React from "react";

const SoldProductsList = (props) => {
  return (
    <div className="sold-products-row-container">
      <div className="sold-row-element sold-name">{props.name}</div>
      <div className="sold-row-element sold-qt">x {props.qt}</div>
      <div className="sold-row-element sold-price">
        {props.price.toFixed(2)} $
      </div>
      <div className="sold-row-element sold-user-name">
        <span>{props.uSurname}</span>, {props.uName}
      </div>
      <div className="sold-row-element sold-city">
        {props.uCity} <span>{props.uStreet}</span>
      </div>
    </div>
  );
};

export default SoldProductsList;
