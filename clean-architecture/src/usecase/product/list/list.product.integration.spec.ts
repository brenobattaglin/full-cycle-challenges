import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import ListProductUseCase from "./list.product.usecase";

describe("Test find product use case", () => {
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

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const useCase = new ListProductUseCase(productRepository);

    const firstProduct = new Product("12", "Product 1", 10);
    await productRepository.create(firstProduct);

    const secondProduct = new Product("13", "Product 2", 30);
    await productRepository.create(secondProduct);

    const input = {};

    const output = {
      products: [
        {
          id: "12",
          name: "Product 1",
          price: 10,
        },
        {
          id: "13",
          name: "Product 2",
          price: 30,
        },
      ],
    };
    const result = await useCase.execute(input);
    expect(result).toStrictEqual(output);
  });
});
