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

  { path: 'projectdetail',   component: ProjectDetailComponent },
  { path: 'projectdetail/:id',   component: ProjectDetailComponent },
  { path: 'projectsearch',   component: ProjectSearchComponent },
  { path: 'projectlist',   component: ProjectListComponent },
  { path: 'projectsmain',   component: ProjectsmainComponent },
  { path: 'projectsmain/:id', component: ProjectsmainComponent },
  { path: 'projects',   component: ProjectsComponent },
  { path: 'search', component: ProjectsComponent },

  { path: 'unitscomponent', component: UnitsComponent},
  { path: 'unitslist', component: UnitListComponent},
  { path: 'unitsdetail', component: UnitDetailComponent},
  { path: 'units', component: ProjectsComponent},

  { path: 'workscomponent', component: WorksComponent},
  { path: 'workslist', component: WorkListComponent},
  { path: 'worksdetail', component: WorkDetailComponent},
  { path: 'works', component: ProjectsComponent}
];

@NgModule({
  imports: [ CommonModule,  RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
