import { tick, async, fakeAsync, TestBed, inject } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {
  Http,
  HttpModule,
  XHRBackend,
  ResponseOptions,
  Response,
  ResponseType,
  Request,
  BaseRequestOptions,
  RequestOptions,
  RequestMethod
} from '@angular/http';

import { ProjectService } from './project.service';
import { PROJECTS } from './mock-projects';
import { Project } from './Project';
import { MessageInterface } from '../../shared/message-interface'
import { StateInterface } from '../../shared/state-interface'
import { ErrorMessageService } from '../../shared/error-message.service';
import { ContainerStateService } from '../../shared/container-state.service';

class MockError extends Response implements Error {
  name: any
  message: any
}

class MockMessageService implements MessageInterface {
  clearMessages() { }
  sendTextMessage(message: string) { }
  sendErrorMessage(error: any) { }
  sendSuccessMessage(success: any) { }
  getMessage(): Observable<any> { return null; }
}

class MockContainerStateService implements StateInterface {
  hideDetail() { }
  showDetail() { }
}

fdescribe('ProjectService', () => {
  let projectService: ProjectService;
  const mockProjectsArray = PROJECTS;
  const mockProject: Project = <Project>{ format: 'PROPERTIES', id: 1, name: 'dotcms', personId: 10, sourceLocale: 'en_EN', type: 'Utf-8' };

  const messageService = new MockMessageService(); // ErrorMessageService;
  const containerStateService = new MockContainerStateService(); // ContainerStateService;
  let mockBackend: MockBackend;
  let _lastConnection: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockBackend, BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend: MockBackend, options: BaseRequestOptions) =>
            new Http(backend, options), deps: [MockBackend, BaseRequestOptions]
        }],
    });
  });

  beforeEach(inject([Http,  MockBackend],
    (http: Http,  mb: MockBackend) => {

      projectService = new ProjectService(http);
      projectService.registerMessageService(messageService);
      projectService.registerStateService(containerStateService);
            mockBackend = mb;
      mockBackend.connections.subscribe(
        (connection: any) => _lastConnection = connection);
    }));

  fit('ProjectService should be created ()', () => {
    expect(projectService).toBeTruthy();
  });

  fit('Message Services should be called ()', () => {
    spyOn(messageService, 'sendTextMessage');
    messageService.sendTextMessage('foo');
    expect(messageService.sendTextMessage).toHaveBeenCalledWith('foo');

    spyOn(messageService, 'sendErrorMessage');
    messageService.sendErrorMessage('foo');
    expect(messageService.sendErrorMessage).toHaveBeenCalledWith('foo');
  });

  fit('Project CRUD Services should be called (async)', async () => {
    spyOn(projectService, 'getProject').and.callFake(() => Promise.resolve(mockProject));
    projectService.getProject(1).then((project) => {
      expect(projectService.getProject).toHaveBeenCalled();
    });

    spyOn(projectService, 'create').and.callFake(() => Promise.resolve(mockProject));
    projectService.create(mockProject).then((project) => {
      expect(projectService.create).toHaveBeenCalled();
    });

    spyOn(projectService, 'update').and.callFake(() => Promise.resolve(mockProject));
    projectService.update(mockProject).then((project) => {
      expect(projectService.update).toHaveBeenCalled();
    });

    spyOn(projectService, 'delete').and.callFake(() => { });
    projectService.delete(1).then(() => {
      expect(projectService.delete).toHaveBeenCalled();
    });

  });

  xit('getProjects() should return connection error (fakeAsync)', fakeAsync(() => {
    let myError: any;
    projectService.getProjects().then(() => { },
      (error) => { myError = error; });

    const body = JSON.stringify({ key: 'val' });
    const opts = { type: ResponseType.Error, status: 404, body: body };
    const responseOpts = new ResponseOptions(opts);
    _lastConnection.mockError(new MockError(responseOpts));

    tick();
    expect(myError.status).toBe(404);
    loggingMsg(JSON.stringify(myError));
  }));

  fit('Project CRUD Services should send Error Message (fakeAsync)', fakeAsync(() => {
    spyOn(messageService, 'sendErrorMessage');
    projectService.getProject(1).then(() => { });
    _lastConnection.mockError(new MockError(new ResponseOptions('')));
    tick();
    expect(messageService.sendErrorMessage).toHaveBeenCalled();

    projectService.create(mockProject).then(() => { });
    _lastConnection.mockError(new MockError(new ResponseOptions('')));
    tick();
    expect(messageService.sendErrorMessage).toHaveBeenCalledTimes(2);

    projectService.update(mockProject).then(() => { });
    _lastConnection.mockError(new MockError(new ResponseOptions('')));
    tick();
    expect(messageService.sendErrorMessage).toHaveBeenCalledTimes(3);

    projectService.delete(1).then(() => { });
    _lastConnection.mockError(new MockError(new ResponseOptions('')));
    tick();
    expect(messageService.sendErrorMessage).toHaveBeenCalledTimes(4);
  }));

  fit('should query current service url ()', () => {
    // projectService._getProjects();
    expect(_lastConnection).toBeDefined('no http service connection at all?');
    expect(_lastConnection.request.url).toMatch('http://localhost:8080/api/projects/', 'url invalid');
  });

  fit('_getProjects() should subscribe Projects and WorkMap (fakeAsync)', fakeAsync(() => {
    let projects: Project[];
    projectService.getProjectsObservable().
      subscribe((prjs: Project[]) => projects = prjs);
    let workMap: any;
    projectService.getProjectWorkMapObservable().
      subscribe((m: any) => workMap = m);

    projectService._getProjects();

    _lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify({ projects: mockProjectsArray, projectWorkMap: { '8': 0 } }),
      status: 200,
    })));
    tick();

    expect(projects.length).toBe(mockProjectsArray.length);
    expect(projects[0]).toEqual(mockProject, ' should be the first project');
    expect(workMap).toEqual({ '8': 0 });

  }));

  fit('getProject() should return project and call clearMessages (fakeAsync)', fakeAsync(() => {
    spyOn(messageService, 'clearMessages');

    let result: Project;
    projectService.getProject(1).then((project: Project) => result = project);
    _lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify(mockProject),
      status: 200,
    })));
    tick();

    expect(result).toEqual(mockProject, ' should be the first project');
    expect(messageService.clearMessages).toHaveBeenCalled();
  }));

  fit('update() should use PUT method and call clearMessages (fakeAsync)', fakeAsync(() => {
    spyOn(messageService, 'clearMessages');

    let project: Project;
    projectService.update(mockProject).then((prj: Project) => project = prj);
    _lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify(mockProject),
      status: 200,
    })));
    tick();

    expect(project.id).toBe(1);
    expect(_lastConnection.request.method).toBe(RequestMethod.Put);
    expect(_lastConnection.request.url).toBe('http://localhost:8080/api/projects/1');
  }));

  fit('create() should use POST method and call clearMessages (fakeAsync)', fakeAsync(() => {
    spyOn(messageService, 'clearMessages');

    let project: Project;
    projectService.create(mockProject).then((prj: Project) => project = prj);
    _lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify(mockProject),
      status: 200,
    })));
    tick();

    expect(project.id).toBe(1);
    expect(_lastConnection.request.method).toBe(RequestMethod.Post);
    expect(_lastConnection.request.url).toBe('http://localhost:8080/api/projects/');
  }));

  fit('delete() should use DELETE method and call clearMessages (fakeAsync)', fakeAsync(() => {
    spyOn(messageService, 'clearMessages');

    projectService.delete(1).then(() => { });
    _lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify({ }),
      status: 200,
    })));
    tick();

    expect(_lastConnection.request.method).toBe(RequestMethod.Delete);
    expect(_lastConnection.request.url).toBe('http://localhost:8080/api/projects/1');
  }));

  xit('getProjects() should return some projects (fakeAsync)', fakeAsync(() => {
    let result: Project[];
    projectService.getProjects().then((projects: Project[]) => result = projects);
    _lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify({ projects: mockProjectsArray }),
      status: 200,
    })));
    tick();
    expect(result.length).toEqual(2, 'should contain given amount of projects');
    expect(result[0]).toEqual(mockProject, ' should be the first project');
  }));

  xit('should set Projects on Subject', () => {
    let myPrjs: Project[]
    projectService.getProjectsObservable().
      subscribe((prjs: Project[]) => myPrjs = prjs);
    projectService.setProjectsSubject(mockProjectsArray);
    expect(myPrjs).toBe(mockProjectsArray);
  });

  const loggingMsg = function (msg: string) {
    console.log(msg);
  };

});
