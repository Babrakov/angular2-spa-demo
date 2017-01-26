	

	addProduct (name: string) {
	    if (!name) { return; }
	    this.ps.addProduct(name)
	                   .then(
	                     product  => this.heroes.push(product),
	                     error =>  this.errorMessage = <any>error
	                   );
	    console.log(this.heroes);
	}	
	getProducts() {
	    this.ps.getProducts()
	                     .then(
	                       products => this.heroes = products,
	                       error =>  this.errorMessage = <any>error
	                    );
	    console.log(this.heroes);
	}
