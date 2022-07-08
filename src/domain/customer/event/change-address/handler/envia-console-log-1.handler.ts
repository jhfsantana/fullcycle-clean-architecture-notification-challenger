import EventHandlerInterface from "../../../../@share/event/event-handler.interface";
import CustomerChangeAddressEvent from "../customer-change-address.event";


export default class EnviaConsoleLog1Handler
 implements EventHandlerInterface<CustomerChangeAddressEvent> {
    
    handle(event: CustomerChangeAddressEvent): void {
        console.log(`Endereço do cliente: {${event.eventData.id}}, {${event.eventData.name}} alterado para:\n${event.eventData.address}`);
    }
}