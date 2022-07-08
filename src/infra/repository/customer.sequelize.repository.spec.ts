import { Sequelize } from "sequelize-typescript";
import Customer from "../../domain/customer/entity/customer";
import Address from "../../domain/customer/value-object/address";
import CustomerModel from '../db/sequelize/model/customer.model'
import CustomerSequelizeRepository from "./customer.sequelize.repository";
describe('Customer Repository Tests', () => {

    let sequelize: Sequelize;

    beforeEach(async () => {

        sequelize = new Sequelize({
           dialect: 'sqlite',
           storage: ':memory:',
           logging: false,
           sync: { force: true },
        });

        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should create a customer', async () => {
        const customerRepository = new CustomerSequelizeRepository();

        const customer = new Customer("123", "John Doe");
        const address = new Address("Rua 1", 10, "21820-921", "RJ");
        customer.changeAddress(address);
        customer.activate();
        customer.addRewardsPoints(100);

        await customerRepository.create(customer);
        const savedCustomer = await CustomerModel.findByPk("123");

        expect(savedCustomer.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            active: customer.isActive(),
            street: customer.address.street,
            zip: customer.address.zip,
            number: customer.address.number,
            city: customer.address.city,
            rewardPoints: customer.rewardPoints
        })

    });
    
    it('should update a customer', async () => {
        const customerRepository = new CustomerSequelizeRepository();

        const customer = new Customer("123", "John Doe");
        const address = new Address("Rua 1", 10, "21820-921", "RJ");
        customer.changeAddress(address);
        customer.activate();
        customer.addRewardsPoints(100);

        await customerRepository.create(customer);

        customer.changeName("Jorge");

        await customerRepository.update(customer);

        const savedCustomer = await CustomerModel.findByPk("123");

        expect(savedCustomer.toJSON()).toStrictEqual({
            id: "123",
            name: customer.name,
            active: customer.isActive(),
            street: customer.address.street,
            zip: customer.address.zip,
            number: customer.address.number,
            city: customer.address.city,
            rewardPoints: customer.rewardPoints
        })

    });

    it('should find a customer', async () => {
        const customerRepository = new CustomerSequelizeRepository();

        const customer = new Customer("123", "John Doe");
        const address = new Address("Rua 1", 10, "21820-921", "RJ");
        customer.changeAddress(address);
        customer.activate();
        customer.addRewardsPoints(100);

        await customerRepository.create(customer);

        const customerFind = await customerRepository.find("123");

        expect(customer).toStrictEqual(customerFind)

    });

    it('should throw error when not found a customer', async () => {
        const customerRepository = new CustomerSequelizeRepository();
        const id = "1235121";
        expect(async ()=> {
            await customerRepository.find(id);
        }).rejects.toThrow(`Customer ${id} not found`);

    });

    it('should find all customer', async () => {
        const customerRepository = new CustomerSequelizeRepository();

        const customer1 = new Customer("123", "John Doe");
        const address1 = new Address("Rua 1", 10, "21820-921", "RJ");
        customer1.changeAddress(address1);
        customer1.activate();
        customer1.addRewardsPoints(100);

        const customer2 = new Customer("124", "Doe Ann");
        const address2 = new Address("Rua 2", 10, "21820-921", "RJ");
        customer2.changeAddress(address2);
        customer2.activate();
        customer2.addRewardsPoints(300);

        await customerRepository.create(customer1);
        await customerRepository.create(customer2);

        const all = await customerRepository.findAll();

        expect(all).toHaveLength(2);
        expect(customer1).toEqual(all[0]);
        expect(customer2).toEqual(all[1]);

    });
});