import { Sequelize } from "sequelize-typescript";
import Product from "../../domain/product/entity/product";
import ProductModel from "../db/sequelize/model/product.model";
import ProductSequelizeRepository from "./product.sequelize.repository";

describe('Product Repository Tests', () => {


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

    it('should create a product', async () => {

        const product = new Product("1", "Product 1", 100);

        const productRepository = new ProductSequelizeRepository();

        await productRepository.create(product);

        const productFound = await ProductModel.findOne({ where: {id: "1"}});

        expect(productFound.toJSON()).toStrictEqual({

            id: product.id,
            name: product.name,
            price: product.price
        });
    });

    it('should update a product', async () => {

        const product = new Product("1", "Product 1", 100);

        const productRepository = new ProductSequelizeRepository();

        await productRepository.create(product);

        product.changeName('Product Updated');
        product.changePrice(50);

        await productRepository.update(product);

        const productFound = await ProductModel.findOne({ where: {id: "1"}});

        expect(productFound.toJSON()).toStrictEqual({

            id: product.id,
            name: product.name,
            price: product.price
        });
    });

    it('should find a product', async () => {

        const product = new Product("1", "Product 1", 100);

        const productRepository = new ProductSequelizeRepository();

        await productRepository.create(product);

        const productFound = await productRepository.find("1")

        expect(productFound).toEqual(product);
    });

    it('should find all products', async () => {

        const product = new Product("1", "Product 1", 100);
        const product2 = new Product("2", "Product 2", 100);

        const productRepository = new ProductSequelizeRepository();

        await productRepository.create(product);
        await productRepository.create(product2);

        const products = await productRepository.findAll();

        expect(products).toEqual([product, product2]);

    });
});