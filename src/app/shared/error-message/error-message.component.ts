import { isEmpty } from 'rxjs/operator/isEmpty';
import { isUndefined } from 'util';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent implements OnInit {

  successMessage = '';
  errorMessage = '';

  constructor() { }

  ngOnInit() {
  }

  setSuccessMessage(successEvent: any) {
    this.successMessage = successEvent;
  }

  setErrorMessage(errorEvent: any) {
    if (errorEvent === '') {
      this.errorMessage = '';
    } else {
      this.errorMessage = this.getErrorMessages(errorEvent);
    }
  }

  private getErrorMessages(error: any): string {
    const obj = JSON.parse(error.text());
    const errorCode = obj['errorCode'];
    const errorMessage = obj['errorMessage'];
    const localizedErrorMessage = obj['localizedErrorMessage'];

    let msg: string;
    if ((!(isUndefined(errorCode))) &&
      (!(isUndefined(errorMessage))) && (!(isUndefined(localizedErrorMessage)))) {
      msg = 'Error Code:' + errorCode + ' ';
      msg = msg + 'Message: ' + errorMessage[0] + ' ';
      msg = msg + 'Localized Message:' + localizedErrorMessage + ' ';
    } else { msg = 'Undefined error'; }

    return (msg);
  }
}
