import React from 'react';
import './Course.css';

const Course = ({ course, isSelected, isConflicting, toggleSelectedCourse }) => (
  <div
    className={`card m-3 ${isSelected ? 'selected' : ''} ${isConflicting ? 'conflict' : ''}`}
    style={{ width: '18rem', opacity: isConflicting ? 0.5 : 1 }}
    onClick={toggleSelectedCourse}
  >
    <div className="card-body">
      <h5 className="card-title">{course.title}</h5>
      <p className="card-subtitle mb-2 text-muted">{course.term} {course.number}</p>
      <p className="card-text">{course.meets}</p>
      {isConflicting && <p className="conflict-warning">Time Conflict</p>}
    </div>
  </div>
);

export default Course;
