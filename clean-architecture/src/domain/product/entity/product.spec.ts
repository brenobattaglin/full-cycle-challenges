import Product from "./product";

describe("Product unit test", () => {
    it('should throw error when id is empty', () => {
        expect(() => {
            const product = new Product('', 'Product 1', 100);
        }).toThrow('product: Id is required');
    });

    it('should throw error when name is empty', () => {
        expect(() => {
            const product = new Product('123', '', 100);
        }).toThrow('Name is required');
    });

    it("should throw error when name and id are empty", () => {
        expect(() => {
            const product = new Product('', '', 100);
        }).toThrow("product: Id is required, product: Name is required");
    });

    it("should throw error when name and price are empty", () => {
        expect(() => {
            const product = new Product('123', '', 0);
        }).toThrow("product: Name is required, product: Price must be greater than 0");
    });

    it('should throw error when price is empty', () => {
        expect(() => {
            const product = new Product('123', 'Product 1', 0);
        }).toThrow('Price must be greater than 0');
    });

    it('should change name', () => {
        const product = new Product('123', 'Product 1', 100);
        product.changeName('Product 2');
        expect(product.name).toBe('Product 2');
    });

    it('should change price', () => {
        const product = new Product('123', 'Product 1', 100);
        product.changePrice(200);
        expect(product.price).toBe(200);
    });
});