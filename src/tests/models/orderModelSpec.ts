import supertest from 'supertest';
import jwt, { Secret } from 'jsonwebtoken';
import { Order, OrderModel } from '../../models/order';
import { BaseProduct, Product, OrderProduct} from '../../models/product';
import { BaseUser, User, UserModel} from '../../models/user';
import app from '../../index';
import dotenv from 'dotenv';

require('dotenv').config({ path: '.env' });

dotenv.config();

const request = supertest(app);
const SECRET = process.env.TOKEN_SECRECT as Secret;
const order = new OrderModel();
const user = new UserModel();
const productInstance = new OrderProduct();
let orderId : number, orderInstace : Order;

describe('Order Model', () => {

    let userId: number, productId: number;
  
    it('should have an index method', () => {
        expect(order.showAll).toBeDefined();
      });
    
      it('should have a show method', () => {
        expect(order.show).toBeDefined();
      });
    
      it('should have a create method', () => {
        expect(order.create).toBeDefined();
      });
    
      it('should have a update method', () => {
        expect(order.update).toBeDefined();
      });
    
      it('should have a delete method', () => {
        expect(order.delete).toBeDefined();
      });
    
      it('create method should add a order', async () => {
        const userData: BaseUser = {
          username: 'ViTieuOrder9888',
          firstname: 'Vi',
          lastname: 'Tieu',
          password: 'password12345',
        };
  
        const res = await user.create(userData)
  
        const product: BaseProduct = {
          name: 'Shirt',
          price: 29,
        };
  
        const resProduct = await productInstance.create(product);
  
        productId = resProduct.id       
        userId = res.id
        const result = await order.create({
            productId: resProduct.id,
            quantity: 20,
            userId:res.id,
            status:"0"
        });
        console.log("orderId: " + result.id);
        console.log('userId ' + userId);
        console.log('productId ' + productId);
        orderId =  result.id;

        expect(result).toEqual({
            id: orderId,
            productId: productId,
            quantity: 20,
            userId: userId,
            status:"0"
        });
      });
    
      it('index method should return a list of orders', async () => {
        const result = await order.showAll();
        expect(result.length).toBeGreaterThanOrEqual(1);
      });
    
      it('show method should return the correct order', async () => {
        const result = await order.show(orderId);
        expect(result).toEqual({
            id: orderId,
            productId: productId,
            quantity: 20,
            userId: userId,
            status:"0"
        });
      });
    
      it('delete method should remove the order', async () => {
        const res = await order.delete(orderId);             
        expect(res == 1).toBeTrue();
      });
})