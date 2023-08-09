import React, { useState } from 'react';

const SearchComponent = ({ onSearch, onFilter }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date'); // Default sorting by date

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    setSortBy(selectedFilter);
    onFilter(selectedFilter);
  };

  return (
    <div className="search-component">
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
          <option value="alphabetical">Alphabetical</option>
        </select>
      </div>
    </div>
  );
};

export default SearchComponent;
