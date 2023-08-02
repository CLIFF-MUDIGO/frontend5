import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ArticleDetails = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const fetchArticleDetails = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:3000/news_articles/${id}`);
      setArticle(response.data);

      // Check if the article is bookmarked by the user
      const bookmarkResponse = await axios.get(`http://127.0.0.1:3000/news_articles/${id}/bookmarked`);
      setIsBookmarked(bookmarkResponse.data.isBookmarked);
    } catch (error) {
      console.error('Error fetching article details:', error);
    }
  };

  const handleBookmarkToggle = async () => {
    try {
      if (isBookmarked) {
        // Remove bookmark
        await axios.delete(`http://127.0.0.1:3000/news_articles/${id}/bookmarks`);
        setIsBookmarked(false);
      } else {
        // Add bookmark
        await axios.post(`http://127.0.0.1:3000/news_articles/${id}/bookmarks`);
        setIsBookmarked(true);
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  };

  useEffect(() => {
    fetchArticleDetails();
  }, [id]);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img src={article.image_url} alt={article.headline} />
      <h1>{article.headline}</h1>
      <p>{article.content}</p>
      {isBookmarked ? (
        <button onClick={handleBookmarkToggle}>Remove Bookmark</button>
      ) : (
        <button onClick={handleBookmarkToggle}>Bookmark</button>
      )}
    </div>
  );
};

export default ArticleDetails;
