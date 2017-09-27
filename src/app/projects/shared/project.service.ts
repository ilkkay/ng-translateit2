import { Subject, BehaviorSubject, Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/if';
import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { AppconfigService } from '../../shared/appconfig.service';

import { Project } from './Project';
import { MessageInterface } from '../../shared/message-interface'
import { StateInterface } from '../../shared/state-interface'

@Injectable()
export class ProjectService {

  private projectsUrl = 'http://localhost:8080/api/projects/'; // api/projects/';
  // TODO:create proxy.conf.json and add http://localhost:8080/
  /*
  {
  "/api/*":{
  "target": "http://localhost:8080",
  "secure": false,
  "logLevel": "debug",
  }
  And edit the package.json file's start script to be
  "start": "ng serve --proxy-config proxy.conf.json
  */

  private _projectData: Subject<Project[]> = new BehaviorSubject<Project[]>([]);
  private _projectWorkMapData: Subject<any> = new BehaviorSubject<any>({});

  private _messageService: MessageInterface;
  private _uiStateService: StateInterface;

  constructor(private _http: Http, ) { }

  registerMessageService(messageService: MessageInterface) {
    this._messageService = messageService;
  }

  registerStateService(stateService: StateInterface) {
    this._uiStateService = stateService;
  }

  getProjectsObservable() { return this._projectData.asObservable(); }
  getProjectWorkMapObservable() { return this._projectWorkMapData.asObservable(); }

  refreshData() {
    this._getProjects();
  }

  getProjects(): Promise<Project[]> {
    return this._http.get(this.projectsUrl)
      .toPromise()
      .then(response => {
        console.log('Response data: ' + response.text());
        return response.json().projects as Project[];
      })
      .catch(this.handleError);
  }

  getProject(id: number): Promise<Project> {
    console.log('Entering ProjectsService.getProject() with id ' + id);

    const url = `${this.projectsUrl}${id}`;
    return this._http.get(url)
      .toPromise()
      .then(response => {
        console.log('Response data: ' + response.text());
        this._messageService.sendErrorMessage('');
        return response.json() as Project[];
      })
      .catch(error => this._messageService.sendErrorMessage(error));
  }

  update(project: Project): Promise<Project> {
    const url = `${this.projectsUrl}${project.id}`;
    const headers = new Headers({ 'Content-Type': 'application/json' });

    return this._http
      .put(url,
      project,
      { headers: headers })
      .toPromise()
      .then(response => {
        console.log('Response from update: ' + response.text());
        this._messageService.sendErrorMessage('');
        return response.json() as Project[];
      })
      .catch(error => this._messageService.sendErrorMessage(error));
  }

  delete(id: number): Promise<void> {
    const url = `${this.projectsUrl}${id}`;
    const headers = new Headers({ 'Content-Type': 'application/json' });

    return this._http.delete(url, { headers: headers })
      .toPromise()
      .then(() => this._messageService.sendErrorMessage(''))
      .catch(error => this._messageService.sendErrorMessage(error));
  }

  // http://www.concretepage.com/angular-2/angular-2-http-post-example#post
  create(project: Project): Promise<Project> {
    const headers = new Headers({ 'Content-Type': 'application/json' });

    return this._http
      .post(this.projectsUrl,
      project,
      { headers: headers })
      .toPromise()
      .then(response => {
        console.log('Response from create: ' + response.text());
        this._messageService.sendErrorMessage('')
        return response.json() as Project[];
      })
      .catch(error => this._messageService.sendErrorMessage(error));
  }

  private _getProjects(): void {
    this._http
      .get(this.projectsUrl)
      .map((res: any) => res.json())
      // .takeWhile(() => !this.projectData) // unsubscribe automatically
      .subscribe((viewProjects: any) => {
        this._projectWorkMapData.next(viewProjects.projectWorkMap);
        this._projectData.next(viewProjects.projects);

        if (((viewProjects.projects as Project[])).length === 0) {
          this._uiStateService.showDetail();
        }
      },
      (err: any) => this._messageService.sendErrorMessage(err),
      () => console.log('_getProjects(): always')
      )
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred: ', error.text());
    return Promise.reject(error);
  }

}
