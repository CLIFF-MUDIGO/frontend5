import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Slideshow.css';

const Slideshow = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const apiUrl = 'https://coronavirus-smartable.p.rapidapi.com/news/v1/US/';

    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': 'http://coronavirus-smartable.p.rapidapi.com',
        'X-RapidAPI-Key': '4990ecd6bbmsh93f9758a2e3467ap104e5cjsn1ac3e5b48e93',
      },
    })
      .then(response => response.json())
      .then(data => setNewsData(data.news))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,

    autoplay: true,
    autoplaySpeed: 5000,

    autoplay: true,         
    autoplaySpeed: 5000,     

  };


  useEffect(() => {
    const apiUrl = 'https://coronavirus-smartable.p.rapidapi.com/news/v1/US/';

    fetch(apiUrl, {
      method: 'GET',
      headers: {

        'X-RapidAPI-Host': 'http://coronavirus-smartable.p.rapidapi.com',

        'X-RapidAPI-Host': 'coronavirus-smartable.p.rapidapi.com',

        'X-RapidAPI-Key': '4990ecd6bbmsh93f9758a2e3467ap104e5cjsn1ac3e5b48e93',
      },
    })
      .then(response => response.json())
      .then(data => setNewsData(data.news))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="slideshow-container">
      <Slider {...settings}>
        {newsData && newsData.length > 0 && // Check if newsData is not empty
          newsData.map((article, index) => (
            <div key={index} className="each-slide">
              {article.images && article.images.length > 0 && (
                <img src={article.images[0].url} alt={article.title} />
              )}
              <div className="slide-content">
                <h2>{article.title}</h2>
                <p>{article.excerpt}</p>
                <a href={article.webUrl} target="_blank" rel="noopener noreferrer">
                  Read More
                </a>
              </div>
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default Slideshow;