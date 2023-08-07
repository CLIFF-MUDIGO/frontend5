import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./RegistrationForm.css";
import "./RegistrationForm.css";

function RegistrationForm() {
  const [name, setName] = useState('');
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

    // Frontend validation for password length and matching
    if (password.length < 8) {
      setValidationErrors({ password: ['Password must be at least 8 characters long'] });
      setIsSubmitting(false);
      return;
    }

    if (password !== password_confirmation) {
      setValidationErrors({ password_confirmation: ['Password confirmation must match the password'] });
      setIsSubmitting(false);
      return;
    }

    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          name,
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
    setName(e.target.value);
  };
  
  const handleUserName = (e) => {
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
    <div className="registration-box">
      <div className="user-box">
        <form onSubmit={handleSubmit} className="sign">
          <h1>Sign up </h1>
          <label className='label'>Name:</label>
          <input type="text" value={name} onChange={handleName}/>
          {validationErrors.name && (
            <p className="error-message">{validationErrors.name[0]}</p>
          )}
          <label className='label'>Username:</label>
          <input type="text" value={username} onChange={handleUserName} />
          {validationErrors.username && (
            <p className="error-message">{validationErrors.username[0]}</p>
          )}
          <label className='label'>Email:</label>
          <input type="email" value={email} onChange={handleEmail} />
          {validationErrors.email && (
            <p className="error-message">{validationErrors.email[0]}</p>
          )}
          <label className='label'>Password:</label>
          <input type="password" value={password} onChange={handlePassword} />
          {validationErrors.password && (
            <p className="error-message">{validationErrors.password[0]}</p>
          )}
          <label className='label'>Password Confirmation:</label>
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
          <center>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
          </center>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;
