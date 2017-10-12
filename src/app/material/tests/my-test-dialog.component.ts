import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';

import { ConfirmDeleteComponent } from '../mymaterial.module';

// https://plnkr.co/edit/n185tQbEHg1xGlNCAdxQ?p=preview
// https://embed.plnkr.co/a9RBS1/
// http://embed.plnkr.co/eBQNsfV7jTys4THqfT77/
// https://material.angular.io/components/dialog/overview

@Component({
  selector: 'app-my-test-dialog',
  templateUrl: './my-test-dialog.component.html',
  styleUrls: ['./my-test-dialog.component.css']
})

// testing: https://plnkr.co/edit/zo3B0p6gJeN0LTuPDPs4?p=preview
export class MyTestDialogComponent implements OnInit {

  dialogsMap = {
    'delete': ConfirmDeleteComponent
  };

  dialogRef: MdDialogRef<any>;

  constructor(
    public dialog: MdDialog
    /*, public viewContainerRef: ViewContainerRef*/) { }

  ngOnInit() {}

  openDialog(key) {
    this.dialogRef = this.dialog.open(this.dialogsMap[key]);
    this.dialogRef.componentInstance.title = 'Delete project';
    this.dialogRef.componentInstance.content = 'Please confirm. Deletion cannot be undone.';
    this.dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        console.log('Deleting all'); }
      this.dialogRef = null;
    });
  }
}
