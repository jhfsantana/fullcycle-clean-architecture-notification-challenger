import Entity from "../../@share/entity/entity.abstract";
import NotificationError from "../../@share/notification/notification.error";
import ProductInterface from "./product.interface";

export default class Product extends Entity implements ProductInterface{

    _id: string = ""
    _name: string = ""
    _price: number;

    constructor(id: string, name: string, price: number) {
        super();
        this._id = id;
        this._name = name;
        this._price = price;
        this.validate();
    }

    get id(): string {
        return this._id
    }
    
    get name(): string {
        return this._name
    }

    get price(): number {
        return this._price
    }

    changeName(name: string): void {
        this._name = name;
    }

    changePrice(price: number): void {
        this._price = price;
    }
    validate() {
        
        if(this._id.length === 0)
            this.notification.addError({
                message: "Id is required",
                context: 'product',
            });
        if(this._name.length === 0)
            this.notification.addError({
                message: "Name is required",
                context: 'product',
            });
        if(this._price < 0 || this._price === undefined) {
            this.notification.addError({
                message: "Price must be positive",
                context: 'product',
            });
        }

        if(this.notification.hasErrors())
            throw new NotificationError(this.notification.errors);
    }
}