import express, {Express} from 'express';
import { Sequelize } from 'sequelize-typescript';
import CustomerModel from '../db/sequelize/model/customer.model';
import ProductModel from '../db/sequelize/model/product.model';
import { customerRoute } from './routes/customer/customer.route';
import { productRoute } from './routes/product/product.route';

export const app: Express = express();
app.use(express.json());

app.use("/customers", customerRoute);
app.use("/products", productRoute);

export let sequelize: Sequelize

async function setupDb() {
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false
    });

    await sequelize.addModels([CustomerModel, ProductModel]);
    sequelize.sync();
}

setupDb();