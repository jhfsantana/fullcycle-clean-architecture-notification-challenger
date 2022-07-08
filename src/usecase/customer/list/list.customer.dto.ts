
export interface InputListCustomerDto {}

type CustomerOutput = {
    id: string,
    name: string,
    address: {
        street: string,
        number: number,
        zip: string,
        city: string
    }
}
export interface OutputListCustomerDto {
    customers: CustomerOutput[]
}