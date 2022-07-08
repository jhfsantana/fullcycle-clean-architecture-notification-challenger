import ProductFactory from "../../../domain/product/factory/product.factory"
import FindProductUseCase from "./find.product";

const productFactory = ProductFactory.create("a", "Camiseta", 30);

const input = {
    id: productFactory.id
}

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(productFactory)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe('Product unit test use cases', () => {


    it('should find a product', async () => {

        const productRepository = MockRepository();

        const usecase = new FindProductUseCase(productRepository);

        const product = await usecase.execute(input);

        expect(product.id).toEqual(productFactory.id);
        expect(product.name).toEqual(productFactory.name);
        expect(product.price).toEqual(productFactory.price);

    });

    it('should throw error when product no found', async () => {

        const productRepository = MockRepository();

        productRepository.find.mockImplementation(() => {
            throw new Error(`Product ${input.id} not found`);
        })
        const usecase = new FindProductUseCase(productRepository);

        expect(async () => {
            await usecase.execute(input);
        }).rejects.toThrow(`Product ${input.id} not found`);

    });

});