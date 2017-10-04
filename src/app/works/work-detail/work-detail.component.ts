import { Component, OnInit, AfterViewInit, AfterContentInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Location } from '@angular/common';

import { AppconfigService } from '../../shared/appconfig.service';
import { WorkService } from '../shared/work.service';
import { ErrorMessageService } from '../../shared/error-message.service';

import { Work } from '../shared/work'
import { mockWork } from '../shared/mock-work'


@Component({
  selector: 'app-work-detail',
  templateUrl: './work-detail.component.html',
  styleUrls: ['./work-detail.component.css']
})
export class WorkDetailComponent implements OnInit {

  priorities = [];

  work: Work = new Work();
  workForm: FormGroup;

  constructor(
    private appConfig: AppconfigService,
    private messageService: ErrorMessageService,
    private formBuilder: FormBuilder,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private workService: WorkService,
  ) {
    this.registerFormControls()
  }

  ngOnInit() {
    this.priorities = this.appConfig.getPriorities();

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

  newWork() {
    this.messageService.sendSuccessMessage('Creating a new work');
    this.setDefaultWork();
  }

  setDefaultWork(): void {
    let currectProjectId: number;
    let currectGroupId: number;
    if (this.work !== undefined) {
    currectProjectId = this.work.projectId;
    currectGroupId = this.work.groupId;
    } else {
      currectProjectId = 0;
      currectGroupId = 0;
    }

    this.work = mockWork;
    this.work.id = 0;
    this.work.version = '';
    this.work.locale = 'fi_FI';
    this.work.projectId =  currectProjectId;
    this.work.groupId =  currectGroupId;
    this.work.status = 'NEW';

    this.workForm.reset(this.work);
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
            this.workForm.setValue(this.work);
          })
          .catch(error => {
            this.setDefaultWork();
          });
      } else {
        this.setDefaultWork();
      };
    })
  }


  uploadSource(): void {}

   save(): void {
    this.work = <Work>this.workForm.value;
    this.loggingMsg('Saving work: ' + JSON.stringify(this.work));

    if (this.work.id === 0) {
      this.create();
    } else {
      this.update();
    }
  }

updateView(hideDetail: boolean) {
  this.workForm.setValue(this.work);
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

  private delete(work: Work): void {
    this.workService
      .delete(work.id)
      .then(() => {
        this.loggingMsg('Deleted work: ' + this.work.version);
        this.setDefaultWork();
        this.updateView(true);
      });
  }

fileChange(event): void {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
        const file: File = fileList[0];
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);
        formData.append('workId', this.work.id.toString());
        this.workService.upload(formData, this.work.id)
        .then( (work) => {
        this.work = work;
        this.updateView(false);
        });
    }
}
  goBack(): void {
    this.location.back();
  }

  private loggingMsg(msg: string): void {
    console.log(msg);
  };

}
