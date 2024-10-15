import React, { useState } from 'react';
import './App.css';
import Banner from './components/Banner';
import CourseList from './components/CourseList';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useJsonQuery } from './utilities/fetch';
import Chooser from './components/Chooser';
import Modal from './components/Modal'
import Cart from './components/Cart'

const App = () => {
  const [schedule, isLoading, error] = useJsonQuery("https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php");
  const [selectedTerm, setSelectedTerm] = useState("Fall");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  
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
  
  const selectedCourseObjects = filteredCourses.filter(course => selectedCourses.includes(`${course.number}-${course.term}`));

  return (
    <div className="App">
      <Banner title={schedule?.title || 'Course Schedule'} />
      <div className="button-container">
        <Chooser selection={selectedTerm} setSelection={setSelectedTerm} />
        <button className="btn btn-outline-dark" onClick={openModal}>
          View Selected Courses
        </button>
      </div>

      <Modal open={open} close={closeModal}>
        <Cart selected={selectedCourseObjects} />
      </Modal>

      <CourseList
        courses={filteredCourses}
        selectedCourses={selectedCourses}
        toggleSelectedCourse={toggleSelectedCourse}
      />
    </div>
  );
};

export default App;
