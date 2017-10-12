import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Rx';

import { AppconfigService } from '../../shared/appconfig.service';
import { WorkService } from '../shared/work.service';
import { ErrorMessageService } from '../../shared/error-message.service';
import { ContainerStateService } from '../../shared/container-state.service';

import { Work } from '../shared/work';
import { WORKS } from '../shared/mock-works';

@Component({
  selector: 'app-work-list',
  templateUrl: './work-list.component.html',
  styleUrls: ['./work-list.component.css']
})
export class WorkListComponent implements OnInit {

  observableWorks: Observable<Work[]>;
  works: Work[];
  detailUrl: string;
  projectId: number;

  constructor(
    private appConfig: AppconfigService,
    private messageService: ErrorMessageService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private workService: WorkService,
    private containerStateService: ContainerStateService
  ) {
    this.detailUrl = appConfig.getWorkDetailUrl();
  }

  ngOnInit() {
    console.log('worksList.ngOnInit()');

    this.refreshWorkSubscriptionByRouteId();
    this.observableWorks = this.workService.getWorksObservable();

    this.containerStateService.hideDetail();
    // Unless this is a direct link to an entity, thew we'll show it
    this.getDetailViewByRouteId();
  }

  getDetailViewByRouteId(): void {
    this.route.params.subscribe(params => {
      // this.containerStateService.state(params['state']);
      const routeId = +params['id'];
      if (!isNaN(routeId) && (routeId !== 0)) {
        this.goToWorkDetail(routeId);
      }
    });
  }

  refreshWorkSubscriptionByRouteId(): void {
    this.route.params.subscribe(params => {
      // this.containerStateService.state(params['state']);
      const routeId = +params['projectId'];
      if (!isNaN(routeId) && (routeId !== 0)) {
        this.projectId = routeId;
        this.workService.refreshData(this.projectId);
      }
    });
  }

  goToUnits(id: number) {
    const link = ['/units', { state: 'list', workId: id }];
    this.router.navigate(link);
  }

  private goBack(): void {
    this.location.back();
  }

  private goToWorkDetail(workId: number): void {
    this.containerStateService.showDetail();

    let link: any;
    if (workId !== 0) {
      link = [this.detailUrl, { state: 'edit', id: workId }];
    } else {
      link = [this.detailUrl, { state: 'list' }];
    }
    this.router.navigate(link);
  }

}
