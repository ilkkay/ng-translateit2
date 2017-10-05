import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { UnitDetailComponent } from './unit-detail/unit-detail.component';
import { UnitListComponent } from './unit-list/unit-list.component';
import { UnitsComponent } from './units.component';
import { ProjectsComponent } from '../projects/projects.component';

const routes: Routes = [
  { path: 'unitscomponent', component: UnitsComponent},
  { path: 'unitslist', component: UnitListComponent},
  { path: 'unitsdetail', component: UnitDetailComponent},
  { path: 'units', component: ProjectsComponent}
];

@NgModule({
  imports: [ CommonModule,  RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class UnitsRoutingModule { }
