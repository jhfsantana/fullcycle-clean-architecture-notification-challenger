import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product";


const product1 = ProductFactory.create("a", "Camisa", 30);
const product2 = ProductFactory.create("a", "Bermuda", 90);

const MockRepository = () => {

    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe('unit test product list use case', () => {


    it('should return a list of products', async () => {


        const productRepository = MockRepository();
        const usecase = new ListProductUseCase(productRepository);

        const products = await usecase.execute({});

        expect(products.products.length).toBe(2);
        expect(products.products[0].id).toEqual(product1.id);
        expect(products.products[0].name).toEqual(product1.name);
        expect(products.products[0].price).toEqual(product1.price);
        expect(products.products[1].id).toEqual(product2.id);
        expect(products.products[1].name).toEqual(product2.name);
        expect(products.products[1].price).toEqual(product2.price);
    });
});