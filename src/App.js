import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ArticleList from './components/ArticleList';
import ArticleDetails from './components/ArticleDetails';
import Homep from './components/Homep';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
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
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Navbar /> {/* Move Navbar inside the header */}
        </header>
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
