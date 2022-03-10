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
    const declutter = event.target.declutter.checked;
    const showBattles = event.target.showBattles.checked;
    const showEarthquakes = event.target.showEarthquakes.checked;
    props.formCallback(inputtedStartYear, inputtedEndYear, declutter, showBattles, showEarthquakes);
  }

  return (
    <div style={formStyle}>
      <form onSubmit={formSubmissionHandler}>
        <label style={labelStyle} htmlFor="startYear">Start Year:</label>
        <input style={inputStyle} type="number" name="startYear" placeholder="Start Year" defaultValue={props.startYear} />
        <label style={labelStyle} htmlFor="endYear">End Year:</label>
        <input style={inputStyle} type="number" name="endYear" placeholder="End Year" defaultValue={props.endYear} />
        <label style={labelStyle} htmlFor="declutter">Declutter?</label>
        <input style={inputStyle} type="checkbox" name="declutter" defaultChecked={props.declutter} />
        <label style={labelStyle} htmlFor="showBattles">Show battles?</label>
        <input style={inputStyle} type="checkbox" name="showBattles" defaultChecked={props.showBattles} />
        <label style={labelStyle} htmlFor="showEarthquakes">Show earthquakes?</label>
        <input style={inputStyle} type="checkbox" name="showEarthquakes" defaultChecked={props.showEarthquakes} />
        <button style={inputStyle} type="submit">Refresh</button>
      </form>
    </div>
  );
}

Form.propTypes = {
  formCallback: PropTypes.func,
  startYear: PropTypes.number,
  endYear: PropTypes.number,
  declutter: PropTypes.bool,
  showBattles: PropTypes.bool,
  showEarthquakes: PropTypes.bool
};

export default Form;