import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';

const BookmarkedArticles = () => {
  const { token } = useAuth();
  const [userArticles, setUserArticles] = useState([]);

  const fetchUserArticles = async () => {
    try {
      if (!token) {
        // Handle case where user is not authenticated
        return;
      }

      const response = await axios.get('http://127.0.0.1:3000/user_articles', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data)
      setUserArticles(response.data); // Extract the data array from the response
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
        <div>
          {userArticles.map((article) => (
            <div key={article.id}>
              <img src={article.image_url} alt={article.headline} />
              <h2>
                <Link to={`/articles/${article.id}`}>{article.headline}</Link>
              </h2>
              <p>{article.summary}</p>
              <p>{article.sentiment}</p>

              {/* Add the BookmarkButton component here */}
            </div>
          ))}
        </div>
      ) : (
        <p>No bookmarked articles found.</p>
      )}
    </div>
  );
};

export default BookmarkedArticles;
