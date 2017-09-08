import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import 'rxjs/add/operator/switchMap';

import { Project } from '../shared/project';
import { ProjectService } from '../shared/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  @Output() onTitleChanged = new EventEmitter<string>();

  projects: Project[] = [];
  successMessage = '';
  errorMessage = '';

  constructor(
    private projectsService: ProjectService, // TODO:
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.getProjects();
  }

  getProjects(): Promise<any> {
    console.log('Entering getProjects(): ');
    return this.projectsService.getProjects().then(
      projects => {
        console.log('Project count: ' + projects.length);

        this.projects = projects;
        this.errorMessage = '';
      }).catch(error => {
        this.errorMessage = this.getErrorMessages(error);
      });
  }

  private getErrorMessages(error: any): string {
    const obj = JSON.parse(error.text());
    const errorCode = obj['errorCode'];
    const errorMessage = obj['errorMessage'];
    const localizedErrorMessage = obj['localizedErrorMessage'];

    let msg = 'Error Code:' + errorCode + ' ';
    msg = msg + 'Message: ' + errorMessage[0] + ' ';
    msg = msg + 'Localized Message:' + localizedErrorMessage + ' ';

    return msg;
  };

  changeTitle(): void {
    this.onTitleChanged.emit('New title');
  }

}
