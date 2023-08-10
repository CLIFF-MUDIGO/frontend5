import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import './SentimentAnalyzer.css';

const SentimentAnalyzer = ({ initialText }) => {
  const [text, setText] = useState(initialText);
  const [sentiments, setSentiments] = useState({});
  const [chartData, setChartData] = useState(null);

  const analyzeSentiment = async () => {
    try {
      // Simulating the response data from your backend API
      const responseData = {
        negative: 0.096,
        neutral: 0.904,
        positive: 0.0,
        compound: -0.4703,
      };
      setSentiments(responseData);

      // Create data for the doughnut chart
      const data = {
        labels: ['Negative', 'Neutral', 'Positive'],
        datasets: [
          {
            data: [
              responseData.negative,
              responseData.neutral,
              responseData.positive,
            ],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // Colors for the segments
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // Colors for hover effect
          },
        ],
      };
      setChartData(data);
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
    <div className="sentiment-analyzer-container">
      <h2 className="title">Sentiment Analyzer</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to analyze sentiment"
        className="input"
      />
      <button onClick={analyzeSentiment} className="button">
        Show Analysis
      </button>
      {/* <button onClick={() => setText('')} className="button reset-button">
        Reset
      </button> */}
      {Object.keys(sentiments).length > 0 && (
        <div className="result-container">
          <p>
            <strong>Negative:</strong> {getEmojiForScore(sentiments.negative)}{' '}
            {sentiments.negative}
          </p>
          <p>
            <strong>Neutral:</strong> {getEmojiForScore(sentiments.neutral)}{' '}
            {sentiments.neutral}
          </p>
          <p>
            <strong>Positive:</strong> {getEmojiForScore(sentiments.positive)}{' '}
            {sentiments.positive}
          </p>
        </div>
      )}
      {chartData && (
        <div className="chart-container">
          <Doughnut data={chartData} />
        </div>
      )}
    </div>
  );
};

export default SentimentAnalyzer;
