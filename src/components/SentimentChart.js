import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import "./SentimentChart.css";

const SentimentChart = ({ result }) => {
  const [data, setData] = useState({
    negative: 0.212,
    neutral: 0.588,
    positive: 0.3,
    compound: -0.7906,
  });

  useEffect(() => {
    console.log(result.sentiment_score);
    setData(result.sentiment_score);
  }, [result]);

  const chartData = {
    labels: ["Negative", "Neutral", "Positive"],
    datasets: [
      {
        label: "Sentiment",
        data: [data.negative, data.neutral, data.positive],
        backgroundColor: ["#ff0000", "#ffffff", "#00ff00"],
      },
    ],
  };

  return (
    <div className="chart">
    <Doughnut
    data={chartData}
  options={{
    title: {
      text: "Sentiment Analysis",
      fontSize: 30,
    },
  }}
/>
</div>
  );
};

export default SentimentChart;