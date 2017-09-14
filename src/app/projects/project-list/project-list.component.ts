import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import 'rxjs/add/operator/switchMap';

import { Project } from '../shared/project';
import { ProjectService } from '../shared/project.service';
import { AppconfigService } from '../../shared/appconfig.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  @Output() onTitleChanged = new EventEmitter<string>();
  @Output() onEditClicked = new EventEmitter<string>();
  @Output() onError = new EventEmitter<string>();
  @Output() onSuccess = new EventEmitter<string>();

  projects: Project[] = [];
  detailUrl: string;

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private appConfig: AppconfigService,
  ) {
    this.detailUrl = this.appConfig.getDetailUrl();
  }

  ngOnInit() {
    this.getProjects();

    // is this a direct link to an entity
    this.getDetailViewByRouteId();
  }

  getProjects(): Promise<any> {
    console.log('Entering getProjects(): ');
    return this.projectService.getProjects().then(
      projects => {
        console.log('Project count: ' + projects.length);

        if (projects.length === 0) {
          this.onEditClicked.emit('');
        } else {
          this.projects = projects; }
        this.setErrorMessage('');
      }).catch(error => {
        this.setErrorMessage(error);
      });
  }

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
    this.onEditClicked.emit('');

    let link: any;
    if (projectId !== 0) {
      link = [this.detailUrl, { state: 'edit', id: projectId }];
    } else {
      link = [this.detailUrl, { state: 'list' }];
    }
    this.router.navigate(link);
  }

  // private getDetailPage(): void {
  //  this.onEditClicked.emit('');
  // }

  private changeTitle(event: any): void {
    this.onTitleChanged.emit(event);
  }

  private setSuccessMessage(msg: string): void {
    this.onSuccess.emit(msg);
  }

  private setErrorMessage(error: any): void {
    this.onError.emit(error);
  }
}
