import Id from "../../../@shared/domain/value-object/id.value-object";
import { InvoiceItem } from "../../domain/entity/invoice-item.entity";
import { Invoice } from "../../domain/entity/invoice.entity";
import Address from "../../domain/value-object/address.value-object";
import InvoiceGateway from "../../gateway/invoice.gateway";
import GenerateInvoiceUseCase from "./generate-invoice.usecase";

const MockRepository = () => {
  return {
    generate: jest.fn(),
    find: jest.fn(),
  };
};

describe("generate invoice use case unit test", () => {
  it("should generate an invoice", async () => {
    const repository = MockRepository();
    const usecase = new GenerateInvoiceUseCase(repository);

    const input = {
      name: "Invoice 1",
      document: "123456789",
      street: "123 Main St",
      number: "1",
      complement: "",
      city: "City",
      state: "State",
      zipCode: "12345",
      items: [
        {
          id: "1",
          name: "Item 1",
          price: 10,
        },
        {
          id: "2",
          name: "Item 2",
          price: 20,
        },
      ],
    };

    const result = await usecase.execute(input);

    expect(result).toEqual({
      id: expect.any(String),
      name: "Invoice 1",
      document: "123456789",
      street: "123 Main St",
      number: "1",
      complement: "",
      city: "City",
      state: "State",
      zipCode: "12345",
      items: [
        {
          id: expect.any(String),
          name: "Item 1",
          price: 10,
        },
        {
          id: expect.any(String),
          name: "Item 2",
          price: 20,
        },
      ],
      total: expect.any(Number),
    });
    expect(repository.generate).toHaveBeenCalledWith(expect.any(Invoice));
  });
});
