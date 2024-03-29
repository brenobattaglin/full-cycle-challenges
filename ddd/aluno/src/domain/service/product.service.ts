import Product from "../entity/product";

export default class ProductService {
  static increasePrices(products: Product[], percentage: number): void {
    products.forEach((product) => {
      const newPrice = (product.price * percentage) / 100 + product.price;
      product.changePrice(newPrice);
    });
  }
}
