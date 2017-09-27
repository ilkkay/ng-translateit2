import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs/Rx';

import { MessageInterface } from './message-interface'
import { ProjectService } from '../projects/shared/project.service'

@Injectable()
export class ErrorMessageService implements MessageInterface {
  private subject: Subject<any> = new BehaviorSubject<any>({});

  constructor(_projectService: ProjectService) {
      _projectService.registerMessageService(this);
  }

  sendTextMessage(message: string) {
    this.subject.next({ text: message });
  }

  sendErrorMessage(error: any) {
    this.subject.next({ error: error });
  }

  sendSuccessMessage(success: any) {
    this.subject.next({ success: success });
  }

  clearMessages() {
    this.subject.next({ error: '' });
    this.subject.next({ success: '' });
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

}
