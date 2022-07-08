export default class Address {
    private _street: string = ""
    private _number: number = 0
    private _zip: string = ""
    private _city: string = ""

    constructor(street: string, number: number, zip: string, city: string) {
        this._street = street;
        this._number = number;
        this._zip = zip;
        this._city = city;

        this.validate();
    }

    get street (): string {
        return this,this._street;
    }
    
    get number (): number {
        return this,this._number;
    }
    get zip (): string {
        return this,this._zip;
    }
    get city (): string {
        return this,this._city;
    }

    validate() {
        if(this._street.length === 0)
            throw new Error("Street is required")
        if(this._number === 0 || this._number === undefined || this._number === null)
            throw new Error("Number is required")
        if(this._zip.length === 0)
            throw new Error("Zipcode is required")
        if(this._city.length === 0)
            throw new Error("City is required")
    }
}