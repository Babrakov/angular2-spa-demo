import {UIRouterModule} from "ui-router-ng2";
import {SharedModule} from "../shared.module";
import {PRODUCTS_STATES} from "./products.states";
import {NgModule,OnInit} from "@angular/core";
import {ProductsListComponent} from "./productsList.component";
import {ProductsDetailsComponent} from "./productsDetail.component";
import {ProductsDetailsFormComponent} from "./productsDetailForm.component";
import {ProductsFooterComponent} from "./productsFooter.component";
//import {ProductsService} from "../services/products";
import {ProductsLocalService} from "../services/products-local";
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {Ng2Webstorage,LocalStorageService} from 'ng2-webstorage';
import {Product} from '../products/product.interface';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
//import 'rxjs/Rx';

/** The Products NgModule. */
@NgModule({
  imports: [
    SharedModule, 
    FormsModule,ReactiveFormsModule, 
    UIRouterModule.forChild({ states: PRODUCTS_STATES })
  ],
  providers: [ProductsLocalService],
  declarations: [
    ProductsListComponent,
    ProductsDetailsComponent,
    ProductsDetailsFormComponent,
    ProductsFooterComponent,
  ]
})
export class ProductsModule {
  constructor(private store: ProductsLocalService) {
    this.store.firstLoad();
  }
}
