import { useParams, useNavigate } from 'react-router-dom';
import { useFormData } from './useFormData';


// InputField Component
const InputField = ({ name, text, state, change }) => (
  <div className="mb-3">
    <label htmlFor={name} className="form-label">{text}</label>
    <input
      className={`form-control ${state.errors[name] ? 'is-invalid' : ''}`}
      id={name}
      name={name}
      value={state.values[name] || ''}
      onChange={change}
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

  const handleCancel = () => navigate('/courses');

  const onSubmit = (evt) => {
    evt.preventDefault();
    if (!state.hasError) {
      // Submit logic here (if needed)
      console.log('Form submitted:', state.values);
    }
  };

  if (!course) return <div>Course not found!</div>;

  return (
    <form onSubmit={onSubmit} noValidate>
      <InputField name="title" text="Course Title" state={state} change={change} />
      <InputField name="meets" text="Meeting Times" state={state} change={change} />
      <div className="d-flex">
        <button type="submit" className="btn btn-primary me-2">Submit</button>
        <button type="button" className="btn btn-outline-dark" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CourseForm;
