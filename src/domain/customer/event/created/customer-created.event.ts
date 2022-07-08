import EventInterface from "../../../@share/event/event.interface";

export default class CustomerCreatedEvent implements EventInterface {
    dateTimeOccured: Date;
    eventData: any;
    
    constructor(eventData: any) {
        this.eventData  = eventData;
        this.dateTimeOccured = new Date();
    }
}