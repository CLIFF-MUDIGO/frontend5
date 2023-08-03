import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ArticleList = ({ searchQuery, sortBy }) => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);

  const fetchArticles = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:3000/news_articles');
      setArticles(response.data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  // Filter articles based on searchQuery and sortBy whenever they change
  useEffect(() => {
    // Filter articles based on the search query
    const filtered = articles.filter((article) =>
      article.headline.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort articles based on the selected filter option
    let sorted = [...filtered];
    if (sortBy === 'date') {
      sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === 'sentiment') {
      // Implement sorting by sentiment if needed
      // sorted.sort(...);
    }

    setFilteredArticles(sorted);
  }, [searchQuery, sortBy, articles]);

  return (
    <div>
      <h1>News Articles</h1>
      {filteredArticles.map((article) => (
        <div key={article.id}>
          <img src={article.image_url} alt={article.headline} />
          <h2>
            <Link to={`/articles/${article.id}`}>{article.headline}</Link>
          </h2>
          <p>{article.summary}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
