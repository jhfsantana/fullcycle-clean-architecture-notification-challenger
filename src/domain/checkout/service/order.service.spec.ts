import Customer from "../../customer/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";


describe('OrderService unit tests', () => {

    it('should throw error when place order with no items', () => {

        expect(() => {
            const customer = new Customer("123", "John Doe");
            const order = OrderService.placeOrder(customer, []);
        }).toThrowError('Order must have at least one item');

    });

    it('should place a order', () => {

        const customer = new Customer("123", "John Doe");

        const item1 = new OrderItem("1", "Item 1", 100, "p1", 1);
        const item2 = new OrderItem("2", "Item 2", 150, "p2", 2);

        const order = OrderService.placeOrder(customer, [item1, item2]);
        
        expect(customer.rewardPoints).toBe(200);
        expect(order.total()).toBe(400)

    });

    it('should calculate total of all orders', () => {

        const item1 = new OrderItem("1", "Item 1", 100, "p1", 1);
        const item2 = new OrderItem("2", "Item 2", 150, "p2", 2);

        const order1 = new Order("123", "123", [item1]);
        const order2 = new Order("1234", "123", [item2]);

        const total = OrderService.total([order1, order2]);

        
        expect(total).toBe(400);

    });
});