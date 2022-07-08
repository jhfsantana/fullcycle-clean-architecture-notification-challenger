import Entity from "../../@share/entity/entity.abstract";
import NotificationError from "../../@share/notification/notification.error";
import Address from "../value-object/address";

export default class Customer extends Entity{
    private _id: string;
    private _name: string;
    private _address?: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        super();
        this._id = id;
        this._name = name;
        this.validate();
    }
    
    get id (): string {
        return this._id;
    }

    get name (): string {
        return this._name;
    }

    get rewardPoints (): number {
        return this._rewardPoints;
    }

    get address (): Address {
        return this._address;
    }
    
    get fullAddress (): string {
        return `${this._address.street}, ${this._address.number}.\n${this._address.zip} ${this._address.city}`
    }

    isActive() : boolean {
        return this._active
    }
    
    validate() {
        if(this._name.length === 0)
            this.notification.addError({
                message: 'Name is required',
                context: 'customer'
            });
        if(this._id.length === 0)
            this.notification.addError({
                message: 'Id is required',
                context: 'customer'
            });

        if(this.notification.hasErrors())
            throw new NotificationError(this.notification.errors);
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    activate() {
        if(this._address === undefined) {
            this.notification.addError({
                message: 'Address is required to active a customer',
                context: 'customer'
            });
            throw new NotificationError(this.notification.errors);
        } else {
            this._active = true;
        }
    }

    deactivate() {
        this._active = false;
    }

    set Address(address: Address) {
        this._address = address
    }

    changeAddress(address: Address) {
        this._address = address
        this.validate();
    }
    
    addRewardsPoints(points: number) {
        this._rewardPoints += points;
    }
}