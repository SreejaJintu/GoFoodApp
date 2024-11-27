import React from "react";
import { Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from "./pages/Signup";
import Login from "./pages/Login";
// import { Card } from "./components/Card";
import { Home1 } from "./pages/Home1";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/"  index element={<Home1/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />


      </Routes>
    </div>
  );
}

export default App;
