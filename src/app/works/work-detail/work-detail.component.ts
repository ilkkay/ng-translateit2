import { Component, OnInit, AfterViewInit, AfterContentInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Location } from '@angular/common';

import { AppconfigService } from '../../shared/appconfig.service';
import { WorkService } from '../shared/work.service';
import { ErrorMessageService } from '../../shared/error-message.service';
import { ContainerStateService } from '../../shared/container-state.service';

import { Work } from '../shared/work';
import { MOCKWORK } from '../shared/mock-work';


@Component({
  selector: 'app-work-detail',
  templateUrl: './work-detail.component.html',
  styleUrls: ['./work-detail.component.css']
})
export class WorkDetailComponent implements OnInit {

  priorities = [];

  work: Work = new Work();
  workForm: FormGroup;
  fileFormData: FormData = new FormData();
  uploadFile: any;

  constructor(
    private appConfig: AppconfigService,
    private messageService: ErrorMessageService,
    private containerStateService: ContainerStateService,
    private formBuilder: FormBuilder,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private workService: WorkService,
  ) {
    this.registerFormControls();
  }

  ngOnInit() {
    this.priorities = this.appConfig.getPriorities();
    // FIX this
    this.uploadFile = null; // this.fileFormData.get('file');

    this.getWorkByRouteId();
  }

  registerFormControls(): void {
    this.workForm = this.formBuilder.group({
      backupFile: [''],
      deadLine: [''],
      finished: [''],
      groupId: [],
      id: [],
      locale: ['fr_FR', Validators.compose([Validators.required,
      Validators.pattern('[a-z]{2}_[a-zA-Z]{2}')])],
      originalFile: [''],
      priority: [],
      progress: [],
      projectId: [],
      skeletonFile: [],
      started: [],
      status: [],
      version: [''],
    });
  }

  getWorkByRouteId(): any {
    this.route.params.subscribe(params => {
      // this.containerStateService.state(params['state']);
      const routeId = +params['id'];
      this.loggingMsg('Entering getWorktByRouteId() with: ' + routeId);

      if (!isNaN(routeId) && (routeId !== 0)) {
        return this.workService.getWork(routeId)
          .then(work => {
            this.loggingMsg('and got a work:' + JSON.stringify(work));
            this.work = work;
            this.updateView(false);
          })
          .catch(error => {
            this.setDefaultWork();
          });
      } else {
        this.setDefaultWork();
      }
    });
  }

  newWork() {
    this.messageService.sendSuccessMessage('Creating a new work');
    this.setDefaultWork();
  }

  setDefaultWork(): void {
    let currentProjectId: number;
    let currentGroupId: number;
    if (this.work !== undefined) {
      currentProjectId = this.work.projectId;
      currentGroupId = this.work.groupId;
    } else {
      currentProjectId = 0;
      currentGroupId = 0;
    }

    // this.work = MOCKWORK;
    this.work = new Work();
    this.work.backupFile = '';
    this.work.originalFile = '';
    this.work.skeletonFile = '';
    this.work.finished = '';
    this.work.id = 0;
    this.work.deadLine = '2017-12-12';
    this.work.started = '2017-12-11';
    this.work.version = '1.00';
    this.work.locale = 'fi_FI';
    this.work.projectId = currentProjectId;
    this.work.priority = 'MEDIUM';
    this.work.progress = 0;
    this.work.groupId = currentGroupId;
    this.work.status = null;

    this.workForm.reset(this.work);
  }

  uploadSource(): void {
    this.workService.upload(this.fileFormData, this.work.id)
      .then((work) => {
        this.fileFormData = new FormData();
        this.uploadFile = this.fileFormData.get('file');
        this.work = work;
        this.updateView(false);
      });
  }

  save(): void {
    this.work = <Work>this.workForm.value;
    this.loggingMsg('Saving work: ' + JSON.stringify(this.work));

    if (this.work.id === 0) {
      this.create();
    } else {
      this.update();
    }
  }

  updateView(hideDetailView: boolean) {
    this.workForm.setValue(this.work);
    this.workService.refreshData(this.work.projectId);

    if (hideDetailView) {
      this.containerStateService.hideDetail();
    } else { this.containerStateService.showDetail(); }

  }

  update(): void {
    this.workService.update(this.work)
      .then(work => {
        this.loggingMsg('Updated work: ' + work.version);
        this.work = work;
        this.updateView(false);
      });
  }

  create(): void {
    this.workService.create(this.work)
      .then(work => {
        this.loggingMsg('Created work: ' + JSON.stringify(work.version));
        this.work = work;
        this.updateView(false);
      });
  }

  confirmDelete(work): void {
    this.delete(work);
  }

  fileChange(event): void {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.fileFormData.append('file', file, file.name);
      this.fileFormData.append('workId', this.work.id.toString());
      this.uploadFile = this.fileFormData.get('file');
      console.log('Uploading file ' + file.name);
    }
  }

  goBack(): void {
    this.location.back();
  }

  private loggingMsg(msg: string): void {
    console.log(msg);
  }

  private delete(work: Work): void {
    this.workService
      .delete(work.id)
      .then(() => {
        this.loggingMsg('Deleted work: ' + this.work.version);
        this.setDefaultWork();
        this.updateView(true);
      });
  }
}
