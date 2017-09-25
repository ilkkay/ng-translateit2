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
export class ProjectListComponent implements OnInit {

//  @Output() onTitleChange = new EventEmitter<string>();

  observableProjects: Observable<Project[]>;
  observableProjectWorkMap: Observable<any>;

  detailUrl: string;

  constructor(
    private projectService: ProjectService,
    private appConfig: AppconfigService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: ErrorMessageService,
    private containerStateService: ContainerStateService,
  ) {
    this.detailUrl = this.appConfig.getDetailUrl();
  }

  ngOnInit() {
    this.projectService.refreshData();
    this.observableProjects = this.projectService.getProjectsObservable();
    this.observableProjectWorkMap = this.projectService.getProjectWorkMapObservable();

    // If this is a direct link to an entity, thew we'll show it
    this.getDetailViewByRouteId();
  }

  getDetailViewByRouteId(): void {
    this.route.params.subscribe(params => {
      this.containerStateService.state(params['state']);
      const routeId = +params['id'];
      if (!isNaN(routeId) && (routeId !== 0)) {
        this.goToProjectDetail(routeId);
      }
    })
  }

  private goToProjectDetail(projectId: number): void {
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
    this.messageService.sendTextMessage(event);
  }
}
