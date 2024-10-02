import React from 'react';

const CourseList = ({ courses }) => {
  return (
    <div>
      <h2>Course List</h2>
      <ul>
        {Object.keys(courses).map((courseId) => (
          <li key={courseId}>
            <h3>{courses[courseId].title}</h3>
            <p>
              {courses[courseId].term} {courses[courseId].number} - {courses[courseId].meets}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;
