import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";
import { v4 as uuid } from "uuid";

describe("Test create product use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const productRepository = new ProductRepository();
        const useCase = new UpdateProductUseCase(productRepository);

        const product = new Product("12", "Product 1", 10);
        await productRepository.create(product);

        const firstInput = {
            id: product.id,
            name: product.name,
            price: product.price,
        };

        const firstOutput = {
            id: expect.any(String),
            name: "Product 1",
            price: 10,
        };

        const result = await useCase.execute(firstInput);
        expect(result).toStrictEqual(firstOutput);

        product.changeName("Product 2");
        product.changePrice(20);
        await productRepository.update(product);

        const secondInput = {
            id: product.id,
            name: product.name,
            price: product.price,
        };

        const secondOutput = {
            id: expect.any(String),
            name: "Product 2",
            price: 20,
        };
        const secondResult = await useCase.execute(secondInput);
        expect(secondResult).toStrictEqual(secondOutput);
    });
});
