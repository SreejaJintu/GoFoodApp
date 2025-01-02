// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Signup from "./pages/Signup";
// import Login from "./pages/Login";
// import Home from "./pages/Home";
// import MyOrdres from "./pages/MyOrdres";
// import Dashboard from './admin/components/Dashboard'
// import { UserProvider } from './context/userContext';
// import Payment from "./pages/PaymentForm";
// import Cart4 from "./pages/Cart4";
// import PrivateRoute from './admin/components/PrivateRoute';

// function App() {
//   return (
//     <UserProvider><div>
//     <Routes>
//       <Route path="/"  index element={<Home/>} />
//       <Route path="/login" element={<Login/>} />
//       <Route path="/signin" element={<Signup/>} />
//       <Route path="/cart" element={<Cart4/>} />
//       <Route path="/myorders" element={<MyOrdres/>} />
//       <Route path="/admin" element={<Dashboard/>} />
//       <Route path="/payment" element={<Payment />} />
//       <Route path="/admin" element={<PrivateRoute ><Dashboard /></PrivateRoute>} />






//     </Routes>
//   </div></UserProvider>
    
//   );
// }

// export default App;
import React from "react";
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import MyOrdres from "./pages/MyOrdres";
import Payment from "./pages/PaymentForm";
import Cart4 from "./pages/Cart4";
import PrivateRoute from './admin/components/PrivateRoute';
import AdminRoutes from './admin/routes/AdminRoutes '; 
import { UserProvider } from './context/userContext';

function App() {
  return (
    <UserProvider>
      <div>
        <Routes>
          {/* Public Routes */}
          <Route path="/" index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Signup />} />
          <Route path="/cart" element={<Cart4 />} />
          <Route path="/myorders" element={<MyOrdres />} />
          <Route path="/payment" element={<Payment />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin/*"
            element={
              <PrivateRoute>
                <AdminRoutes />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </UserProvider>
  );
}

export default App;

