import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import necessary components
import Home from './Home';
import AdminSignUp from './AdminSignUp';
import AdminLogin from './AdminLogin';

import AdminProducts from './AdminProducts';
import CreateProduct from './createProduct';
import AddManager from './AddManager';
import ManagerDashBoard from './ManagerDashBoard';
import UpdateManagerProduct from './UpdateManagerProduct'


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
                <Route path="/login" element={<AdminLogin />} />
            </Routes>
            <Routes>
                <Route path="/home" element={<Home />} />
            </Routes>
            
            <Routes>
                <Route path="/products" element={<AdminProducts/>} />
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
