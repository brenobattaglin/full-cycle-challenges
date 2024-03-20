import { AfterDefine } from "sequelize-typescript";
import CustomerFactory from "./customer.factory";
import Address from "../value-object/address";

describe("CustomerFactory unit test", () => {
    it("should create a customer", () => {
        let customer = CustomerFactory.create("John Doe");

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John Doe");
        expect(customer.address).toBeUndefined();
    });

    it("should create a customer with address", () => {
        const address = new Address("Street 2", 12, "Varginha", "88000999");
        let customer = CustomerFactory.createWithAddress("John Doe", address);

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John Doe");
        expect(customer.address).toBe(address);
    });
});