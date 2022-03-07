import React from 'react';
import PropTypes from 'prop-types';

function Form(props) {
  return (
    <React.Fragment>
      <h2>This will be a Form!</h2>
      <button onClick={props.formSubmitHandler}>Submit</button>
    </React.Fragment>
  );
}

Form.propTypes = {
  formSubmitHandler: PropTypes.func
};

export default Form;