// components/Homepage.js

import React from 'react';
import './Homepage.css';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div className="homepage-container">
      <h1 className="homepage-title">Welcome to Sentiment Analysis News Site</h1>
      <p className="homepage-text">
        Thank you for visiting Enjoy your stay!
      </p>
      <div className="homepage-buttons">
        <Link to="/register">
          <button className="signin-button">Sign In</button>
        </Link>
        <Link to="/login">
          <button className="login-button">Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
