import { useParams, useNavigate } from 'react-router-dom';
import { useFormData } from './useFormData';
import { useDbUpdatem, useProfile } from '../utilities/firebase'



// InputField Component
const [{ user, isAdmin }, isLoading, error] = useProfile()
const InputField = ({ name, text, state, change }) => (
  <div className="mb-3">
    <label htmlFor={name} className="form-label">{text}</label>
    <input
      className={`form-control ${state.errors[name] ? 'is-invalid' : ''}`}
      id={name}
      name={name}
      value={state.values[name] || ''}
      onChange={change}
      disabled= {!isAdmin}
      required
    />
    <div className="invalid-feedback">{state.errors[name]}</div>
  </div>
);

// CourseForm Component
const CourseForm = ({ courses }) => {
  const { number, term } = useParams(); // Get `number` and `term` from the URL
  const navigate = useNavigate();

  // Find the course based on URL parameters
  const course = courses.find(
    (course) => course.number === number && course.term === term
  );

  const validateCourseData = (key, val) => {
    switch (key) {
      case 'title':
        return val.length >= 2 ? '' : 'Title must be at least 2 characters long';
      case 'meets':
        return val === '' || /^[MTWRF]{1,5} \d{2}:\d{2}-\d{2}:\d{2}$/.test(val)
          ? ''
          : 'Must contain days and start-end, e.g., MWF 12:00-13:20';
      default:
        return '';
    }
  };

  const [state, change] = useFormData(validateCourseData, course || {});
  const coursePath = `coursesData/courses/${course.number}-${course.term}`;
  const [updateData, updateResult] = useDbUpdate(coursePath); // Use Firebase update


  const handleCancel = () => navigate('/courses');

  const onSubmit = (evt) => {
    evt.preventDefault();
    if (!state.hasError && JSON.stringify(state.values) !== JSON.stringify(course)) {
      updateData(state.values); // Update Firebase
      console.log('Form submitted:', state.values);
      navigate('/courses'); // Redirect on success
    }
  };

  if (!course) return <div>Course not found!</div>;

  return (
    <form onSubmit={onSubmit} noValidate>
      <InputField name="title" text="Course Title" state={state} change={change} />
      <InputField name="meets" text="Meeting Times" state={state} change={change} disabled={!isAdmin} />
      <div className="d-flex">
        <button type="submit" className="btn btn-primary me-2">Submit</button>
        <button type="button" className="btn btn-outline-dark" onClick={handleCancel}>
          Cancel
        </button>
      </div>
      {updateResult?.error && (
        <div className="alert alert-danger mt-3">{updateResult.message}</div>
      )}
    </form>
  );
};


export default CourseForm;
