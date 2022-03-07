import React from 'react';
import Form from './Form';
import Map from './Map';

class DisplayControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayForm: true
    };
  }

  handleChangingForm = () => {
    this.setState({ displayForm: !this.state.displayForm });
  }

  render() {
    let selectedRender;
    if (this.state.displayForm) {
      selectedRender = <Form formSubmitHandler={this.handleChangingForm} />;
    } else {
      selectedRender = <Map />;
    }
    return selectedRender;
  }
}

export default DisplayControl;