import { Component, Output, EventEmitter, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import 'rxjs/add/operator/switchMap';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';

import { Project } from '../shared/project';
import { ProjectService } from '../shared/project.service';
import { AppconfigService } from '../../shared/appconfig.service';
import { ErrorMessageService } from '../../shared/error-message.service';
import { ContainerStateService } from '../../shared/container-state.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit, OnDestroy {

//  @Output() onTitleChange = new EventEmitter<string>();
//  @Output() onError = new EventEmitter<string>();
//  @Output() onSuccess = new EventEmitter<string>();
//  @Output() onEditClick = new EventEmitter<string>();

  // projects: Project[] = [];
  // _projects: Project[] = [];
  // workCountMap = {};
  // promiseProjects: Promise<Project[]>;
  // promiseViewProjects: Promise<any[]>;

  observableProjects: Observable<Project[]>;
  observableProjectWorkMap: Observable<any>;

  detailUrl: string;
  // private subscriptions: Subscription[] = [];

  constructor(
    private projectService: ProjectService,
    private appConfig: AppconfigService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private messageService: ErrorMessageService,
    private containerStateService: ContainerStateService,
  ) {
    this.detailUrl = this.appConfig.getDetailUrl();
    // this.makeProjectSubscriptions();
  }

  ngOnInit() {
    this.projectService._refreshData();
    // this.projectService._getProjects();
    // this.makeProjectSubscriptions();

    // this.promiseProjects = this.projectService.getProjectsWithPromise();
    // this.promiseViewProjects = this.projectService.getViewProjectsWithPromise();

    this.observableProjects = this.projectService._getProjectsObservable();
    this.observableProjectWorkMap = this.projectService._getProjectWorkMapObservable();

    // this.observableProjects = this.projectService.__getObservableProjects();
    // this.projectService._getProjects();
    // If this is a direct link to an entity, thew we'll show it
    this.getDetailViewByRouteId();
  }

  ngOnDestroy() {
    // this.subscriptions.forEach(s => s.unsubscribe());
  }
/*
  makeProjectSubscriptions(): void {
    this.subscriptions.push(this.projectService.projectData
      .subscribe((projects: any[]) => {
          this._projects = projects;
          if (projects.length === 0) { // for adding a new one
            this.containerStateService.showDetail();
          } // else {
            // this.containerStateService.hideDetail();
          // }
      }));

    this.subscriptions.push(this.projectService.projectWorkMapData
      .subscribe((workCountMap: any[]) => {
        this._workCountMap = workCountMap; }));
  }
*/
  getDetailViewByRouteId(): void {
    this.route.params.subscribe(params => {
      const viewState = params['state'];
      const routeId = +params['id'];
      if (!isNaN(routeId) && (routeId !== 0)) {
        this.editProject(routeId);
      }
    })
  }

  private editProject(projectId: number): void {
    this.containerStateService.showDetail();

    let link: any;
    if (projectId !== 0) {
      link = [this.detailUrl, { state: 'edit', id: projectId }];
    } else {
      link = [this.detailUrl, { state: 'list' }];
    }
    this.router.navigate(link);
  }

  private goToWorks(projectId: number): void {
    const link = ['/works', { state: 'edit', id: projectId }];
    this.router.navigate(link);
  }

  // Just for testing
  private changeTitle(event: any): void {
    this.messageService.sendMessage(event);
  }

  /* private setSuccessMessage(msg: string, project: Project): void {
    // this.onSuccess.emit(msg);
    this.messageService.sendSuccessMessage(msg);
  }*/

  /*private setErrorMessage(error: any): void {
    // this.onError.emit(error);
    this.messageService.sendErrorMessage(error);
  }*/

/*
  getProjects(): Promise<any> {
    console.log('Entering getProjects(): ');
    return this.projectService.getProjects().then(
      projects => {
        console.log('Project count: ' + projects.length);

        if (projects.length === 0) {
          this.onEditClick.emit('');
        } else {
          this.projects = projects; }
        this.setErrorMessage('');
      }).catch(error => {
        this.setErrorMessage(error);
      });
  }
*/

}
