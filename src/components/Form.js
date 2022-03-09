import React from 'react';
import PropTypes from 'prop-types';

const formStyle = {
  display: "flex",
  margin: "1rem"
}

const inputStyle = {
  margin: "0.5rem",
  fontSize: "22px",
  marginRight: "1.5rem",
  marginLeft: "0.1rem"
}

const labelStyle = {
  margin: "0.5rem",
  fontSize: "22px",
  marginRight: "0.1rem"
}

function Form(props) {
  const formSubmissionHandler = (event) => {
    event.preventDefault();
    const inputtedStartYear = parseInt(event.target.startYear.value);
    const inputtedEndYear = parseInt(event.target.endYear.value);
    props.formCallback(inputtedStartYear, inputtedEndYear);
  }

  return (
    <div style={formStyle}>
      <form onSubmit={formSubmissionHandler}>
        <label style={labelStyle} for="startYear">Start Year:</label>
        <input style={inputStyle} type="number" name="startYear" placeholder="Start Year" defaultValue={props.startYear} />
        <label style={labelStyle} for="endYear">End Year:</label>
        <input style={inputStyle} type="number" name="endYear" placeholder="End Year" defaultValue={props.endYear} />
        <button style={inputStyle} type="submit">Refresh</button>
      </form>
    </div>
  );
}

Form.propTypes = {
  formCallback: PropTypes.func,
  startYear: PropTypes.number,
  endYear: PropTypes.number
};

export default Form;