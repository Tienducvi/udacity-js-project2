import supertest from 'supertest';
import jwt, { Secret } from 'jsonwebtoken';
import { Product, OrderProduct } from '../../models/product';
import app from '../../index';
import dotenv from 'dotenv';

require('dotenv').config({ path: '.env' });

dotenv.config();

const request = supertest(app);
const SECRET = process.env.TOKEN_SECRECT as Secret;
const product = new OrderProduct();
let productId : number;

describe('Product Model', () => {
    it('should have an index method', () => {
        expect(product.showAll).toBeDefined();
      });
    
      it('should have a show method', () => {
        expect(product.show).toBeDefined();
      });
    
      it('should have a create method', () => {
        expect(product.create).toBeDefined();
      });
    
      it('should have a update method', () => {
        expect(product.update).toBeDefined();
      });
    
      it('should have a delete method', () => {
        expect(product.delete).toBeDefined();
      });
    
      it('create method should add a product', async () => {
        const result = await product.create({
            name: 'Shirt',
            price: 29
        });
        productId = result.id
        expect(result).toEqual({
            id: result.id,
            name: 'Shirt',
            price: 29
        });
      });
    
      it('index method should return a list of products', async () => {
        const result = await product.showAll();
        expect(result.length).toBeGreaterThan(1);
      });
    
      it('show method should return the correct product', async () => {
        const result = await product.show(productId);
        expect(result).toEqual({
            id: productId,
            name: 'Shirt',
            price: 29
        });
      });
    
      it('delete method should remove the product', async () => {
        const res = await product.delete(productId);             
        expect(res == 1).toBeTrue();
      });


})