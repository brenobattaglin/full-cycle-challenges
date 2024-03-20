import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress(
    "John Doe",
    new Address("Street", 123, "Zip", "City"),
);

const customer2 = CustomerFactory.createWithAddress(
    "Jane Doe",
    new Address("Street", 123, "Zip", "City"),
);

const mockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
        update: jest.fn(),
    };
}

describe("Unit Test to list customer use case", () => {
    it("should list all customers", async () => {
        const customerRepository = mockRepository();
        const useCase = new ListCustomerUseCase(customerRepository);

        const output = await useCase.execute({});

        expect(output.customers.length).toBe(2);
        expect(output.customers[0].id).toBe(customer1.id);
        expect(output.customers[0].name).toBe(customer1.name);
        expect(output.customers[0].address.street).toBe(customer1.address.street);
        expect(output.customers[0].address.number).toBe(customer1.address.number);
        expect(output.customers[0].address.zip).toBe(customer1.address.zip);
        expect(output.customers[0].address.city).toBe(customer1.address.city);
        expect(output.customers[1].id).toBe(customer2.id);
        expect(output.customers[1].name).toBe(customer2.name);
        expect(output.customers[1].address.street).toBe(customer2.address.street);
        expect(output.customers[1].address.number).toBe(customer2.address.number);
        expect(output.customers[1].address.zip).toBe(customer2.address.zip);
        expect(output.customers[1].address.city).toBe(customer2.address.city);

    });
});