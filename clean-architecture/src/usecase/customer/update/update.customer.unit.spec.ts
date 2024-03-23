import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress(
    "John",
    new Address("Street", 123, "Zip", "City")
);

const input = {
    id: customer.id,
    name: "John",
    address: {
        street: "Street",
        city: "City",
        number: 123,
        zip: "Zip",
    },
};

const MockRepository = () => {
    return {
        create: jest.fn(),
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        update: jest.fn(),
    };
}

describe("Unit Test update customer use case", () => {
    it("should update a customer", async () => {
        const customerRepository = MockRepository();
        const useCase = new UpdateCustomerUseCase(customerRepository);

        const output = await useCase.execute(input);

        expect(output).toEqual(input);
    });

    it("should throw an error when name is missing", async () => {
        const customerRepository = MockRepository();
        const useCase = new UpdateCustomerUseCase(customerRepository);

        input.name = '';

        await expect(useCase.execute(input)).rejects.toThrow("Name is required");
    });

    it("should throw and error when address is missing", async () => {
        const customerRepository = MockRepository();
        const useCase = new UpdateCustomerUseCase(customerRepository);

        input.name = "John";
        input.address.street = "";

        await expect(useCase.execute(input)).rejects.toThrow("Invalid street");
    });
});