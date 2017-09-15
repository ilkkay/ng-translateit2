import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTestDialogComponent } from './my-test-dialog.component';

describe('MyTestDialogComponent', () => {
  let component: MyTestDialogComponent;
  let fixture: ComponentFixture<MyTestDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTestDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
