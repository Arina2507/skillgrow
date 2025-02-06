import React, { useState, useEffect } from 'react';
import { FaChartLine, FaBook, FaUsers, FaChalkboardTeacher, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { Line, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import './Dashboard.css';
import Users from './Users';

function Dashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showUsersDropdown, setShowUsersDropdown] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [stats, setStats] = useState({
    sales: 10800,
    courses: 2456,
    students: 122456,
    instructors: 22786,
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.role === 'admin') {
      localStorage.setItem('theme', 'dark');
      document.body.setAttribute('data-bs-theme', 'dark');
    }
  }, []);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setStats({
      sales: Math.floor(Math.random() * 20000 + 5000),
      courses: Math.floor(Math.random() * 30 + 10),
      students: Math.floor(Math.random() * 200000 + 5000),
      instructors: Math.floor(Math.random() * 30000 + 50),
    });
  };

  const earningsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Earnings ($)',
        data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 10000 + 5000)),
        borderColor: '#6f42c1',
        backgroundColor: 'rgba(111, 66, 193, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const trafficData = {
    labels: ['Organic', 'Paid', 'Referral'],
    datasets: [
      {
        data: [Math.random() * 100, Math.random() * 100, Math.random() * 100],
        backgroundColor: ['#6f42c1', '#198754', '#dc3545'],
      },
    ],
  };

  return (
    <div className="dashboard">
      {/* Сайдбар */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2 className="sidebar-title">Categories</h2>
        </div>
        <ul className="sidebar-menu">
          <li className={activeSection === 'dashboard' ? 'active' : ''} onClick={() => setActiveSection('dashboard')}>
            <FaChartLine /> Dashboard
          </li>
          <li className={activeSection === 'courses' ? 'active' : ''} onClick={() => setActiveSection('courses')}>
            <FaBook /> Courses
          </li>
          <li className={activeSection === 'users' ? 'active' : ''} onClick={() => setShowUsersDropdown(!showUsersDropdown)}>
            <FaUsers /> Users
          </li>
          {showUsersDropdown && (
            <ul className="users-dropdown">
              <li onClick={() => setActiveSection('students')}>Students</li>
              <li onClick={() => setActiveSection('teachers')}>Teachers</li>
            </ul>
          )}
          <li className={activeSection === 'settings' ? 'active' : ''} onClick={() => setActiveSection('settings')}>
            <FaCog /> Settings
          </li>
          <li className="logout">
            <FaSignOutAlt /> Logout
          </li>
        </ul>
      </aside>

      {/* Основной контент */}
      <div className="dashboard-content">
        {activeSection === 'dashboard' && (
          <>
            <header className="dashboard-header">
              <h2>Dashboard</h2>
              <div className="header-right">
                <input
                  type="date"
                  className="date-picker"
                  value={selectedDate}
                  onChange={handleDateChange}
                />
                <button className="btn btn-primary">Settings</button>
              </div>
            </header>

            <div className="stats">
              <div className="stat-card">
                <h3>Sales</h3>
                <p>${stats.sales.toLocaleString()}</p>
                <span className="text-success">+{Math.floor(Math.random() * 50)}% Increase</span>
              </div>

              <div className="stat-card">
                <h3>Courses</h3>
                <p>{stats.courses.toLocaleString()}</p>
                <span className="text-danger">+{Math.floor(Math.random() * 30)} Pending</span>
              </div>

              <div className="stat-card">
                <h3>Students</h3>
                <p>{stats.students.toLocaleString()}</p>
                <span className="text-success">+{Math.floor(Math.random() * 500)} Students</span>
              </div>

              <div className="stat-card">
                <h3>Instructors</h3>
                <p>{stats.instructors.toLocaleString()}</p>
                <span className="text-success">+{Math.floor(Math.random() * 200)} Instructors</span>
              </div>
            </div>

            <div className="charts">
              <div className="chart-card">
                <h3>Earnings</h3>
                <Line data={earningsData} />
              </div>
              <div className="chart-card">
                <h3>Traffic</h3>
                <Doughnut data={trafficData} />
              </div>
            </div>
          </>
        )}

        {activeSection === 'students' && <Users role="students" />}
        {activeSection === 'teachers' && <Users role="teachers" />}
        {activeSection === 'settings' && <h2>Settings Section</h2>}
      </div>
    </div>
  );
}

export default Dashboard;
