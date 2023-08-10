import React, { useState } from 'react';
import SentimentChart from './SentimentChart';
import "./TrialCard.css";

const TrialCard = () => {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true); 

    fetch('http://localhost:3000/sentiment_analysis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    })
      .then((response) => response.json())
      .then((data) => {
        setResult(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error analyzing sentiment:', error);
      })
      console.log(result);

  };

  return (
    <div className="trial-card">
      <div>
        {result && <SentimentChart result={result}/>}
      </div>
      <h2>Trial Card</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="url">Enter News Article URL:</label>
        <input
          type="text"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
       <button type="submit" className='Button'>Analyze</button>  
      </form>
      {loading &&  <div className="hourglassBackground">
      <div className="hourglassContainer">
        <div className="hourglassCurves"></div>
        <div className="hourglassCapTop"></div>
        <div className="hourglassGlassTop"></div>
        <div className="hourglassSand"></div>
        <div className="hourglassSandStream"></div>
        <div className="hourglassCapBottom"></div>
        <div className="hourglassGlass"></div>
      </div>
    </div>} {/* Display loading text */}
      {result && (
        <div>
          <h3>Analysis Result:</h3>
          <p>Sentiment: {result.sentiment}</p>
          <p>Sentiment Score: {result.sentiment_score.compound}</p>
          <ul>
            {Object.entries(result.sentiment_score).map((sentiment, index) => (
              <li key={index}>
                {sentiment[0]}: {sentiment[1]}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default TrialCard;
