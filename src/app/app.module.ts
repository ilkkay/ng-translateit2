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
import { ErrorMessageComponent } from './shared/error-message/error-message.component';

import { MyMaterialModule } from './material/mymaterial.module';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    ErrorMessageComponent,
  ],
  imports: [
    BrowserModule,
    MyMaterialModule,
    ProjectsModule,
    ProjectsRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule { }
