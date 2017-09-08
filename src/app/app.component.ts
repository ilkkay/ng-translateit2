import { Component } from '@angular/core';
import { ProjectsComponent } from './projects/projects.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

/*
  template: `
    <div>
      <h2>Hello {{title}}</h2>
    </div>
    <hr>

<app-projects>
    <hr>
    <app-project-detail> </app-project-detail>
    <hr>
    <app-project-search> </app-project-search>
    <hr>
    <app-project-list> </app-project-list>
</app-projects>
 `,*/
})
export class AppComponent {
  title = 'app';
}
