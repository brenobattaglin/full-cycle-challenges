import Address from "../../customer/value-object/address";
import Customer from "../../customer/entity/customer";
import CustomerChangedAddressEvent from "../../customer/event/customer-changed-address-event";
import CustomerCreatedEvent from "../../customer/event/customer-created.event";
import LogConsoleWhenCustomerAddressIsChangedHandler from "../../customer/event/handler/log-console-when-customer-address-is-changed";
import LogConsoleWhenCustomerIsCreatedHandler from "../../customer/event/handler/log-console-when-customer-is-created";
import LogSecondConsoleWhenCustomerIsCreatedHandler from "../../customer/event/handler/log-second-console-when-customer-is-created";
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain event tests", () => {
  describe("Product events", () => {
    it("should register an event handler", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendEmailWhenProductIsCreatedHandler();

      eventDispatcher.register("ProductCreatedEvent", eventHandler);

      expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
      expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
      expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
    });

    it("should unregister an event handler", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendEmailWhenProductIsCreatedHandler();

      eventDispatcher.register("ProductCreatedEvent", eventHandler);
      expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

      eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
      expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);
    });

    it("should unregister all event handlers", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendEmailWhenProductIsCreatedHandler();

      eventDispatcher.register("ProductCreatedEvent", eventHandler);
      expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

      eventDispatcher.unregisterAll();
      expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();
    });

    it("should notify all event handlers", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendEmailWhenProductIsCreatedHandler();
      const spyEventHandler = jest.spyOn(eventHandler, "handle");

      eventDispatcher.register("ProductCreatedEvent", eventHandler);

      expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

      const productCreatedEvent = new ProductCreatedEvent({
        name: "Product 1",
        description: "Description",
        price: 10.0,
      });

      // Quando o notify for chamado, o método SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
      eventDispatcher.notify(productCreatedEvent);
      expect(spyEventHandler).toHaveBeenCalled();
    });
  });

  describe("Customer events", () => {
    it("should register event handlers", () => {
      const eventDispatcher = new EventDispatcher();
      const firstEventHandler = new LogConsoleWhenCustomerIsCreatedHandler();
      const secondEventHandler = new LogSecondConsoleWhenCustomerIsCreatedHandler();
      const thirdEventHandler = new LogConsoleWhenCustomerAddressIsChangedHandler();

      eventDispatcher.register("CustomerCreatedEvent", firstEventHandler);
      eventDispatcher.register("CustomerCreatedEvent", secondEventHandler);
      eventDispatcher.register("CustomerChangedAddressEvent", thirdEventHandler);

      expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
      expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);
      expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(firstEventHandler);
      expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(secondEventHandler);

      expect(eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"]).toBeDefined();
      expect(eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"].length).toBe(1);
      expect(eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"][0]).toMatchObject(thirdEventHandler);
    });

    it("should unregister an event handler", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new LogConsoleWhenCustomerIsCreatedHandler();

      eventDispatcher.register("CustomerCreatedEvent", eventHandler);
      expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler);

      eventDispatcher.unregister("CustomerCreatedEvent", eventHandler);
      expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(0);
    });

    it("should unregister all event handlers", () => {
      const eventDispatcher = new EventDispatcher();
      const firstEventHandler = new LogConsoleWhenCustomerIsCreatedHandler();
      const secondEventHandler = new LogSecondConsoleWhenCustomerIsCreatedHandler();
      const thirdEventHandler = new LogConsoleWhenCustomerAddressIsChangedHandler();

      eventDispatcher.register("CustomerCreatedEvent", firstEventHandler);
      eventDispatcher.register("CustomerCreatedEvent", secondEventHandler);
      eventDispatcher.register("CustomerChangedAddressEvent", thirdEventHandler);

      expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(firstEventHandler);
      expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(secondEventHandler);
      expect(eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"][0]).toMatchObject(thirdEventHandler);

      eventDispatcher.unregisterAll();
      expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeUndefined();
      expect(eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"]).toBeUndefined();
    });

    it("should notify all event handlers", () => {
      const eventDispatcher = new EventDispatcher();
      const firstEventHandler = new LogConsoleWhenCustomerIsCreatedHandler();
      const secondEventHandler = new LogSecondConsoleWhenCustomerIsCreatedHandler();
      const thirdEventHandler = new LogConsoleWhenCustomerAddressIsChangedHandler();
      const spyFirstEventHandler = jest.spyOn(firstEventHandler, "handle");
      const spySecondEventHandler = jest.spyOn(secondEventHandler, "handle");
      const spyThirdEventHandler = jest.spyOn(thirdEventHandler, "handle");

      eventDispatcher.register("CustomerCreatedEvent", firstEventHandler);
      eventDispatcher.register("CustomerCreatedEvent", secondEventHandler);
      eventDispatcher.register("CustomerChangedAddressEvent", thirdEventHandler);

      expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(firstEventHandler);
      expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(secondEventHandler);
      expect(eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"][0]).toMatchObject(thirdEventHandler);

      const customer = new Customer("1", "Customer 1");
      const customerCreatedEvent = new CustomerCreatedEvent(customer);
      customer.changeAddress(new Address("Street 1", 123, "8800088", "Varginha"));
      const customerChangedAddressEvent = new CustomerChangedAddressEvent(customer);

      eventDispatcher.notify(customerCreatedEvent);
      eventDispatcher.notify(customerChangedAddressEvent);
      expect(spyFirstEventHandler).toHaveBeenCalled();
      expect(spySecondEventHandler).toHaveBeenCalled();
      expect(spyThirdEventHandler).toHaveBeenCalled();
    });
  });
});
