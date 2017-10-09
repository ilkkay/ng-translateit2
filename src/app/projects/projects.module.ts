import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectSearchComponent } from './project-search/project-search.component';
import { ProjectsmainComponent } from './projectsmain/projectsmain.component';
import { ProjectsComponent } from './projects.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectsRoutingModule } from './projects-routing.module';

import { ProjectService } from './shared/project.service';
import { AppconfigService } from '../shared/appconfig.service';
import { ErrorMessageService } from '../shared/error-message.service';
import { ContainerStateService  } from '../shared/container-state.service';

import { MyMaterialModule } from '../material/mymaterial.module';

  @NgModule({
    imports: [
    CommonModule,
    // RouterModule,
    BrowserModule,
    ReactiveFormsModule, FormsModule,
    HttpModule,
    MyMaterialModule,
    ProjectsRoutingModule
  ],
  exports: [
    ProjectDetailComponent,
    ProjectSearchComponent,
    ProjectListComponent,
    ],
  providers: [
    ProjectService,
    AppconfigService,
    // ContainerStateService,
    // ErrorMessageService
  ],
  declarations: [
    ProjectDetailComponent,
    ProjectSearchComponent,
    ProjectsmainComponent,
    ProjectListComponent,
    ]
})
export class ProjectsModule { }
