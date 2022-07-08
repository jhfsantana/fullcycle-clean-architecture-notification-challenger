import express, { Request, Response} from 'express';
import CreateCustomerUseCase from '../../../../usecase/customer/create/create.customer';
import FindCustomerUseCase from '../../../../usecase/customer/find/find.customer';
import ListCustomerUseCase from '../../../../usecase/customer/list/list.customer';
import UpdateCustomerUseCase from '../../../../usecase/customer/update/update.customer';
import CustomerSequelizeRepository from '../../../repository/customer.sequelize.repository';

export const customerRoute = express.Router();

customerRoute.post('/', async (req: Request, res: Response) => {
    try {
        const usecase = new CreateCustomerUseCase(new CustomerSequelizeRepository());

        const customerDto = {
            name: req.body.name,
            address: {
                street: req.body.address.street,
                number: req.body.address.number,
                zip: req.body.address.zip,
                city: req.body.address.city
            }
        };

        const customer = await usecase.execute(customerDto);

        return res.status(201).send(customer);

    } catch(err) {
        return res.status(500).send({error: err});
    }
});

customerRoute.get('/', async (req: Request, res: Response) => {
    try {
        const usecase = new ListCustomerUseCase(new CustomerSequelizeRepository());
        const customers = await usecase.execute({});

        return res.status(200).send(customers);
    } catch(err) {
        return res.status(500).send({error: err});
    }
});

customerRoute.get('/:id', async (req: Request, res: Response) => {
    try {
        const usecase = new FindCustomerUseCase(new CustomerSequelizeRepository());
        const customerDto = {
            id: req.params.id
        }
        
        const customer = await usecase.execute(customerDto);

        return res.status(200).send(customer);
    } catch(err) {
        return res.status(500).send({error: err});
    }
});

customerRoute.put('/:id', async (req: Request, res: Response) => {
    try {
        const usecase = new UpdateCustomerUseCase(new CustomerSequelizeRepository());
        const customerDto = {
            id: req.params.id,
            name: req.body.name,
            address: {
                street: req.body.address.street,
                number: req.body.address.number,
                zip: req.body.address.zip,
                city: req.body.address.city,
            },
        }
        
        const customer = await usecase.execute(customerDto);

        return res.status(200).send(customer);
    } catch(err) {
        return res.status(500).send({error: err});
    }
});