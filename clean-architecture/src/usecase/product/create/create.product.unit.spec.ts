import CreateProductUseCase from "./create.product.usecase";

const input = {
    name: "Banana",
    price: 10,
};

const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn(),
        update: jest.fn(),
    };
}

describe("Unit Test create product use case", () => {
    it("should create a product", async () => {
        const productRepository = MockRepository();
        const useCase = new CreateProductUseCase(productRepository);

        const output = await useCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price,
        });
    });

    it("should throw and error when name is missing", async () => {
        const productRepository = MockRepository();
        const useCase = new CreateProductUseCase(productRepository);

        input.name = "";

        await expect(useCase.execute(input)).rejects.toThrow("Name is required");
    });

    it("should throw and error when price is 0", async () => {
        const productRepository = MockRepository();
        const useCase = new CreateProductUseCase(productRepository);

        input.name = "Banana";
        input.price = 0;

        await expect(useCase.execute(input)).rejects.toThrow("Price must be greater than 0");
    });
});