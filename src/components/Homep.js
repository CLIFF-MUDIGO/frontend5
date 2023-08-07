// components/Homepage.js

import React from 'react';
import './Homep.css';
import { Link } from 'react-router-dom';
import TrialCard from './TrialCard';
const Homep = () => {
  return (
    <div className="homepage-container">
      <h1 className="homepage-title">NewsSentiment.AI</h1>
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
        
        <div></div>
        <div></div>
        <div></div>
      </div>
      <TrialCard/>
    </div>
    
  );
};

export default Homep;
