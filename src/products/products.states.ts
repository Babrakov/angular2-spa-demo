import {Ng2StateDeclaration, Transition} from "ui-router-ng2";
import {ProductsListComponent} from "./productsList.component";
import {ProductsDetailsComponent} from "./productsDetail.component";
import {ProductsDetailsFormComponent} from "./productsDetailForm.component";
import {ProductsFooterComponent} from "./productsFooter.component";
//import {ProductsService} from "../services/products";
import {ProductsLocalService} from "../services/products-local";

/**
 * This file defines the states for the `products` module.
 * The states are exported as an array and imported in the ProductsModule.
 */
export let PRODUCTS_STATES: Ng2StateDeclaration[] = [

  {
    name: 'app.products',
    url: '/products',
    views: {
      $default: { component: ProductsListComponent },
      footer: { component: ProductsFooterComponent }
    },
    resolve: [
      // Inject 'Http' and fetch all the products data
      {
        token: 'productsList',
        //deps: [ProductsService],
        //resolveFn: (productsService: ProductsService) => productsService.getAllProducts(),
        deps: [ProductsLocalService],
        resolveFn: (pl: ProductsLocalService) => pl.getAllProducts(),
      }
    ]
  },

  {
    name: 'app.products.details',
    url: '/:productsId',
    views: {
      '$default@app': { component: ProductsDetailsComponent }
    },    
    resolve: [
      // Inject the productsList (from the parent) and find the correct
      {
        token: 'productsDetail',
        //deps: ['productsList', Transition],
        //resolveFn: (productsList, trans) => productsList.find(item => item.id == trans.params().productsId)
        deps: [ProductsLocalService,Transition],
        resolveFn: (pl: ProductsLocalService, trans) => pl.getProduct( trans.params().productsId ),
      }
    ]
  },
  
  {
    name: 'app.products.details.form',
    url: '/edit',
    views: {
      '$default@app': { component: ProductsDetailsFormComponent }
    },    
    resolve: [
      // Inject the productsList (from the parent) and find the correct
      {
        token: 'productsDetail',
        //deps: ['productsList', Transition],
        //resolveFn: (productsList, trans) => productsList.find(item => item.id == trans.params().productsId)
        deps: [ProductsLocalService,Transition],
        resolveFn: (pl: ProductsLocalService, trans) => pl.getProduct( trans.params().productsId ),
      }
    ]
  },


  // A child state of app.products.add
  {
    name: 'app.products.add',
    url: '/add',
    views: {
      '$default@app': { component: ProductsDetailsFormComponent }
    },    
    resolve: [
      {
        token: 'productsDetail',
        //deps: [ProductsService],
        //resolveFn: (productsService: ProductsService) => productsService.defaultProduct(),
        deps: [ProductsLocalService],
        resolveFn: (pl: ProductsLocalService) => pl.defaultProduct(),
      }
    ]
  },


];


