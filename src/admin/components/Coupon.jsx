import React, { useState } from "react";
import axios from "axios";

const ApplyCoupon = ({ orderAmount }) => {
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(orderAmount);
  const [message, setMessage] = useState("");

  const handleApplyCoupon = async () => {
    try {
      const response = await axios.post("http://localhost:5000/coupon/apply", {
        code: couponCode,
        orderAmount,
      });

      setDiscount(response.data.discountAmount);
      setFinalAmount(response.data.finalAmount);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error applying coupon");
    }
  };

  return (
    <div>
      <h4>Order Amount: ${orderAmount}</h4>
      <input
        type="text"
        placeholder="Enter Coupon Code"
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
      />
      <button onClick={handleApplyCoupon}>Apply Coupon</button>
      <p>{message}</p>
      <h4>Discount: ${discount}</h4>
      <h4>Final Amount: ${finalAmount}</h4>
    </div>
  );
};

export default ApplyCoupon;
