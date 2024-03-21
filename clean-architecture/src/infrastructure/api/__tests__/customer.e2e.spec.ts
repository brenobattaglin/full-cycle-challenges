import { app, sequelize } from '../express';
import request from 'supertest';

describe('e2e test for customer', () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('should create a customer', async () => {
        const response = await request(app)
            .post('/customer')
            .send(
                {
                    name: 'John Doe',
                    address: {
                        street: '123 Main St',
                        city: 'Anytown',
                        number: 123,
                        zip: '12345'
                    }
                });
        expect(response.status).toBe(200);
        expect(response.body.name).toBe('John Doe');
        expect(response.body.address.street).toBe('123 Main St');
        expect(response.body.address.city).toBe('Anytown');
        expect(response.body.address.number).toBe(123);
        expect(response.body.address.zip).toBe('12345');
    });

    it('should not create a customer', async () => {
        const response = await request(app)
            .post('/customer')
            .send(
                {
                    name: 'John Doe',
                    address: {
                        street: '123 Main St',
                        city: 'Anytown',
                        number: 123
                    }
                });
        expect(response.status).toBe(500);
    });

    it('should list all customers', async () => {
        const firstResponse = await request(app)
            .post('/customer')
            .send(
                {
                    name: 'John Doe',
                    address: {
                        street: '123 Main St',
                        city: 'Anytown',
                        number: 123,
                        zip: '12345'
                    }
                });
        expect(firstResponse.status).toBe(200);

        const secondResponse = await request(app)
            .post('/customer')
            .send(
                {
                    name: 'Jane Doe',
                    address: {
                        street: '123 Main St',
                        city: 'Anytown',
                        number: 123,
                        zip: '12345'
                    }
                });
        expect(secondResponse.status).toBe(200);

        const listResponse = await request(app).get("/customer").send();
        expect(listResponse.status).toBe(200);
        expect(listResponse.body.customers.length).toBe(2);
        expect(listResponse.status).toBe(200);

        const firstCustomer = listResponse.body.customers[0];
        expect(firstCustomer.name).toBe('John Doe');
        expect(firstCustomer.address.street).toBe('123 Main St');
        expect(firstCustomer.address.city).toBe('Anytown');
        expect(firstCustomer.address.number).toBe(123);
        expect(firstCustomer.address.zip).toBe('12345');

        const secondCustomer = listResponse.body.customers[1];
        expect(secondCustomer.name).toBe('Jane Doe');
        expect(secondCustomer.address.street).toBe('123 Main St');
        expect(secondCustomer.address.city).toBe('Anytown');
        expect(secondCustomer.address.number).toBe(123);
    });
});