import EventDispatcher from "../../@share/event/event-dispatcher";
import Address from "../../customer/value-object/address";
import Customer from "../entity/customer";
import CustomerChangeAddressEvent from "./change-address/customer-change-address.event";
import EnviaConsoleLog1Handler from "./change-address/handler/envia-console-log-1.handler";

describe("Customer change address tests", () => {

    it('should register an event handler', () => {
        
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaConsoleLog1Handler();
        
        eventDispatcher.register("CustomerChangeAddressEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"])
        .toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"].length)
        .toBe(1);
        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"][0])
        .toEqual(eventHandler);
    });

    it('should unregister an event handler', () => {
        
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaConsoleLog1Handler();
        
        eventDispatcher.register("CustomerChangeAddressEvent", eventHandler);
        
        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"])
        .toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"].length)
        .toBe(1);
        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"][0])
        .toEqual(eventHandler);

        eventDispatcher.unregister("CustomerChangeAddressEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"].length).toBe(0);
    });

    it('should unregister all events handler', () => {
        
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaConsoleLog1Handler();
        
        eventDispatcher.register("CustomerChangeAddressEvent", eventHandler);
        
        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"])
        .toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"].length)
        .toBe(1);
        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"][0])
        .toEqual(eventHandler);

        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"]).toBeUndefined();
    });

    it('should notify all handlers when customer change address', () => {

        const eventDispatcher = new EventDispatcher();
        const emailHandler = new EnviaConsoleLog1Handler();
        
        const spyEmailHandler = jest.spyOn(emailHandler, "handle");


        eventDispatcher.register("CustomerChangeAddressEvent", emailHandler);

        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"][0])
        .toEqual(emailHandler);

        const customer = new Customer("1", "Jorge Henrique");
        const spyChangeAddress = jest.spyOn(customer, "changeAddress");
        const address = new Address("Rua Rio da Prata", 10, "21820-097", "RJ");
        customer.Address = address;
        customer.activate();

        const address2 = new Address("Rua Gastão Tojeiro", 10, "21820-490", "RJ");
        customer.changeAddress(address2);

        expect(spyChangeAddress).toHaveBeenCalled();
        
        const customerChangeAddressEvent = new CustomerChangeAddressEvent({
            id: customer.id,
            name: customer.name,
            address: customer.fullAddress
        });

        eventDispatcher.notify(customerChangeAddressEvent);

        expect(spyEmailHandler).toHaveBeenCalled();
    });
});