export default interface ProductInterface {
    _id: string;
    _name: string;
    _price: number;

    get id () : string
    get name () : string
    get price () : number
}