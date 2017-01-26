import {Injectable, Inject} from "@angular/core";
import {LocalStorageService} from 'ng2-webstorage';
import {Product} from '../products/product.interface';
import {Http, Response, Headers, RequestOptions} from "@angular/http";

@Injectable()
export class ProductsLocalService {
  private pList: Product[] = [];
  constructor(
  	private storage:LocalStorageService,
  	private http:Http)
  {}

  private urlData = '/shared/productsData.json';

  firstLoad(): Promise<Product[]>{
	return this.http.get(this.urlData).map(
	  (resp:Response) => {
        console.log('I AM IN');
        let list = resp.json().data;
        for(let index in list){
          let p = list[index];
          this.pList.push(p);
        }
      	this.saveAllProducts(this.pList);   
        return this.pList;
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
  	this.pList = [];
  	let products = this.getAllProducts();
  	//products = products.filter(obj => { obj.id !== id });
  	for(let index in products){
          let p = products[index];
          if (p.id !== id) this.pList.push(p);
        }
	//console.log('FILTER',this.pList);
	this.saveAllProducts(this.pList);
  }

  defaultProduct(){
  	return new Product(0,'a1111','The name',1000,'Description','2017-01-19 12:01:02'); 
  }
}