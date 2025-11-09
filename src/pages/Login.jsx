import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../stylesheets/Login.css"

const Login = () => {
  const [mode, setMode] = useState("login");

  // Login states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Signup states
  const [newusername, setNewusername] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [conpassword, setConpassword] = useState("");

  const backendURL = localStorage.getItem("backendURL") || "https://passfgt.onrender.com";

  // Prevent already logged user from visiting
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) window.location.href = "/";
  }, []);


  const notify = (msg, type = "success") => {
    toast[type](msg, {
      position: "top-right",
      autoClose: 2000,
      theme: "dark",
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${backendURL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) return notify(data.error || "Login failed", "error");

      localStorage.setItem("token", data.token);
      notify("Login successful!");
      setUsername("");
      setPassword("");
      setTimeout(() => (window.location.href = "/"), 1000);
    } catch {
      notify("Something went wrong!", "error");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (newpassword !== conpassword)
      return notify("Passwords do not match", "error");
    if (newpassword.length < 8)
      return notify("Password must be at least 8 characters", "error");

    try {
      const res = await fetch(`${backendURL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: newusername,
          password: newpassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) return notify(data.error || "Signup failed", "error");

      notify("Signup successful! You can now log in.");
      setNewusername("");
      setNewpassword("");
      setConpassword("");
      setMode("login");
    } catch {
      notify("Something went wrong!", "error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen text-white px-4">
      <ToastContainer />

      <div className="w-full max-w-md bg-neutral-900/70 border border-emerald-800 rounded-2xl shadow-lg backdrop-blur-md p-8 transition-all">
        <div className="text-center mb-6">
          <h1 className="text-4xl text-white">
            Pass<span className='font-extrabold text-emerald-700'>FGT</span>
          </h1>
          <p className="text-gray-400 text-sm">Your Secure Password Vault</p>
        </div>

        {/* Tabs */}
        <div className="flex mb-6 border-b border-neutral-700">
          <button
            onClick={() => setMode("login")}
            className={`flex-1 py-2 text-center transition-all ${mode === "login"
              ? "text-emerald-400 border-b-2 border-emerald-400"
              : "text-gray-500 hover:text-gray-300"
              }`}
          >
            Login
          </button>
          <button
            onClick={() => setMode("signup")}
            className={`flex-1 py-2 text-center transition-all ${mode === "signup"
              ? "text-emerald-400 border-b-2 border-emerald-400"
              : "text-gray-500 hover:text-gray-300"
              }`}
          >
            Sign Up
          </button>
        </div>

        {/* Login Form */}
        {mode === "login" && (
          <form
            className="flex flex-col gap-5 animate-fade-in"
            onSubmit={handleLogin}
          >
            <div className="flex flex-col gap-2">
              <label className="text-gray-300 text-sm">Username</label>
              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="p-3 rounded-md bg-neutral-800 text-gray-100 border border-neutral-700 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-600/30 outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-gray-300 text-sm">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-3 rounded-md bg-neutral-800 text-gray-100 border border-neutral-700 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-600/30 outline-none"
              />
            </div>

            <button
              type="submit"
              className="mt-2 bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 rounded-md font-semibold tracking-wide shadow-md hover:shadow-emerald-600/30 transition-all duration-300"
            >
              Login
            </button>
          </form>
        )}

        {/* Signup Form */}
        {mode === "signup" && (
          <form
            className="flex flex-col gap-5 animate-fade-in"
            onSubmit={handleSignup}
          >
            <div className="flex flex-col gap-2">
              <label className="text-gray-300 text-sm">Username</label>
              <input
                type="text"
                placeholder="Create username"
                value={newusername}
                onChange={(e) => setNewusername(e.target.value)}
                className="p-3 rounded-md bg-neutral-800 text-gray-100 border border-neutral-700 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-600/30 outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-gray-300 text-sm">Password</label>
              <input
                type="password"
                placeholder="Create password"
                value={newpassword}
                onChange={(e) => setNewpassword(e.target.value)}
                className="p-3 rounded-md bg-neutral-800 text-gray-100 border border-neutral-700 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-600/30 outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-gray-300 text-sm">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm password"
                value={conpassword}
                onChange={(e) => setConpassword(e.target.value)}
                className="p-3 rounded-md bg-neutral-800 text-gray-100 border border-neutral-700 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-600/30 outline-none"
              />
            </div>

            <button
              type="submit"
              className="mt-2 bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 rounded-md font-semibold tracking-wide shadow-md hover:shadow-emerald-600/30 transition-all duration-300"
            >
              Sign Up
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
