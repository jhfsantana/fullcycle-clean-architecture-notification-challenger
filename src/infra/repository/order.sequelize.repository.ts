import Order from "../../domain/checkout/entity/order";
import OrderItem from "../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../domain/checkout/repository/order.repository-interface";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order_items.model";

export default class OrderSequelizeRepository implements OrderRepositoryInterface 
{
    async create(entity: Order): Promise<void> {
        
        await OrderModel.create({
            id: entity.id,
            customerId: entity.customerId,
            total: entity.total(),
            items: entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                productId: item.productId,
                quantity: item.quantity
            }))
        }, {
            include: [{model: OrderItemModel}]
        });
    }
    async update(entity: Order): Promise<void> {
        
        await OrderItemModel.destroy({ where: { orderId: entity.id } });

        await OrderModel.update(
            {
                id: entity.id,
                customerId: entity.customerId,
                total: entity.total()
            },
            {
                where: {
                    id: entity.id,
                }
            }
        );

        entity.items.map((item) => {
            OrderItemModel.create({
                id: item.id,
                name: item.name,
                price: item.price,
                productId: item.productId,
                quantity: item.quantity,
                orderId: entity.id
            });
        });
    }
    async find(id: string): Promise<Order> {
        try {
            const ordermodel = await OrderModel.findOne(
                {
                    where: {
                        id: id,
                    },
                    include: ['items'], rejectOnEmpty: true
                }
            );
    
            const orderItems: OrderItem[] = ordermodel.items.map((item) => {
                return new OrderItem(item.id, item.name,
                    item.price / item.quantity,
                    item.productId,
                    item.quantity)
            })
    
            return new Order(ordermodel.id, ordermodel.customerId, orderItems)
        } catch(error) {
            throw new Error(`Order ${id} not found`);
        }
    }
    async findAll(): Promise<Order[]> {
        const orderModels = await OrderModel.findAll({ include: ["items"] });
        
        const orders: Order[] = orderModels.map((order) => {
            const orderItems = order.items.map((item) => {
                return new OrderItem(item.id,
                    item.name,
                    item.price / item.quantity,
                    item.productId,
                    item.quantity);
            });
            return new Order(order.id, order.customerId, orderItems);
        });

        return orders;
    }
}