
import {app, sequelize} from '../express';
import request from 'supertest';

describe('End-to-end tests for customer', () => {


    beforeEach( async () => {
        await sequelize.sync({force: true});
    });

    afterAll( async () => {
        await sequelize.close();
    });

    it('should create a customer', async () => {
        const response = await request(app)
            .post('/customers')
            .send({
                name: 'Jorge',
                address: {
                    street: 'Rua 1',
                    number: 10,
                    zip: '21802-921',
                    city: 'RJ'
                }
            });
        
        expect(response.status).toBe(201);
        expect(response.body.name).toBe('Jorge');
        expect(response.body.address.street).toBe('Rua 1');
        expect(response.body.address.number).toBe(10);
        expect(response.body.address.zip).toBe('21802-921');
        expect(response.body.address.city).toBe('RJ');
    });

    it('should return status 500 when missing mandatory attribute', async () => {
        const response = await request(app)
            .post('/customers')
            .send({
                name: '',
                address: {
                    street: 'Rua 1',
                    number: 10,
                    zip: '21802-921',
                    city: 'RJ'
                }
            });
        
        expect(response.status).toBe(500);
    });

    it('should return a customer by id', async () => {
        const response = await request(app)
            .post('/customers')
            .send({
                name: 'Jorge',
                address: {
                    street: 'Rua 1',
                    number: 10,
                    zip: '21802-921',
                    city: 'RJ'
                }
            });

        expect(response.status).toBe(201);
        expect(response.body.name).toBe('Jorge');
        
        const id = response.body.id;

        const response2 = await request(app)
            .get(`/customers/${id}`);
        
        expect(response2.status).toBe(200);
        expect(response2.body.id).toBe(id);
        expect(response2.body.name).toBe('Jorge');
    });

    it('should update a customer', async () => {
        const response = await request(app)
            .post('/customers')
            .send({
                name: 'Jorge',
                address: {
                    street: 'Rua 1',
                    number: 10,
                    zip: '21802-921',
                    city: 'RJ'
                }
            });

        expect(response.status).toBe(201);
        
        const id = response.body.id;

        const dto = {
            name: 'Jorge Updated',
            address: {
                street: 'Rua 1 Updated',
                number: 11,
                zip: '1234-234',
                city: 'RJ Updated'
            }
        };
        const response2 = await request(app)
            .put(`/customers/${id}`)
            .send(dto);
        
        expect(response2.status).toBe(200);
        expect(response2.body.id).toBe(id);
        expect(response2.body.name).toBe(dto.name);
        expect(response2.body.address.street).toBe(dto.address.street);
        expect(response2.body.address.number).toBe(dto.address.number);
        expect(response2.body.address.zip).toBe(dto.address.zip);
        expect(response2.body.address.city).toBe(dto.address.city);
    });

    it('should return all customers', async () => {
        const response = await request(app)
            .post('/customers')
            .send({
                name: 'Jorge',
                address: {
                    street: 'Rua 1',
                    number: 10,
                    zip: '21802-921',
                    city: 'RJ'
                }
            });

        const response2 = await request(app)
            .post('/customers')
            .send({
                name: 'Isabela',
                address: {
                    street: 'Rua 1',
                    number: 10,
                    zip: '21802-921',
                    city: 'RJ'
                }
            });
        
        expect(response.status).toBe(201);        
        expect(response2.status).toBe(201);

        const response3 = await request(app)
        .get('/customers');

        expect(response3.status).toBe(200);
        expect(response3.body.customers.length).toBe(2);
        expect(response3.body.customers[0].name).toBe('Jorge');
        expect(response3.body.customers[0].address.street).toBe('Rua 1');
        expect(response3.body.customers[0].address.number).toBe(10);
        expect(response3.body.customers[0].address.zip).toBe('21802-921');
        expect(response3.body.customers[0].address.city).toBe('RJ');

        expect(response3.body.customers[1].name).toBe('Isabela');
        expect(response3.body.customers[1].address.street).toBe('Rua 1');
        expect(response3.body.customers[1].address.number).toBe(10);
        expect(response3.body.customers[1].address.zip).toBe('21802-921');
        expect(response3.body.customers[1].address.city).toBe('RJ');

    });
});