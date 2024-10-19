import { useParams, useNavigate } from 'react-router-dom';
import { useFormData } from './useFormData';


const InputField = ({ name, text, state, change }) => (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">{text}</label>
      <input
        className="form-control"
        id={name}
        name={name}
        defaultValue={state.values?.[name]}
        onChange={change}
      />
      <div className="invalid-feedback">{state.errors?.[name]}</div>
    </div>
  );
  
const CourseForm = ({ courses }) => {
  const { number, term } = useParams(); // Get `number` and `term` from the URL
  const navigate = useNavigate();

  // Find the course using `number` and `term`
  const course = courses.find(
    (course) => course.number === number && course.term === term
  );
  const validateCourseData = (key, val) => {
    switch (key) {
      case 'title':
        return val.length >= 3 ? '' : 'Title must be at least 3 characters long';
      case 'meets':
        return /^\w+ \d{2}:\d{2}-\d{2}:\d{2}$/.test(val)
          ? ''
          : 'Format: Day HH:MM-HH:MM';
      default:
        return '';
    }
  };
  const [state, change] = useFormData(validateCourseData, course || {});

  const handleCancel = () => navigate('/courses');

  const onSubmit = (evt) => {
    evt.preventDefault();
    // No submit logic needed yet
  };

  if (!course) return <div>Course not found!</div>;
  
  

  return (
    <form onSubmit={onSubmit} noValidate className={state.errors ? 'was-validated' : null}>
      <InputField name="title" text="Course Title" state={state} change={change} />
      <InputField name="meets" text="Meeting Times" state={state} change={change} />
      <div className="d-flex">
        <button type="button" className="btn btn-outline-dark me-2" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CourseForm;
