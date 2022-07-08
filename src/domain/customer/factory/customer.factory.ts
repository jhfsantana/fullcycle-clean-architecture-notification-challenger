import Customer from "../entity/customer";
import Address from "../value-object/address";
import {v4 as uuid} from 'uuid';

export default class CustomerFactory {


    static create(name: string): Customer {

        const customer = new Customer(uuid(), name);
        return customer;
    }

    static createWithAddress(name: string, address: Address): Customer {

        const customer = new Customer(uuid(), name);
        customer.Address = address;
        customer.activate();

        return customer;
    }
}