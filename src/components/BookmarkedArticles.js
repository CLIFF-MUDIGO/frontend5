import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const BookmarkedArticles = () => {
  const { token } = useAuth();
  const [userArticles, setUserArticles] = useState([]);

  const fetchUserArticles = async () => {
    try {
      const token = localStorage.getItem('token'); // Assuming you store the token in local storage after logging in
      if (!token) {
        // Handle case where user is not authenticated
        return;
      }
  
      const response = await axios.get('http://127.0.0.1:3000/user_articles', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response)
      setUserArticles(response.data);
    } catch (error) {
      console.error('Error fetching user articles:', error);
    }
  };

  useEffect(() => {
    fetchUserArticles();
  }, [token]);

  return (
    <div>
      <h1>Your Bookmarked Articles</h1>
      {userArticles.length > 0 ? (
        <ul>
          {userArticles.map((article) => (
            <li key={article.id}>
              <a href={`/article/${article.news_article_id}`}>{article.news_article.headline}</a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookmarked articles found.</p>
      )}
    </div>
  );
};

export default BookmarkedArticles;
