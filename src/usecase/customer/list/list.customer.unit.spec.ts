import CustomerFactory from "../../../domain/customer/factory/customer.factory"
import Address from "../../../domain/customer/value-object/address"
import ListCustomerUseCase from "./list.customer";


const address1 = new Address("Rua 1", 10, "1234-123", "RJ");
const address2 = new Address("Rua 1", 10, "1234-123", "RJ");
const customer1 = CustomerFactory.createWithAddress("Jorge", address2)
const customer2 = CustomerFactory.createWithAddress("Isa", address2)

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe('Unit test list customer', () => {

    it('should return all customers', async () =>{

        const customerRepository = MockRepository();

        const usecase = new ListCustomerUseCase(customerRepository);

        const customers = await usecase.execute({});

        expect(customers.customers.length).toEqual(2);
        expect(customers.customers[0].id).toEqual(customer1.id);
        expect(customers.customers[0].name).toEqual(customer1.name);
        expect(customers.customers[1].id).toEqual(customer2.id);
        expect(customers.customers[1].name).toEqual(customer2.name);
    });
});