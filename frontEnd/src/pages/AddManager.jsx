import React, { useState } from "react";
import Navbar from "../components/Navbar";
import useAdminStore from "../store/adminStore";

function AddManager() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("manager"); // default "manager"

  const adminAddManager = useAdminStore((state) => state.adminAddManager);

  const handleSubmit = async () => {
    if (!name || !email || !password) {
      alert("All fields are required");
      return;
    }
    await adminAddManager(name, email, password, role);

    // reset form after success
    setName("");
    setEmail("");
    setPassword("");
    setRole("manager");
  };

  return (
    <div>
      <Navbar/>
      
      <div className="min-h-screen flex items-center justify-center bg-slate-800">
        <div className="h-auto bg-slate-950 p-8 rounded-2xl shadow-xl w-full max-w-md hover:scale-105 hover:shadow-teal-500/30 transform transition duration-300">
          {/* Title */}
          <h2 className="text-3xl font-bold text-center mb-2 text-teal-400">
            Add Manager
          </h2>
          <p className="text-center text-gray-400 mb-8 text-sm">
            Create a new manager account
          </p>

          {/* Inputs */}
          <div className="space-y-5">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter manager name"
              className="w-full px-4 py-2 border border-teal-400 bg-slate-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter manager email"
              className="w-full px-4 py-2 border border-teal-400 bg-slate-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter manager password"
              className="w-full px-4 py-2 border border-teal-400 bg-slate-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border border-teal-400 bg-slate-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
            >
              <option value="manager">Manager</option>
            </select>

            {/* Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-teal-500 text-slate-900 py-2 rounded-lg font-semibold transition duration-300 hover:bg-teal-400 hover:shadow-lg"
            >
              Add Manager
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddManager;
