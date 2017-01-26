import {Component, Inject} from '@angular/core';

/**
 * This component injects "productsList" (resolve data)
 *
 * It creates a list of uiSref (links) to the products details
 *
 * It does not have a nested <ui-view> viewport because the nested app.products.details state
 * replaces this component with the ProductsDetailsComponent, using view targeting.
 */

let template = `
<h3>
	<a uiSref="app.products.add" class="btn btn-success pull-right">Add new product</a>
	Buy now or never!</h3>
<div class="row list-group">
  <div class="item grid-group-item col-xs-4 col-lg-4" *ngFor="let products of productss">
  	<div class="thumbnail">
  		<a uiSref=".details" [uiParams]="{productsId: products.id}">
  		    <img class="group list-group-image" src="http://placehold.it/400x250" alt="" />
  		</a>
  		<div class="caption">
            <h4 class="group inner list-group-item-heading">
                <a uiSref=".details" [uiParams]="{productsId: products.id}">{{products.name}}</a>
            </h4>
            <p class="group inner list-group-item-text">{{products.description}}</p>
            <div class="row">
                <div class="col-xs-12 col-md-6">
	                <p class="lead">\${{products.price/100}}</p>
	            </div>
	            <div class="col-xs-12 col-md-6">
	                <a class="btn btn-success">Add to cart</a>
	            </div>
            </div>
        </div>
    </div>
  </div>
</div>
`;

@Component({
  
  selector: 'products',
  template: template
})
export class ProductsListComponent {
  // resolve data injected by name 'productsList' into 'productss' property
  constructor(@Inject("productsList") public productss) {
  }
}
	