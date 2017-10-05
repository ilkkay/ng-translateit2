import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { UnitsRoutingModule } from './units-routing.module';
import { UnitDetailComponent } from './unit-detail/unit-detail.component';
import { UnitListComponent } from './unit-list/unit-list.component';
import { UnitsComponent } from './units.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    BrowserModule,
    ReactiveFormsModule, FormsModule,
    UnitsRoutingModule
  ],
  declarations: [UnitDetailComponent, UnitListComponent, UnitsComponent],
  exports: [UnitDetailComponent, UnitListComponent, UnitsComponent]
})

export class UnitsModule { }
