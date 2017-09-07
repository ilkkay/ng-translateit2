import { Observable } from 'rxjs/Rx';
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
  results: Project[];

  constructor(private http: Http ) { }

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

