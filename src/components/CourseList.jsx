import React from 'react';
import Course from './Course.jsx';
import './CourseList.css';
import { hasConflict } from '../utilities/timeUtils';

const CourseList = ({ courses, selectedCourses, toggleSelectedCourse }) => {
  if (!courses || courses.length === 0) {
    return <div>No courses available</div>;
  }

  const isSelected = (course) =>
    selectedCourses.includes(`${course.number}-${course.term}`);

  const isConflicting = (course) =>
    selectedCourses
      .map(selectedId =>
        courses.find(c => `${c.number}-${c.term}` === selectedId)
      )
      .some(selectedCourse => hasConflict(course, selectedCourse));

  

  return (
    <div className="course-list">
      {courses.map((courseInfo) => {
        const conflict = isConflicting(courseInfo);
        return (
          <Course
          key={`${courseInfo.number}-${courseInfo.term}`}
          course={courseInfo}
          isSelected={isSelected(courseInfo)}
          isConflicting={!isSelected(courseInfo) && isConflicting(courseInfo)}
          toggleSelectedCourse={() => toggleSelectedCourse(courseInfo)}
        />
        
        );
      })}
    </div>
  );
};

export default CourseList;
