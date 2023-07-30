import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ArticleList from './components/ArticleList';
import ArticleDetails from './components/ArticleDetails'; // Assuming you have an ArticleDetails component for displaying individual article details
import Homep from './components/Homep';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import "./App.css";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/articles">Articles</Link>
        </li>
      </ul>
    </nav>
  );
};

const App = () => { 
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>My News App</h1>
        </header>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homep />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/articles" element={<ArticleList />} />
          <Route path="/articles/:id" element={<ArticleDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
