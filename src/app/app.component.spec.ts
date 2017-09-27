import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RouterOutletStubComponent, RouterLinkStubDirective } from './testing/router-stubs'
import { AppComponent } from './app.component';

fdescribe('AppComponent', () => {
  let links: any;
  let linkDes: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        RouterOutletStubComponent, RouterLinkStubDirective
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    const fixture = TestBed.createComponent(AppComponent);

    // trigger initial data binding
    fixture.detectChanges();

    // find DebugElements with an attached RouterLinkStubDirective
    linkDes = fixture.debugElement
      .queryAll(By.directive(RouterLinkStubDirective));

    // get the attached link directive instances using the DebugElement injectors
    links = linkDes
      .map(de => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!!');
  }));

  it('can get RouterLinks from template', () => {
    expect(links.length).toBe(14, 'should have 14 links');
    expect(links[0].linkParams).toBe('/projectsmain', '1st link should go to Projectsmain');
    expect(links[13].linkParams).toBe('/test-menu', 'last link should go to Test Menu');
  });

  it('can click Container link in template', () => {
    const fixture = TestBed.createComponent(AppComponent);

    const projectsLinkDe = linkDes[5];
    const projectsLink = links[5];

    expect(projectsLink.navigatedTo).toBeNull('link should not have navigated yet');

    projectsLinkDe.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(projectsLink.navigatedTo).toBe('/projects');
  });

});
