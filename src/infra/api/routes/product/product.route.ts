import express, {Request, Response} from 'express';
import CreateProductUseCase from '../../../../usecase/product/create/create.product';
import FindProductUseCase from '../../../../usecase/product/find/find.product';
import ListProductUseCase from '../../../../usecase/product/list/list.product';
import UpdateProductUseCase from '../../../../usecase/product/update/update.product';
import ProductSequelizeRepository from '../../../repository/product.sequelize.repository';


export const productRoute = express.Router();

productRoute.post('/', async (req: Request, res: Response) => {


    const usecase = new CreateProductUseCase(new ProductSequelizeRepository());
    try {

        const productDto = {
            name: req.body.name,
            price: req.body.price,
        };

        const product = await usecase.execute(productDto);

        res.status(201).send(product);
    } catch (err) {
        res.status(500).send({error: err});
    }
});

productRoute.get('/:id', async (req: Request, res: Response) => {

    const usecase = new FindProductUseCase(new ProductSequelizeRepository());
    try {

        const productDto = {
            id: req.params.id,
        };

        const product = await usecase.execute(productDto);

        res.status(200).send(product);
    } catch (err) {
        res.status(500).send({error: err});
    }
});

productRoute.put('/:id', async (req: Request, res: Response) => {

    const usecase = new UpdateProductUseCase(new ProductSequelizeRepository());
    try {

        const productDto = {
            id: req.params.id,
            name: req.body.name,
            price: req.body.price,
        };

        const product = await usecase.execute(productDto);

        res.status(200).send(product);
    } catch (err) {
        res.status(500).send({error: err});
    }
});

productRoute.get('/', async (req: Request, res: Response) => {

    const usecase = new ListProductUseCase(new ProductSequelizeRepository());
    try {

        const products = await usecase.execute({});
        res.status(200).send(products);
    } catch (err) {
        res.status(500).send({error: err});
    }
});