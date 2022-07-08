import Customer from "../../customer/entity/customer";
import Address from "../../customer/value-object/address";
import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {

    it('should throw error when id is empty', () => {

        expect(() => {
            new Order("", "123",[])
        }).toThrowError('Id is required')
    });

    it('should throw error when customer id is empty', () => {

        expect(() => {
            new Order("123", "",[])
        }).toThrowError('Customer Id is required')
    });

    it('should throw error when items is empty', () => {

        expect(() => {
            new Order("123", "123",[])
        }).toThrowError('Items is required')
    });

    it('should return total', () => {

        const customer = new Customer("123", "John");
        const address = new Address("Rua 1", 10, "21820-421", "RJ");
        customer.Address = address;
        
        const item1 = new OrderItem("1", "Item 1", 10, "p1", 2)
        const item2 = new OrderItem("2", "Item 2", 20, "p2", 2)

        const order = new Order("123", "123", [item1, item2]);

        expect(order.total()).toBe(60);

    });

    it('should throw error when items quantity is less than 1', () => {

        expect(()=> {
            const item1 = new OrderItem("1", "Item 1", 10, "p1", 0)
            const item2 = new OrderItem("2", "Item 2", 20, "p2", 2)

            const order = new Order("123", "123", [item1, item2]);
        }).toThrowError('Items quantity must be greater than zero');
    })
});
