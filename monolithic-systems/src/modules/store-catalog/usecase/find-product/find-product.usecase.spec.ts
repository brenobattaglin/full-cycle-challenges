import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import FindProductUsecase from "./find-product.usecase";

const product = new Product({
  id: new Id("1"),
  name: "Product 1",
  description: "Description 1",
  salesPrice: 100,
});

const MockRepository = () => {
  return {
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
  };
};

describe("find a product usecase unit tests", () => {
  it("should find a product", async () => {
    const productRepository = MockRepository();
    const usecase = new FindProductUsecase(productRepository);
    const input = { id: "1" };
    const result = await usecase.execute(input);
    expect(productRepository.find).toBeCalledWith("1");
    expect(result).toEqual({
      id: "1",
      name: "Product 1",
      description: "Description 1",
      salesPrice: 100,
    });
  });
});
