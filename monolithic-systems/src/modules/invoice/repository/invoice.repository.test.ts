import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import { Invoice } from "../domain/entity/invoice.entity";
import InvoiceRepository from "./invoice.repository";
import { InvoiceModel } from "./invoice.model";
import { InvoiceItemModel } from "./invoice-item.model";
import Address from "../domain/value-object/address.value-object";
import { InvoiceItem } from "../domain/entity/invoice-item.entity";

describe("invoice repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([InvoiceModel, InvoiceItemModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should generate an invoice", async () => {
    const invoiceProps = new Invoice({
      id: new Id("1"),
      name: "Invoice 1",
      document: "123456789",
      address: new Address({
        street: "123 Main St",
        number: "1",
        complement: "",
        city: "City",
        state: "State",
        zipCode: "12345",
      }),
      items: [
        new InvoiceItem({
          id: new Id("1"),
          name: "Item 1",
          price: 10,
        }),
        new InvoiceItem({
          id: new Id("2"),
          name: "Item 2",
          price: 20,
        }),
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const invoice = new Invoice(invoiceProps);
    const repository = new InvoiceRepository();
    await repository.generate(invoice);

    const invoiceModel = await InvoiceModel.findOne({
      where: { id: invoiceProps.id.id },
      include: ["items"],
    });

    expect(invoiceProps.id.id).toBe(invoiceModel.id);
    expect(invoiceProps.name).toEqual(invoiceModel.name);
    expect(invoiceProps.document).toBe(invoiceModel.document);
    expect(invoiceProps.address.street).toBe(invoiceModel.street);
    expect(invoiceProps.address.number).toBe(invoiceModel.number);
    expect(invoiceProps.address.complement).toBe(invoiceModel.complement);
    expect(invoiceProps.address.city).toBe(invoiceModel.city);
    expect(invoiceProps.address.state).toBe(invoiceModel.state);
    expect(invoiceProps.address.zipCode).toBe(invoiceModel.zipCode);
    expect(invoiceProps.items[0].id.id).toBe(invoiceModel.items[0].id);
    expect(invoiceProps.items[0].name).toBe(invoiceModel.items[0].name);
    expect(invoiceProps.items[0].price).toBe(invoiceModel.items[0].price);
    expect(invoiceProps.items[0].createdAt).toBeDefined();
    expect(invoiceProps.items[0].updatedAt).toBeDefined();
    expect(invoiceProps.items[1].id.id).toBe(invoiceModel.items[1].id);
    expect(invoiceProps.items[1].name).toBe(invoiceModel.items[1].name);
    expect(invoiceProps.items[1].price).toBe(invoiceModel.items[1].price);
    expect(invoiceProps.items[1].createdAt).toBeDefined();
    expect(invoiceProps.items[1].updatedAt).toBeDefined();
    expect(invoiceModel.createdAt).toBeDefined();
    expect(invoiceModel.updatedAt).toBeDefined();
  });

  it("should find an invoice", async () => {
    const invoiceProps = new Invoice({
      id: new Id("1"),
      name: "Invoice 1",
      document: "123456789",
      address: new Address({
        street: "123 Main St",
        number: "1",
        complement: "",
        city: "City",
        state: "State",
        zipCode: "12345",
      }),
      items: [
        new InvoiceItem({
          id: new Id("1"),
          name: "Item 1",
          price: 10,
        }),
        new InvoiceItem({
          id: new Id("2"),
          name: "Item 2",
          price: 20,
        }),
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const invoice = new Invoice(invoiceProps);
    const repository = new InvoiceRepository();
    await repository.generate(invoice);

    const invoiceModel = await InvoiceModel.findOne({
      where: { id: "1" },
      include: ["items"],
    });

    const invoiceRepository = new InvoiceRepository();
    const foundInvoice = await invoiceRepository.find("1");

    expect(invoiceModel.id).toBe(invoice.id.id);
    expect(invoiceModel.name).toBe(invoice.name);
    expect(invoiceModel.document).toBe(invoice.document);
    expect(invoiceModel.street).toBe(invoice.address.street);
    expect(invoiceModel.number).toBe(invoice.address.number);
    expect(invoiceModel.complement).toBe(invoice.address.complement);
    expect(invoiceModel.city).toBe(invoice.address.city);
    expect(invoiceModel.state).toBe(invoice.address.state);
    expect(invoiceModel.zipCode).toBe(invoice.address.zipCode);
    expect(invoiceModel.items[0].id).toBe(invoice.items[0].id.id);
    expect(invoiceModel.items[0].name).toBe(invoice.items[0].name);
    expect(invoiceModel.items[0].price).toBe(invoice.items[0].price);
    expect(invoiceModel.items[0].createdAt).toBeDefined();
    expect(invoiceModel.items[0].updatedAt).toBeDefined();
    expect(invoiceModel.items[1].id).toBe(invoice.items[1].id.id);
    expect(invoiceModel.items[1].name).toBe(invoice.items[1].name);
    expect(invoiceModel.items[1].price).toBe(invoice.items[1].price);
    expect(invoiceModel.items[1].createdAt).toBeDefined();
    expect(invoiceModel.items[1].updatedAt).toBeDefined();
    expect(invoiceModel.createdAt).toBeDefined();
    expect(invoiceModel.updatedAt).toBeDefined();
  });
});
