import Order from "../entity/order"
import OrderItem from "../entity/order_item"

interface OrderProps {
    id: string
    customerId: string
    items: {
        id: string
        name: string
        productId: string
        quantity: number
        price: number
    }[]
}

export default class OrderFactory {

    static create(props : OrderProps): Order {
        
        const orderItem = props.items.map(item => {
            return new OrderItem(item.id, item.name, item.price, item.productId, item.quantity)
        });

        const order = new Order(props.id, props.customerId, orderItem);

        return order;
    }
}