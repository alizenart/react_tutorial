import React, { useState } from 'react';
import './App.css';
import Banner from './components/Banner';
import CourseList from './components/CourseList';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useJsonQuery } from './utilities/fetch';
import Chooser from './components/Chooser';

const App = () => {
  const [schedule, isLoading, error] = useJsonQuery("https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php");
  const [selectedTerm, setSelectedTerm] = useState("Fall");
  const [selectedCourses, setSelectedCourses] = useState([]);

  const toggleSelectedCourse = (courseId) => {
    setSelectedCourses(
      selectedCourses.includes(courseId)
      ? selectedCourses.filter(id => id !== courseId)
      : [...selectedCourses, courseId]
    );
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log("Schedule:", schedule);

  const filteredCourses = schedule?.courses ? Object.values(schedule.courses).filter(course => course.term === selectedTerm) : [];

  return (
    <div className="App">
      <Banner title={schedule?.title || 'Course Schedule'} />
      <Chooser selection={selectedTerm} setSelection={setSelectedTerm} />
      <CourseList
        courses={filteredCourses}
        selectedCourses={selectedCourses}
        toggleSelectedCourse={toggleSelectedCourse}
      />
    </div>
  );
};

export default App;
