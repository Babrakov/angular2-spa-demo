import {Injectable, Inject} from "@angular/core";
import {LocalStorageService} from 'ng2-webstorage';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
//import {Observable} from "rxjs/Rx";
import {Product} from '../products/product.interface';
import 'rxjs/Rx';

@Injectable()
export class ProductsLocalService {

  constructor(
  	private storage:LocalStorageService,
  	private http:Http )
  {}

  private urlData = '/shared/productsData.json';

  firstLoad(): Promise<Product[]>{
  	let pList: Product[] = [];
	return this.http.get(this.urlData).map(
	  (resp:Response) => {
        console.log('I AM IN');
        let list = resp.json().data;
        for(let index in list){
          let p = list[index];
          pList.push(p);
        }
      	this.saveAllProducts(pList);   
        return pList;
      }).toPromise()
  }  	

  saveAllProducts(products: Product[]){
  	this.storage.store('allProducts',products);
  	console.log('products',products);
  	console.log('SAVE PRODUCTS',this.storage.retrieve('allProducts'));
  }

  getMaxId(){
  	let products = this.getAllProducts();
  	console.log('products',products);
  	let maxId = Math.max.apply(Math,  
  		products.map(
  		function(product) {
  			console.log('Map',product);
  			return product.id;
  		})
  	);
  	console.log('maxId',maxId);
  	return maxId;
  }

  addProduct(product: Product) {
  	let products = this.getAllProducts();
  	product.price = this.fixInputPrice(product.price); 
  	products.push(product);
  	this.saveAllProducts(products);
  }

  fixInputPrice(price) {
  	return price * 100;
  }

  updateProduct(product: Product) {
  	let products = this.getAllProducts();
  	for (var i in products) {
      if (products[i].id == product.id) {
      	product.price = this.fixInputPrice(product.price); 
        products[i] = product;
        break; 
      }
    }
  	this.saveAllProducts(products);
  }
  
  getAllProducts(){
  	return this.storage.retrieve('allProducts');
  }
  
  getProduct(id) {
  	let products = this.getAllProducts();
  	//let obj = products.find( product => { product.id === id } );
  	for (var i in products) {
      if (products[i].id == id) {
      	console.log("OBJ",products[i]);
      	return products[i];
      }
    }
    return;
  }

  deleteProduct(id){
  	let pList: Product[]  = [];
  	let products = this.getAllProducts();
  	//products = products.filter(obj => { obj.id !== id });
  	for(let index in products){
          let p = products[index];
          if (p.id !== id) pList.push(p);
        }
	//console.log('FILTER',this.pList);
	this.saveAllProducts(pList);
  }

  defaultProduct(){
  	return new Product(0,'a1111','The name',1000,'Description','2017-01-19 12:01:02'); 
  }
}