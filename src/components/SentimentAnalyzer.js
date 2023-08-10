import React, { useState , useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import './SentimentAnalyzer.css';

const SentimentAnalyzer = ({ score }) => {
  const [sentiments, setSentiments] = useState({});
  const [data, setData] = useState({
    negative: 0.096,
        neutral: 0.904,
        positive: 0.0,
        compound: -0.4703,
  });

  useEffect(() => {
    console.log(score);
    setData(score);
  }, [score]);

      // Create data for the doughnut chart
      const chartData = {
        labels: ['Negative', 'Neutral', 'Positive'],
        datasets: [
          {
            label: "Sentiment",
            data: [data.negative, data.neutral, data.positive],
            backgroundColor: ["#ff0000", "#D3D3D3", "#00ff00"],
          },
        ],
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
      <h2 className="title">Graphical Analysis</h2>
      
      
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
          <Pie data={chartData} />
        </div>
      )}
    </div>
  );
};

export default SentimentAnalyzer;
