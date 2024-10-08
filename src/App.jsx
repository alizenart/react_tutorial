import React from 'react';
import './App.css';
import Banner from './components/Banner';
import CourseList from './components/CourseList';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useJsonQuery } from './utilities/fetch';

const App = () => {
  const [schedule, isLoading, error] = useJsonQuery("https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="App">
      <Banner title={schedule?.title || 'Course Schedule'} />
      <CourseList courses={schedule?.courses || []} />
    </div>
  );
};

export default App;
