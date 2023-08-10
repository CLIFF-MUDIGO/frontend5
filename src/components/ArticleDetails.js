import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';
import SentimentAnalyzer from './SentimentAnalyzer'; // Make sure the import path is correct
import './Bookmark.css';
import './ArticleDetail.css'

const ArticleDetails = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const [article, setArticle] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [bookmark, setBookmark] = useState(null);
  const [sentiment, setSentiment] = useState({});

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

      if (response.data) {
        setIsBookmarked(true);
        setBookmark(response.data);
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
      axios
        .delete(`http://127.0.0.1:3000/bookmarks/${bookmark.id}`, config)
        .then(() => setIsBookmarked(false))
        .catch((error) => console.error('Error removing bookmark:', error));
    } else {
      const data = { news_article_id: id };
      axios
        .post('http://127.0.0.1:3000/bookmarks', data, config)
        .then((response) => {
          setIsBookmarked(true);
          if (response.data && response.data.id) {
            setBookmark(response.data);
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
    <div className='details'>
      <img src={article.image_url} alt={article.headline} />
      <h1>{article.headline}</h1>
      <p className="sentiment-content">{article.content}</p>
      <p className='sentiment-display'>Main Sentiment : {article.sentiment}</p>

      <button className="button" onClick={handleBookmark}>
        {isBookmarked ? 'Remove Bookmark' : 'Bookmark'}
      </button>
      <SentimentAnalyzer initialText={article.content} />
    </div>
  );
};

export default ArticleDetails;
