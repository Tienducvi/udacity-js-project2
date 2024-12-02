import supertest from 'supertest';
import jwt, { Secret } from 'jsonwebtoken';
import { BaseUser, User, UserModel } from '../../models/user';
import app from '../../index';
import dotenv from 'dotenv';

require('dotenv').config({ path: '.env' });

dotenv.config();

const request = supertest(app);
const SECRET = process.env.TOKEN_SECRECT as Secret;
const user = new UserModel();
let userId : number;
let password : string;

describe('User Model', () => {

    it('should have an index method', () => {
        expect(user.showAll).toBeDefined();
      });
    
      it('should have a show method', () => {
        expect(user.show).toBeDefined();
      });
    
      it('should have a create method', () => {
        expect(user.create).toBeDefined();
      });
    
      it('should have a update method', () => {
        expect(user.update).toBeDefined();
      });
    
      it('should have a delete method', () => {
        expect(user.delete).toBeDefined();
      });
    
      it('create method should add a user', async () => {
        const result = await user.create({
            username: 'Vitd98',
            firstname: 'Vi',
            lastname: 'Tieu',
            password: 'password12345',
        });
        userId = result.id
        password = result.password
        expect(result).toEqual({
            id: userId,
            username: 'Vitd98',
            firstname: 'Vi',
            lastname: 'Tieu',
            password: password
        });
      });
    
      it('index method should return a list of users', async () => {
        const result = await user.showAll();
        expect(result.length).toBeGreaterThan(1);
      });
    
      it('show method should return the correct user', async () => {
        const result = await user.show(userId);
        expect(result).toEqual({
            id: userId,
            username: 'Vitd98',
            firstname: 'Vi',
            lastname: 'Tieu',
            password: password
        });
      });
    
      it('delete method should remove the user', async () => {
        const res = await user.delete(userId);             
        expect(res == 1).toBeTrue();
      });


})