import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './components/AuthContext';

const root = document.getElementById('root');
const app = (
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>
);

ReactDOM.createRoot(root).render(app);
