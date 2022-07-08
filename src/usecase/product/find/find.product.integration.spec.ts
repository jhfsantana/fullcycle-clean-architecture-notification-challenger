import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../../infra/db/sequelize/model/product.model";
import ProductSequelizeRepository from "../../../infra/repository/product.sequelize.repository";
import FindProductUseCase from "./find.product";

describe('Product Integration test use cases', () => {

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

    it('should find a product', async () => {

        const productRepository = new ProductSequelizeRepository();

        const productFactory = ProductFactory.create("a", "Iphone 12", 4500);

        await productRepository.create(productFactory as Product);

        const usecase = new FindProductUseCase(productRepository);

        const input = {
            id: productFactory.id
        }
        const product = await usecase.execute(input);

        expect(product.id).toBe(productFactory.id)
        expect(product.name).toBe(productFactory.name)
        expect(product.price).toBe(productFactory.price)

    });

    it('should throw error when product no found', async () => {

        const productRepository = new ProductSequelizeRepository();

        const usecase = new FindProductUseCase(productRepository);

        const input = {
            id: "9999999"
        }
        expect(async () => {
            await usecase.execute(input);
        }).rejects.toThrow(`Product ${input.id} not found`);

    });
});