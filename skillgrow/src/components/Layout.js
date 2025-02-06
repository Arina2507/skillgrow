import React from 'react';
import { FaChartLine, FaBook, FaUsers, FaChalkboardTeacher, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import './Dashboard.css';

function Layout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/signin');
  };

  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard-wrapper">
        <aside className="sidebar">
          <div className="sidebar-header">
            <img src="/images/logo.svg" alt="SkillGrow" className="logo" />
            <span className="brand-name">SkillGrow</span>
          </div>
          <ul className="sidebar-menu">
            <li>
              <Link to="/dashboard">
                <FaChartLine /> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/courses">
                <FaBook /> Courses
              </Link>
            </li>
            <li>
              <Link to="/users">
                <FaUsers /> Users
              </Link>
            </li>
            <li>
              <Link to="/instructors">
                <FaChalkboardTeacher /> Instructors
              </Link>
            </li>
            <li>
              <Link to="/settings">
                <FaCog /> Settings
              </Link>
            </li>
            <li className="logout" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </li>
          </ul>
        </aside>
        
        <div className="dashboard-content">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
