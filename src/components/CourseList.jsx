import React from 'react';
import Course from './Course.jsx';
import './CourseList.css';

const CourseList = ({ courses }) => {
  // Handle cases where courses might be null or undefined
  if (!courses || courses.length === 0) {
    return <div>No courses available</div>;
  }

  return (
    <div className="course-list">
      {/* Use .map() to iterate over the courses array */}
      {courses.map((courseInfo, index) => (
        <Course key={index} course={courseInfo} />
      ))}
    </div>
  );
};

export default CourseList;
