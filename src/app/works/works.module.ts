import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { WorksRoutingModule } from './works-routing.module';
import { WorkDetailComponent } from './work-detail/work-detail.component';
import { WorkListComponent } from './work-list/work-list.component';
import { WorksComponent } from './works.component';
import { WorkService } from './shared/work.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    BrowserModule,
    ReactiveFormsModule, FormsModule,
    // WorksRoutingModule
  ],
  providers: [
    WorkService,
  ],
  declarations: [WorkDetailComponent, WorkListComponent, WorksComponent],
  exports: [WorkDetailComponent, WorkListComponent, WorksComponent]
})
export class WorksModule { }
