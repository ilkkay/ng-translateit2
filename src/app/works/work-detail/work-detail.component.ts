import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-work-detail',
  templateUrl: './work-detail.component.html',
  styleUrls: ['./work-detail.component.css']
})
export class WorkDetailComponent implements OnInit {

  priorities = [];

  workForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
  }

  registerFormControls(): void {
    this.workForm = this.formBuilder.group({
      deadline: [''],
      id: [],
      locale: ['', Validators.compose([Validators.required,
      Validators.pattern('[a-z]{2}_[a-zA-Z]{2}')])],
      sourceFile: [''],
      originalFile: [''],
      priority: [],
      version: [''],
    });
  }
}
