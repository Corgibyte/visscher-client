import React from 'react';
import Form from './Form';
import Map from './Map';

class DisplayControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayForm: true,
      startYear: -1000,
      endYear: 2022
    };
  }

  formCallbackHandler = (startYear, endYear) => {
    this.setState({
      displayForm: !this.state.displayForm,
      startYear: startYear,
      endYear: endYear
    });
  }

  render() {
    let selectedRender;
    if (this.state.displayForm) {
      selectedRender = <Form formCallback={this.formCallbackHandler}
        startYear={this.state.startYear}
        endYear={this.state.endYear} />;
    } else {
      selectedRender = <Map startYear={this.state.startYear}
        endYear={this.state.endYear} />;
    }
    return selectedRender;
  }
}

export default DisplayControl;