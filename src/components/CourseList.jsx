import React from 'react';
import Course from './Course.jsx';
import './CourseList.css';
import { hasConflict } from '../utilities/timeUtils';

const CourseList = ({ courses, selectedCourses, toggleSelectedCourse }) => {
  if (!courses || courses.length === 0) {
    return <div>No courses available</div>;
  }

  const isConflicting = (course) => {
    return selectedCourses.some(selectedCourse => hasConflict(course, selectedCourse));
  };
  

  return (
    <div className="course-list">
      {courses.map((courseInfo) => {
        const conflict = isConflicting(courseInfo);
        return (
          <Course
            key={`${courseInfo.number}-${courseInfo.term}`}
            course={courseInfo}
            isSelected={selectedCourses.includes(courseInfo)}
            isConflicting={!selectedCourses.includes(courseInfo) && isConflicting(courseInfo)} // Mark only if not selected
            toggleSelectedCourse={() => toggleSelectedCourse(courseInfo)}
          />

        );
      })}
    </div>
  );
};

export default CourseList;
