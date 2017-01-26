#Angular2 SPA demo

## Overview

This is a simple demo SPA on Angular 
based by quickstart-ng2
with demonstration of use:  
- UIRouter  
- FormControl and FormBilder
- Custom Form Validator
- Local Web Storage
- Http Promise loading

## Page structure

- /
- products list
- product item detail
- product item form edit/add

## Start

```
$ git clone https://github.com/selff/angular2-spa-demo.git
$ cd angular2-spa-demo
$ npm install
$ npm run tsc
$ npm start
```
## Screenshot

![GitHub Logo](/screenshot.png)

## Description

List of goods once loaded from a json-file and placed in local webstorage.
Page catalog displays all products.
Above the list there is a button-added products.
You can go to the product page and see details.
Each item can be edited or deleted.
When adding or editing product is checked input fields. 
The SKU field is checked for unique.
