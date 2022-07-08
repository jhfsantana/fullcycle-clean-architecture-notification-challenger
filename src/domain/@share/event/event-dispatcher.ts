import EventDispatcherInterface from "./event-dispatcher.interface";
import EventHandlerInterface from "./event-handler.interface";
import eventHandlerInterface from "./event-handler.interface";
import eventInterface from "./event.interface";

export default class EventDispatcher implements EventDispatcherInterface {

    private eventHandlers: {[eventName: string]: EventHandlerInterface[]}  = {}

    get getEventHandlers(): {[eventName: string]: EventHandlerInterface[]} {
        return this.eventHandlers;
    }

    register(eventName: string, eventHandler: eventHandlerInterface<eventInterface>): void {
        
        if(!this.eventHandlers[eventName]){
            this.eventHandlers[eventName] = [];
        }

        this.eventHandlers[eventName].push(eventHandler);

    }
    unregister(eventName: string, eventHandler: eventHandlerInterface<eventInterface>): void {
        const indexOfHandler = this.eventHandlers[eventName].indexOf(eventHandler);

        if(indexOfHandler != -1){
            this.eventHandlers[eventName].splice(indexOfHandler, 1);
        }
    }
    unregisterAll(): void {
        this.eventHandlers = {};

    }
    notify(event: eventInterface): void {
        const eventName = event.constructor.name;
        this.eventHandlers[eventName].forEach((eventHandler) => {
            eventHandler.handle(event);
        })
    }
}