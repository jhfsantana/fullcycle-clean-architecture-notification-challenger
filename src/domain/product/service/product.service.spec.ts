import Product from "../entity/product";
import ProductService from "./product.service";

describe('ProductService unit tests', () => {


    it('should increase all products price by percentage', () => {

        const product1 = new Product("1", "Product 1", 100);
        const product2 = new Product("2", "Product 2", 50);
        const product3 = new Product("3", "Product 3", 110);

        ProductService.increasePrice([product1, product2, product3], 100);

        expect(product1.price).toBe(200)
        expect(product2.price).toBe(100)
        expect(product3.price).toBe(220)
        
    });
});