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

class MockActivatedRoute extends ActivatedRoute {
  public params = Observable.of({id: 123});
}

fdescribe('ProjectDetailComponent', () => {
  // let component: ProjectDetailComponent;
  let fixture: ComponentFixture<ProjectDetailComponent>;
  let projectDetailComponent: ProjectDetailComponent;

  let _projectService: ProjectService;
  let _appConfig: AppconfigService;
  let _route: ActivatedRoute;
  let _router: Router;
  let _formBuilder: FormBuilder;
  let _dialog: MdDialog;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ ProjectService, AppconfigService,
        { provide: ActivatedRoute, useValue: new MockActivatedRoute() },
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend: MockBackend, options: BaseRequestOptions) =>
            new Http(backend, options), deps: [MockBackend, BaseRequestOptions]
        }],
      declarations: [ ProjectDetailComponent],
      imports: [
        ReactiveFormsModule,
        // FormsModule,
        MdDialogModule,
        // MdButtonModule,
        // MdTooltipModule,
        RouterTestingModule
      ]
    });
    fixture = TestBed.createComponent(ProjectDetailComponent);
    // component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(inject([
    ProjectService, AppconfigService, ActivatedRoute, Router, FormBuilder, MdDialog ],
    (
      __projectService: ProjectService, __appConfig: AppconfigService,
      __route: ActivatedRoute, __router: Router,
      __formBuilder: FormBuilder, __dialog: MdDialog
    ) => {
        _projectService = __projectService;
        _appConfig = __appConfig;
        _route = __route;
        _router = __router;
        _formBuilder = __formBuilder;
        _dialog = __dialog;

        projectDetailComponent = new ProjectDetailComponent(_projectService,
          _appConfig, _route, _router, _formBuilder, _dialog );
        }
    ));

  it('should be created', () => {
    // expect(component).toBeTruthy();
    expect(projectDetailComponent).toBeTruthy();
  });
});
