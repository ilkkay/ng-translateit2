import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule, VERSION } from '@angular/core';

import { AppComponent } from './app.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectsModule } from './projects/projects.module';
import { ProjectsRoutingModule } from './projects/projects-routing.module';

import { ProjectDetailComponent } from './projects/project-detail/project-detail.component';
import { ProjectSearchComponent } from './projects/project-search/project-search.component';
import { ProjectsmainComponent } from './projects/projectsmain/projectsmain.component';
import { ProjectListComponent } from './projects/project-list/project-list.component';

import {parent} from '../parent';
import {child} from '../child';

@NgModule({
  declarations: [
    AppComponent,

    ProjectsComponent,

    //ProjectDetailComponent,
    //ProjectSearchComponent,
    //ProjectsmainComponent,
    //ProjectListComponent,

    parent,child ,
  ],
  imports: [
    BrowserModule,
    ProjectsModule,
    ProjectsRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule { }
