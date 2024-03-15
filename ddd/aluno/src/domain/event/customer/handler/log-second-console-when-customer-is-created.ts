import EventHandlerInterface from "../../@shared/event-handler.interface";
import EventInterface from "../../@shared/event.interface";
import CustomerChangedAddressEvent from "../customer-changed-address-event";

export default class LogSecondConsoleWhenCustomerIsCreatedHandler implements EventHandlerInterface {
  handle(event: CustomerChangedAddressEvent): void {
    console.log(
      `"Endereço do cliente:" + ${event.eventData.id} +", "+ ${event.eventData.name} +" alterado para: "+ ${event.eventData.address}`,
    );
  }
}
