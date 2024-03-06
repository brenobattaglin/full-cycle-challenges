import Address from "./address";
import Customer from "./customer";

describe("Customer unit test", () => {
  it("should throw error when id is empty", () => {
    expect(() => new Customer("", "name")).toThrow("Invalid id");
  });

  it("should throw error when name is empty", () => {
    expect(() => new Customer("id", "")).toThrow("Invalid customer");
  });

  // triple A
  it("should activate customer", () => {
    const customer = new Customer("12", "John ");
    const address = new Address("street", 123, "state", "zip");
    customer.address = address;

    expect(customer.isActive).toBe(true);
  });

  it("should deactivate customer", () => {
    const customer = new Customer("123", "Johnny");
    customer.deactivate();

    expect(customer.isActive).toBe(false);
  });

  it("should add reward points", () => {
    const customer = new Customer("123", "Johnny");
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(20);
    expect(customer.rewardPoints).toBe(30);
  });

  it("should throw error when address is not set and customer is activated", () => {
    expect(() => {
      const customer = new Customer("123", "Johnny");
      customer.activate();
    }).toThrow("Address is required to activate customer");
  });
});
