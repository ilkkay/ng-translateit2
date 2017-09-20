import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/Rx';

@Injectable()
export class ContainerStateService {
  private _isDetailHidden: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private _state: BehaviorSubject<string> = new BehaviorSubject<string>('list');

  constructor() { }

  public get state() { return this._state.getValue(); }
  public set state(newState: string) { this._state.next(newState); }

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
