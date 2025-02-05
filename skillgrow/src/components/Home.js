import React from 'react';
import Header from './Header';
import Hero from './Hero';
import CourseSection from './CourseSection';
import './Home.css';


function Home() {
  return (
    <div>
      <Header />
      <div className="hero-section">
      <Hero />  {/* Добавляем компонент Hero под Header */}
      </div>
      <div className="course-section">
        <CourseSection /></div>
    </div>
  );
}

export default Home;
