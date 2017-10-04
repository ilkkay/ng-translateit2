import { Injectable } from '@angular/core';

@Injectable()
export class AppconfigService {

 private detailUrl = '/projects';

 private types = [
    'ISO8859_1', 'UTF_8'
  ];

  private formats = [
    'PROPERTIES', 'XLIFF'
  ];

  private priorities = [
    'LOW', 'MEDIUM', 'HIGH'
  ];

  private productionState: boolean;

  constructor() { }

  setProductionState(state: boolean) {
    this.productionState = state;
  }

  isInProduction(): boolean {
    console.log('Production state is now ' + this.productionState);
    return this.productionState;
  }

  getFormats(): any { return this.formats; }

  getPriorities(): any { return this.priorities; }

  getTypes(): any { return this.types; }

  setFormats(formats: any[]): void { this.formats = formats; }

  setPriorities(priorities: any[]): void { this.priorities = priorities; }

  setTypes(types: any[]): void { this.types = types; }

  getDetailUrl(): string { return this.detailUrl; }

}
