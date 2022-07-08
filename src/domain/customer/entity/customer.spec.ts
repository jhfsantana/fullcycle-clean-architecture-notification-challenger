import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unit tests", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
            new Customer("", "John");
        }).toThrowError("customer: Id is required");
    });

    it("should throw error when name and id are empty", () => {
        expect(() => {
            new Customer("", "");
        }).toThrowError("customer: Name is required,customer: Id is required");
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            new Customer("123", "");
        }).toThrowError("customer: Name is required");
    });

    it("should change customer", () => {
        const customer = new Customer("123", "John");

        customer.changeName("John Doe")

        expect(customer.name).toBe("John Doe");
    });

    it("should throw error when trying activate user without address", () => {
        expect(() => {
            const customer = new Customer("123", "John");
            customer.activate()
        }).toThrowError('customer: Address is required to active a customer');
    });

    it("should active a customer", () => {
        const customer = new Customer("123", "John");
        const address = new Address("Rua Rio da Prata", 10, '21820-097', 'Rio de Janeiro')
        customer.Address = address;
        customer.activate()
        expect(customer.isActive()).toBe(true);
    });

    it("should deactive a customer", () => {
        const customer = new Customer("123", "John");
        const address = new Address("Rua Rio da Prata", 10, '21820-097', 'Rio de Janeiro')
        customer.Address = address;
        customer.activate();
        customer.deactivate();
        expect(customer.isActive()).toBe(false);
    });

    it('should add rewards points', () => {
        const customer = new Customer("id", "Customer 1");

        expect(customer.rewardPoints).toBe(0);

        customer.addRewardsPoints(10)

        expect(customer.rewardPoints).toBe(10);

        customer.addRewardsPoints(53)

        expect(customer.rewardPoints).toBe(63);
    })
});