import { Sequelize } from "sequelize-typescript";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import CustomerModel from "../../../infra/db/sequelize/model/customer.model";
import CustomerSequelizeRepository from "../../../infra/repository/customer.sequelize.repository";
import FindCustomerUseCase from "./find.customer";


const address = new Address("Rua Rio da Prata", 10, "21820-987", "Rio de Janeiro");
const customerFactory = CustomerFactory.createWithAddress("Jorge", address);


const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customerFactory)),
        findAll: jest.fn().mockReturnValue(Promise.resolve([customerFactory])),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe('Unit Test find customer usecase', () => {

    it('should find a customer', async () => {
        
        const customerRepository = MockRepository();

        const usecase =  new FindCustomerUseCase(customerRepository);

        const input = {
            id: customerFactory.id
        }

        const customer = await usecase.execute(input);

        expect(customer.id).toBe(customerFactory.id);
        expect(customer.name).toBe(customerFactory.name);
        expect(customer.address.street).toBe(customerFactory.address.street);
        expect(customer.address.zip).toBe(customerFactory.address.zip);
        expect(customer.address.city).toBe(customerFactory.address.city);
        expect(customer.address.number).toBe(customerFactory.address.number);
    });

    it('should throw error when customer not found', async () => {
        
        const customerRepository = MockRepository();
        const usecase =  new FindCustomerUseCase(customerRepository);
        
        const input = {
            id: customerFactory.id
        }
        customerRepository.find.mockImplementation(() => {
            throw new Error(`Customer ${input.id} not found`)
        });
    
        expect(async () => {
            await usecase.execute(input);
        }).rejects.toThrow(`Customer ${input.id} not found`);;
    });
});