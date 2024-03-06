import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Order service unit tests", () => {
  it("should get total of all orders", () => {
    const orderItem = new OrderItem("1", "Product 1", 100, 1, "431");
    const orderItem2 = new OrderItem("2", "Product 2", 200, 1, "123");

    const order1 = new Order("o1", "c1", [orderItem]);
    const order2 = new Order("o1", "c1", [orderItem2]);

    const total = OrderService.calculateTotal([order1, order2]);

    expect(total).toBe(300);
  });

  it("should place an order", () => {
    const customer = new Customer("c1", "John Doe");
    const item1 = new OrderItem("1", "Product 1", 10, 1, "431");

    const order = OrderService.placeOrder(customer, [item1]);

    expect(customer.rewardPoints).toBe(5);
    expect(order.total()).toBe(10);
  });
});
