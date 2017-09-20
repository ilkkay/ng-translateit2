import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs/Rx';

@Injectable()
export class ErrorMessageService {
  private subject = new Subject<any>();

/*
  private behaviorSubject =  new BehaviorSubject<any>({});
  _sendMessage(message: string) {
    this.behaviorSubject.next({ text: message });
  }
  _sendErrorMessage(error: any) {
    this.behaviorSubject.next({ error: error });
  }
  _sendSuccessMessage(success: any) {
    this.behaviorSubject.next({ success: success });
  }
  _getMessage(): Observable<any> {
    return this.behaviorSubject.asObservable();
  }
  _clearMessage() {
    this.behaviorSubject.next({});
  }
*/

  sendMessage(message: string) {
    this.subject.next({ text: message });
  }

  sendErrorMessage(error: any) {
    this.subject.next({ error: error });
  }

  sendSuccessMessage(success: any) {
    this.subject.next({ success: success });
  }

  clearMessage() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

}
