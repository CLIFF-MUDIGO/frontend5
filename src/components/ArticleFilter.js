import React, { useState } from 'react';

const ArticleFilter = ({ onSearch, onFilter }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleFilterChange = (e) => {
    setSortBy(e.target.value);
    onFilter(e.target.value);
  };

  return (
    <div className="article-filter">
      <div className="search-bar">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search articles..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="filter-options">
        <label>Sort By:</label>
        <select value={sortBy} onChange={handleFilterChange}>
          <option value="date">Date</option>
          <option value="sentiment">Sentiment</option>
        </select>
      </div>
    </div>
  );
};

export default ArticleFilter;
