import React from "react";
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import MyOrdres from "./pages/MyOrdres";
import Dashboard from './admin/components/Dashboard'
import { UserProvider } from './context/userContext';
import Payment from "./pages/PaymentForm";
import Cart4 from "./pages/Cart4";

function App() {
  return (
    <UserProvider><div>
    <Routes>
      <Route path="/"  index element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signin" element={<Signup/>} />
      <Route path="/cart" element={<Cart4/>} />
      <Route path="/myorders" element={<MyOrdres/>} />
      <Route path="/admin" element={<Dashboard/>} />
      <Route path="/payment" element={<Payment />} />






    </Routes>
  </div></UserProvider>
    
  );
}

export default App;
