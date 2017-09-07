import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectsModule } from './projects/projects.module';
import { ProjectsRoutingModule } from './projects/projects-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
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
