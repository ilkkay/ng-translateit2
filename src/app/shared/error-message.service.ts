import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs/Rx';

@Injectable()
export class ErrorMessageService {
/*
  messageSource: BehaviorSubject<string> = new BehaviorSubject('');

  message: BehaviorSubject<any> = new BehaviorSubject<any>({});

  constructor() { }
*/
    private subject = new Subject<any>();

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
