import { app, sequelize } from '../express';
import request from 'supertest';

describe('e2e test for product', () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('should create a product', async () => {
        const response = await request(app)
            .post('/product')
            .send(
                {
                    name: 'Banana',
                    price: 10
                });
        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Banana');
        expect(response.body.price).toBe(10);
    });

    it('should not create a product', async () => {
        const response = await request(app)
            .post('/customer')
            .send(
                {
                    name: 'Banana',
                });
        expect(response.status).toBe(500);
    });

    it('should list all products', async () => {
        const firstResponse = await request(app)
            .post('/product')
            .send(
                {
                    name: 'Banana',
                    price: 10
                });
        expect(firstResponse.status).toBe(200);

        const secondResponse = await request(app)
            .post('/product')
            .send(
                {
                    name: 'Banana assada',
                    price: 20
                });
        expect(secondResponse.status).toBe(200);

        const listResponse = await request(app).get("/product").send();
        expect(listResponse.status).toBe(200);
        expect(listResponse.body.products.length).toBe(2);
        expect(listResponse.status).toBe(200);

        const firstCustomer = listResponse.body.products[0];
        expect(firstCustomer.name).toBe('Banana');
        expect(firstCustomer.price).toBe(10);

        const secondCustomer = listResponse.body.products[1];
        expect(secondCustomer.name).toBe('Banana assada');
        expect(secondCustomer.price).toBe(20);
    });
});