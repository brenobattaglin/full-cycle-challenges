import Address from "./domain/customer/value-object/address";
import Customer from "./domain/customer/entity/customer";
import Order from "./domain/checkout/entity/order";
import OrderItem from "./domain/checkout/entity/order_item";

// 1 agregado
let customer = new Customer("123", "Silva");
const address = new Address("Rua 1", 32, "88999333", "Sao Paulo");
customer.address = address;
customer.activate();

// outro agregado
const item1 = new OrderItem("1", "item1", 100, 2, "123");
const item2 = new OrderItem("2", "item2", 200, 3, "123");
const order = new Order("1", "123", [item1, item2]);
