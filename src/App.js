import React from "react";
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import MyOrdres from "./pages/MyOrdres";
import Dashboard from './admin/components/Dashboard'
import { UserProvider } from './context/userContext';
import Payment from "./pages/Payment";

function App() {
  return (
    <UserProvider><div>
    <Routes>
      <Route path="/"  index element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signin" element={<Signup/>} />
      <Route path="/cart" element={<Cart/>} />
      <Route path="/myorders" element={<MyOrdres/>} />
      <Route path="/admin" element={<Dashboard/>} />
      <Route path="/payment" element={<Payment />} />






    </Routes>
  </div></UserProvider>
    
  );
}

export default App;
