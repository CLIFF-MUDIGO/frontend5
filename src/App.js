// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ArticleList from './components/ArticleList';
import ArticleDetails from './components/ArticleDetails';
import Homep from './components/Homep';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import { AuthProvider, useAuth } from './components/AuthContext'; // Import the useAuth hook and AuthProvider
import "./App.css";
import UserPreferences from './components/UserPreferences';
import BookmarkedArticles from './components/BookmarkedArticles';


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
        <li>
          <Link to="/articles">Articles</Link>
        </li>
        <li>
          <Link to="/preferences">Preferences</Link>
        </li>
        <li>
          <Link to="/bookmarked">My Articles</Link>
        </li>
      </ul>
    </nav>
  );
};

const App = () => {
  const { token } = useAuth(); // Retrieve the JWT token from the context

  return (
    <div className="App">
      <header className="App-header">
        <h1>My News App</h1>
      </header>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homep />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/articles"
          element={<ArticleList token={token} />} // Pass the token as a prop to the ArticleList component
        />
        <Route path="/preferences" element={<UserPreferences authToken={token} />}/>
        <Route path="/articles/:id" element={<ArticleDetails />} />
        <Route exact path="/bookmarked" element={<BookmarkedArticles/>} />
      </Routes>
    </div>

  );
};

export default App;
