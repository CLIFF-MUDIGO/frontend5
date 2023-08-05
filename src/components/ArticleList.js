import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';

const ArticleList = () => {
  const { token } = useAuth();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [userPreferences, setUserPreferences] = useState(null);

  const fetchArticles = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:3000/news_articles');
      setArticles(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError('Error fetching articles. Please try again.');
    }
  };

  const fetchUserPreferences = async () => {
    if (token) {
      try {
        const response = await axios.get('http://127.0.0.1:3000/users/preferences', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserPreferences(response.data);
      } catch (error) {
        console.error('Error fetching user preferences:', error);
      }
    }
  };

  const applyUserPreferences = () => {
    if (!userPreferences) {
      return articles; // No user preferences, return all articles as is
    }

    return articles.filter((article) => {
      if (userPreferences.hide_negative_sentiment && article.sentiment === 'negative') {
        return false;
      }
      if (userPreferences.hide_positive_sentiment && article.sentiment === 'positive') {
        return false;
      }
      if (userPreferences.hide_neutral_sentiment && article.sentiment === 'neutral') {
        return false;
      }
      return true;
    });
  };

  useEffect(() => {
    fetchArticles();
    if (token) {
      fetchUserPreferences();
    } else {
      setUserPreferences(null); // Reset user preferences if the user is not logged in
    }
  }, [token]);

  useEffect(() => {
    // Apply user preferences to the articles whenever the articles or userPreferences change
    if (articles.length > 0 && userPreferences) {
      const filteredArticles = applyUserPreferences();
      setArticles(filteredArticles);
    }
  }, [userPreferences]);

  const BookmarkButton = ({ articleId, isBookmarked }) => {
    // Rest of the code for BookmarkButton component
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>News Articles</h1>
      {articles.map((article) => (
        <div key={article.id}>
          <img src={article.image_url} alt={article.headline} />
          <h2>
            <Link to={`/articles/${article.id}`}>{article.headline}</Link>
          </h2>
          <p>{article.summary}</p>
          <p>{article.sentiment}</p>

          {/* Add the BookmarkButton component here */}
          <BookmarkButton articleId={article.id} isBookmarked={article.isBookmarked} />

          
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
