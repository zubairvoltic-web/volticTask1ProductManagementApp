import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import necessary components
import Home from './Home';
import Signup from './SignUp';


import AdminProducts from './AdminProducts';
import CreateProduct from './createProduct';
import AddManager from './AddManager';
import ManagerDashBoard from './ManagerDashBoard';
import UpdateManagerProduct from './UpdateManagerProduct'
import Login from './logn';
import Product from './Product';
import LandingPage from './LandingPage';


export default function Routing() {
    return (
        <Router>
             <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
            <Routes>
                <Route path="/signup" element={<Signup />} />
            </Routes>
            <Routes>
                <Route path="/login" element={<Login />} />
            </Routes>
            <Routes>
                <Route path="/home" element={<LandingPage />} />
            </Routes>
            
           
             <Routes>
                <Route path="/products" element={<Product/>} />
            </Routes>
            <Routes>
                <Route path="/addProduct" element={<CreateProduct/>} />
            </Routes>
            <Routes>
                <Route path="/addManager" element={<AddManager/>} />
            </Routes>
            <Routes>
                <Route path="/managerDashBoard" element={<ManagerDashBoard/>} />
            </Routes>
             <Routes>
                <Route path="/UpdateManagerProduct" element={<UpdateManagerProduct/>} />
            </Routes>
        </Router>
    );
}
