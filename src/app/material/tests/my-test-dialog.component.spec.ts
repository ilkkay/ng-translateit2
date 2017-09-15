import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdDialogModule} from '@angular/material';

import { MyTestDialogComponent } from './my-test-dialog.component';

fdescribe('MyTestDialogComponent', () => {
  let fixture: ComponentFixture<MyTestDialogComponent>;
  let component: MyTestDialogComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ ],
      declarations: [ MyTestDialogComponent],
      imports: [
        MdDialogModule,
      ]
    });
    fixture = TestBed.createComponent(MyTestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(fixture).toBeTruthy();
  });
});
