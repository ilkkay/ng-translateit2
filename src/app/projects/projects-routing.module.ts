import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectSearchComponent } from './project-search/project-search.component';
import { ProjectsmainComponent } from './projectsmain/projectsmain.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectsComponent } from './projects.component';

const routes: Routes = [
  { path: 'projectdetail',   component: ProjectDetailComponent },
  { path: 'projectsearch',   component: ProjectSearchComponent },
  { path: 'projectlist',   component: ProjectListComponent },
  { path: 'projectsmain',   component: ProjectsmainComponent },
  { path: 'projectsmain/:id', component: ProjectsmainComponent },
  { path: 'projects',   component: ProjectsComponent },
];

@NgModule({
  imports: [ CommonModule,  RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class ProjectsRoutingModule { }
