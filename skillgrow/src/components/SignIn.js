import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import './Auth.css';

function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'auto');

  useEffect(() => {
    document.body.setAttribute('data-bs-theme', theme);
  }, [theme]);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((user) => user.email === formData.email && user.password === formData.password);

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      alert(`Welcome back, ${user.email}!`);
      navigate('/');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <>
      <Header onThemeChange={handleThemeChange} />
      <div className={`auth-container ${theme}`}>
        <form onSubmit={handleSubmit} className={`auth-form ${theme}`}>
          <h2 className="text-center">Sign In</h2>
          {error && <p className="error-message">{error}</p>}

          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" required className="form-control" value={formData.email} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input type="password" name="password" required className="form-control" value={formData.password} onChange={handleChange} />
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-3">Sign In</button>
          <p className="text-center mt-2">
            Don't have an account? <a href="/signup">Sign Up</a>
          </p>
        </form>
      </div>
    </>
  );
}

export default SignIn;
