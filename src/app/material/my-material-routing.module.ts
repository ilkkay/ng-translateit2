import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MyTestDialogComponent } from './tests/my-test-dialog.component';
import { MyTestTooltipComponent} from './tests/my-test-tooltip.component';

const routes: Routes = [
  { path: 'test-dialog', component: MyTestDialogComponent},
  { path: 'test-tooltip', component: MyTestTooltipComponent},
];

@NgModule({
  imports: [ CommonModule,  RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class MyMaterialRoutingModule { }
