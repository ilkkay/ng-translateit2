import { NgModule, DebugElement } from '@angular/core';

import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';

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
import { Router, ActivatedRoute, Routes } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MdDialogModule, MdButtonModule, MdTooltipModule } from '@angular/material';
import { MdDialog } from '@angular/material';
import { ConfirmDeleteComponent } from '../../material/mymaterial.module';
import { MyMaterialModule } from '../../material/mymaterial.module';

import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import { AppconfigService } from '../../shared/appconfig.service';
import { ProjectDetailComponent } from './project-detail.component';
import { ProjectService } from '../shared/project.service';
import { Project } from '../shared/project';
import { ErrorMessageService } from '../../shared/error-message.service';
import { ContainerStateService } from '../../shared/container-state.service';

class MockActivatedRoute extends ActivatedRoute {
  public params = Observable.of({ id: 1 });
  public setIdParam(_id: number) { this.params = Observable.of({ id: _id }) }
  public setParamsNan() { this.params = Observable.of({}) }
  public setParamsZero() { this.params = Observable.of({ id: 0 }) }
}

class MockError extends Response implements Error {
  name: any
  message: any
}

class MockComponent { }
const MockDialog = { open: function(a, b) {} };

fdescribe('ProjectDetailComponent', () => {
  const mockProject: Project = <Project>{ format: 'PROPERTIES', id: 1, name: 'dotcms', personId: 10, sourceLocale: 'en_EN', type: 'Utf-8' };
  const defaultProject = <Project>{
    format: 'PROPERTIES', id: 0, name: 'Test project',
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

  // let de: DebugElement;
  // let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectService, AppconfigService, ErrorMessageService, ContainerStateService,
        { provide: ActivatedRoute, useValue: new MockActivatedRoute() },
        { provide: MdDialog, useValue: MockDialog },
        MockBackend, BaseRequestOptions,
        { provide: Http,
          useFactory: (backend: MockBackend, options: BaseRequestOptions) =>
            new Http(backend, options), deps: [MockBackend, BaseRequestOptions] }
      ],
      declarations: [ProjectDetailComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
//        BrowserModule,
//        BrowserAnimationsModule,
//        MaterialModule,
//        MdDialogModule,
//        TestModule,
        RouterTestingModule.withRoutes([
          { path: 'projects', component: MockComponent }])
      ]
    });
    fixture = TestBed.createComponent(ProjectDetailComponent);
    fixture.detectChanges();
  });

  beforeEach(inject([ProjectService, AppconfigService, ActivatedRoute, Router,
    FormBuilder, MdDialog, ErrorMessageService, ContainerStateService, MockBackend],
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
        _appConfig, _route, _router, _formBuilder, _dialog, _messageService, _containerStateService);
      projectDetailComponent.ngOnInit();
    }
  ));

  fit('component should be created ()', () => {
    loggingMsg('Starting Project Detail Unit Tests')
    expect(projectDetailComponent).toBeTruthy();
  });

  fit('detail url should be set ()', () => {
    expect(projectDetailComponent.detailUrl).toBe('/projects');
  });

  fit('formats should be set ()', () => {
    expect(projectDetailComponent.formats.length).toBeGreaterThan(0);
  });

  fit('types should be set ()', () => {
    expect(projectDetailComponent.types.length).toBeGreaterThan(0);
  });

  fit('form should be invalid after init ()', () => {
    expect(projectDetailComponent.projectForm.valid).toBeFalsy();

    const name = projectDetailComponent.projectForm.controls['name'];
    expect(name.valid).toBeFalsy();
  });

  fit('project name should be required ()', () => {
    let errors = {};
    const name = projectDetailComponent.projectForm.controls['name'];
    errors = name.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  fit('sourceLocale should be required ()', () => {
    let errors = {};
    const sourceLocale = projectDetailComponent.projectForm.controls['sourceLocale'];
    errors = sourceLocale.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  fit('project form should be valid if name and locale valid ()', () => {
    projectDetailComponent.projectForm.controls['name'].setValue('Test 1234');
    projectDetailComponent.projectForm.controls['sourceLocale'].setValue('en_EN');

    expect(projectDetailComponent.projectForm.valid).toBeTruthy();
    const name = projectDetailComponent.projectForm.controls['name'].value;
    expect(name).toBe('Test 1234');
  });

  fit('should get route params (fakeAsync)', fakeAsync(() => {
    let routeId: number;
    _route.params.subscribe(params => { routeId = +params['id']; })
    tick();

    expect(routeId).toBe(1);
  }));

  fit('getProjectByRouteId should get project by route params (fakeAsync)', fakeAsync(() => {

    projectDetailComponent.getProjectByRouteId();
    lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify(mockProject),
      status: 200,
    })));
    tick();

    expect(projectDetailComponent.project).toEqual(mockProject);

    const id = projectDetailComponent.projectForm.controls['id'].value;
    expect(id).toBe(1);
    const name = projectDetailComponent.projectForm.controls['name'].value;
    expect(name).toBe('dotcms');
    const sourceLocale = projectDetailComponent.projectForm.controls['sourceLocale'].value;
    expect(sourceLocale).toBe('en_EN');
  }));

  fit('getProjectByRouteId should fail if route params is 0 ()', () => {
    _route.setParamsZero();
    projectDetailComponent.getProjectByRouteId();
    expect(projectDetailComponent.project.name).toBe('Test project');
  });

  fit('getProjectByRouteId should fail if route params is Nan ()', () => {
    _route.setParamsNan();
    projectDetailComponent.getProjectByRouteId();
    expect(projectDetailComponent.project.name).toBe('Test project');
  });

  fit('getProjectByRouteId should set default project if connection failure (fakeAsync)', fakeAsync(() => {
    projectDetailComponent.getProjectByRouteId();
    lastConnection.mockError(new MockError(new ResponseOptions('')));
    tick();

    expect(projectDetailComponent.project.name).toBe('Test project');
  }));

  fit('setDefaultProject should reset form ()', () => {

    projectDetailComponent.projectForm.controls['name'].setValue('Test 1234');
    projectDetailComponent.projectForm.controls['sourceLocale'].setValue('fi_FI');

    projectDetailComponent.setDefaultProject();

    const name = projectDetailComponent.projectForm.controls['name'].value;
    expect(name).toBe('Test project');
    const sourceLocale = projectDetailComponent.projectForm.controls['sourceLocale'].value;
    expect(sourceLocale).toBe('en_EN');
  });

  fit('delete should set default project and hide Detail View (fakeAsync)', fakeAsync(() => {
    spyOn(projectDetailComponent, 'updateView');
    spyOn(projectDetailComponent.dialog, 'open');

    projectDetailComponent.confirmDelete(mockProject);
    lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify({}),
      status: 200,
    })));
    tick();

    expect(lastConnection.request.method).toBe(RequestMethod.Delete, 'should be DELETE');
    expect(lastConnection.request.url).toBe('http://localhost:8080/api/projects/1');
    expect(projectDetailComponent.project.name).toBe('Test project');
    expect(projectDetailComponent.updateView).toHaveBeenCalledWith(true);
    expect(projectDetailComponent.dialog.open).toHaveBeenCalledWith(ConfirmDeleteComponent);
  }));

  fit('save should update when id != 1 (fakeAsync)', fakeAsync(() => {
    spyOn(projectDetailComponent, 'updateView');

    projectDetailComponent.projectForm.setValue(mockProject);
    projectDetailComponent.save();
    lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify(mockProject),
      status: 200,
    })));
    tick();

    expect(lastConnection.request.method).toBe(RequestMethod.Put, 'should be Put');
    expect(lastConnection.request.url).toBe('http://localhost:8080/api/projects/1');

    expect(projectDetailComponent.updateView).toHaveBeenCalledWith(false);
  }));

  fit('save should create when id == 0 (fakeAsync)', fakeAsync(() => {
    spyOn(projectDetailComponent, 'updateView');

    projectDetailComponent.projectForm.setValue(defaultProject);
    projectDetailComponent.save();
    lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify(mockProject),
      status: 200,
    })));
    tick();

    expect(lastConnection.request.method).toBe(RequestMethod.Post, 'should be Post');
    expect(lastConnection.request.url).toBe('http://localhost:8080/api/projects/');
    expect(projectDetailComponent.updateView).toHaveBeenCalledWith(false);
  }));

  fit('updateView should navigate to edit state if project.id != 0 (fakeAsync)', fakeAsync(() => {
    projectDetailComponent.project = mockProject;
    projectDetailComponent.project.id = 666;
    projectDetailComponent.updateView(false);
    tick();

    expect(_router.url).toBe('/projects;state=edit;id=666');
  }));

  fit('updateView should navigate to list state if project.id == 0 (fakeAsync)', fakeAsync(() => {
    projectDetailComponent.project = defaultProject;
    projectDetailComponent.updateView(false);
    tick();

    expect(_router.url).toBe('/projects;state=list');
  }));

  fit('updateView should call hideDetail, showDetail and projectService.refreshData (fakeAsync)', fakeAsync(() => {
    spyOn(_containerStateService, 'showDetail');
    spyOn(_containerStateService, 'hideDetail');
    spyOn(_projectService, 'refreshData');

    projectDetailComponent.project = defaultProject;
    projectDetailComponent.updateView(false);
    tick();

    expect(_containerStateService.hideDetail).toHaveBeenCalledTimes(0);
    expect(_containerStateService.showDetail).toHaveBeenCalledTimes(1);

    projectDetailComponent.updateView(true);
    tick();

    expect(_containerStateService.hideDetail).toHaveBeenCalledTimes(1);
    expect(_containerStateService.showDetail).toHaveBeenCalledTimes(1);
    expect(_projectService.refreshData).toHaveBeenCalledTimes(2);
  }));

  const loggingMsg = function (msg: string) {
    console.log(msg);
  };
});

/*
@NgModule({
  declarations: [ConfirmDeleteComponent],
  imports: [MdDialogModule], // <-- added this line
  entryComponents: [ConfirmDeleteComponent],
  exports: [ConfirmDeleteComponent],
})
class TestModule { }
*/
/*
https://github.com/angular/material2/issues/3142
https://github.com/angular/material2/blob/d1128febe6d23f1a1f20446692bc2a8358e8b8cf/src/lib/dialog/dialog.spec.ts#L116-L116

md-select
When trying to select an item from an md-select, I was able to click
the select and then one of the md-option elements, however the md-options
did not disappear, so if you have multiple md-selects on a form, you need
to be aware of that.

let dialogMock = {
    open: function(a, b) {}
};

spyOn(dialogMock, 'close');

TestBed.configureTestingModule({
     providers: [{
        provide: MdDialog,
        useValue: dialogMock
    }]
})

expect(dialogMock.open).toHaveBeenCalled();

I also had a case where I wanted to assert that some action
happened after the dialog was closed, so I used the following jasmine spy

spyOn(dialogMock, 'open').and.returnValue({
    afterClosed: function() {
        return Observable.of(true);
    }
});
*/
