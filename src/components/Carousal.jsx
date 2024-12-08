import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import foodImages from "../foodImages.json";
import './Carousal.css'
function Carousel1() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div style={{ objectFit: "contain !important", maxHeight: "500px" }}>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        {foodImages.map((food) => (
          <Carousel.Item key={food.id}>
            <img
              className="d-block w-100"
              src={food.image}
              alt={food.name}
              style={{ height: "400px", objectFit: "cover" }}
            />
            {/* Stylish Caption with Hot Deals */}
            <Carousel.Caption
              style={{
                background: "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0))",
                color: "#ff4500",
                padding: "20px",
                borderRadius: "10px",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
              }}
            >
              <h2 style={{ fontSize: "32px",color:"ff4500", fontWeight: "bold" }}>
                🔥 Hot Deal on {food.name}! 🔥
              </h2>
              <p style={{ fontSize: "18px", fontStyle: "italic" }}>
                Get {food.name} at just ${food.price}! Limited time offer!
              </p>
              
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default Carousel1;
