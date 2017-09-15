import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule, VERSION } from '@angular/core';

import { AppComponent } from './app.component';

import { ProjectsComponent } from './projects/projects.component';
import { ErrorMessageComponent } from './shared/error-message/error-message.component';

import { ProjectsModule } from './projects/projects.module';
import { ProjectsRoutingModule } from './projects/projects-routing.module';
import { WorksModule } from './works/works.module';
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
    ProjectsRoutingModule,
    WorksModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule { }
