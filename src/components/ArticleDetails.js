import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ArticleDetails = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  const fetchArticleDetails = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:3000/news_articles/${id}`);
      setArticle(response.data);
    } catch (error) {
      console.error('Error fetching article details:', error);
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
    </div>
  );
};

export default ArticleDetails;
