// Import necessary components from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';

const App = () => { 
  return (
    <Router>
      <Routes>
        {/* Place your routes inside the <Routes> element */}
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        {/* Add more routes for other components or pages as needed */}
      </Routes>
    </Router>
  );
};

export default App;
