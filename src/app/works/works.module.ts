import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkDetailComponent } from './work-detail/work-detail.component';
import { WorkListComponent } from './work-list/work-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [WorkDetailComponent, WorkListComponent]
})
export class WorksModule { }
