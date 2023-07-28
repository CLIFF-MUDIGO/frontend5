import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import ArticleList from './components/ArticleList';
import ArticleDetails from './components/ArticleDetails'; // Assuming you have an ArticleDetails component for displaying individual article details

function App() {
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
    </Router>
  );
}

export default App;
