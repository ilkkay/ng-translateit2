import { Component, OnInit } from '@angular/core';

import { Unit } from '../shared/unit';
import { UNITS } from '../shared/mock-units'

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.css']
})
export class UnitListComponent implements OnInit {

  units: Unit[];

  constructor() { }

  ngOnInit() {
    this.units = UNITS;
    console.log(JSON.stringify(this.units));
  }

  getFirstPage(): void {}

  getNextPage(): void {}

  getPreviousPage(): void {}

  getLastPage(): void {}

}
