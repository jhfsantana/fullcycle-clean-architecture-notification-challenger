import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";


describe('Customer Factory unit tests', () => {

    it('should create a customer', () => {

        const customer = CustomerFactory.create("Jorge");

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Jorge");
        expect(customer.address).toBeUndefined();
    });

    it('should create customer with an address', () => {

        const address = new Address("Rua Rio da Prata", 10, "2120-492", "Rio de Janeiro");

        const customer = CustomerFactory.createWithAddress("Jorge", address);

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Jorge");
        expect(customer.isActive()).toBe(true);
        expect(customer.address).toStrictEqual(address);
    });
});