import React from 'react';
import Course from './Course.jsx';
import './CourseList.css';

const CourseList = ({ courses }) => (
  <div className="course-list d-flex flex-wrap justify-content-center">
    {Object.keys(courses).map((courseId) => (
      <Course key={courseId} course={courses[courseId]} />
    ))}
  </div>
);

export default CourseList;
