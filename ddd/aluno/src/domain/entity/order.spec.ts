import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit test", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      let order = new Order("", "132", []);
    }).toThrow("Id is required");
  });

  it("should throw error when customer id is empty", () => {
    expect(() => {
      let order = new Order("123", "", []);
    }).toThrow("Customer Id is required");
  });

  it("should throw error when items are empty", () => {
    expect(() => {
      let order = new Order("123", "321", []);
    }).toThrow("Items are required");
  });

  it("should calculate total", () => {
    const item = new OrderItem("123", "item", 10, 2, "123");
    const order = new Order("123 ", "321", [item]);

    let total = order.total();
    expect(total).toBe(20);

    const item2 = new OrderItem("123", "item", 10, 2, "13");
    const order2 = new Order("123 ", "321", [item, item2]);
    total = order2.total();
    expect(total).toBe(40);
  });

  it("should throw error if quantity is greater than 0", () => {
    expect(() => {
      const item = new OrderItem("123", "item", 10, 0, "123");
      const order = new Order("123 ", "321", [item]);
    }).toThrow("Quantity must be greater than 0");
  });
});
