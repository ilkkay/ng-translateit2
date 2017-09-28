import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { StateInterface } from './state-interface'
import { ProjectService } from '../projects/shared/project.service'

@Injectable()
export class ContainerStateService implements StateInterface {
  private _isDetailHidden: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private _state: BehaviorSubject<string> = new BehaviorSubject<string>('list');

  constructor(/* private _projectService: ProjectService */) {
      // _projectService.registerStateService(this);
  }

  public get state() { return this._state.getValue(); }
  public set state(newState: any) { this._state.next(newState); }

  public get isDetailHidden() {
    return this._isDetailHidden;
  }

  hideDetail() {
    this._isDetailHidden.next(true);
  }

  showDetail() {
    this._isDetailHidden.next(false);
  }

}
