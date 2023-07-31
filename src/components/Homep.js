// components/Homepage.js

import React from 'react';
import './Homep.css';

const Homep = () => {
  return (
    <div className="homepage-container">
      {/* Navbar */}

      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="homepage-title">Welcome to Sentiment Analysis News Site</h1>
        <p className="homepage-text">Thank you for visiting! Enjoy your stay!</p>

      </div>

      {/* About Us Section */}
      <div className="about-us-section">
        <h2>About Us</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          ac imperdiet eros. Phasellus et pharetra ex. Nulla facilisi.
        </p>
      </div>

      {/* Contact Us Section */}
      <div className="contact-us-section">
        <h2>Contact Us</h2>
        <p>
          For any inquiries, please email us at{' '}
          <a href="mailto:contact@example.com">contact@example.com</a>
        </p>
      </div>

      {/* Footer */}
      <div className="footer">
        <p>&copy; 2023 Your Company. All rights reserved.</p>
        <p>
          Created by <a href="https://www.example.com">Your Name</a>
        </p>
      </div>
    </div>
  );
};

export default Homep;
