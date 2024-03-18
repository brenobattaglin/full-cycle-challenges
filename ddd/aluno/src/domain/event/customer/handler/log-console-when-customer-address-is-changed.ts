import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerChangedAddressEvent from "../customer-changed-address-event";

export default class LogConsoleWhenCustomerAddressIsChangedHandler
  implements EventHandlerInterface<CustomerChangedAddressEvent>
{
  handle(event: CustomerChangedAddressEvent): void {
    console.log(`"Esse é o segundo console.log do evento: CustomerCreated": ${event.eventData.id}`);
  }
}
