import {Component, Input} from '@angular/core';

/** 
 * This component is shown in the footer when any products state is active.
 * It receives the `productsList` resolve data and displays the count of products objects loaded.
 */
@Component({
  selector: 'products-footer',
  styles: ['h4 { border-top: 2px solid black; margin-top: 1em; clear:left; }; '],
  template: `<h4>Products Module Active - {{ productsList.length }} products</h4>`
})
export class ProductsFooterComponent {
  @Input() productsList;
}
