import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'auto');
  const [cart, setCart] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      setCart(storedUser.cart || []);
    }
    document.body.setAttribute('data-bs-theme', theme);

    const handleStorageChange = () => {
      const updatedUser = JSON.parse(localStorage.getItem('user'));
      if (updatedUser) {
        setUser(updatedUser);
        setCart(updatedUser.cart || []);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [theme]);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.setAttribute('data-bs-theme', newTheme);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/signin');
  };

  const getAvatar = () => {
    if (!user) return '/images/default-avatar.png';
    switch (user.role) {
      case 'admin':
        return '/images/admin.png';
      case 'teacher':
        return '/images/teacher.png';
      case 'student':
        return '/images/student.png';
      default:
        return '/images/default-avatar.png';
    }
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container px-0">
        <a className="navbar-brand" href="/">
          <img src="/images/logo.svg" alt="Logo" className="logo-img" />
          SkillGrow
        </a>

        <div className="d-flex align-items-center order-lg-3 ms-lg-3">
          <div className="dropdown me-2">
            <button className="btn btn-light btn-icon rounded-circle" type="button" data-bs-toggle="dropdown">
              <i className={`bi ${theme === 'dark' ? 'bi-moon-stars-fill' : theme === 'light' ? 'bi-sun-fill' : 'bi-circle-half'}`}></i>
            </button>
            <ul className="dropdown-menu dropdown-menu-end shadow">
              <li><button className={`dropdown-item ${theme === 'light' ? 'active' : ''}`} onClick={() => handleThemeChange('light')}>Light</button></li>
              <li><button className={`dropdown-item ${theme === 'dark' ? 'active' : ''}`} onClick={() => handleThemeChange('dark')}>Dark</button></li>
              <li><button className={`dropdown-item ${theme === 'auto' ? 'active' : ''}`} onClick={() => handleThemeChange('auto')}>Auto</button></li>
            </ul>
          </div>

          {user && user.role === 'student' && (
            <button className="btn btn-light rounded-circle me-3" onClick={() => navigate('/cart')}>
              🛒 <span className="cart-count">{cart.length}</span>
            </button>
          )}

          {user ? (
            <div className="dropdown">
              <button className="btn btn-light rounded-circle d-flex align-items-center" type="button" data-bs-toggle="dropdown">
                <img src={getAvatar()} alt="User Avatar" className="rounded-circle" width="40" height="40" />
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><span className="dropdown-item">Hello, {user.email}</span></li>
                <li><span className="dropdown-item">Role: {user.role}</span></li>
                {user.role === 'admin' && <li><a href="/dashboard" className="dropdown-item">Admin Dashboard</a></li>}
                {user.role === 'teacher' && <li><a href="/teacher-dashboard" className="dropdown-item">Teacher Dashboard</a></li>}
                <li><button className="dropdown-item text-danger" onClick={handleLogout}>Logout</button></li>
              </ul>
            </div>
          ) : (
            <>
              <a href="/signin" className="btn btn-outline-primary me-2">Sign in</a>
              <a href="/signup" className="btn btn-primary d-none d-md-block">Sign up</a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
