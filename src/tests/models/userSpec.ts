import supertest from 'supertest';
import jwt, { Secret } from 'jsonwebtoken';
import { BaseUser, User } from '../../models/user';
import app from '../../index';
import dotenv from 'dotenv';

require('dotenv').config({ path: '.env' });

dotenv.config();

const request = supertest(app);
const SECRET = process.env.TOKEN_SECRECT as Secret;

describe('User Handler', () => {
    const userData: BaseUser = {
        username: 'ViTieu988',
        firstname: 'Vi',
        lastname: 'Tieu',
        password: 'password12345',
    };
  
    let token: string,
    userId = 1;
  
    it('gets the create endpoint of user', async (done) => {
        const res = await request.post('/users').send(userData);
    
        const { body, status } = res;
        token = body;
    
        // @ts-ignore
        const { user } = jwt.verify(token, SECRET);
        userId = user.id;
    
        expect(status).toBe(200);
        done();
    });
  
    it('gets the index endpoint of user of user', async (done) => {
        const res = await request.get('/users').set('Authorization', 'bearer ' + token);
    
        expect(res.status).toBe(200);
        done();
    });
  
    it('gets the read endpoint of user', async (done) => {
        const res = await request.get(`/users/${userId}`).set('Authorization', 'bearer ' + token);
    
        expect(res.status).toBe(200);
        done();
    });
  
    it('gets the auth endpoint of user', async (done) => {
        const res = await request
        .post('/users/authenticate')
        .send({
            username: userData.username,
            password: userData.password,
        })
        .set('Authorization', 'bearer ' + token);
  
        expect(res.status).toBe(200);
        done();
    });
  
    it('gets the auth endpoint with wrong password of user', async (done) => {
        const res = await request
            .post('/users/authenticate')
            .send({
            username: userData.username,
            password: 'trtdtxcfcf',
            })
            .set('Authorization', 'bearer ' + token);
    
        expect(res.status).toBe(401);
        done();
    });

    it('gets the update endpoint of user', async (done) => {
        const newUserData: User = {
            id: userId,
            username: "ViTieu988",
            firstname: 'Vi',
            lastname: 'Tien123',
            password: 'password6789'
        };
  
        const res = await request
            .put(`/users`)
            .send(newUserData)
            .set('Authorization', 'bearer ' + token);
        userData.username = newUserData.username;
        userData.password = newUserData.password;

        expect(res.status).toBe(200);
        done();
    });
  
  
    it('gets the delete endpoint of user', async (done) => {
        const res = await request.delete(`/users/${userId}`).set('Authorization', 'bearer ' + token);
        expect(res.status).toBe(200);
        done();
    });
  });