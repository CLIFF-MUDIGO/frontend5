import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useAuth } from './AuthContext';
import "./LoginForm.css"; // Assuming the CSS code is in a file named LoginForm.css




const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/auth/login', { email, password });
      if (response.status === 200) {
        // Login successful, handle the response (e.g., redirect to dashboard)
        console.log(response);
        setToken(response.data.token)
        alert (`Logged in successfully as ${response.data.username}`);
        navigate('/articles');
      } else {
        console.error('Login failed.');
      }
    } catch (error) {
      console.error('Login failed.', error);
      alert ('You have entered a wrong username or password');
    }
  };

  return (
    <form onSubmit={handleLogin} className="login-box">
      <div className="user-box">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Email:</label>
      </div>
      <div className="user-box">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label>Password:</label>
      </div>
      <center><button type="submit">Login</button></center>
    </form>
  );
};

export default LoginForm;
