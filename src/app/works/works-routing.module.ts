import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { WorksComponent } from '../works/works.component';
import { WorkDetailComponent } from './work-detail/work-detail.component';
import { WorkListComponent } from './work-list/work-list.component';

import { ProjectsComponent } from '../projects/projects.component';

const routes: Routes = [
  { path: 'workscomponent', component: WorksComponent},
  { path: 'workslist', component: WorkListComponent},
  { path: 'worksdetail', component: WorkDetailComponent},
  { path: 'works', component: ProjectsComponent}
];

@NgModule({
  imports: [ CommonModule,  RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class WorksRoutingModule { }
