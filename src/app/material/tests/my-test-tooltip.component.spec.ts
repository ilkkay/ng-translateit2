import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTestTooltipComponent } from './my-test-tooltip.component';

describe('MyTestTooltipComponent', () => {
  let component: MyTestTooltipComponent;
  let fixture: ComponentFixture<MyTestTooltipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTestTooltipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTestTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
