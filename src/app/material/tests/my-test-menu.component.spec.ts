import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTestMenuComponent } from './my-test-menu.component';

describe('MyTestMenuComponent', () => {
  let component: MyTestMenuComponent;
  let fixture: ComponentFixture<MyTestMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTestMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTestMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
