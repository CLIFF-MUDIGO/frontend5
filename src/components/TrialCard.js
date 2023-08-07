import React, { useState } from 'react';

function TrialCard() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send the URL to the backend
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
      })
      .catch((error) => {
        console.error('Error analyzing sentiment:', error);
      });
  };

  return (
    <div className="trial-card">
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
        <button type="submit">Analyze Sentiment</button>
      </form>
      {result && (
        <div>
          <h3>Analysis Result:</h3>
          <p>Sentiment: {result.sentiment}</p>
          <p>Sentiment Score: {result.sentiment_score.compound}</p>
          <p>
            {Object.entries(result.sentiment_score).map((sentiment, index) => (
              <li key={index}>
                {sentiment[0]}: {sentiment[1]}
              </li>
            ))}
          </p>
        </div>
      )}
    </div>
  );
}

export default TrialCard;
