import React from 'react';
import Course from './Course.jsx';
import './CourseList.css';

const CourseList = ({ courses, selectedCourses, toggleSelectedCourse }) => {
  if (!courses || courses.length === 0) {
    return <div>No courses available</div>;
  }

  return (
    <div className="course-list">
      {courses.map((courseInfo) => {
        console.log("Course ID:", courseInfo.id); 
        return (
          <Course
            key={`${courseInfo.number}-${courseInfo.term}`} 
            course={courseInfo}
            isSelected={selectedCourses.includes(`${courseInfo.number}-${courseInfo.term}`)} 
            toggleSelectedCourse={() => toggleSelectedCourse(`${courseInfo.number}-${courseInfo.term}`)} 
          />
        );
      })}
    </div>
  );
};

export default CourseList;
