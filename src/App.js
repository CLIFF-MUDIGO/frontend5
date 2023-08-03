import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ArticleList from './components/ArticleList';
import ArticleDetails from './components/ArticleDetails';
import Homep from './components/Homep';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import ArticleFilter from './components/ArticleFilter'; // Import the ArticleFilter component
import "./App.css";
import "./components/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">My News App</Link>
      </div>
      <ul>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        
      </ul>
    </nav>
  );
};

const App = () => { 
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilter = (sortOption) => {
    setSortBy(sortOption);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Navbar />
          <ArticleFilter onSearch={handleSearch} onFilter={handleFilter} /> {/* Use the ArticleFilter component */}
        </header>
        <Routes>
          <Route path="/" element={<Homep />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
          {/* Pass the searchQuery and sortBy as props to the ArticleList component */}
          <Route path="/articles" element={<ArticleList searchQuery={searchQuery} sortBy={sortBy} />} />
          <Route path="/articles/:id" element={<ArticleDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
