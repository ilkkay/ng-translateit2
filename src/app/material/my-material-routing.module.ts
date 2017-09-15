import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MyTestDialogComponent } from './my-test-dialog.component';

const routes: Routes = [
  { path: 'test-dialog', component: MyTestDialogComponent},
];

@NgModule({
  imports: [ CommonModule,  RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class MyMaterialRoutingModule { }
