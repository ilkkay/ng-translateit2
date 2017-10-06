import { Component, OnInit } from '@angular/core';

import { Unit } from '../shared/unit';
import { UNITS } from '../shared/mock-units'

@Component({
  selector: 'app-unit-detail',
  templateUrl: './unit-detail.component.html',
  styleUrls: ['./unit-detail.component.css']
})
export class UnitDetailComponent implements OnInit {

  unitHistory = 'Translated by Ilkka';
  unit: Unit;

  constructor() { }

  ngOnInit() {
    this.unit = UNITS[1];
    console.log(this.unit);
    console.log(this.unit.source);
    console.log(this.unit.target);

    console.log('UnitDetailComponent.ngOnInit()');
  }

}
