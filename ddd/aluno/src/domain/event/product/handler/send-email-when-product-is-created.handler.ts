import EventHandlerInterface from "../../@shared/event-handler.interface";
import EventInterface from "../../@shared/event.interface";
import ProductCreatedEvent from "../product-created.event";

export default class SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface {
  handle(event: ProductCreatedEvent): void {
    console.log(`Sending email to the customer about the new product: ${event.eventData}`);
  }
}
