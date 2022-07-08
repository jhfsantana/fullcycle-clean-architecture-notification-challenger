import CreateProductUseCase from "./create.product";


const input = {
    name: 'Samsung Smart Tv 55"',
    price: 3500
}
const  MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe('integration test create product use cases', () => {

    afterEach(()=> {
        input.name = 'Samsung Smart Tv 55"';
        input.price = 3500;
    });

    it('should create a product', async () => {

        const productRepository = MockRepository();

        const usecase = new CreateProductUseCase(productRepository);

        const product = await usecase.execute(input);

        expect(product).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price

        })

    });

    it('should throw error when name is missing', async () => {

        const productRepository = MockRepository();

        const usecase = new CreateProductUseCase(productRepository);

        input.name = ''
        
        expect( async () => {
            await usecase.execute(input);
        }).rejects.toThrow('Name is required');

    });

    it('should throw error when price is negative', async () => {

        const productRepository = MockRepository();

        const usecase = new CreateProductUseCase(productRepository);

        input.price = -100
        
        expect( async () => {
            await usecase.execute(input);
        }).rejects.toThrow('Price must be positive');

    });
});