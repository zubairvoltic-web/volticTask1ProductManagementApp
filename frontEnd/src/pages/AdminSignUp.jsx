import React, { useState } from 'react'
import useAdminStore from '../store/adminStore'
import { useNavigate } from "react-router-dom";

function AdminSignUp() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [age, setAge] = useState()
  
  const signUpAdmin = useAdminStore((state) => state.signupAdmin);

  const navigate = useNavigate();

  const signup= async () => {
    console.log(name, email, password, age)
    const adminData = await signUpAdmin(name, email, password, age)
    navigate("/products")



    
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-800">
      <div className="h-auto bg-slate-950 p-8 rounded-2xl shadow-xl w-full max-w-md hover:scale-105 hover:shadow-teal-500/30 transform transition duration-300">
        
        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-2 text-teal-400">Admin Sign Up</h2>
        <p className="text-center text-gray-400 mb-8 text-sm">Create a new admin account</p>

        {/* Inputs */}
        <div className="space-y-5">
          <input
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-4 py-2 border border-teal-400 bg-slate-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
          />
          <input
            value={email}
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-teal-400 bg-slate-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-teal-400 bg-slate-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
          />
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter your age"
            className="w-full px-4 py-2 border border-teal-400 bg-slate-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
          />

          {/* Button */}
          <button
            onClick={signup}
            className="w-full bg-teal-500 text-slate-900 py-2 rounded-lg font-semibold transition duration-300 hover:bg-teal-400 hover:shadow-lg"
          >
            Sign Up
          </button>

         <div>
            <p className="text-center text-gray-400 mt-4 text-sm">
                Already have an account? <a href="/adminLogin" className="text-teal-400 hover:underline">Login here</a>
            </p>
         </div>
            

        </div>
      </div>
    </div>
  )
}

export default AdminSignUp
