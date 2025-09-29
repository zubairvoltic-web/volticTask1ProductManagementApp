import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
;
import useManagerStore from "../store/managerStore";
import useUsersStore from "../store/usersStore";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = useUsersStore((state) => state.login);
  

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      console.log("handleLogin");

      // Try admin login first
      const userData = await login(email, password);

      console.log("the user Data0",userData);
      navigate('/products')
      
    } catch (err) {
      alert("Login failed. Check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-800">
      <div className="h-auto bg-slate-950 p-8 rounded-2xl shadow-xl w-full max-w-md hover:scale-105 hover:shadow-teal-500/30 transform transition duration-300">
        <h2 className="text-3xl font-bold text-center mb-2 text-teal-400">
          Login Here
        </h2>
        <p className="text-center text-gray-400 mb-8 text-sm">
          Sign in to manage the Product
        </p>

        <div className="space-y-5">
          <input
            value={email}
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-teal-400 bg-slate-900 text-white rounded-lg"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-teal-400 bg-slate-900 text-white rounded-lg"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-teal-500 text-slate-900 py-2 rounded-lg font-semibold hover:bg-teal-400"
          >
            Log In
          </button>

          <div>
            <p className="text-center text-gray-400 mt-4 text-sm">
              Don't have an account?{" "}
              <a href="/signup" className="text-teal-400 hover:underline">
                Sign up here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
