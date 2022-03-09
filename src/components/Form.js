import React from 'react';
import PropTypes from 'prop-types';

function Form(props) {
  const formSubmissionHandler = (event) => {
    event.preventDefault();
    const inputtedStartYear = parseInt(event.target.startYear.value);
    const inputtedEndYear = parseInt(event.target.endYear.value);
    props.formCallback(inputtedStartYear, inputtedEndYear);
  }

  return (
    <React.Fragment>
      <form onSubmit={formSubmissionHandler}>
        <input type="number" name="startYear" placeholder="Start Year" defaultValue={props.startYear} />
        <input type="number" name="endYear" placeholder="End Year" defaultValue={props.endYear} />
        <button type="submit">Submit</button>
      </form>
    </React.Fragment>
  );
}

Form.propTypes = {
  formCallback: PropTypes.func,
  startYear: PropTypes.number,
  endYear: PropTypes.number
};

export default Form;