import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './CourseCard.css';

function CourseCard({ id, title, rating, reviews, hours, image, label, price, discount }) {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.role === 'student') {
      setUser(storedUser);
      setCart(storedUser.cart || []);
    }
  }, []);

  const addToCart = () => {
    if (!user || user.role !== 'student') {
      alert('Only students can add courses to the cart.');
      return;
    }

    if (cart.some(item => item.id === id)) {
      alert('Course is already in your cart.');
      return;
    }

    const newCart = [...cart, { id, title, rating, reviews, hours, image, price, discount }];
    setCart(newCart);

    const updatedUser = { ...user, cart: newCart };
    localStorage.setItem('user', JSON.stringify(updatedUser));

    const users = JSON.parse(localStorage.getItem('users')) || [];
    localStorage.setItem('users', JSON.stringify(users.map(u => (u.email === user.email ? updatedUser : u))));

    window.dispatchEvent(new Event('storage'));

    alert(`Added "${title}" to your cart!`);
  };

  return (
    <div className="col-xxl-3 col-xl-6 col-12">
      <div className="card mb-4 card-hover border" onClick={() => navigate(`/course/${encodeURIComponent(title)}`)} style={{ cursor: 'pointer' }}>
        <img src={image} alt={title} className="img-fluid card-img-top" />
        <div className="card-body">
          <h4 className="mb-3">{title}</h4>
          <div className="d-flex align-items-center mb-3 lh-1">
            {label && <span className="badge bg-success me-2">{label}</span>}
            <div>
              <span className="text-inherit fw-semibold">{rating}</span>
              <span className="ms-1">
                <i className="bi bi-star-fill text-success"></i> ({reviews})
              </span>
            </div>
            <div className="mx-1">
              <i className="bi bi-dot text-secondary"></i>
            </div>
            <div>
              <span className="text-inherit fw-semibold me-1">{hours}</span> Hours
            </div>
          </div>

          {user && user.role === 'student' && (
            <div>
              <p className="mb-1">
                Price: ${price} {discount && <span className="discount">(-${discount})</span>}
              </p>
              <button className="btn-add-cart" onClick={(e) => { e.stopPropagation(); addToCart(); }}>
                Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

CourseCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  rating: PropTypes.string.isRequired,
  reviews: PropTypes.number.isRequired,
  hours: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  image: PropTypes.string.isRequired,
  label: PropTypes.string,
  price: PropTypes.number.isRequired,
  discount: PropTypes.number,
};

export default CourseCard;
