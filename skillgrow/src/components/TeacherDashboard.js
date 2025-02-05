import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import './TeacherDashboard.css';

function TeacherDashboard() {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [allCourses, setAllCourses] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser || storedUser.role !== 'teacher') {
      navigate('/signin');
    } else {
      setUser(storedUser);
      setCourses(storedUser.courses || []);
    }

    fetch('/data/courses.json')
      .then(response => response.json())
      .then(data => setAllCourses(data))
      .catch(error => console.error('Error loading courses data:', error));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/signin');
  };

  const handleAddCourse = () => {
    if (!selectedCourse || courses.some(course => course.title === selectedCourse)) return;

    const courseToAdd = allCourses.find(course => course.title === selectedCourse);
    if (!courseToAdd) return;

    const updatedCourses = [...courses, courseToAdd];
    setCourses(updatedCourses);

    const updatedUser = { ...user, courses: updatedCourses };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setSelectedCourse('');
  };

  const handleDeleteCourse = (courseTitle) => {
    const updatedCourses = courses.filter(course => course.title !== courseTitle);
    setCourses(updatedCourses);

    const updatedUser = { ...user, courses: updatedCourses };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);

    if (selectedCourse === courseTitle) {
      setSelectedCourse(null);
    }
  };

  const selectedCourseDetails = courses.find(course => course.title === selectedCourse);

  return (
    <div className="dashboard-container">
      <div className="header">
        <h1>Teacher Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <p className="welcome-text">Hello, <strong>{user?.email}</strong>!</p>

      <div className="dashboard-content">
        {/* Левая колонка: Список курсов */}
        <div className="course-list-container">
          <h2>My Courses</h2>
          <div className="course-list">
            {courses.length > 0 ? (
              <ul className="course-column">
                {courses.map(course => (
                  <li key={course.id} className="course-item">
                  <span onClick={() => setSelectedCourse(course.title)}>
                    {course.title}
                  </span>
                  <button className="delete-btn" onClick={() => handleDeleteCourse(course.title)}>❌</button>
                </li>                
                ))}
              </ul>
            ) : (
              <p className="empty-text">You don't have any courses yet</p>
            )}
          </div>

          <div className="add-course">
            <select
              value={selectedCourse || ''}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="course-select"
            >
              <option value="">Select a course</option>
              {allCourses
                .filter(course => !courses.some(c => c.title === course.title))
                .map((course) => (
                  <option key={course.id} value={course.title}>
                    {course.title}
                  </option>
                ))}
            </select>
            <button className="add-btn" onClick={handleAddCourse}>Add Course</button>
          </div>
        </div>

        {/* Правая колонка: Информация о курсе */}
        <div className="course-info-container">
          {selectedCourseDetails ? (
            <>
              <h2>{selectedCourseDetails.title}</h2>
              <p><strong>Description:</strong> {selectedCourseDetails.description}</p>
              <p><strong>Students:</strong> {selectedCourseDetails.students?.length || 0}</p>

              {/* Функции для учителя */}
              <div className="teacher-actions">
                <h3>Actions</h3>
                <button className="action-btn">Add File 📂</button>
                <button className="action-btn">Add Assignment ✍️</button>
                <button className="action-btn">Manage Students 👥</button>
              </div>
            </>
          ) : (
            <p className="empty-text">Select a course to see details</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;
