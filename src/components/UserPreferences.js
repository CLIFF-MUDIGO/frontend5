import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserPreferences.css';

function UserPreferences({ authToken }) {
  const [userPreferences, setUserPreferences] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUserPreferences = async () => {
    setError('');

    try {
      const response = await axios.get('http://localhost:3000/users/preferences', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setUserPreferences(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError('Error fetching user preferences. Please try again.');
    }
  };

  const updateUserPreferences = (updatedPreferences) => {
    if (!authToken) {
      setError('Please log in to update user preferences.');
      return;
    }

    const config = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        user: {
          ...updatedPreferences,
        },
      }),
    };

    fetch('http://localhost:3000/users/preferences', config)
      .then((response) => response.json())
      .then((data) => setUserPreferences(data))
      .catch((error) => setError('Error updating user preferences. Please try again.'));
  };

  const handlePreferenceChange = (event) => {
    const { name, checked } = event.target;
    updateUserPreferences({ [name]: checked });
  };

  useEffect(() => {
    if (authToken) {
      fetchUserPreferences();
    } else {
      setIsLoading(false);
    }
  }, [authToken]);

  return (
    <div className="user-preferences-container">
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="preferences-content">
          {!authToken && (
            <div className="login-message">Kindly Log In to set your desired preference</div>
          )}

          {!userPreferences ? (
            <div className="preferences-form">
              <h2 className="preferences-header">Add Your Personal Preferences</h2>
              <label className="preference-item">
                <span className="sentiment-icon">😡</span> Hide Negative Sentiment:
                <input
                  type="checkbox"
                  name="hide_negative_sentiment"
                  checked={false}
                  onChange={handlePreferenceChange}
                  disabled={!authToken}
                />
                <div className="checkmark"></div>
              </label>
              {/* ... Repeat for other sentiments */}
            </div>
          ) : (
            <div className="preferences-form">
              <h2 className="preferences-header">Your Personal Preferences</h2>
              {error && <div className="error-message">{error}</div>}
              <label className="preference-item">
                <span className="sentiment-icon">😡</span> Hide Negative Sentiment:
                <input
                  type="checkbox"
                  name="hide_negative_sentiment"
                  checked={userPreferences.hide_negative_sentiment}
                  onChange={handlePreferenceChange}
                  disabled={!authToken}
                />
                <div className="checkmark"></div>
              </label>
              <label className="preference-item">
                <span className="sentiment-icon">😂</span> Hide Positive Sentiment:
                <input
                  type="checkbox"
                  name="hide_positive_sentiment"
                  checked={userPreferences.hide_positive_sentiment}
                  onChange={handlePreferenceChange}
                  disabled={!authToken}
                />
                <div className="checkmark"></div>
              </label>
              <label className="preference-item">
                <span className="sentiment-icon">😐</span> Hide Neutral Sentiment:
                <input
                  type="checkbox"
                  name="hide_neutral_sentiment"
                  checked={userPreferences.hide_neutral_sentiment}
                  onChange={handlePreferenceChange}
                  disabled={!authToken}
                />
                <div className="checkmark"></div>
              </label>
              {/* Add other preference checkboxes here */}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default UserPreferences;
