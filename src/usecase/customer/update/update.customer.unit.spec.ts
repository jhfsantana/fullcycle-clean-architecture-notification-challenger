import Customer from "../../../domain/customer/entity/customer"
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer";


const customer = new Customer("123", "Nome");
const address = new Address("Rua 1", 10, "21920-981", "Rio de Janeiro");
customer.Address = address;

const input = {
    id: customer.id,
    name: "Nome updated",
    address: {
        street: "Rua 2 updated",
        number: 9,
        zip: "21921-912",
        city: "Rio de Janeiro"
    }
}

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}


describe('Unit test update a customer', () => {


    afterEach(()=> {
        input.name = 'Jorge Henrique F Santana';
        input.address.street = 'Rua Rio da Prata Updated';
        input.address.number = 111;
        input.address.zip = '21802-111';
        input.address.city = 'Rio de Janeiro - RJ';
    });
    it('should update a customer data', async () => {

        const customerRepository = MockRepository();
        const usecase = new UpdateCustomerUseCase(customerRepository);
            
        await usecase.execute(input);

        const customer = await customerRepository.find("123");

        expect(customer.id).toBe(input.id);
        expect(customer.name).toBe(input.name);
        expect(customer.address.street).toBe(input.address.street);
        expect(customer.address.number).toBe(input.address.number);
        expect(customer.address.zip).toBe(input.address.zip);
        expect(customer.address.city).toBe(input.address.city);
    });

    it('should throw erro when name is missing', async () => {

        const customerRepository = MockRepository();
        const usecase = new UpdateCustomerUseCase(customerRepository);

        input.name = "";

        expect(async () => {
            await usecase.execute(input);
        }).rejects.toThrow('Name is required');
    });

    it('should throw erro when street is missing', async () => {
        const customerRepository = MockRepository();
        const usecase = new UpdateCustomerUseCase(customerRepository);

        input.address.street = "";
        
        expect(async () => {
            await usecase.execute(input);
        }).rejects.toThrow('Street is required');
    });

    it('should throw erro when number is missing', async () => {
        const customerRepository = MockRepository();
        const usecase = new UpdateCustomerUseCase(customerRepository);

        input.address.number = 0;

        expect(async () => {
            await usecase.execute(input);
        }).rejects.toThrow('Number is required');
    });

    it('should throw erro when zipcode is missing', async () => {
        const customerRepository = MockRepository();
        const usecase = new UpdateCustomerUseCase(customerRepository);

        input.address.zip = "";

        expect(async () => {
            await usecase.execute(input);
        }).rejects.toThrow('Zipcode is required');
    });

    it('should throw erro when city is missing', async () => {
        const customerRepository = MockRepository();
        const usecase = new UpdateCustomerUseCase(customerRepository);

        input.address.city = "";

        expect(async () => {
            await usecase.execute(input);
        }).rejects.toThrow('City is required');
    });
});