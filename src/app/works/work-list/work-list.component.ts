import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Rx';

import { AppconfigService } from '../../shared/appconfig.service';
import { WorkService } from '../shared/work.service';
import { ErrorMessageService } from '../../shared/error-message.service';

import { Work } from '../shared/work'
import { WORKS } from '../shared/mock-works'

@Component({
  selector: 'app-work-list',
  templateUrl: './work-list.component.html',
  styleUrls: ['./work-list.component.css']
})
export class WorkListComponent implements OnInit {

  observableWorks: Observable<Work[]>;
  works: Work[];
  detailUrl: string;

  constructor(
    private appConfig: AppconfigService,
    private messageService: ErrorMessageService,
    private router: Router,
    private workService: WorkService,
  ) {
    this.detailUrl = appConfig.getWorkDetailUrl();
  }

  ngOnInit() {
    this.workService.refreshData(1);
    this.observableWorks = this.workService.getWorksObservable();

    console.log('worksList.ngOnInit()' + JSON.stringify(this.works));
  }

  private goToWorkDetail(workId: number): void {
    // this.containerStateService.showDetail();

    let link: any;
    if (workId !== 0) {
      link = [this.detailUrl, { state: 'edit', id: workId }];
    } else {
      link = [this.detailUrl, { state: 'list' }];
    }
    this.router.navigate(link);
  }

  goToUnits(workId: number) {
    const link = ['/units', { state: 'edit', id: workId }];
    this.router.navigate(link);
  }

}
