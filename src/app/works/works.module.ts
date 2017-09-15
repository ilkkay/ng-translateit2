import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorksRoutingModule } from './works-routing.module';
import { WorkDetailComponent } from './work-detail/work-detail.component';
import { WorkListComponent } from './work-list/work-list.component';
import { WorksComponent } from './works.component';

@NgModule({
  imports: [
    CommonModule,
    WorksRoutingModule
  ],
  declarations: [WorkDetailComponent, WorkListComponent, WorksComponent],
  exports: [WorkDetailComponent, WorkListComponent, WorksComponent]
})
export class WorksModule { }
