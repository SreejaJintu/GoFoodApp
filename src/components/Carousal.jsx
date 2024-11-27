import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import foodImages from "../foodImages.json";

function Carousel1() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div style={{objectFit:"contain !important",maxHeight:"500px"}}>
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {foodImages.map((food) => (
        <Carousel.Item key={food.id}>
          <img
            className="d-block w-100"
            src={food.image}
            alt={food.name}
            style={{ height: "400px", objectFit: "cover" }}
          />
          <Carousel.Caption>
          <form className="d-flex">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
          <button className="btn btn-success" type="submit">Search</button>
          </form>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
    </div>
  );
}

export default Carousel1;
