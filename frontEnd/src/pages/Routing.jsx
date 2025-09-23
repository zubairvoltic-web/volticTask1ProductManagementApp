import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import necessary components
import Home from './Home';
import AdminSignUp from './AdminSignUp';
import AdminLogin from './AdminLogin';
import Product from './Product';


export default function Routing() {
    return (
        <Router>
             <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
            <Routes>
                <Route path="/adminSignup" element={<AdminSignUp />} />
            </Routes>
            <Routes>
                <Route path="/adminLogin" element={<AdminLogin />} />
            </Routes>
            <Routes>
                <Route path="/home" element={<Home />} />
            </Routes>
            <Routes>
                <Route path="/products" element={<Product />} />
            </Routes>
        </Router>
    );
}
