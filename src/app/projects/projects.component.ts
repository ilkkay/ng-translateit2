import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { ProjectListComponent } from './project-list/project-list.component';

// https://stackoverflow.com/questions/36527605/how-to-style-child-components-from-parent-components-css-file
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, AfterViewInit {

  @ViewChild(ProjectListComponent)
  private projectListComponent: ProjectListComponent;

  listTitle: string;
  detailTitle: String;
  successMessage = '';
  errorMessage = '';

  constructor() { }

  ngOnInit() {
    this.detailTitle = 'Detail title';
    this.listTitle = 'List title';
  }

  ngAfterViewInit() {
    setTimeout(0);
  }

  onDetailTitleChanged(event): void {
    this.detailTitle = event;
    this.errorMessage = event;
    this.projectListComponent.getProjects();
  }

  onListTitleChanged(event): void {
    this.listTitle = event;
    this.successMessage = event;
    this.projectListComponent.getProjects();
  }
}
