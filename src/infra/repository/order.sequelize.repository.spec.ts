import { Sequelize } from "sequelize-typescript";
import Address from "../../domain/customer/value-object/address";
import OrderItem from "../../domain/checkout/entity/order_item";
import CustomerModel from '../db/sequelize/model/customer.model'
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order_items.model";
import ProductModel from "../db/sequelize/model/product.model";
import CustomerSequelizeRepository from "./customer.sequelize.repository";
import OrderSequelizeRepository from "./order.sequelize.repository";
import ProductSequelizeRepository from "./product.sequelize.repository";
import Customer from "../../domain/customer/entity/customer";
import Order from "../../domain/checkout/entity/order";
import Product from "../../domain/product/entity/product";
describe('Order Repository Tests', () => {

    let sequelize: Sequelize;

    beforeEach(async () => {

        sequelize = new Sequelize({
           dialect: 'sqlite',
           storage: ':memory:',
           logging: false,
           sync: { force: true },
        });

        sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should create a new order', async () => {
        const customerRepository = new CustomerSequelizeRepository();

        const customer = new Customer("123", "John Doe");
        const address = new Address("Rua 1", 10, "21820-921", "RJ");
        customer.changeAddress(address);
        customer.activate();
        customer.addRewardsPoints(100);

        await customerRepository.create(customer);

        const product = new Product("111", "Celular", 5000);
        const productRepository = new ProductSequelizeRepository();
        
        await productRepository.create(product);

        const orderItem = new OrderItem("1", product.name, product.price, product.id, 1);
        const order = new Order("123", "123", [orderItem]);

        const orderRepository = new OrderSequelizeRepository();

        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({ where: {id:order.id}, include:["items"]});

        expect(orderModel.toJSON()).toStrictEqual({
            id: "123",
            customerId: "123",
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    quantity: orderItem.quantity,
                    price: orderItem.price,
                    orderId: "123",
                    productId: orderItem.productId
                }
            ]
        })

    });

    it('should update a order', async () => {
        const customerRepository = new CustomerSequelizeRepository();

        const customer = new Customer("123", "John Doe");
        const address = new Address("Rua 1", 10, "21820-921", "RJ");
        customer.changeAddress(address);
        customer.activate();
        customer.addRewardsPoints(100);

        await customerRepository.create(customer);

        const product = new Product("111", "Celular", 5000);
        const product2 = new Product("2", "Camisa", 50);
        const productRepository = new ProductSequelizeRepository();
        
        await productRepository.create(product);
        await productRepository.create(product2);

        const orderItem = new OrderItem("1", product.name, product.price, product.id, 1);
        const order = new Order("123", "123", [orderItem]);
        
        const orderRepository = new OrderSequelizeRepository();
        
        await orderRepository.create(order);
        
        const orderItem2 = new OrderItem("2", product2.name, product2.price, product2.id, 1);
        order.addItem(orderItem2);

        await orderRepository.update(order);

        const orderModel = await OrderModel.findOne({ where: {id:order.id}, include:["items"]});

        expect(orderModel.toJSON()).toStrictEqual({
            id: "123",
            customerId: "123",
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    quantity: orderItem.quantity,
                    price: orderItem.price,
                    orderId: "123",
                    productId: orderItem.productId
                },
                {
                    id: orderItem2.id,
                    name: orderItem2.name,
                    quantity: orderItem2.quantity,
                    price: orderItem2.price,
                    orderId: "123",
                    productId: orderItem2.productId
                }
            ]
        });
    });

    it('should find a order', async () => { 

        const customerRepository = new CustomerSequelizeRepository();

        const customer = new Customer("123", "John Doe");
        const address = new Address("Rua 1", 10, "21820-921", "RJ");
        customer.changeAddress(address);
        customer.activate();
        customer.addRewardsPoints(100);

        await customerRepository.create(customer);

        const product = new Product("111", "Celular", 5000);
        const productRepository = new ProductSequelizeRepository();
        
        await productRepository.create(product);

        const orderItem = new OrderItem("1", product.name, product.price, product.id, 1);
        const order = new Order("123", "123", [orderItem]);
        
        const orderRepository = new OrderSequelizeRepository();
        
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({ where: {id:order.id}, include:["items"]});
        const orderFind = await orderRepository.find("123");
        
        expect(orderModel.toJSON()).toStrictEqual({
            id: orderFind.id,
            customerId: orderFind.customerId,
            total: orderFind.total(),
            items: [
                {
                    id: orderFind.items[0].id,
                    name: orderFind.items[0].name,
                    quantity: orderFind.items[0].quantity,
                    price: orderFind.items[0].price,
                    orderId: orderFind.id,
                    productId: orderFind.items[0].productId
                }
            ]
        });
    });

    it('should throw error when not found order', async () => { 

        const id = "ID_NOT_EXISTS";
        expect(async () => {
            await new OrderSequelizeRepository().find(id);
        }).rejects.toThrow(`Order ${id} not found`);
        
    });

    it('should find all orders', async () => {
        const customerRepository = new CustomerSequelizeRepository();

        const customer = new Customer("123", "John Doe");
        const address = new Address("Rua 1", 10, "21820-921", "RJ");
        customer.changeAddress(address);
        customer.activate();
        customer.addRewardsPoints(100);

        await customerRepository.create(customer);

        const product = new Product("111", "Celular", 5000);
        const product2 = new Product("2", "Camisa", 50);
        const productRepository = new ProductSequelizeRepository();
        
        await productRepository.create(product);
        await productRepository.create(product2);

        const orderItem = new OrderItem("1", product.name, product.price, product.id, 2);
        const orderItem2 = new OrderItem("2", product2.name, product2.price, product2.id, 13);
        const order = new Order("1", "123", [orderItem]);
        order.total();
        const order2 = new Order("2", "123", [orderItem2]);
        order2.total();

        const orderRepository = new OrderSequelizeRepository();

        await orderRepository.create(order);
        await orderRepository.create(order2);

        const orders = await orderRepository.findAll();

        expect(orders).toHaveLength(2);
        expect(orders[0]).toEqual(order);
        expect(orders[1]).toEqual(order2);
    });
});