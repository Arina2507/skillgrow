import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import './Auth.css';

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '', role: 'student' });
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

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some((user) => user.email === formData.email);

    if (userExists) {
      setError('User already exists');
    } else {
      users.push({ email: formData.email, password: formData.password, role: formData.role });
      localStorage.setItem('users', JSON.stringify(users));
      alert('Account created successfully! You can now sign in.');
      navigate('/signin');
    }
  };

  return (
    <>
      <Header onThemeChange={handleThemeChange} />
      <div className={`auth-container ${theme}`}>
        <form onSubmit={handleSubmit} className={`auth-form ${theme}`}>
          <h2 className="text-center">Sign Up</h2>
          {error && <p className="error-message">{error}</p>}

          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" required className="form-control" value={formData.email} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input type="password" name="password" required className="form-control" value={formData.password} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Confirm Password:</label>
            <input type="password" name="confirmPassword" required className="form-control" value={formData.confirmPassword} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Role:</label>
            <select name="role" className="form-control" value={formData.role} onChange={handleChange}>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" className="btn btn-success w-100 mt-3">Sign Up</button>
          <p className="text-center mt-2">
            Already have an account? <a href="/signin">Sign In</a>
          </p>
        </form>
      </div>
    </>
  );
}

export default SignUp;
