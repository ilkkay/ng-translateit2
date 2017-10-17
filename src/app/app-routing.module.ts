import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ProjectDetailComponent } from './projects/project-detail/project-detail.component';
import { ProjectSearchComponent } from './projects/project-search/project-search.component';
import { ProjectsmainComponent } from './projects/projectsmain/projectsmain.component';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { ProjectsComponent } from './projects/projects.component';

import { UnitDetailComponent } from './units/unit-detail/unit-detail.component';
import { UnitListComponent } from './units/unit-list/unit-list.component';
import { UnitsComponent } from './units/units.component';

import { WorksComponent } from './works/works.component';
import { WorkDetailComponent } from './works/work-detail/work-detail.component';
import { WorkListComponent } from './works/work-list/work-list.component';

import { MyTestDialogComponent } from './material/tests/my-test-dialog.component';
import { MyTestTooltipComponent} from './material/tests/my-test-tooltip.component';
import { MyTestMenuComponent} from './material/tests/my-test-menu.component';

const routes: Routes = [
  { path: 'test-dialog', component: MyTestDialogComponent},
  { path: 'test-tooltip', component: MyTestTooltipComponent},
  { path: 'test-menu', component: MyTestMenuComponent},

  { path: 'projectdetail',   component: ProjectDetailComponent, data: { name: 'projects'}},
  { path: 'projectdetail/:id',   component: ProjectDetailComponent, data: { name: 'projects'}},
  { path: 'projectsearch',   component: ProjectSearchComponent, data: { name: 'projects'}},
  { path: 'projectlist',   component: ProjectListComponent, data: { name: 'projects'}},
  { path: 'projectsmain',   component: ProjectsmainComponent, data: { name: 'projects'}},
  { path: 'projectsmain/:id', component: ProjectsmainComponent, data: { name: 'projects'}},
  // { path: 'projects',   component: ProjectsComponent, data: { name: 'projects'}},
  { path: 'search', component: ProjectsComponent , data: { name: 'projects'}},

  { path: 'unitscomponent', component: UnitsComponent, data: { name: 'units'}},
  { path: 'unitslist', component: UnitListComponent, data: { name: 'units'}},
  { path: 'unitsdetail', component: UnitDetailComponent, data: { name: 'units'}},
  { path: 'units', component: ProjectsComponent, data: { name: 'units'}},

  { path: 'workscomponent', component: WorksComponent, data: { name: 'works'}},
  { path: 'workslist', component: WorkListComponent, data: { name: 'works'}},
  { path: 'worksdetail', component: WorkDetailComponent, data: { name: 'works'}},
  { path: 'works', component: ProjectsComponent, data: { name: 'works'}},

{ path: 'projects', redirectTo: '/projects/(list:projectlist)', pathMatch: 'full' },
{ path: 'myprojectdetail',   component: ProjectDetailComponent, outlet: 'detail'},

{
	  path: 'projects',
      component: ProjectsComponent,
      children: [
  { path: 'projectlist', component: ProjectListComponent, outlet: 'list'},
  { path: 'worklist', component: WorkListComponent, outlet: 'list'},
  { path: 'unitlist', component: UnitListComponent, outlet: 'list'},

  { path: 'myprojectdetail',   component: ProjectDetailComponent, outlet: 'detail'},
  { path: 'myworkdetail', component: WorkDetailComponent, outlet: 'detail'},
  { path: 'myunitdetail', component: UnitDetailComponent, outlet: 'detail'},
      ]
},

];

@NgModule({
  imports: [ CommonModule,  RouterModule.forRoot(routes,  { enableTracing: true }) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
