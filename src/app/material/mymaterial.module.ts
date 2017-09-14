import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdDialogModule, MdButtonModule } from '@angular/material';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';

// import { MyTestDialogComponent } from './my-test-dialog.component';

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
    BrowserModule,
    BrowserAnimationsModule,
    MdDialogModule, MdButtonModule
  ],
  exports: [MdDialogModule, MdButtonModule, ConfirmDeleteComponent,
    /* MyTestDialogComponent */],
  declarations: [ConfirmDeleteComponent,
    /* MyTestDialogComponent */],
  entryComponents: [ConfirmDeleteComponent],
})
export class MyMaterialModule { }
