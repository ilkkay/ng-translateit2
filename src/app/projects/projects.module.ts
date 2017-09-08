import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectSearchComponent } from './project-search/project-search.component';
import { ProjectsmainComponent } from './projectsmain/projectsmain.component';
import { ProjectsComponent } from './projects.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectsRoutingModule } from './projects-routing.module';

import { ProjectService } from './shared/project.service';
// import { AppconfigService } from '../shared/appconfig.service';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule, FormsModule,
    HttpModule,
    CommonModule,
    ProjectsRoutingModule
  ],
  exports: [
    ProjectDetailComponent,
    ProjectSearchComponent,
    ProjectListComponent],
  providers: [
    ProjectService,
    // AppconfigService
  ],
  declarations: [
    ProjectDetailComponent,
    ProjectSearchComponent,
    ProjectsmainComponent,
    ProjectListComponent]
})
export class ProjectsModule { }
