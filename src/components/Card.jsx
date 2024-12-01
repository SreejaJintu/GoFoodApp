import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import './Card.css';
import { CartContext } from '../context/cartContext'; 

function Card({ name, price, category, description, image }) {
  const { addToCart } = useContext(CartContext); 
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('half');

  const handleAddToCart = () => {
    const item = {
      name,
      price,
      quantity,
      size,
      category,
      description,
    };
    addToCart(item);
    alert(`${name} added to cart!`);
  };

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
            <option value="half">Half</option>
            <option value="quarter">Quarter</option>
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
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default Card;
