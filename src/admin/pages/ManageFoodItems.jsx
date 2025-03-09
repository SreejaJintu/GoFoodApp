import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageFoodItems.css';

const ManageFoodItems = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [newFood, setNewFood] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    image: null, 
  });
    const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const backendURL = process.env.REACT_APP_BACKEND_URL;

  

const fetchFoodItems = async (retryCount = 3) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/food/display`);
    console.log("Fetched food items in admin:", res.data);
    setFoodItems(res.data);
  } catch (error) {
    if (retryCount > 0) {
      console.warn(`Retrying... (${3 - retryCount + 1})`);
      setTimeout(() => fetchFoodItems(retryCount - 1), 2000);
    } else {
      console.error("Failed to fetch food items:", error);
    }
  }
};



useEffect(() => {
    fetchFoodItems();
}, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFood((prev) => ({ ...prev, [name]: value }));
  };

  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  
 

  const handleAddFoodItem = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
  
    try {
      const formData = new FormData();
      formData.append('name', newFood.name);
      formData.append('price', newFood.price);
      formData.append('description', newFood.description);
      formData.append('image', image);
  
      console.log('Sending data:', Object.fromEntries(formData.entries()));
  
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/food/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Response received:', response.data);
  
      setSuccess(response.data.message || 'Food item added successfully!');
      setFoodItems((prev) => [...prev, response.data.foodItem]);
      setNewFood({ name: '', price: '', description: '', category: '', image: null });
    } catch (err) {
      console.error('Error response:', err.response);
      setError(err.response?.data?.message || 'Error adding food item');
    } finally {
      setLoading(false);
    }
  };
  
  
  // Remove food item
  const handleRemoveFoodItem = async (id) => {
    setError(''); 
    setSuccess(''); 
    try {
      const response = await axios.delete(`${backendURL}/food/remove/${id}`);
      console.log("Backend delete response:", response.data);
  
      if (response.data.success) {
        // Update state to remove the deleted food item
        setFoodItems((prev) => prev.filter((item) => item._id !== id));
        setSuccess('Food item removed successfully!');
      } else {
        setError(response.data.message || 'Failed to remove food item.');
      }
    } catch (err) {
      console.error("Error removing food item:", err);
      setError('Error removing food item.');
    }
  };
  return (
    <div className="manage-food-items">
      <h2>Add New Food Item</h2>

      {/* Success and Error Messages */}
      {success && <div className="alert alert-success">{success}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form className="food-item-form" onSubmit={handleAddFoodItem}>
  <div className="form-group">
    <label htmlFor="name">Food Name</label>
    <input
      type="text"
      id="name"
      name="name"
      value={newFood.name}
      onChange={handleInputChange}
      placeholder="Enter food name"
      required
    />
  </div>
  <div className="form-group">
    <label htmlFor="description">Description</label>
    <textarea
      id="description"
      name="description"
      value={newFood.description}
      onChange={handleInputChange}
      placeholder="Enter description"
    />
  </div>
  <div className="form-group">
    <label htmlFor="image">Image</label>
    <input
  type="file"
  id="image"
  name="image"
  onChange={handleImageChange}
  accept="image/*"
/>

  </div>
  
  <div className="form-group">
    <label htmlFor="price">Price</label>
    <input
      type="number"
      id="price"
      name="price"
      value={newFood.price}
      onChange={handleInputChange}
      placeholder="Enter price"
      required
    />
  </div>


  <button type="submit" className="btn btn-primary" disabled={loading}>
    {loading ? 'Adding...' : 'Add Food Item'}
  </button>
</form>


      {/* Food Items List */}
      <div className="food-items-list">
        <h3>Existing Food Items</h3>
        {foodItems.length === 0 ? (
          <p>No food items available.</p>
        ) : (
          <ul>
           {foodItems.map((item) =>
  item ? (
    <li key={item._id}>
      <span>{item.name || "Unnamed"} - ${item.price || 0}</span>
      <button
        className="btn btn-danger"
        onClick={() => handleRemoveFoodItem(item._id)}
      >
        Remove
      </button>
    </li>
  ) : null
)}

          </ul>
        )}
      </div>
    </div>
  );
};

export default ManageFoodItems;
