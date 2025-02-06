import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import './Courses.css';

const initialCourses = [
  { id: 1, title: "Content Writing", hours: 8, students: 200 },
  { id: 2, title: "UI / UX Design", hours: 12, students: 150 },
  { id: 3, title: "Coding and Development", hours: 10, students: 300 },
  { id: 4, title: "Photography", hours: 15, students: 120 },
];

const Courses = () => {
  const [courses, setCourses] = useState(initialCourses);
  const [newCourse, setNewCourse] = useState({ title: '', hours: '', students: '' });
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.role === 'student') {
      setUser(storedUser);
      setCart(storedUser.cart || []);
    }
  }, []);

  const handleDeleteCourse = (id) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  const handleAddCourse = () => {
    if (!newCourse.title || !newCourse.hours || !newCourse.students) {
      alert("Please fill in all fields");
      return;
    }

    const addedCourse = {
      id: courses.length + 1,
      title: newCourse.title,
      hours: parseInt(newCourse.hours),
      students: parseInt(newCourse.students),
    };

    setCourses([...courses, addedCourse]);
    setNewCourse({ title: '', hours: '', students: '' });
  };

  const addToCart = (course) => {
    if (!user) {
      alert('You need to be signed in as a student to add courses.');
      return;
    }

    if (cart.some(item => item.id === course.id)) {
      alert('Course is already in your cart.');
      return;
    }

    const updatedCart = [...cart, course];
    setCart(updatedCart);

    const updatedUser = { ...user, cart: updatedCart };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    localStorage.setItem('users', JSON.stringify(
      JSON.parse(localStorage.getItem('users')).map(u => u.email === user.email ? updatedUser : u)
    ));

    alert(`Added ${course.title} to your cart!`);
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter(course => course.id !== id);
    setCart(updatedCart);

    const updatedUser = { ...user, cart: updatedCart };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    localStorage.setItem('users', JSON.stringify(
      JSON.parse(localStorage.getItem('users')).map(u => u.email === user.email ? updatedUser : u)
    ));
  };

  return (
    <>
      <Header />
      <div className="courses-container">
        <h2 className="courses-title">Course Management</h2>

        {/* Форма добавления курса */}
        <div className="add-course-form">
          <input
            type="text"
            placeholder="Course Title"
            value={newCourse.title}
            onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
          />
          <input
            type="number"
            placeholder="Hours"
            value={newCourse.hours}
            onChange={(e) => setNewCourse({ ...newCourse, hours: e.target.value })}
          />
          <input
            type="number"
            placeholder="Students Enrolled"
            value={newCourse.students}
            onChange={(e) => setNewCourse({ ...newCourse, students: e.target.value })}
          />
          <button className="btn-add-course" onClick={handleAddCourse}>
            Add Course
          </button>
        </div>

        {/* Список курсов */}
        <div className="course-list">
          {courses.map(course => (
            <div key={course.id} className="course-card">
              <button className="delete-btn" onClick={() => handleDeleteCourse(course.id)}>✖</button>
              <h3>{course.title}</h3>
              <p>Hours: {course.hours}</p>
              <p>Students Enrolled: {course.students}</p>
              {user && user.role === 'student' && (
                <button className="btn-add-cart" onClick={() => addToCart(course)}>
                  Add to Cart
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Корзина студента */}
        {user && user.role === 'student' && (
          <div className="cart-container">
            <h2>Your Cart</h2>
            {cart.length === 0 ? <p>Your cart is empty.</p> : (
              <ul>
                {cart.map(course => (
                  <li key={course.id}>
                    {course.title}
                    <button className="btn-remove" onClick={() => removeFromCart(course.id)}>Remove</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Courses;
