import CreateCustomerUseCase from "./create.customer";

const input = {
    name: 'Jorge Henrique',
    address: {
        street: 'Rua Rio da Prata',
        number: 10,
        zip: '21802-831',
        city: 'Rio de Janeiro'
    }
}

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),

    }
};


describe('Unit test create customer', () => {

    afterEach(()=> {
        input.name = 'Jorge Henrique';
        input.address.street = 'Rua Rio da Prata';
        input.address.number = 10;
        input.address.zip = '21802-831';
        input.address.city = 'Rio de Janeiro';
    });

    it('should create a customer', async () => {

        const customerRepository = MockRepository();
        const usecase = new CreateCustomerUseCase(customerRepository);

        const customer = await usecase.execute(input);

        expect(customer).toEqual({
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street,
                number: input.address.number,
                zip: input.address.zip,
                city: input.address.city
            }
        });
    });

    it('should throw erro when name is missing', async () => {

        const customerRepository = MockRepository();
        const usecase = new CreateCustomerUseCase(customerRepository);

        input.name = "";

        expect(async () => {
            await usecase.execute(input);
        }).rejects.toThrow('Name is required');
    });

    it('should throw erro when street is missing', async () => {
        const customerRepository = MockRepository();
        const usecase = new CreateCustomerUseCase(customerRepository);

        input.address.street = "";
        
        expect(async () => {
            await usecase.execute(input);
        }).rejects.toThrow('Street is required');
    });

    it('should throw erro when number is missing', async () => {
        const customerRepository = MockRepository();
        const usecase = new CreateCustomerUseCase(customerRepository);

        input.address.number = 0;

        expect(async () => {
            await usecase.execute(input);
        }).rejects.toThrow('Number is required');
    });

    it('should throw erro when zipcode is missing', async () => {
        const customerRepository = MockRepository();
        const usecase = new CreateCustomerUseCase(customerRepository);

        input.address.zip = "";

        expect(async () => {
            await usecase.execute(input);
        }).rejects.toThrow('Zipcode is required');
    });

    it('should throw erro when city is missing', async () => {
        const customerRepository = MockRepository();
        const usecase = new CreateCustomerUseCase(customerRepository);

        input.address.city = "";

        expect(async () => {
            await usecase.execute(input);
        }).rejects.toThrow('City is required');
    });
});