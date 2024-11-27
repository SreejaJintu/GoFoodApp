import React, { useCallback, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Card } from '../components/Card';
import Footer from '../components/Footer';
import Carousel1 from '../components/Carousal';

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
    setFoodItem(data.food_items || []);
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
      <Carousel1 />
      <div className="m-3">
       
        {foodItem.length > 0 ? ( 
          foodItem.map((item, index) => (
            <Card
              key={index}
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
