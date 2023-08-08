import React, { useState } from 'react';
import axios from 'axios';

const SentimentAnalyzer = ({ initialText }) => {
  const [text, setText] = useState(initialText);
  const [sentiments, setSentiments] = useState({});

  const analyzeSentiment = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/analyze_sentiment', { text });
      setSentiments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getEmojiForScore = (score) => {
    if (score >= 0.05) {
      return '😄';
    } else if (score <= -0.05) {
      return '😞';
    } else {
      return '😐';
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
      <h2>Sentiment Analyzer</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to analyze sentiment"
        style={{ width: '100%', height: '100px', padding: '8px', marginBottom: '10px' }}
      />
      <button onClick={analyzeSentiment} style={{ padding: '8px 16px' }}>
        Analyze Sentiment
      </button>
      <button onClick={() => setText('')} style={{ padding: '8px 16px', marginLeft: '10px' }}>
        Reset
      </button>
      {Object.keys(sentiments).length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <p>
            <strong>Negative:</strong> {getEmojiForScore(sentiments.negative)} {sentiments.negative}
          </p>
          <p>
            <strong>Neutral:</strong> {getEmojiForScore(sentiments.neutral)} {sentiments.neutral}
          </p>
          <p>
            <strong>Positive:</strong> {getEmojiForScore(sentiments.positive)} {sentiments.positive}
          </p>
          <p>
            <strong>Compound:</strong> {getEmojiForScore(sentiments.compound)} {sentiments.compound}
          </p>
        </div>
      )}
    </div>
  );
};

export default SentimentAnalyzer;
