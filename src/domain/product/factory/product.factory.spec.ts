
import Product from "../entity/product";
import ProductInterface from "../entity/product.interface";
import ProductFactory from "./product.factory";

describe('Product Factory unit tests', () => {


    it('should create a product instance type A', () => {
        const product: ProductInterface = ProductFactory.create("a", "Celular", 5400);
        
        expect(product.name).toBe("Celular");
        expect(product.price).toBe(5400);
    });

    it('should create a product instance type B', () => {
        const product = ProductFactory.create("b", "Camisa", 54);
        
        expect(product.name).toBe("Camisa");
        expect(product.price).toBe(54);
    });

    it('should throw error when type is not supported', () => {        
        expect(() => {
            ProductFactory.create("123", "Camisa", 54);
        }).toThrowError("Product type not supported 123");
    });
});