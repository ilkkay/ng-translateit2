import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {
  Http,
  HttpModule,
  XHRBackend,
  ResponseOptions,
  Response,
  BaseRequestOptions,
  RequestOptions,
  RequestMethod
} from '@angular/http';

// https://github.com/antonybudianto/angular-starter/blob/master/src/app/app.component.spec.ts
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute /*, ParamMap */} from '@angular/router';
import { FormBuilder /*, FormGroup, FormControl, Validators */ } from '@angular/forms';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';

import { MdDialogModule , MdButtonModule, MdTooltipModule  } from '@angular/material';
import { MdDialog /* , MdDialogConfig, MdDialogRef */ } from '@angular/material';
import { /* ConfirmDeleteComponent */ } from '../../material/mymaterial.module';

import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import { AppconfigService } from '../../shared/appconfig.service';
import { ProjectDetailComponent } from './project-detail.component';
import { ProjectService } from '../shared/project.service';
import { Project } from '../shared/project';
import { ErrorMessageService } from '../../shared/error-message.service';
import { ContainerStateService } from '../../shared/container-state.service';

class MockActivatedRoute extends ActivatedRoute {
  public params = Observable.of({id: 123});
}

describe('ProjectDetailComponent', () => {
  let fixture: ComponentFixture<ProjectDetailComponent>;
  let projectDetailComponent: ProjectDetailComponent;

  let _projectService: ProjectService;
  let _appConfig: AppconfigService;
  let _route: ActivatedRoute;
  let _router: Router;
  let _formBuilder: FormBuilder;
  let _dialog: MdDialog;
  let _messageService: ErrorMessageService;
  let _containerStateService: ContainerStateService;
  let _mockBackend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ ProjectService, AppconfigService, ErrorMessageService, ContainerStateService,
        { provide: ActivatedRoute, useValue: new MockActivatedRoute() },
        MockBackend, BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend: MockBackend, options: BaseRequestOptions) =>
            new Http(backend, options), deps: [MockBackend, BaseRequestOptions]
        }],
      declarations: [ ProjectDetailComponent],
      imports: [
        ReactiveFormsModule,
        MdDialogModule,
        RouterTestingModule
      ]
    });
    fixture = TestBed.createComponent(ProjectDetailComponent);
    fixture.detectChanges();
  });

  beforeEach(inject([ ProjectService, AppconfigService, ActivatedRoute, Router,
  FormBuilder, MdDialog, ErrorMessageService, ContainerStateService, MockBackend ],
    (
      __projectService: ProjectService, __appConfig: AppconfigService,
      __route: ActivatedRoute, __router: Router,
      __formBuilder: FormBuilder, __dialog: MdDialog,
      __messageService: ErrorMessageService,
      __containerStateService: ContainerStateService,
      __mockBackend: MockBackend
    ) => {
        _projectService = __projectService;
        _appConfig = __appConfig;
        _route = __route;
        _router = __router;
        _formBuilder = __formBuilder;
        _dialog = __dialog;
        _messageService = __messageService;
        _containerStateService = __containerStateService;
        _mockBackend = __mockBackend;

        projectDetailComponent = new ProjectDetailComponent(_projectService,
           _appConfig, _route, _router, _formBuilder, _dialog, _messageService, _containerStateService  );
        }
    ));

  it('should be created', () => {
    // expect(component).toBeTruthy();
    expect(projectDetailComponent).toBeTruthy();
  });
});
