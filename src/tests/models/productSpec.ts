import supertest from 'supertest';
import jwt, { Secret } from 'jsonwebtoken';
import { BaseProduct, Product } from '../../models/product';
import { BaseUser } from '../../models/user';
import app from '../../index';
import dotenv from 'dotenv';

require('dotenv').config({ path: '.env' });

dotenv.config();

const request = supertest(app);
const SECRET = process.env.TOKEN_SECRECT as Secret;

describe('Product Handler', () => {
  const product: BaseProduct = {
    name: 'Shirt',
    price: 29,
  };
  
  let token: string, userId: number;

  beforeAll(async (done) => {
    const userData: BaseUser = {
      username: 'ViTieu',
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

  it('gets the create endpoint of product', async (done) => {
    const res = await request
      .post('/products')
      .send(product)
      .set('Authorization', 'bearer ' + token);
    expect(res.status).toEqual(200);
    done()
  });

  it('gets the index endpoint of product', async (done) => {
    const res = await request.get('/products');
    expect(res.status).toBe(200);
    done()
  });

  it('gets the read endpoint of product', async (done) => {
    const res = await request.get(`/products/1`);
    expect(res.status).toBe(200);
    done()
  });

  it('gets the update endpoint of product', async (done) => {
    const newProductData: Product = {
      id: 1,
      name: 'Shoes',
      price: 234,
    };
    const res = await request
      .put(`/products`)
      .send(newProductData)
      .set('Authorization', 'bearer ' + token);

    expect(res.status).toBe(200);
    done()
  });

  it('gets the delete endpoint of product', async (done) => {
    const res = await request.delete(`/products/2`).set('Authorization', 'bearer ' + token);
    expect(res.status).toBe(200);
    done()
  });
});