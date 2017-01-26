export class Product {
  constructor(
    public id: number,
    public sku: string,
    public name: string,
    public price: number,
    public description: string,
    public created: string,
  ) {  }
}