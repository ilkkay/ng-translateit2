import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdDialogModule, MdButtonModule, MdTooltipModule,
    MdMenuModule,
    MdIconModule,
    MdCardModule } from '@angular/material';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';

import { MyMaterialRoutingModule } from './my-material-routing.module';

import { MyTestDialogComponent } from './tests/my-test-dialog.component';
import { MyTestTooltipComponent} from './tests/my-test-tooltip.component';
import { MyTestMenuComponent } from './tests/my-test-menu.component';

// https://coursetro.com/posts/code/29/Working-with-Angular-2-Material
// https://medium.com/codingthesmartway-com-blog/angular-material-b1973e5a2ee6
// https://medium.com/codingthesmartway-com-blog/angular-material-part-2-popups-modals-1ed0c2405f18
// https://medium.com/codingthesmartway-com-blog/angular-material-part-3-navigation-menus-sidenavs-and-toolbars-49d9873fb54a

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
    MdMenuModule, MdIconModule, MdCardModule,
    // MyMaterialRoutingModule
  ],
  exports: [MdDialogModule, MdButtonModule, MdTooltipModule,
    MdMenuModule, MdIconModule, MdCardModule,
    ConfirmDeleteComponent,
    MyTestDialogComponent,  MyTestTooltipComponent, MyTestMenuComponent  ],

  declarations: [ConfirmDeleteComponent,
    MyTestDialogComponent,  MyTestTooltipComponent, MyTestMenuComponent  ],

  entryComponents: [ConfirmDeleteComponent],
})
export class MyMaterialModule { }
