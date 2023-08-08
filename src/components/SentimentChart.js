import React, { useState } from "react";
import Chart from "chart.js/auto";
import { PolarArea } from "react-chartjs-2";

const SentimentChart = () => {
  const [data, setData] = useState({
    negative: 0.212,
    neutral: 0.588,
    positive: 0.3,
    compound: -0.7906,
  });

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
    < PolarArea
      data={chartData}
      options={{
        title: {
          text: "Sentiment Analysis",
          fontSize: 20,
        },
      }}
    />
  );
};

export default SentimentChart;
