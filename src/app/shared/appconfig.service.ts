import { Injectable } from '@angular/core';

@Injectable()
export class AppconfigService {

 private productionState: boolean;

  constructor() { }

  setProductionState (state: boolean) {
    this.productionState = state;
  }

  isInProduction(): boolean {
    console.log ('Production state is now ' + this.productionState);
    return this.productionState;
  }
}
