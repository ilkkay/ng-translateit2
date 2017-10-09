import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Unit } from '../shared/unit';
import { UNITS } from '../shared/mock-units'
import { UnitService } from '../shared/unit.service';

@Component({
  selector: 'app-unit-detail',
  templateUrl: './unit-detail.component.html',
  styleUrls: ['./unit-detail.component.css']
})
export class UnitDetailComponent implements OnInit {

  unitHistory = 'Translated by Ilkka';
  unit: Unit;

  constructor(
    private unitService: UnitService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.unit = UNITS[1];
    console.log(this.unit);
    console.log(this.unit.source);
    console.log(this.unit.target);

    console.log('UnitDetailComponent.ngOnInit()');

    this.getUnitByRouteId();
  }

  getUnitByRouteId(): any {
    this.route.params.subscribe(params => {
      // this.containerStateService.state(params['state']);
      const routeId = +params['id'];
      this.loggingMsg('Entering getUnitByRouteId() with: ' + routeId);

      if (!isNaN(routeId) && (routeId !== 0)) {
        return this.unitService.getUnit(routeId)
          .then(unit => {
            this.loggingMsg('and got a unit:' + JSON.stringify(unit));
            this.unit = unit;
          })
          .catch(error => {
            this.setDefaultUnit();
          });
      } else {
        this.setDefaultUnit();
      };
    })
  }

  setDefaultUnit(): void {
    this.unit = new Unit();
  }

  save(): void {
    if (this.unit.id === 0) {
      this.loggingMsg('Cannot save empty unit (id is zero)');
    } else {
      this.loggingMsg('Saving work: ' + JSON.stringify(this.unit));
      this.update();
    }
  }

  update(): void {
    this.unitService.update(this.unit)
      .then(unit => {
        this.loggingMsg('Updated unit: ' + unit.segmentKey);
        this.unit = unit;
        this.unitService.refreshData(unit.workId);
      });
  }

  private loggingMsg(msg: string): void {
    console.log(msg);
  };

}
