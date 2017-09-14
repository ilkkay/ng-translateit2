import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';

import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ErrorMessageComponent } from '../shared/error-message/error-message.component';

// https://stackoverflow.com/questions/36527605/how-to-style-child-components-from-parent-components-css-file
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, AfterViewInit {

  viewsMap = {
    '/projects': 'Project',
    '/works': 'Work',
    '/units': 'Unit'
  }

  @ViewChild(ProjectListComponent)
  private projectListComponent: ProjectListComponent;
  @ViewChild(ErrorMessageComponent)
  private errorMessageComponent: ErrorMessageComponent;

  private isDetailHidden = true;
  private listTitle: string;
  private detailTitle: string;

  private currentView: any;

  constructor(private location: Location) { }

  ngOnInit() {
    this.detailTitle = 'Detail title';
    this.listTitle = 'List title';
    this.currentView = this.viewsMap[this.location.path()];
  }

  ngAfterViewInit() {
    setTimeout(0);
  }

  onDetailTitleChanged(event): void {
    this.detailTitle = event;
  }

  onListTitleChanged(event): void {
    this.listTitle = event;
  }

  OnEditClicked(event): void {
    this.isDetailHidden = false;
  }

  OnErrorMessage(event): void {
    this.errorMessageComponent.setErrorMessage(event);
  }

  OnSuccessMessage(event): void {
    this.errorMessageComponent.setSuccessMessage(event);
  }

  OnProjectChanged(event: any): void {
    this.isDetailHidden = event.isDetailHidden;
    this.projectListComponent.getProjects();
  }
}
