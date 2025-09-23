import axios from 'axios';
import React, { useState } from 'react'

function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const loginAdmin = async () => {
    console.log(email, password);

    let data = JSON.stringify({
      email,
      password
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:3000/auth/login',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        document.cookie = `token=${response.data.access_token}; path=/;`;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-800">
      <div className="h-auto bg-slate-950 p-8 rounded-2xl shadow-xl w-full max-w-md hover:scale-105 hover:shadow-teal-500/30 transform transition duration-300">
        
        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-2 text-teal-400">Admin Login</h2>
        <p className="text-center text-gray-400 mb-8 text-sm">Sign in to manage the dashboard</p>

        {/* Inputs */}
        <div className="space-y-5">
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

          {/* Button */}
          <button
            onClick={loginAdmin}
            className="w-full bg-teal-500 text-slate-900 py-2 rounded-lg font-semibold transition duration-300 hover:bg-teal-400 hover:shadow-lg"
          >
            Log In
          </button>
           <div>
            <p className="text-center text-gray-400 mt-4 text-sm">
                Don't have an account? <a href="/adminSignup" className="text-teal-400 hover:underline">Sign up here</a>
            </p>
         </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
