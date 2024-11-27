import React from 'react';

const FoodItem = ({ food }) => {
  return (
    <div className=''>
      <h1 style={{fontSize:"20px"}}>{food.name}</h1>
      <img src={food.image} className=" img-fluid" alt={food.name}  style={{height:"200px",width:"200px"}}/>
      <div className='flex-container d-flex'>
        <div className='w-60'>Varients </div>
        <div>Prices</div>
      </div>

    </div>
  );
};

export default FoodItem;
