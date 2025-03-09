import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import './Card.css';
import { StoreContext } from '../context/StoreContext'; 
import { useEffect } from "react";

function Card({_id, name, price, category, description, image }) {
  const { addToCart } = useContext(StoreContext); 
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('quarter');

  useEffect(() => {
    console.log("Card Re-rendered:", { _id, name, price });
  }, [_id, name, price]);
  const handleAddToCart = () => {
    console.log("Adding to cart:", { _id, name, price });

  
    if (!_id) {
      console.error("❌ Error: Missing _id for item", { name, price });
      alert("Error: This item cannot be added to cart.");
      return;
    }
  
    const item = {
      _id,  // ✅ Ensure _id is included
      name,
      price,
      quantity,
      size,
      category,
      description,
    };
  
    addToCart(item);
    alert(`${name} added to cart!`);
    console.log("🛒 Adding item to cart:", item);

  
  };
  console.log("Card Component Loaded");

  return (
    <div className="card">
      <img src={image} alt={name} className="card-img" />
      <div className="card-body">
        <h3 className="card-title">{name}</h3>
        <div className="card-footer">
          <span className="card-price">${price.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between">
          <select
            className="form-select rounded"
            style={{ width: '48%' }}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          >
            {[...Array(5).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
          <select
            className="form-select rounded"
            style={{ width: '48%' }}
            value={size}
            onChange={(e) => setSize(e.target.value)}
          >
            <option value="quarter">Quarter</option>
            <option value="half">Half</option>
            <option value="full">Full</option>
          </select>
        </div>
        <hr />
        <div className="d-flex justify-content-center">
          <button className="btn btn-success" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  _id: PropTypes.string.isRequired, 
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  // category: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default Card;
