import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import 'rxjs/add/operator/switchMap';

import { Project } from '../shared/project';
import { ProjectService } from '../shared/project.service';
import { AppconfigService } from '../../shared/appconfig.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  @Output() onTitleChanged = new EventEmitter<string>();
  @Output() onError = new EventEmitter<string>();
  @Output() onSuccess = new EventEmitter<string>();
  @Output() onProjectChanged = new EventEmitter<any>();

  personId: number;
  project: Project = new Project();
  types = [];
  formats = [];
  detailUrl: string;

  // http://www.concretepage.com/angular-2/angular-2-formgroup-example
  projectForm: FormGroup;
  nameControl = new FormControl();

  constructor(
    private projectService: ProjectService,
    private appConfig: AppconfigService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.personId = 1;
    this.registerFormControls();
    this.detailUrl = this.appConfig.getDetailUrl();
  }

  ngOnInit(): void {
    this.loggingMsg('Entering ProjectsComponent.ngOnInit(): ');

    this.types = this.appConfig.getTypes();
    this.formats = this.appConfig.getFormats();

    this.getProjectByRouteId();
  }

  registerFormControls(): void {
    this.projectForm = this.formBuilder.group({
      format: [''],
      id: [],
      name: ['', Validators.compose([Validators.required,
      Validators.minLength(6), Validators.maxLength(20)])],
      personId: [],
      sourceLocale: ['', Validators.pattern('[a-z]{2}_[a-zA-Z]{2}')],
      type: [''],
    });

    // TODO: remove this
    this.nameControl.valueChanges.subscribe(value => {
      if (value.trim().length === 0) {
      }
    });
  }

  getProjectByRouteId(): any {
    this.route.params.subscribe(params => {
      const routeId = +params['id'];
      const viewState = params['state'];
      if (!isNaN(routeId) && (routeId !== 0)) {
        return this.projectService.getProject(routeId)
          .then(project => {
            this.loggingMsg('Entering getProjectByRouteId() with: ' + routeId);
            this.loggingMsg('Got a project:' + JSON.stringify(project));

            this.project = project;
            this.updateDetailView();
          })
          .catch(error => {
            this.setErrorMessage(error);
            this.setDefaultProject();
          });
      } else {
        this.setDefaultProject();
      };
    })
  }

  setDefaultProject(): void {
    this.project = <Project>{
      format: 'PROPERTIES', id: 0, name: 'Test project',
      personId: this.personId, sourceLocale: 'en_EN', type: 'UTF_8'
    };

    this.projectForm.reset(this.project);
  }

  delete(): void {
    this.projectService
      .delete(this.project.id)
      .then(() => {
        this.loggingMsg('Deleted project: ' + this.project.name);
        this.setDefaultProject();
        this.updateDetailView();
        this.updateProjectList(this.project, true);

      }).catch(error => {
        this.setErrorMessage(error);
      });
  }

  save(): void {
    this.project = <Project>this.projectForm.value;
    this.loggingMsg('Saving project: ' + JSON.stringify(this.project));

    if (this.project.id === 0) {
      this.create();
    } else {
      this.update();
    }
  }

  update(): void {
    this.projectService.update(this.project)
      .then(project => {
        this.loggingMsg('Updated project: ' + project.name);
        this.project = project;
        this.updateDetailView();
        this.updateProjectList(this.project, false);
      }).catch(error => {
        this.setErrorMessage(error);
      });
  }

  create(): void {
    this.projectService.create(this.project)
      .then(project => {
        this.loggingMsg('Created project: ' + JSON.stringify(project.name));
        this.project = project;
        this.updateDetailView();
        this.updateProjectList(this.project, false);
      }).catch(error => {
        this.setErrorMessage(error);
      });
  }

  private updateDetailView(): void {
    this.projectForm.setValue(this.project);
    this.updateBrowserPath(this.project);
    this.onError.emit('');
    this.onSuccess.emit('');
  }

  private updateBrowserPath(project: Project): void {
    let link: any;
    if (project.id !== 0) {
      link = [this.detailUrl, { state: 'edit', id: project.id} ];
    } else {
      link = [this.detailUrl, { state: 'list' } ];
    }
    this.router.navigate(link);
  }

  private loggingMsg(msg: string): void {
    console.log(msg);
  };

  private changeTitle(event: any): void {
    this.onTitleChanged.emit(event);
  }

  private updateProjectList(project: Project, hideDetails: boolean): void {
    this.onProjectChanged.emit({ id: project.id, isDetailHidden: hideDetails} );
  }

  private setSuccessMessage(msg: string, project: Project): void {
    this.onSuccess.emit(msg);
  }

  private setErrorMessage(error: any): void {
    this.onError.emit(error);
  }

}
