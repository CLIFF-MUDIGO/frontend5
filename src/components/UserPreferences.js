import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserPreferences({ authToken }) {
  const [userPreferences, setUserPreferences] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Function to fetch user preferences from the server
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

  // Function to update user preferences
  // Function to update user preferences
    const updateUserPreferences = (updatedPreferences) => {
    // Make sure the authToken is available before making the API call
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
  

  // Fetch user preferences when the component mounts (if authToken is available)
  useEffect(() => {
    if (authToken) {
      fetchUserPreferences();
    } else {
      setIsLoading(false);
    }
  }, [authToken]);

  // Function to handle preference checkbox changes
  const handlePreferenceChange = (event) => {
    const { name, checked } = event.target;
    updateUserPreferences({ [name]: checked });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!userPreferences) {
    // If user has no preferences, show the checkboxes to create preferences
    return (
      <div>
        <h2>Create User Preferences</h2>
        <label>
          Hide Negative Sentiment:
          <input
            type="checkbox"
            name="hide_negative_sentiment"
            checked={false}
            onChange={handlePreferenceChange}
            disabled={!authToken} // Disable checkbox if not logged in
          />
        </label>
        <label>
          Hide Positive Sentiment:
          <input
            type="checkbox"
            name="hide_positive_sentiment"
            checked={false}
            onChange={handlePreferenceChange}
            disabled={!authToken} // Disable checkbox if not logged in
          />
        </label>
        <label>
          Hide Neutral Sentiment:
          <input
            type="checkbox"
            name="hide_neutral_sentiment"
            checked={false}
            onChange={handlePreferenceChange}
            disabled={!authToken} // Disable checkbox if not logged in
          />
        </label>
      </div>
    );
  }

  // If user has preferences, show their preferences and allow updates
  return (
    <div>
      <h2>User Preferences</h2>
      {error && <div>{error}</div>}
      <label>
        Hide Negative Sentiment:
        <input
          type="checkbox"
          name="hide_negative_sentiment"
          checked={userPreferences.hide_negative_sentiment}
          onChange={handlePreferenceChange}
          disabled={!authToken} // Disable checkbox if not logged in
        />
      </label>
      <label>
        Hide Positive Sentiment:
        <input
          type="checkbox"
          name="hide_positive_sentiment"
          checked={userPreferences.hide_positive_sentiment}
          onChange={handlePreferenceChange}
          disabled={!authToken} // Disable checkbox if not logged in
        />
      </label>
      <label>
        Hide Neutral Sentiment:
        <input
          type="checkbox"
          name="hide_neutral_sentiment"
          checked={userPreferences.hide_neutral_sentiment}
          onChange={handlePreferenceChange}
          disabled={!authToken} // Disable checkbox if not logged in
        />
      </label>
      {/* Add other preference checkboxes here */}
    </div>
  );
}

export default UserPreferences;
