import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import './CourseDetails.css';

const CourseDetails = () => {
  const { title } = useParams();
  const [course, setCourse] = useState(null);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    // Load course data
    fetch('/data/course_info.json')
      .then(response => response.json())
      .then(data => {
        const foundCourse = data.find(course => course.title === title);
        if (foundCourse) setCourse(foundCourse);
      })
      .catch(error => console.error('Error loading course:', error));

    // Load user data
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      setCart(storedUser.cart || []);
    }

    // Watch for storage changes
    const handleStorageChange = () => {
      const updatedUser = JSON.parse(localStorage.getItem('user'));
      if (updatedUser) {
        setUser(updatedUser);
        setCart(updatedUser.cart || []);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [title]);

  useEffect(() => {
    if (course) {
      setIsInCart(cart.some(item => item.title === course.title));
    }
  }, [cart, course]);

  const addToCart = () => {
    if (!user || user.role !== 'student') {
      alert('Only students can add courses to the cart.');
      return;
    }

    if (isInCart) {
      alert('This course is already in your cart.');
      return;
    }

    const updatedCart = [...cart, course];
    setCart(updatedCart);

    const updatedUser = { ...user, cart: updatedCart };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    localStorage.setItem('users', JSON.stringify(
      JSON.parse(localStorage.getItem('users')).map(u => u.email === user.email ? updatedUser : u)
    ));

    window.dispatchEvent(new Event('storage'));
    alert(`"${course.title}" has been added to your cart!`);
  };

  if (!course) return <h2>Course not found</h2>;

  return (
    <>
      <Header />
      <div className="course-details-container">
        <img src={course.image} alt={course.title} className="course-details-image" />
        <h2>{course.title}</h2>
        <p className="course-rating">⭐ {course.rating} ({course.reviews} reviews)</p>
        <p className="course-duration">⏳ {course.hours} hours of learning</p>

        <h3>About the course</h3>
        <p>{course.description}</p>

        {course.skills && course.skills.length > 0 && (
          <div>
            <h3>Skills you will learn</h3>
            <div className="skills">
              {course.skills.map((skill, index) => (
                <span key={index} className="skill">{skill}</span>
              ))}
            </div>
          </div>
        )}

        {course.requirements && course.requirements.length > 0 && (
          <div>
            <h3>Prerequisites</h3>
            <ul className="requirements">
              {course.requirements.map((req, index) => (
                <li key={index}>✅ {req}</li>
              ))}
            </ul>
          </div>
        )}

        {course.lessons && course.lessons.length > 0 && (
          <div>
            <h3>Course Curriculum</h3>
            <ul className="course-lessons">
              {course.lessons.map((lesson, index) => (
                <li key={index}>📖 {lesson}</li>
              ))}
            </ul>
          </div>
        )}

        <h3>Instructor</h3>
        <div className="instructor">
          <img src={course.instructor.avatar} alt={course.instructor.name} className="instructor-avatar" />
          <div>
            <h4>{course.instructor.name}</h4>
            <p>{course.instructor.bio}</p>
          </div>
        </div>

        <h3>Price</h3>
        <p className="course-price">
          {course.discount ? (
            <>
              <span className="old-price">${course.price}</span> <strong>${course.price - course.discount}</strong>
              <span className="discount">-{course.discount}$</span>
            </>
          ) : (
            <strong>${course.price}</strong>
          )}
        </p>

        {user && user.role === 'student' && (
          <button className={`btn-add-cart ${isInCart ? 'disabled' : ''}`} onClick={addToCart} disabled={isInCart}>
            {isInCart ? '✅ In Cart' : '🛒 Add to Cart'}
          </button>
        )}

        {course.reviewsList && course.reviewsList.length > 0 && (
          <div>
            <h3>Student Reviews</h3>
            <div className="reviews">
              {course.reviewsList.map((review, index) => (
                <div key={index} className="review">
                  <strong>{review.name}:</strong> <span>{review.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CourseDetails;
