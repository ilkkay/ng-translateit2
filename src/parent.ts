//our root app component
import {Component} from '@angular/core'

@Component({
  selector: 'parent',
  template: `
  <h2>Hello from parent</h2>
   <ng-content></ng-content>
   <h2>Hello from parent</h2>
`
})
export class parent{

}
