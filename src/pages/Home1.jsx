import React from 'react';
import foodData from '../foodData';
import FoodItem from '../components/FoodItem';
import Navbar from '../components/Navbar';
import Carousel1 from '../components/Carousal';

export const Home1 = () => {
  return (
    <div>
        <Navbar />
        <Carousel1 />
      <div className="row">
        {foodData.map((category) => 
          category.items.map((food) => (
            <div className="col-md-4" key={food.id}>
              <FoodItem food={food} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};
