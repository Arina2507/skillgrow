import React, { useState, useEffect } from 'react';
import CourseCard from './CourseCard';

function CourseSection() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('/data/courses.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch courses: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setCourses(data))
      .catch((error) => console.error('Error loading courses:', error));
  }, []); 

  return (
    <section className="py-6">
      <div className="container">
        <div className="row">
          {courses.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CourseSection;
