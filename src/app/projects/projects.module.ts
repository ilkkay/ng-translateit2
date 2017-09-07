import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectSearchComponent } from './project-search/project-search.component';
import { ProjectsmainComponent } from './projectsmain/projectsmain.component';
import { ProjectListComponent } from './project-list/project-list.component';

import { ProjectsRoutingModule } from './projects-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    ProjectsRoutingModule
  ],
  declarations: [
    ProjectDetailComponent,
    ProjectSearchComponent,
    ProjectsmainComponent,
    ProjectListComponent]
})
export class ProjectsModule { }
