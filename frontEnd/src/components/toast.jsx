import React, { Component } from 'react'
import {Growl} from 'primereact/growl';


export default class toast extends Component {

  showSuccess() {
    this.growl.show({severity: 'success', summary: 'Success Message', detail: 'Order submitted'});
}

showInfo() {
    this.growl.show({severity: 'info', summary: 'Info Message', detail: 'PrimeReact rocks'});
}

showWarn() {
    this.growl.show({severity: 'warn', summary: 'Warn Message', detail: 'There are unsaved changes'});
}

showError() {
    this.growl.show({severity: 'error', summary: 'Error Message', detail: 'Validation failed'});
}



  render() {
    return (
      <div>
        <Growl ref={(el) => this.growl = el} /> 
      </div>
    )
  }
}
