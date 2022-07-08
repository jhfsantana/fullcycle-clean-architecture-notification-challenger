import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory"
import ProductModel from "../../../infra/db/sequelize/model/product.model";
import ProductSequelizeRepository from "../../../infra/repository/product.sequelize.repository";
import UpdateProductUseCase from "./update.product";

describe('integration tests product update use cases', () => {

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
        await sequelize.close();
    });

    it('should update a product', async () => {

        const productFactory = ProductFactory.create("a", "Camiseta", 40);

        const input = {
            id: productFactory.id,
            name: 'Camiseta Azul',
            price: 39.99
        }

        const productRepository = new ProductSequelizeRepository();

        await productRepository.create(productFactory as Product);

        const usecase = new UpdateProductUseCase(productRepository);

        await usecase.execute(input);

        const productUpdated = await productRepository.find(input.id);

        expect(productUpdated.id).toEqual(input.id)
        expect(productUpdated.name).toEqual(input.name)
        expect(productUpdated.price).toEqual(input.price)
    });

    it('should throw error when product name is missing', async () => {

        const productFactory = ProductFactory.create("a", "Camiseta", 40);

        const input = {
            id: productFactory.id,
            name: '',
            price: 39.99
        }

        const productRepository = new ProductSequelizeRepository();

        await productRepository.create(productFactory as Product);

        const usecase = new UpdateProductUseCase(productRepository);

        await expect(usecase.execute(input)).rejects.toThrow(`product: Name is required`);
    });

    it('should throw error when price is negative', async () => {

        const productFactory = ProductFactory.create("a", "Camiseta", 40);

        const input = {
            id: productFactory.id,
            name: 'Camiseta',
            price: -30
        }

        const productRepository = new ProductSequelizeRepository();
    
        await productRepository.create(productFactory as Product);

        const usecase = new UpdateProductUseCase(productRepository);

        await expect(usecase.execute(input)).rejects.toThrow(`product: Price must be positive`);
    });

    it('should throw error when name is empty and price is negative', async () => {

        const productFactory = ProductFactory.create("a", "Camiseta", 40);

        const input = {
            id: productFactory.id,
            name: '',
            price: -30
        }

        const productRepository = new ProductSequelizeRepository();
    
        await productRepository.create(productFactory as Product);

        const usecase = new UpdateProductUseCase(productRepository);
        
        await expect(usecase.execute(input))
        .rejects
        .toThrow(`product: Name is required,product: Price must be positive`);
    });
});