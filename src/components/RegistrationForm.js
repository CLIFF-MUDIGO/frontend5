import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegistrationForm.css';

function RegistrationForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          username,
          email,
          password,
          password_confirmation,
        },
      }),
    })
      .then((response) => {
        setIsSubmitting(false);
        if (response.ok) {
          navigate('/login');
        } else {
          response.json().then((data) => setValidationErrors(data.errors || {}));
        }
      })
      .catch((error) => {
        setIsSubmitting(false);
        console.error(error);
      });
  };

  const handleName = (e) => {
    setUsername(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleP = (e) => {
    setPasswordConfirmation(e.target.value);
  };

  return (
    <div className="box">
      <div className="signup">
        <form onSubmit={handleSubmit} className="sign">
          <h1>Sign up for free</h1>
          <label>Username:</label>
          <input type="text" value={username} onChange={handleName} />
          {validationErrors.username && (
            <p className="error-message">{validationErrors.username[0]}</p>
          )}
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmail} />
          {validationErrors.email && (
            <p className="error-message">{validationErrors.email[0]}</p>
          )}
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePassword} />
          {validationErrors.password && (
            <p className="error-message">{validationErrors.password[0]}</p>
          )}
          <label>Password Confirmation:</label>
          <input
            type="password"
            value={password_confirmation}
            onChange={handleP}
          />
          {validationErrors.password_confirmation && (
            <p className="error-message">
              {validationErrors.password_confirmation[0]}
            </p>
          )}
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
          <p>
            please read our <span>terms and services</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;