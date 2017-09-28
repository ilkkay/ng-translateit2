import { tick, fakeAsync, async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
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
  public params = Observable.of({id: 1});
  public setParamsNan() { this.params = Observable.of({ })}
  public setParamsZero() { this.params = Observable.of({ id: 0 })}
}

class MockError extends Response implements Error {
  name: any
  message: any
}

fdescribe('ProjectDetailComponent', () => {
  const mockProject: Project = <Project>{ format: 'PROPERTIES', id: 1, name: 'dotcms', personId: 10, sourceLocale: 'en_EN', type: 'Utf-8' };
  const defaultProject = <Project>{ format: 'PROPERTIES', id: 0, name: 'Test project',
            personId: 10, sourceLocale: 'en_EN', type: 'UTF_8'
            }
  let fixture: ComponentFixture<ProjectDetailComponent>;
  let projectDetailComponent: ProjectDetailComponent;

  let _projectService: ProjectService;
  let _appConfig: AppconfigService;
  let _route: MockActivatedRoute;
  let _router: Router;
  let _formBuilder: FormBuilder;
  let _dialog: MdDialog;
  let _messageService: ErrorMessageService;
  let _containerStateService: ContainerStateService;
  let _mockBackend: MockBackend;
  let lastConnection: any;

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
      __route: MockActivatedRoute, __router: Router,
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

        _mockBackend.connections.subscribe(
          (connection: any) => lastConnection = connection);

        projectDetailComponent = new ProjectDetailComponent(_projectService,
           _appConfig, _route, _router, _formBuilder, _dialog, _messageService, _containerStateService  );
        }
    ));

  it('should be created', () => {
    loggingMsg('Starting Project Detail Unit Tests')
    expect(projectDetailComponent).toBeTruthy();
  });

  it('should be get route params (fakeAsync)', fakeAsync(() => {
    let routeId: number;
    _route.params.subscribe(params => { routeId = +params['id']; })
    tick();

    expect(routeId).toBe(1);
  }));

  fit('getProjectByRouteId should get project by route params (fakeAsync)', fakeAsync(() => {

    _route.setParamsZero();
    // tick();
    projectDetailComponent.getProjectByRouteId();
    /* lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify(mockProject),
      status: 200,
    })));*/
    // tick();

//    expect(projectDetailComponent.project).toEqual(mockProject);
        expect(projectDetailComponent.project.name).toBe('Test project');

  }));

  xit('TEST getProjectByRouteId should get project by route params (fakeAsync)', fakeAsync(() => {

    _route.setParamsNan();
    projectDetailComponent.getProjectByRouteId();
    lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify(mockProject),
      status: 200,
    })));
    tick();

    expect(projectDetailComponent.project.name).toBe('Test project');
  }));

  xit('getProjectByRouteId should get default project if failure (fakeAsync)', fakeAsync(() => {

    projectDetailComponent.getProjectByRouteId();
    lastConnection.mockError(new MockError(new ResponseOptions('')));
    tick();

    expect(projectDetailComponent.project.name).toBe('Test project');
  }));

  const loggingMsg = function (msg: string) {
    console.log(msg);
  };
});
