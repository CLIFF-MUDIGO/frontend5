import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';
import SearchComponent from './SearchComponent';
import './ArticleList.css';

const ArticleList = () => {
  const { token } = useAuth();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [userPreferences, setUserPreferences] = useState(null);
  const [filteredArticles, setFilteredArticles] = useState([]);

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
      return articles;
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

  const handleSearch = (searchQuery) => {
    const filteredArticles = applyUserPreferences().filter((article) =>
      article.headline.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredArticles(filteredArticles);
  };

  const handleFilter = (filterOption) => {
    const sortedArticles = [...filteredArticles];
    if (filterOption === 'alphabetical') {
      sortedArticles.sort((a, b) => a.headline.localeCompare(b.headline));
    } else if (filterOption === 'date') {
      sortedArticles.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    setFilteredArticles(sortedArticles);
  };

  useEffect(() => {
    fetchArticles();
    if (token) {
      fetchUserPreferences();
    } else {
      setUserPreferences(null);
    }
  }, [token]);

  useEffect(() => {
    if (articles.length > 0 && userPreferences) {
      const filteredArticles = applyUserPreferences();
      setFilteredArticles(filteredArticles);
    } else {
      setFilteredArticles(articles);
    }
  }, [articles, userPreferences]);

  if (isLoading) {
    return <div className="center">Loading...</div>;
  }

  if (error) {
    return <div className="center">{error}</div>;
  }

  return (
    <div className="center">
      <h1>News Articles</h1>
      <SearchComponent onSearch={handleSearch} onFilter={handleFilter} />
      <div className="article-container-horizontal">
        {filteredArticles.map((article) => (
          <div key={article.id} className="article-horizontal">
            <img src={article.image_url} alt={article.headline} />
            <div className="article-content-horizontal">
              <h2>
                <Link to={`/articles/${article.id}`}>{article.headline}</Link>
              </h2>
              <p>{article.summary}</p>
              <p>{article.sentiment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleList;