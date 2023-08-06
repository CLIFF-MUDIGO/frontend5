import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';
import "./Bookmark.css";

const ArticleDetails = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const [article, setArticle] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [bookmark, setBookmark] = useState(null);

  const fetchArticleDetails = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:3000/news_articles/${id}`);
      setArticle(response.data);
    } catch (error) {
      console.error('Error fetching article details:', error);
    }
  };

  const fetchBookmarkStatus = async () => {
    if (!token) {
      setIsBookmarked(false);
      setIsLoading(false);
      return;
    }
  
    try {
      const response = await axios.get(`http://127.0.0.1:3000/bookmarks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Check if the response has the bookmark object
      if (response.data) {
        setIsBookmarked(true);
        setBookmark(response.data); // Set the entire bookmark object in state
      } else {
        setIsBookmarked(false);
      }
    } catch (error) {
      setIsBookmarked(false);
      console.error('Error fetching bookmark status:', error);
    } finally {
      setIsLoading(false);
    }
  };
    

  const handleBookmark = () => {
    if (!token) {
      alert('Please log in to bookmark this article.');
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    if (isBookmarked) {
      // Check if the article is bookmarked before trying to remove it
      axios
        .delete(`http://127.0.0.1:3000/bookmarks/${bookmark.id}`, config)
        .then(() => setIsBookmarked(false)) // Update the state to reflect the removed bookmark
        .catch((error) => console.error('Error removing bookmark:', error));
    } else {
      const data = { news_article_id: id };
      axios
        .post('http://127.0.0.1:3000/bookmarks', data, config)
        .then((response) => {
          setIsBookmarked(true); // Update the state to reflect the added bookmark
          // Assuming the response contains the bookmark_id, you can extract and set it in the article state
          if (response.data && response.data.id) {
            setBookmark(response.data); // Set the entire bookmark instance
          }
        })
        .catch((error) => console.error('Error adding bookmark:', error));
    }
  };

  useEffect(() => {
    fetchArticleDetails();
    fetchBookmarkStatus();
  }, [id, token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!article || !article.id) {
    return <div>Error fetching article details.</div>;
  }

  return (
    <div>
      <img src={article.image_url} alt={article.headline} />
      <h1>{article.headline}</h1>
      <p>{article.content}</p>
      <p>{article.sentiment}</p>

      {/* Bookmark button */}
      <button className="button" onClick={handleBookmark}>
        {isBookmarked ? 'Remove Bookmark' : 'Bookmark'}
      </button>
    </div>
  );
};

export default ArticleDetails;
