import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infra/db/sequelize/model/product.model";
import ProductSequelizeRepository from "../../../infra/repository/product.sequelize.repository";
import CreateProductUseCase from "./create.product";


const input = {
    name: 'Camiseta',
    price: 30
}

describe('Product Integration test create use cases', () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false,
        sync: { force: true },
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        input.name = 'Camiseta';
        input.price = 30;
        await sequelize.close();
    });

    it('should create a product', async () => {

        const productRepository = new ProductSequelizeRepository();

        const usecase = new CreateProductUseCase(productRepository);

        const product = await usecase.execute(input);

        const productCreated = await productRepository.find(product.id);

        expect(product.id).toBe(productCreated.id)
        expect(product.name).toBe(productCreated.name)
        expect(product.price).toBe(productCreated.price)

    });

    it('should throw error when name is missing', async () => {

        const productRepository = new ProductSequelizeRepository();

        const usecase = new CreateProductUseCase(productRepository);

        input.name = ''
        
        expect( async () => {
            await usecase.execute(input);
        }).rejects.toThrow('Name is required');

    });

    it('should throw error when price is negative', async () => {
        
        const productRepository = new ProductSequelizeRepository();

        const usecase = new CreateProductUseCase(productRepository);

        input.price = -100
        
        expect( async () => {
            await usecase.execute(input);
        }).rejects.toThrow('Price must be positive');
    });
});