

import React, { useCallback, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Carousel1 from '../components/Carousal';
import './Home.css';

function Home() {
  const [foodItems, setFoodItems] = useState([]); 
  const [filteredItems, setFilteredItems] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState("All"); 

  const loadData = useCallback(async () => {
    try {
      const response = await fetch("https://backend-gofood-aq0x.onrender.com/food/display", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data from the server");
      }

      const data = await response.json();
      console.log("Fetched data:", data);

      // Handle both manually added images & Cloudinary images
      const updatedData = data.map(item => ({
        ...item,
        image: item.image.startsWith("http") 
          ? item.image 
          : `https://backend-gofood-aq0x.onrender.com${item.image}` // For local storage
      }));

      setFoodItems(updatedData);
      setFilteredItems(updatedData);
    } catch (error) {
      console.error("Error loading data:", error.message || error);
      setFoodItems([]);
      setFilteredItems([]);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredItems(foodItems);
    } else {
      const filtered = foodItems.filter((item) => item.category === category);
      setFilteredItems(filtered);
    }
  };

  return (
    <>
      <Navbar />
      <div className="carousel-container mt-3">
        <Carousel1 />
      </div>
      <span
        style={{
          marginTop: '40px',
          display: 'block',
          fontSize: '24px',
          fontWeight: 'bold',
          marginBottom: '20px',
          textAlign: 'center',
        }}
      >
        Explore our menu
      </span>

      <div className="filter-container text-center mt-4" style={{
        backgroundColor: "#fff4e6",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        maxWidth: "400px",
        margin: "0 auto",
      }}>
        <select
          id="categoryFilter"
          className="form-select category-select"
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          style={{ maxWidth: '200px', margin: '0 auto' }}
        >
          <option value="All">All</option>
          <option value="biriyani">Biryani</option>
          <option value="burger">Burgers</option>
          <option value="pizzas">Pizzas</option>
          <option value="cakes">Cakes</option>
        </select>
      </div>

      <div className="container food-items ">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <Card
              key={item._id}
              name={item.name}
              price={item.price}
              category={item.category}
              description={item.description}
              image={item.image} 
            />
          ))
        ) : (
          <p>Loading food items...</p>
        )}
      </div>
      
      <Footer />
    </>
  );
}

export default Home;
