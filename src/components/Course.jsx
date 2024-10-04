import React from 'react';

const Course = ({ course }) => (
  <div className="card m-3" style={{ width: '18rem' }}>
    <div className="card-body">
      <h5 className="card-title">{course.title}</h5>
      <p className="card-subtitle mb-2 text-muted">{course.term} {course.number}</p>
      <p className="card-text">{course.meets}</p>
    </div>
  </div>
);

export default Course;
