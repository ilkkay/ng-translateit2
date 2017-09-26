import { TestBed, inject } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
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

import { ProjectService } from './project.service';
import { PROJECTS } from './mock-projects';
import { Project } from './Project';
import { MessageInterface } from '../../shared/message-interface'
import { StateInterface } from '../../shared/state-interface'
import { ErrorMessageService } from '../../shared/error-message.service';
import { ContainerStateService } from '../../shared/container-state.service';

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

  let _messageService: ErrorMessageService;
  let _containerStateService: ContainerStateService;
  let _mockBackend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectService,
        { provide: ErrorMessageService, useValue: new MockMessageService() },
        { provide: ContainerStateService, useValue: new MockContainerStateService() },
        MockBackend, BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend: MockBackend, options: BaseRequestOptions) =>
            new Http(backend, options), deps: [MockBackend, BaseRequestOptions]
        }],
    });
  });

  beforeEach(inject([Http, ProjectService, ErrorMessageService, ContainerStateService, MockBackend],
    (http: Http, service: ProjectService, ms: ErrorMessageService,
      css: ContainerStateService,
      mb: MockBackend) => {

      _messageService = ms;
      _containerStateService = css;
      _mockBackend = mb;

      projectService = new ProjectService(http);
      projectService.registerMessageService(ms);
      projectService.registerStateService(css);

      expect(projectService).toBeTruthy();
    }));

/*
  xit('should be created', inject([ProjectService, ErrorMessageService, ContainerStateService, MockBackend],
    (service: ProjectService, ms: ErrorMessageService,
      css: ContainerStateService,
      mb: MockBackend) => {

      _messageService = ms;
      _containerStateService = css;
      _mockBackend = mb;

      service.registerMessageService(ms);
      service.registerStateService(css);

      expect(service).toBeTruthy();
    }));
*/

  it('should be created', () => {
    expect(projectService).toBeTruthy();
  });

  it('should call Message Services (function)', async () => {
    spyOn(_messageService, 'sendTextMessage');
    _messageService.sendTextMessage('foo');
    expect(_messageService.sendTextMessage).toHaveBeenCalledWith('foo');

    spyOn(_messageService, 'sendErrorMessage');
    _messageService.sendErrorMessage('foo');
    expect(_messageService.sendErrorMessage).toHaveBeenCalledWith('foo');
  });

  it('should call Project Services (async)', async () => {
    spyOn(projectService, 'getProject').and.callFake(() => {
      return Promise.resolve(mockProject);
    });
    projectService.getProject(1).then((project) => {
      expect(projectService.getProject).toHaveBeenCalled();
      expect(project.id).toBe(1);
    });

    spyOn(projectService, 'getProjects').and.callFake(() => {
      return Promise.resolve(mockProjectsArray);
    });
    projectService.getProjects().then((projects) => {
      expect(projectService.getProjects).toHaveBeenCalled();
      expect(projects.length).toBe(2);
    });

  });

});
