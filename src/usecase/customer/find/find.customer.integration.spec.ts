import { Sequelize } from "sequelize-typescript";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import CustomerModel from "../../../infra/db/sequelize/model/customer.model";
import CustomerSequelizeRepository from "../../../infra/repository/customer.sequelize.repository";
import FindCustomerUseCase from "./find.customer";

describe('Test find customer usecase', () => {

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

    it('should find a customer', async () => {
        
        const customerRepository = new CustomerSequelizeRepository();

        const address = new Address("Rua Rio da Prata", 10, "21820-987", "Rio de Janeiro");
        const customerFactory = CustomerFactory.createWithAddress("Jorge", address);

        await customerRepository.create(customerFactory);

        const usecase =  new FindCustomerUseCase(customerRepository);

        const input = {
            id: customerFactory.id
        }

        const customer = await usecase.execute(input);

        expect(customer.id).toBe(customerFactory.id);
        expect(customer.name).toBe(customerFactory.name);
    })
});