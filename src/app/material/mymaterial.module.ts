import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdDialogModule, MdButtonModule, MdTooltipModule } from '@angular/material';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';

import { MyMaterialRoutingModule } from './my-material-routing.module';

import { MyTestDialogComponent } from './tests/my-test-dialog.component';
import { MyTestTooltipComponent} from './tests/my-test-tooltip.component';

@Component({
  selector: 'app-confirm-delete',
  template: `
<h2 md-dialog-title>{{title}}</h2>
<md-dialog-content>{{content}}</md-dialog-content>
<md-dialog-actions>
  <button md-button md-dialog-close>No</button>
  <button md-button [md-dialog-close]="true">Yes</button>
</md-dialog-actions>
  `
})
export class ConfirmDeleteComponent {
  title: string;
  content: string;
  constructor(public dialogRef: MdDialogRef<any>) { }
}

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MdDialogModule, MdButtonModule, MdTooltipModule,
    MyMaterialRoutingModule
  ],
  exports: [MdDialogModule, MdButtonModule, MdTooltipModule,
    ConfirmDeleteComponent,
    MyTestDialogComponent,  MyTestTooltipComponent  ],

  declarations: [ConfirmDeleteComponent,
    MyTestDialogComponent,  MyTestTooltipComponent  ],

  entryComponents: [ConfirmDeleteComponent],
})
export class MyMaterialModule { }
