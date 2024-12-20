// src/index.js
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import StoreContextProvider from './context/StoreContext';


const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <BrowserRouter>

    <StoreContextProvider> 
      <App />
    </StoreContextProvider>
  </BrowserRouter>
);
