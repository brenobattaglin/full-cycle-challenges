import { v4 as uuid } from "uuid";
import ProductInterface from "../entity/product.interface";
import Product from "../entity/product";

export default class ProductFactory {
    public static create(name: string, price: number) {
        return new Product(uuid(), name, price);
    }
}