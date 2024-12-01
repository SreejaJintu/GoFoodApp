import React, { useCallback, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Carousel1 from '../components/Carousal';
import './Home.css'; 

function Home() {
  const [foodItem, setFoodItem] = useState([]);

  const loadData = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5000/food/display", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data from the server");
      }

      const data = await response.json();
      setFoodItem(data);
    } catch (error) {
      console.error("Error loading data:", error);
      setFoodItem([]);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <>
      <Navbar />
      <div className="carousel-container mt-3">
        <Carousel1 />
      </div>
      <span style={{ 
        marginTop:'40px',
    display: 'block', 
    fontSize: '24px', 
    fontWeight: 'bold', 
    marginBottom: '20px', 
    textAlign: 'center' 
  }}>
    Explore our menu
  </span>
      <div className="container food-items">
        {foodItem.length > 0 ? (
          foodItem.map((item) => (
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
