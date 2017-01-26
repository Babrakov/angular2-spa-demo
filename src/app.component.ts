import {Component} from '@angular/core';

/**
 * The top level application component.
 *
 * This component renders three uiSref "links" and has a viewport for a child to fill in.
 */

let template = `

<h1>UI-Router Angular 2 App</h1>

<h5><a uiSref="app.products" [uiOptions]="{ inherit: false }" uiSrefActive="active">Products</a></h5>

<ui-view></ui-view>

<ui-view name="footer"></ui-view>
`;

@Component({
  selector: 'my-app',
  host: { 'class': 'container-fluid'} ,
  styles: [` :host { display: block; } `],
  template: template
})
export class AppComponent { }
