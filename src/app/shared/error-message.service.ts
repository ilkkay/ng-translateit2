import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs/Rx';

import { MessageInterface } from './message-interface';
import { ProjectService } from '../projects/shared/project.service';
import { WorkService } from '../works/shared/work.service';
import { UnitService } from '../units/shared/unit.service';

@Injectable()
export class ErrorMessageService implements MessageInterface {
  private subject: Subject<any> = new BehaviorSubject<any>({});

  constructor(
    _projectService: ProjectService,
    _workService: WorkService,
    _unitService: UnitService  ) {
       _projectService.registerService(this);
       _workService.registerService(this);
      _unitService.registerService(this);
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
