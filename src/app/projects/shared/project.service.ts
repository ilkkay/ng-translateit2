import { Subject, BehaviorSubject, Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/if';
import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { AppconfigService } from '../../shared/appconfig.service';

import { Project } from './Project';
// import { PROJECTS } from '../../shared/mock-projects';

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
  // results: Project[];

  private projectData: Subject<Project[]> = new BehaviorSubject<Project[]>([]);
  private projectWorkMapData: Subject<any> = new BehaviorSubject<any>({});
  private projectsObservable = this.projectData.asObservable();
  private projectWorkMapObservable = this.projectWorkMapData.asObservable();

  private observableProjects = this.getProjectsWithObservable();

  private _isProjectListEmpty: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public get isProjectListEmpty() { return this._isProjectListEmpty; }
  projectListIsEmpty() { this._isProjectListEmpty.next(true); }
  projectListIsNotEmpty() { this._isProjectListEmpty.next(false); }

  constructor(private http: Http) { }

  __getObservableProjects() { return this.observableProjects; }

  _getProjectsObservable() { return this.projectsObservable; }
  _getProjectWorkMapObservable() { return this.projectWorkMapObservable; }

  _getProjects(): void {
    this.http
      .get(this.projectsUrl)
      .map((res: any) => res.json() )
      // .takeWhile(() => !this.projectData) // unsubscribe automatically
      .subscribe( (viewProjects: any) => {
        this.projectWorkMapData.next(viewProjects.projectWorkMap);
        this.projectData.next(viewProjects.projects);

        if (((viewProjects.projects as Project[])).length === 0) {
          this.projectListIsEmpty();
        } else {
          this.projectListIsNotEmpty();
        }
      },
      (err: any) => console.error('_getProjects(): ERROR'),
      () => console.log('_getProjects(): always')
      )
  }

  _refreshData() {
    this._getProjects();
    // this.getProjectsWithPromise();
    // this.getViewProjectsWithPromise();
    // this.observableProjects = this.getProjectsWithObservable();
  }

    // Returns Promise<Project[]>
    getProjectsWithPromise(): Promise<Project[]> {
        return this.http.get(this.projectsUrl).
        toPromise().
        then(res => res.json().projects);
    }

    // Returns Observable<Project[]>
    getProjectsWithObservable(): Observable<Project[]> {
        return this.http.get(this.projectsUrl).map((res: any) => res.json().projects);
    }

    getViewProjectsWithPromise(): Promise<any[]> {
        return this.http.get(this.projectsUrl).
        toPromise().
        then(res => res.json());
    }

  getProjects(): Promise<Project[]> {
    return this.http.get(this.projectsUrl)
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
    return this.http.get(url)
      .toPromise()
      .then(response => {
        console.log('Response data: ' + response.text());
        return response.json() as Project[];
      })
      .catch(this.handleError)
  }

  update(project: Project): Promise<Project> {
    const url = `${this.projectsUrl}${project.id}`;
    const headers = new Headers({ 'Content-Type': 'application/json' });

    return this.http
      .put(url,
      project
      // JSON.stringify(project)
      /*JSON.stringify({
         format: project.format,
         id: project.id,
         name: project.name,
         personId: project.personId,
         type: project.type,
         sourceLocale: project.sourceLocale
       })*/
      ,
      { headers: headers })
      .toPromise()
      .then(response => {
        console.log('Response from update: ' + response.text());
        return response.json() as Project[];
      })
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.projectsUrl}${id}`;
    const headers = new Headers({ 'Content-Type': 'application/json' });

    return this.http.delete(url, { headers: headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  // http://www.concretepage.com/angular-2/angular-2-http-post-example#post
  create(project: Project): Promise<Project> {
    // const url = `${this.projectsUrl}/0`;
    const headers = new Headers({ 'Content-Type': 'application/json' });

    return this.http
      .post(this.projectsUrl,
      // JSON.stringify(project),
      project,
      { headers: headers })
      .toPromise()
      .then(response => {
        console.log('Response from create: ' + response.text());
        return response.json() as Project[];
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred: ', error.text());
    return Promise.reject(error);
  }
}

