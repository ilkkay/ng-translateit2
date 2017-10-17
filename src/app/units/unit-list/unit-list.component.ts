import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import { Observable, Subscription } from 'rxjs/Rx';

import { AppconfigService } from '../../shared/appconfig.service';
import { ErrorMessageService } from '../../shared/error-message.service';
import { ContainerStateService } from '../../shared/container-state.service';

import { Unit } from '../shared/unit';
import { UNITS } from '../shared/mock-units';
import { UnitService } from '../shared/unit.service';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.css']
})
export class UnitListComponent implements OnInit, OnDestroy {

  units: Unit[];
  observableUnits: Observable<Unit[]>;
  detailUrl: string;

  fileFormData: FormData = new FormData();
  uploadFile: any;
  observableDownloadPath: Observable<string>;
  workId: number;

  private subscriptions: Subscription[] = [];

  constructor(
    private appConfig: AppconfigService,
    private messageService: ErrorMessageService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private unitService: UnitService,
    private containerStateService: ContainerStateService) {
      this.detailUrl = appConfig.getUnitDetailUrl();
    }

  ngOnInit() {
    console.log('Entering UnitList.ngOnInit()');

    this.refreshUnitSubscriptionByRouteId();
    // this.workId = 1;
    // this.unitService.refreshData(this.workId);
    this.observableUnits = this.unitService.getUnitsObservable();

    this.subscribeDownloadPath();

    // If this is a direct link to an entity, thew we'll show it
    this.getDetailViewByRouteId();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  getDetailViewByRouteId(): void {
    this.route.params.subscribe(params => {
      // this.containerStateService.state(params['state']);
      const routeId = +params['id'];
      if (!isNaN(routeId) && (routeId !== 0)) {
        this.goToUnitDetail(routeId);
      }
    });
  }

  goToUnitDetail(unitId: number) {
    this.containerStateService.showDetail();
    let link: any;
    if (unitId !== 0) {
      // link = [this.detailUrl, { state: 'edit', id: unitId }];
      link = ['/projects', { outlets: { 'detail': ['myunitdetail', { state: 'edit', id: unitId }] } }];
    } else {
      link = [this.detailUrl, { state: 'list' }];
    }
    this.router.navigate(link);
  }

  refreshUnitSubscriptionByRouteId(): void {
    this.route.params.subscribe(params => {
      // this.containerStateService.state(params['state']);
      const routeId = +params['workId'];
      if (!isNaN(routeId) && (routeId !== 0)) {
        this.workId = routeId;
        this.unitService.refreshData(this.workId);
      }
    });
  }

  subscribeDownloadPath(): void {
    let subscription: Subscription;

    subscription = this.unitService.getDownloadPathObservable().subscribe(
      path => {
        console.log('Downloading file: ' + path);
        if (path.length > 0) {
          window.location.href = path;
          // this.path = '';
        }
      });

    this.subscriptions.push(subscription);
  }

  getFirstPage(): void {
    this.unitService.getFirstPage(this.workId);
  }

  getNextPage(): void {
    this.unitService.getNextPage(this.workId);
  }

  getPreviousPage(): void {
    this.unitService.getPreviousPage(this.workId);
  }

  getLastPage(): void {
    this.unitService.getLastPage(this.workId);
  }

  downloadTarget(): void {
    this.unitService.download(this.workId);
  }

  uploadTarget(): void {
    this.unitService.upload(this.fileFormData, this.workId)
      .then((work) => {
        this.fileFormData = new FormData();
        this.uploadFile = this.fileFormData.get('file');
        this.workId = work.id;
        this.unitService.refreshData(this.workId);
        console.log('Upload target file: ');
        // this.updateView(false);
      });
  }

  fileChange(event): void {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.fileFormData.append('file', file, file.name);
      this.fileFormData.append('workId', this.workId.toString());
      this.uploadFile = this.fileFormData.get('file');
      console.log('Uploading file ' + file.name);
    }
  }

  goBack(): void {
    this.location.back();
  }
}
