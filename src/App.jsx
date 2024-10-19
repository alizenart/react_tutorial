import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';
import Banner from './components/Banner';
import CourseList from './components/CourseList';
import CourseForm from './components/CourseForm';
import Cart from './components/Cart';
import Modal from './components/Modal';
import Chooser from './components/Chooser';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useJsonQuery } from './utilities/fetch';

const App = () => {
  const [schedule, isLoading, error] = useJsonQuery(
    'https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php'
  );
  const [selectedTerm, setSelectedTerm] = useState('Fall');
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const toggleSelectedCourse = (course) => {
    const courseId = `${course.number}-${course.term}`;
    setSelectedCourses((prevSelected) =>
      prevSelected.includes(courseId)
        ? prevSelected.filter((id) => id !== courseId)
        : [...prevSelected, courseId]
    );
  };
  

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const filteredCourses = schedule?.courses
    ? Object.values(schedule.courses).filter((course) => course.term === selectedTerm)
    : [];

  const selectedCourseObjects = filteredCourses.filter((course) =>
    selectedCourses.includes(`${course.number}-${course.term}`)
  );
    
  return (
    <Router>
      <div className="App">
        <Banner title={schedule?.title || 'Course Schedule'} />
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">Home</Link>
            <Link className="nav-link" to="/cart">Cart</Link>
          </div>
        </nav>

        <Routes>
          {/* Redirect from root to /courses */}
          <Route path="/" element={<Navigate to="/courses" />} />

          {/* Course List View */}
          <Route
            path="/courses"
            element={
              <>
                <div className="button-container">
                  <Chooser selection={selectedTerm} setSelection={setSelectedTerm} />
                  <button className="btn btn-outline-dark" onClick={openModal}>
                    View Selected Courses
                  </button>
                </div>
                <CourseList
                  courses={filteredCourses}
                  selectedCourses={selectedCourses}
                  toggleSelectedCourse={toggleSelectedCourse}
                />
                <Modal open={open} close={closeModal}>
                  <Cart selected={selectedCourseObjects} />
                </Modal>
              </>
            }
          />

          
          

          {/* Cart View */}
          <Route
            path="/cart"
            element={
              <Modal open={open} close={closeModal}>
                <Cart selected={selectedCourseObjects} />
              </Modal>
            }
          />

          <Route
            path="/courses/:number/:term/edit"
            element={<CourseForm courses={filteredCourses} />}
          />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
