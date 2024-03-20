import { v4 as uuid } from "uuid";
import OrderFactory from "./order.factory";

describe("Order factory unit test", () => {

    it("should create an order", () => {
        const orderProps = {
            id: uuid(),
            customerId: "123",
            items: [
                {
                    id: uuid(),
                    name: "Product 1",
                    productId: uuid(),
                    quantity: 2,
                    price: 10,
                }
            ]
        };
        const order = OrderFactory.create(orderProps);
        expect(order.id).toBe(orderProps.id);
        expect(order.customerId).toBe(orderProps.customerId);
        expect(order.items.length).toBe(1);


    });
});