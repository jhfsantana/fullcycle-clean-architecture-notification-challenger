import ProductRepositoryInterface from "../../../domain/product/repository/product.repository-interface";
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto";


export default class FindProductUseCase {
    private productRepository: ProductRepositoryInterface

    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository  = productRepository;
    }

    async execute(input: InputFindProductDto): Promise<OutputFindProductDto> {
        const productModel = await this.productRepository.find(input.id)

        return {
            id: productModel.id,
            name: productModel.name,
            price: productModel.price
        }
    }
}