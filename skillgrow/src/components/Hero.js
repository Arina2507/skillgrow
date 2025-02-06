import React, { useState, useEffect } from 'react';
import './Hero.css';

function Hero() {
  return (
    <section className="py-lg-16 py-6 mt-lg-5">
      <div className="container">
        <div className="row d-flex align-items-center">
          <div className="col-xxl-5 col-xl-6 col-lg-6 col-12">
            <div>
              <h1 className="display-2 fw-bold mb-3">
                Learn today’s most in-
                <u className="text-warning">
                  <span className="text-primary">demand-skills</span>
                </u>
              </h1>
              <p className="lead mb-4">
                Classes &amp; Courses website template to start creating your stunning website.
              </p>
              <ul className="list-unstyled mb-5">
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  No credit card required
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Customer service 24/7
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  No setup fee
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Cancel any time
                </li>
              </ul>
              <a href="#!" class="btn btn-dark btn-lg">Explore Online Courses</a>
            </div>
          </div>

          {/* Изображение справа */}
          <div className="col-xxl-5 offset-xxl-1 col-xl-6 col-lg-6 col-12 d-lg-flex justify-content-end">
            <div className="mt-12 mt-lg-0 position-relative">
              <div className="position-absolute top-0 start-0 translate-middle d-none d-md-block">
                <img src="/images/design-1.svg" alt="graphics-2" className='design-1'/>
              </div>
              <img
                src="/images/student.png"
                alt="hero-image"
                className="img-fluid rounded-4 w-100 z-1 position-relative"
              />
              <div className="position-absolute top-100 start-100 translate-middle d-none d-md-block">
                <img src="/images/design-1.svg" alt="graphics-1" className='design-2'/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
