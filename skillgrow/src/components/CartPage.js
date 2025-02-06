import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';

function CartPage() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.role === 'student') {
      setUser(storedUser);
      setCart(storedUser.cart || []);
    } else {
      navigate('/signin');
    }
  }, [navigate]);

  const removeFromCart = (id) => {
    const updatedCart = cart.filter(course => course.id !== id);
    setCart(updatedCart);
    
    if (user) {
      const updatedUser = { ...user, cart: updatedCart };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const updatedUsers = users.map(u => (u.email === user.email ? updatedUser : u));
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      window.dispatchEvent(new Event('storage'));
    }
  };

  const buyCourse = (id) => {
    const course = cart.find(course => course.id === id);
    if (course) {
      alert(`Redirecting to payment for "${course.title}"...`);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="list-group">
          {cart.map(course => (
            <li key={course.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <img src={course.image} alt={course.title} className="cart-item-image me-3" />
                <div>
                  <h5 className="cart-item-title">{course.title}</h5>
                  {user && user.role === 'student' && (
                    <p className="cart-item-price">
                      Price: ${course.price} {course.discount && <span className="discount">(-${course.discount})</span>}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <span className="cart-item-hours">{course.hours} Hours</span>
                <button className="btn btn-danger btn-sm ms-3" onClick={() => removeFromCart(course.id)}>Remove</button>
                <button className="btn btn-primary btn-sm ms-3" onClick={() => buyCourse(course.id)}>Buy Course</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
}

export default CartPage;
