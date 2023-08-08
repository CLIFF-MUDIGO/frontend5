import React from 'react';
import './Homep.css';
import { Link } from 'react-router-dom';
import TrialCard from './TrialCard';

const Homep = () => {
  return (
    
    <div className="homepage-container">
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <section className="hero-section">
        <h1>Sentiment</h1>
        <p>We leverage the power of Natural Language Processing to analyse the Sentiment in news articles</p>
        {/* Add more content as needed */}
      </section>

      {/* About Us Section */}
      <section className="about-us-section">
       <center><h2>About Us</h2></center> 
        <div className="about-us-content">
          <p>Welcome to our AI-powered web app, where cutting-edge technology meets the world of news analysis. At the heart of our platform lies the transformative power of Natural Language Processing (NLP), a groundbreaking field that enables us to delve into the intricate nuances of news articles like never before.</p>
          <p>With a commitment to harnessing the capabilities of AI, we have crafted a user-friendly interface that allows you to effortlessly navigate through news stories while our advanced NLP algorithms work tirelessly in the background.</p>
          <p> Our app's primary focus is on sentiment analysis, a pivotal aspect of news comprehension. By employing NLP, we decipher the emotions, opinions, and attitudes woven into the fabric of articles, shedding light on the underlying sentiment and providing you with a deeper understanding of the narratives shaping our world. </p>
          <p> Join us on this journey as we leverage the marvels of NLP to empower you with insights that transcend the surface, uncovering the intricate emotions and perspectives within news articles that often go unnoticed.</p>
        </div>
        {/* Add more content as needed */}
      </section>


      {/* Trial Card */}
      <section className="trial-card-section">
        <TrialCard />
      </section>
      
      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2023 Sentiment Analysis App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Homep;
