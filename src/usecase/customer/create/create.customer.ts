import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer.repository-interface";
import Address from "../../../domain/customer/value-object/address";
import { InputCreateCustomerDto, OutputCreateCustomerDto } from "./create.customer.dto";


export default class CreateCustomerUseCase {

    private customerRepository: CustomerRepositoryInterface

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }

    async execute(input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {

        const customerFactory = CustomerFactory.createWithAddress(input.name,
            new Address(input.address.street,
                input.address.number,
                input.address.zip,
                input.address.city)
            );

            await this.customerRepository.create(customerFactory);

            return {
                id: customerFactory.id,
                name: customerFactory.name,
                address: {
                    street: customerFactory.address.street,
                    number: customerFactory.address.number,
                    zip: customerFactory.address.zip,
                    city: customerFactory.address.city
                }
            }
    }

}