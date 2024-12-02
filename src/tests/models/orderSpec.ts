import supertest from 'supertest';
import jwt, { Secret } from 'jsonwebtoken';
import { BaseOrder, Order } from '../../models/order';
import { BaseProduct, Product } from '../../models/product';
import { BaseUser } from '../../models/user';
import app from '../../index';
import dotenv from 'dotenv';

require('dotenv').config({ path: '.env' });

dotenv.config();

const request = supertest(app);
const SECRET = process.env.TOKEN_SECRECT as Secret;

describe('Order Handler', () => {
  const order: BaseOrder = {
    productId: 1,
    quantity: 20,
    userId:1,
    status:"0"
  };
  
  let token: string, userId: number, productId: number;

  beforeAll(async (done) => {
    const userData: BaseUser = {
      username: 'ViTieuOrder98',
      firstname: 'Vi',
      lastname: 'Tieu',
      password: 'password12345',
    };

    const { body } = await request.post('/users').send(userData);
    
    token = body;
    
    // @ts-ignore
    const { user } = jwt.verify(body, SECRET);
    userId = user.id;

    const product: BaseProduct = {
      name: 'Shirt',
      price: 29,
    };

    // @ts-ignore
    const res : Product = await request
      .post('/products')
      .send(product)
      .set('Authorization', 'bearer ' + token);

      productId = res.id

    done()
  })

  afterAll(async (done) => {
    await request.delete(`/users/${userId}`).set('Authorization', 'bearer ' + token);
    await request.delete(`/products/${productId}`).set('Authorization', 'bearer ' + token);
    done()
  });
  
  beforeAll(async (done) => {
    const userData: BaseUser = {
      username: 'ViTieu1002',
      firstname: 'Vi',
      lastname: 'Tieu',
      password: 'password12345',
    };

    const { body } = await request.post('/users').send(userData);
    
    token = body;
    
    // @ts-ignore
    const { user } = jwt.verify(body, SECRET);
    userId = user.id;
    done()
  })

  afterAll(async (done) => {
    await request.delete(`/users/${userId}`).set('Authorization', 'bearer ' + token);
    done()
  });

  it('gets the create endpoint of order', async (done) => {
    const res = await request
      .post('/orders')
      .send(order)
      .set('Authorization', 'bearer ' + token);
    expect(res.status).toEqual(200);
    done()
  });

  it('gets the index endpoint of order', async (done) => {
    const res = await request.get('/orders');
    expect(res.status).toBe(200);
    done()
  });

  it('gets the read endpoint of order', async (done) => {
    const res = await request.get(`/orders/2`);
    expect(res.status).toBe(200);
    done()
  });

  it('gets the update endpoint of order', async (done) => {
    const newOrderData: Order = {
      id: 1,
      productId: 1,
      quantity: 20,
      userId:1,
      status:"0"
    };
    const res = await request
      .put(`/orders`)
      .send(newOrderData)
      .set('Authorization', 'bearer ' + token);

    expect(res.status).toBe(200);
    done()
  });

  it('gets the delete endpoint of order', async (done) => {
    const res = await request.delete(`/orders/1`).set('Authorization', 'bearer ' + token);
    expect(res.status).toBe(200);
    done()
  });
});