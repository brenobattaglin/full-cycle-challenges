import { v4 as uuid } from "uuid";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";

interface OrderProps {
    id: string;
    customerId: string;
    items: {
        id: string;
        name: string;
        productId: string;
        quantity: number;
        price: number;
    }[];
}

export default class OrderFactory {
    public static create(props: OrderProps): Order {
        const items = props.items.map((item) => {
            return new OrderItem(
                item.id,
                item.name,
                item.price,
                item.quantity,
                item.productId
            );
        });
        return new Order(props.id, props.customerId, items);
    }
}