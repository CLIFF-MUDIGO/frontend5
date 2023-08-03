import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';

const ArticleList = () => {
  const { token } = useAuth(); // Retrieve the JWT token from the context
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:3000/news_articles');
      const fetchedArticles = response.data;

      // Fetch the bookmarked articles when the token is available
      if (token) {
        const bookmarksResponse = await axios.get('http://127.0.0.1:3000/bookmarks', {
          headers: {
            Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
          },
        });

        // Map the bookmarked article IDs into an array
        const bookmarkedArticleIds = bookmarksResponse.data.map((bookmark) => bookmark.news_article_id);

        // Update the state of articles with bookmarked status
        const updatedArticles = fetchedArticles.map((article) => ({
          ...article,
          isBookmarked: bookmarkedArticleIds.includes(article.id),
        }));
        setArticles(updatedArticles);
      } else {
        // If user is not logged in, set the isBookmarked state to false for all articles
        setArticles(fetchedArticles.map((article) => ({ ...article, isBookmarked: false })));
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [token]);

  const BookmarkButton = ({ articleId, isBookmarked }) => {
    const handleBookmark = () => {
      // Check if the user is logged in (JWT token is available)
      if (!token) {
        // User is not logged in, show an alert to log in
        alert('Please log in to bookmark this article.');
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
      };

      // Make an API call to either bookmark or remove bookmark based on the `isBookmarked` state
      if (isBookmarked) {
        // Remove the bookmark
        axios
          .delete(`http://127.0.0.1:3000/bookmarks/${articleId}`, config)
          .then(() => {
            // Update the state to reflect the removed bookmark
            setArticles((prevArticles) =>
              prevArticles.map((article) =>
                article.id === articleId ? { ...article, isBookmarked: false } : article
              )
            );
          })
          .catch((error) => console.error('Error removing bookmark:', error));
      } else {
        // Add the bookmark
        const data = { news_article_id: articleId };
        axios
          .post('http://127.0.0.1:3000/bookmarks', data, config)
          .then(() => {
            // Update the state to reflect the added bookmark
            setArticles((prevArticles) =>
              prevArticles.map((article) =>
                article.id === articleId ? { ...article, isBookmarked: true } : article
              )
            );
          })
          .catch((error) => console.error('Error adding bookmark:', error));
      }
    };

    return (
      <button onClick={handleBookmark}>
        {isBookmarked ? 'Remove Bookmark' : 'Bookmark'}
      </button>
    );
  };

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

          {/* Add the BookmarkButton component here */}
          <BookmarkButton articleId={article.id} isBookmarked={article.isBookmarked} />

          <hr />
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
