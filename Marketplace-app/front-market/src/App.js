import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Solo BrowserRouter
import Login from './Components/Login';
import Marketplace from './Components/Marketplace';
import Register from './Components/Register';
import { AuthProvider } from './Components/AuthContext';
import Products from './Components/Products';
import Cart from './Components/Cart'

const App = () => {
  return (
    <AuthProvider>
      <Router> {/* Solo BrowserRouter, sin flags experimentales */}
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/" element={<Marketplace />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element = {<Cart  />}/>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
