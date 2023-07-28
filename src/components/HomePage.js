import React, { useState } from 'react';
import axios from 'axios';
// import './HomePage.css';
const HomePage = () => {
  const [userInput, setUserInput] = useState('');
  const [sentimentScore, setSentimentScore] = useState(0); // Default sentiment score is 0 (neutral)
  const [sentimentFeedback, setSentimentFeedback] = useState(''); // Emojis for sentiment feedback
  const [comments, setComments] = useState([]);
  const handleSentimentAnalysis = () => {
    // Assuming you have a deployed backend API endpoint for sentiment analysis
    axios
      .post('/api/sentiment-analysis', { text: userInput })
      .then(response => {
        // Assuming the API returns a sentiment score (-5 to 5)
        const score = response.data.sentimentScore;
        setSentimentScore(score);
        // Map sentiment score to emojis
        if (score <= -4) {
          setSentimentFeedback(':sob:'); // Extremely Negative
        } else if (score <= -3) {
          setSentimentFeedback(':cry:'); // Very Negative
        } else if (score <= -2) {
          setSentimentFeedback(':disappointed:'); // Negative
        } else if (score <= -1) {
          setSentimentFeedback(':pensive:'); // Slightly Negative
        } else if (score === 0) {
          setSentimentFeedback(':neutral_face:'); // Neutral
        } else if (score >= 1) {
          setSentimentFeedback(':blush:'); // Slightly Positive
        } else if (score >= 2) {
          setSentimentFeedback(':grinning:'); // Positive
        } else if (score >= 3) {
          setSentimentFeedback(':smile:'); // Very Positive
        } else {
          setSentimentFeedback(':star-struck:'); // Extremely Positive
        }
      })
      .catch(error => {
        console.error('Error analyzing sentiment:', error);
        setSentimentScore(0); // Reset sentiment score to default (neutral)
        setSentimentFeedback(''); // Clear sentiment feedback
      });
  };
  const handleAddComment = () => {
    // Assuming you have a form to add comments and a backend API to store them
    // For simplicity, I'll just add a random comment for demonstration purposes
    const newComment = `This is a sample comment related to the sentiment analysis of "${userInput}".`;
    setComments([...comments, newComment]);
  };
  return (
    <div className="homepage-container">
      <h1>Sentiment Analysis App</h1>
      <div className="user-input">
        <h3>Enter Text for Analysis:</h3>
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your text here..."
        ></textarea>
        <button onClick={handleSentimentAnalysis}>Analyze</button>
      </div>
      <div className="sentiment-rating">
        <h3>Sentiment Rating: {sentimentScore}</h3>
        <div className="emoji-feedback">{sentimentFeedback}</div>
      </div>
      <div className="comments-section">
        <h3>Comments:</h3>
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
        <button onClick={handleAddComment}>Add Comment</button>
      </div>
    </div>
  );
};
export default HomePage;









