import {Component, Input} from '@angular/core';
import {ProductsLocalService} from "../services/products-local";
import { Ng2StateDeclaration,UIRouter} from "ui-router-ng2";
/**
 * This component receives `productsDetail` resolve data into the `productsDetail` input, then renders the detail
 * It has a link back to the parent state, which is `app.products`
 */
let template = `
<h5>Products Details</h5>
<a uiSref="^">Back to list</a> <br>
<div class="media">  
  <img class="pull-left" src="http://placehold.it/400x250" alt="" />
  <div class="media-body">
    <h2 class="media-heading">{{productsDetail.name}}</h2>
    <p class="price">\${{productsDetail.price/100}}</p>
    <p>{{productsDetail.description}}</p>
    <p>{{productsDetail.created}}</p>
    <p><a class="btn btn-success">Add to cart</a></p>
    <p><a uiSref="app.products.details.form" class="btn btn-warning">Edit product</a></p>
    <p><button (click)="callDeleteProduct($event,productsDetail.id)" class="btn btn-warning">Delete product</button></p>
  </div>
</div>
`;

@Component({
  selector: 'products-detail',
  template: template,
  styles: ['.price {font-size:200%;font-style:italic};'],
  inputs: ["productsDetail"], 
  providers: [ ProductsLocalService ], 
})
export class ProductsDetailsComponent {
	constructor(
    public store: ProductsLocalService,
    private router: UIRouter){};
  
  productsDetail;

	// check && validate
	callDeleteProduct(event,id) { 
	  if (confirm('Are you sure? '+id)) {
      this.store.deleteProduct(id); 	  
      this.router.stateService.go('app.products', {}, {reload: true} ); 
    }
	  event.stopPropagation();
	}
}
