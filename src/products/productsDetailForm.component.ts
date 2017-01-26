import { Component, Input, Output, OnInit, Directive,Injectable, Inject} from '@angular/core';
import { FormControl, AbstractControl, FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { Ng2StateDeclaration,UIRouter} from "ui-router-ng2";
import { Product } from './product.interface';
import { ProductsLocalService} from "../services/products-local";

/**
 * This component receives `productsDetail` resolve data into the `productsDetail` input, then renders the detail
 * It has a link back to the parent state, which is `app.products`
 */
let template = `
<h5>Products Detail Form</h5>
<a uiSref="^">Back</a> <br>
<h3>{{eventMessage}}</h3>
<form 
	(ngSubmit)="onSubmit(product)"
	class="ui form form-horizontal"
	novalidate>
	<div [formGroup]="product">
	    <div class="form-group">
	    	<label for="nameInput" class="control-label col-sm-3">Name</label>
	    	<div class="col-sm-8">
	    		<input 
	    		type="text" 
	    		id="nameInput" 
	    		placeholder="Name" 
	    		formControlName="name" 
	    		required 
	    		class="form-control" />
	    	</div>
	    	
	    </div>
	    <div [hidden]="product.get('name').valid" class="alert alert-danger">Не указано имя</div>
	    <div class="form-group">
	    	<label class="control-label col-sm-3" for="skuInput">SKU</label>
	    	<div class="col-sm-8">
	    		<input 
	    		type="text" 
	    		id="skuInput" 
	    		placeholder="SKU" 
	    		formControlName="sku"
	    		name="sku"
	    		required
	    		class="form-control" />
	    	</div>
	    </div>
	    <div [hidden]="product.get('sku').valid" class="alert alert-danger">Некорректный sku</div>
	 	<div class="form-group">
	 		<label class="control-label col-sm-3" for="priceInput">Price</label>
			<div class="col-sm-8">
	 			<input 
	 			type="text" 
	 			id="priceInput" 
	 			placeholder="10.01" 
	 			name="price"
	 			formControlName="price" 
	 			required  
	 			class="form-control" />
	 		</div>
	 		
	 	</div>
	 	<div [hidden]="product.get('price').valid" class="alert alert-danger">Укажите корректную цену</div>
	 	<div class="form-group">
	 		<label class="control-label col-sm-3" for="descInput">Description</label>
			<div class="col-sm-8">
	 			<input 
	 			type="text" 
	 			id="descInput" 
	 			placeholder="Description" 
	 			formControlName="description" 
	 			class="form-control" />
	 		</div>
	 	</div>
	 	<div class="form-group">
	 		<div class="col-sm-offset-3 col-sm-8">
	    		<button type="submit" class="btn btn-default">Save</button>  
	    	</div>
	    </div>
	</div>
</form>
`;
@Component({
  selector: 'products-detail',
  template: template,
  styles: ['form {max-width:600px;padding:40px 20px;}; '], 
  inputs: ["productsDetail"],  
  providers: [ProductsLocalService]
})
export class ProductsDetailsFormComponent implements OnInit {
  
  product: FormGroup;
  eventMessage = '';
  productsDetail;
 
  constructor(
  	private fb: FormBuilder,
  	private store: ProductsLocalService, 
  	private router: UIRouter) {}

  ngOnInit() {

    this.product = this.fb.group({
      name: [
      	this.productsDetail.name, [
      		Validators.required, 
      		Validators.minLength(2),
            Validators.maxLength(255),
      	]
      ],
      sku:  [
      	this.productsDetail.sku, [
      		Validators.required,
      		// my SKU validator
	      	(c: FormControl) => { 
	      		if (c.value === this.productsDetail.sku ) return null;
	      		else {
	      			let products = this.store.getAllProducts();
	      			if (products === null) return null;
	      			let found = products.findIndex( 
					  		function(product) {
					  			return (c.value === product.sku);
					  		});
	      			return (found > -1) ?  { valid: false } : null ;
	      		}
	      	}
      	]
      ],
      price: [
      	(this.productsDetail.price ? this.productsDetail.price/100 : '' ), [
      		Validators.required,
            Validators.pattern(/^\$?[\d,]+(\.\d*)?$/)
        ]
      ],
      description: [
        this.productsDetail.description
      ]
    });
  }
  onSubmit({ value, valid }: { value: Product, valid: boolean }) {
    
    console.log(value, valid);
    
    if (valid) {
    	if (this.productsDetail.id)	{

    		value.id = this.productsDetail.id;
    		this.store.updateProduct(value);
			this.router.stateService.go('app.products.details', {}, {reload: true} ); 
    		
    	}
    	else {
    		value.id = this.store.getMaxId() + 1;
    		this.store.addProduct(value);
    		this.router.stateService.go('app.products.details', {productsId: value.id}, {reload: true} );
    	}
    }
  }
}
