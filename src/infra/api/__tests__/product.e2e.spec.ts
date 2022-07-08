
import {app, sequelize} from '../express';
import request from 'supertest';

describe('End-to-end tests for product', () => {

    beforeEach( async () => {
        await sequelize.sync({force: true});
    });

    afterAll( async () => {
        await sequelize.close();
    });

    it('should create a product', async () => {

        const response = await request(app)
        .post('/products')
        .send({
            name: "Camiseta Azul",
            price: 19.90
        });

        expect(response.status).toBe(201);
    });

    it('should return status 500 when name product is missing', async () => {

        const response = await request(app)
        .post('/products')
        .send({
            name: '',
            price: 19.90
        });

        expect(response.status).toBe(500);
    });

    it('should return status 500 when price product is negative', async () => {

        const response = await request(app)
        .post('/products')
        .send({
            name: "Camiseta Preta",
            price: -19.90
        });

        expect(response.status).toBe(500);
    });

    it('should return a product by id', async () => {

        const response = await request(app)
        .post('/products')
        .send({
            name: "Camiseta Preta",
            price: 19.90
        });

        expect(response.status).toBe(201);

        const id = response.body.id;
        const response2 = await request(app)
        .get(`/products/${id}`);

        expect(response2.status).toBe(200);
        expect(response2.body.id).toBe(id);
        expect(response2.body.name).toBe("Camiseta Preta");
        expect(response2.body.price).toBe(19.90);
    });

    it('should update a product', async () => {

        const response = await request(app)
        .post('/products')
        .send({
            name: "Camiseta Preta",
            price: 19.90
        });

        expect(response.status).toBe(201);

        const id = response.body.id;
        const response2 = await request(app)
        .put(`/products/${id}`)
        .send({
            name: 'Camiseta Azul',
            price: 29.90
        });

        expect(response2.status).toBe(200);
        expect(response2.body.name).toBe("Camiseta Azul");
        expect(response2.body.price).toBe(29.90);
    });

    it('should return all products', async () => {

        const response = await request(app)
        .post('/products')
        .send({
            name: "Camiseta Preta",
            price: 29.90
        });

        expect(response.status).toBe(201);

        const response2 = await request(app)
        .post('/products')
        .send({
            name: "Camiseta Azul",
            price: 19.90
        });

        expect(response2.status).toBe(201);
        
        const response3 = await request(app)
        .get('/products')
        
        expect(response3.status).toBe(200);
        expect(response3.body.products[0].name).toBe("Camiseta Preta");
        expect(response3.body.products[0].price).toBe(29.90);

        expect(response3.body.products[1].name).toBe("Camiseta Azul");
        expect(response3.body.products[1].price).toBe(19.90);
    });
});