import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginApi } from "../Slices/AuthSlice";
import { useNavigate } from "react-router-dom";
import "./AuthUI.css";

const AuthUi = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, error } = useSelector((state) => state.auth);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginApi({ username, password }));
  };

  // Redirect to products if logged in
  useEffect(() => {
    if (user) {
      navigate("/products");
    }
  }, [user, navigate]);

  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="brand-content">
          <h1>LuxeCart</h1>
          <p>Premium shopping experience.</p>
        </div>
      </div>

      <div className="auth-right">
        <div className="login-box">
          <h2>Welcome Back</h2>

          <form onSubmit={handleLogin}>
            <label>Username</label>
            <input
              type="text" placeholder="emilys"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label>Password</label>
            <input
              type="password" placeholder="emilyspass"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="error">{error}</p>}

            <button type="submit" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthUi;