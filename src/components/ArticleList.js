import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);

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
          <hr />
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
