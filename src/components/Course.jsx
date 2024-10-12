import React from 'react';
import './Course.css';

const Course = ({ course, isSelected, toggleSelectedCourse }) => (
  <div
    className={`card m-3 ${isSelected ? 'selected' : ''}`}
    style={{ width: '18rem' }}
    onClick={() => toggleSelectedCourse(course.id)}
  >
    <div className="card-body">
      <h5 className="card-title">{course.title}</h5>
      <p className="card-subtitle mb-2 text-muted">{course.term} {course.number}</p>
      <p className="card-text">{course.meets}</p>
    </div>
  </div>
);

export default Course;
