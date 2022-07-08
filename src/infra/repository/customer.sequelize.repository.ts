import Address from "../../domain/customer/value-object/address";
import CustomerRepositoryInterface from "../../domain/customer/repository/customer.repository-interface";
import CustomerModel from "../db/sequelize/model/customer.model";
import Customer from "../../domain/customer/entity/customer";

export default class CustomerSequelizeRepository implements CustomerRepositoryInterface {
    async create(entity: Customer): Promise<void> {
        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            active: entity.isActive(),
            street: entity.address.street,
            city: entity.address.city,
            zip: entity.address.zip,
            number: entity.address.number,
            rewardPoints: entity.rewardPoints
        })
    }
    async update(entity: Customer): Promise<void> {
        await CustomerModel.update({
            name: entity.name,
            active: entity.isActive(),
            street: entity.address.street,
            city: entity.address.city,
            zip: entity.address.zip,
            number: entity.address.number,
            rewardPoints: entity.rewardPoints

        }, {
            where: {
                id: entity.id
            }
        })
    }
    async find(id: string): Promise<Customer> {
        try {
            const savedCustomer = await CustomerModel.findOne({
                where: {
                    id: id
                },
                rejectOnEmpty: true
            });
            const customer = new Customer(savedCustomer.id, savedCustomer.name);
            const address = new Address(savedCustomer.street, savedCustomer.number, savedCustomer.zip, savedCustomer.city)
            customer.changeAddress(address);
            customer.addRewardsPoints(savedCustomer.rewardPoints);
            customer.activate();
            return customer;
        } catch(error) {
            throw new Error(`Customer ${id} not found`)
        }
    }
    async findAll(): Promise<Customer[]> {
        const customers = await CustomerModel.findAll();

        return customers.map((savedCustomer) => {
            const address = new Address(savedCustomer.street, savedCustomer.number, savedCustomer.zip, savedCustomer.city);            
            const customer =  new Customer(savedCustomer.id, savedCustomer.name);
            customer.changeAddress(address);
            customer.activate();
            customer.addRewardsPoints(savedCustomer.rewardPoints);
            return customer

        })
    }

}