
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import ArticleList from './components/ArticleList';
import ArticleDetails from './components/ArticleDetails'; // Assuming you have an ArticleDetails component for displaying individual article details
// Import necessary components from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';

const App = () => { 
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>My News App</h1>
        </header>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/articles" element={<ArticleList />} />
          <Route path="/articles/:id" element={<ArticleDetails />} />
        </Routes>
      </div>
      <Routes>
        {/* Place your routes inside the <Routes> element */}
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        {/* Add more routes for other components or pages as needed */}
      </Routes>
    </Router>
  );
};

export default App;
