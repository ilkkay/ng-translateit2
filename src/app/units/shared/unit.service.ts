import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Subject, BehaviorSubject, Observable } from 'rxjs/Rx';

import { Unit } from '../shared/unit';
import { MessageInterface } from '../../shared/message-interface';
import { StateInterface } from '../../shared/state-interface';
import { ErrorMessageService } from '../../shared/error-message.service';
import { ContainerStateService } from '../../shared/container-state.service';
import { AppconfigService } from '../../shared/appconfig.service';

import { Work } from '../../works/shared/work';

@Injectable()
export class UnitService {

  //  workUrl = urls.WORK_SERVICE_API + workId + '/units?' + 'pageNum=' + pageNum + '&pageSize=' + pageSize;
  //  "/work/{workId}/units", method = RequestMethod.GET)
  private worksUrl = 'http://localhost:8080/api/work/'; // api/projects/';
  private projectsUrl = 'http://localhost:8080/api/project/';
  private unitsUrl = 'http://localhost:8080/api/work/unit/';

  private _pageNum = 1;
  private _pageSize = 4;
  private _pageCount = 0;

  private _messageService: MessageInterface;
  private _uiStateService: StateInterface;

  private _unitData: Subject<Unit[]> = new Subject<Unit[]>(); // new BehaviorSubject<Unit[]>([]);
  private _downloadPath: Subject<string> = new Subject<string>(); // new BehaviorSubject<string>('');

  constructor(
    private _http: Http,
    private _appConfig: AppconfigService
  ) { }

  registerService(arg: MessageInterface | StateInterface) {
    if (this._isErrorMessageService(arg)) {
      this._messageService = arg;
    } else if (this._isContainerStateService(arg)) {
      this._uiStateService = arg;
    } else { throw new Error('No such service'); }
  }

  setUnitsSubject(units: Unit[]) { this._unitData.next(units); }
  getUnitsObservable() { return this._unitData.asObservable(); }

  setDownloadPathSubject(path: string) { this._downloadPath.next(path); }
  getDownloadPathObservable() { return this._downloadPath.asObservable(); }

  refreshData(workId: number) {
    this._getUnits(workId);
  }

  getFirstPage(workId: number) {
    this._pageNum = 1;
    console.log('Getting first page number ' + this._pageNum);

    this._getUnits(workId);
  }

  getLastPage(workId: number) {
    this._pageNum = this._pageCount;

    console.log('Getting last page number ' + this._pageNum);
    this._getUnits(workId);
  }

  getNextPage(workId: number) {
    this._pageNum = this._pageNum + 1;
    if (this._pageNum > this._pageCount) { this._pageNum = this._pageCount; }

    console.log('Getting page number ' + this._pageNum);
    this._getUnits(workId);
  }

  getPreviousPage(workId: number) {
    this._pageNum = this._pageNum - 1;
    if (this._pageNum < 1) { this._pageNum = 1; }
    console.log('Setting page number ' + this._pageNum);

    console.log('Getting page number ' + this._pageNum);
    this._getUnits(workId);
  }

  update(unit: Unit): Promise<Unit> {
    // TODO: => /units/{id} vai /unit
    // @RequestMapping(value = "/work/unit/{id}", method = RequestMethod.PUT)
    const url = `${this.unitsUrl}${unit.id}`;
    const headers = new Headers({ 'Content-Type': 'application/json' });

    return this._http
      .put(url,
      unit,
      { headers: headers })
      .toPromise()
      .then(response => {
        console.log('Response from update: ' + response.text());
        this._messageService.clearMessages();
        return response.json() as Unit;
      })
      .catch(error => this._messageService.sendErrorMessage(error));
  }

  getUnit(id: number): Promise<Unit> {
    //  @RequestMapping(value = "/work/unit/{id}", method = RequestMethod.GET)
    const url = `${this.unitsUrl}${id}`;
    return this._http.get(url)
      .toPromise()
      .then(response => {
        console.log('Response data: ' + response.text());
        // this._messageService.clearMessages();

        const receivedUnit = response.json() as Unit;
        // this._getUnits(receivedUnit.workId);
        return receivedUnit;
      })
      .catch(error => {
        console.log('Error from getUnit: ');
        this._messageService.sendErrorMessage(error);
      });
  }

  _getUnits(workId: number): void {
    console.log('Entering UnitService.getUnits()');
    const url = `${this.worksUrl}${workId}` + '/units?'
      + 'pageNum=' + this._pageNum + '&pageSize=' + this._pageSize;

    this._http
      .get(url)
      .map((res: any) => res.json())
      .subscribe((viewUnits: any) => {
        console.log('_getUnits().subscribe(viewUnits)');
        console.log(JSON.stringify(viewUnits));

        this._pageCount = viewUnits.pageCount;
        this.setUnitsSubject(viewUnits.units);

        // if ((isNaN((viewProjects.projects as Project[]).length)) ||
        //    ((viewProjects.projects as Project[])).length === 0)  {
        //  this._uiStateService.showDetail();
        //    }
      },
      (err: any) => this._messageService.sendErrorMessage(err),
      () => console.log('_getWorks(): always')
      );
  }

  download(workId: number) {
    console.log('Starting to create download path for id: ' + workId);

    const downloadUrl = this.worksUrl + workId + '/downloadUrl';
    this._http.get(downloadUrl)
      .map((res: any) => res.json())
      .subscribe((data: any) => {
        const downloadPath: string = data.scheme + '://' + data.host + ':' + data.port + data.path;
        this.setDownloadPathSubject(downloadPath);
        console.log('Created successfully download path: ' + downloadPath);
        this._messageService.clearMessages();
      });
  }

  upload(formData: FormData, workId: number): Promise<Work> {
    const headers = new Headers();
    // No need to include Content-Type in Angular 4
    // headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    const options = new RequestOptions({ headers: headers });
    const uploadUrl = this.worksUrl + workId + '/targetFile';

    return this._http.post(uploadUrl, formData, options)
      .toPromise()
      .then((response) => {
        console.log('Response from upload: ' + response.text());
        this._messageService.clearMessages();
        return response.json() as Work;
      })
      .catch(error => {
        console.log(JSON.stringify(error));
        console.log('Failed to upload');
        this._messageService.sendErrorMessage(error);
      });
  }

  private _isErrorMessageService(arg: any): arg is ErrorMessageService {
    return arg.clearMessages !== undefined;
  }

  private _isContainerStateService(arg: any): arg is ContainerStateService {
    return arg.showDetail !== undefined;
  }
}
