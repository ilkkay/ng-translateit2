import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule, VERSION } from '@angular/core';

import { AppComponent } from './app.component';

import { ProjectsComponent } from './projects/projects.component';
import { ErrorMessageComponent } from './shared/error-message/error-message.component';
import { ErrorMessageService } from './shared/error-message.service';
import { ContainerStateService } from './shared/container-state.service';

import { ProjectsModule } from './projects/projects.module';
import { ProjectsRoutingModule } from './projects/projects-routing.module';
import { WorksModule } from './works/works.module';
import { UnitsModule } from './units/units.module';
import { MyMaterialModule } from './material/mymaterial.module';
import { AppRoutingModule} from './app-routing.module'

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    ErrorMessageComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    MyMaterialModule,
    ProjectsModule,
    // ProjectsRoutingModule,
    WorksModule,
    UnitsModule,

  ],
  providers: [ErrorMessageService, ContainerStateService],
  bootstrap: [AppComponent]
})


export class AppModule { }
