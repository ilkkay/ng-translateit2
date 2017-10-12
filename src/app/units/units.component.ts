import { Component, OnInit } from '@angular/core';

import { Unit } from './shared/unit';
import { UNITS } from './shared/mock-units';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.css']
})
export class UnitsComponent implements OnInit {

  units: Unit[];
  constructor() { }

  ngOnInit() {
    this.units = UNITS;
    console.log(JSON.stringify(this.units));
  }

}
