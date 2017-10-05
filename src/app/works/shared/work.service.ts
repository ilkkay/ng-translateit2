import { Injectable } from '@angular/core';

import { Headers, Http, RequestOptions } from '@angular/http';
import { Subject, BehaviorSubject, Observable } from 'rxjs/Rx';

import { Work } from '../shared/work'
import { MessageInterface } from '../../shared/message-interface'
import { StateInterface } from '../../shared/state-interface'
import { ErrorMessageService } from '../../shared/error-message.service'
import { ContainerStateService } from '../../shared/container-state.service'

@Injectable()
export class WorkService {

  private worksUrl = 'http://localhost:8080/api/work/'; // api/projects/';
  private projectsUrl = 'http://localhost:8080/api/project/'

    private _messageService: MessageInterface;
    private _uiStateService: StateInterface;
  private _workData: Subject<Work[]> = new BehaviorSubject<Work[]>([]);

  constructor(
    private _http: Http,
    ) { }

  registerService(arg: MessageInterface | StateInterface) {
    if (this._isErrorMessageService(arg)) { this._messageService = arg;
    } else if (this._isContainerStateService(arg)) { this._uiStateService = arg;
    } else { throw new Error('No such service'); }
  }

  setWorksSubject(works: Work[]) { this._workData.next(works); }
  getWorksObservable() { return this._workData.asObservable(); }

  getWork(id: number): Promise<Work> {
    const url = `${this.worksUrl}${id}`;
    return this._http.get(url)
      .toPromise()
      .then(response => {
        console.log('Response data: ' + response.text());
        this._messageService.clearMessages();
        return response.json() as Work;
      })
      .catch(error => {
        console.log('Error from getWork: ');
        this._messageService.sendErrorMessage(error);
      });
  }

  upload(formData: FormData, workId: number): Promise<Work> {
    const headers = new Headers();
    // No need to include Content-Type in Angular 4
    // headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    const options = new RequestOptions({ headers: headers });
    const uploadUrl = this.worksUrl + workId + '/sourceFile';

    return this._http.post(uploadUrl, formData, options)
      .toPromise()
      .then((response) => {
        console.log('Response from create: ' + response.text());
        this._messageService.clearMessages();
        return response.json() as Work;
      })
      .catch(error => {
        console.log(JSON.stringify(error));
        console.log('Failed to upload');
        this._messageService.sendErrorMessage(error);
      });
  }

  create(work: Work): Promise<Work> {
    const headers = new Headers({ 'Content-Type': 'application/json' });

    return this._http
      .post(this.worksUrl,
      work,
      { headers: headers })
      .toPromise()
      .then(response => {
        console.log('Response from create: ' + response.text());
        this._messageService.sendSuccessMessage('A new work was added successfully');
        return response.json() as Work;
      })
      .catch(error => {
        console.log('Error from create: ');
        return this._messageService.sendErrorMessage(error);
      });
  }

  update(work: Work): Promise<Work> {
    const url = `${this.worksUrl}${work.id}`;
    const headers = new Headers({ 'Content-Type': 'application/json' });

    return this._http
      .put(url,
      work,
      { headers: headers })
      .toPromise()
      .then(response => {
        console.log('Response from update: ' + response.text());
        this._messageService.sendSuccessMessage('Update was succesfull');
        return response.json() as Work;
      })
      .catch(error => {
        console.log('Error from update: ');
        return this._messageService.sendErrorMessage(error);
      });
  }

  delete(id: number): Promise<void> {
    const url = `${this.worksUrl}${id}`;
    const headers = new Headers({ 'Content-Type': 'application/json' });

    return this._http.delete(url, { headers: headers })
      .toPromise()
      .then(() => {
        this._messageService.clearMessages() } /*  */
      )
      .catch(error => {
        this._messageService.sendErrorMessage(error) } /*  */
      );
  }

refreshData(projectId: number) {
  this._getWorks(projectId);
}

  _getWorks(projectId: number): void {
    console.log('Entering WorksService.getWorks()');
    const url = `${this.projectsUrl}${projectId}` + '/work/';

    this._http
      .get(url)
      .map((res: any) => res.json())
      .subscribe((viewWorks: any) => {
        console.log('_getWorks().subscribe(viewWorks)');
        console.log(JSON.stringify(viewWorks));

        this.setWorksSubject(viewWorks.works);

        /* if ((isNaN((viewProjects.projects as Project[]).length)) ||
            ((viewProjects.projects as Project[])).length === 0)  {
          this._uiStateService.showDetail();
            } */
      },
      (err: any) => this._messageService.sendErrorMessage(err),
      () => console.log('_getWorks(): always')
      )
  }

  private _isErrorMessageService(arg: any): arg is ErrorMessageService {
    return arg.clearMessages !== undefined; }

  private _isContainerStateService(arg: any): arg is ContainerStateService {
    return arg.showDetail !== undefined; }
}
