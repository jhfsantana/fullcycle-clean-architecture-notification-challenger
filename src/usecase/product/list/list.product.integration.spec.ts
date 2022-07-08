import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../../infra/db/sequelize/model/product.model";
import ProductSequelizeRepository from "../../../infra/repository/product.sequelize.repository";
import ListProductUseCase from "./list.product";



describe('integration tests list product use cases', () => {

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

    it('should return a list of products', async () => {


        const product1 = ProductFactory.create("a", "Camiseta Azul", 19.99);
        const product2 = ProductFactory.create("a", "Boné Azul", 29.99);

        const productRepository = new ProductSequelizeRepository();

        productRepository.create(product1 as Product);
        productRepository.create(product2 as Product);

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