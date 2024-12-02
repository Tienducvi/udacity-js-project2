import express, { Request, Response } from 'express';
import { BaseUser, User, UserModel } from '../models/user'; 
import jwt, { Secret } from 'jsonwebtoken';
import { verifyToken } from './token';
import dotenv from 'dotenv';

require('dotenv').config({ path: '.env' });

dotenv.config();

const userInstance = new UserModel()

const index = async (_req: Request, res: Response) => {
  const users = await userInstance.showAll()
  res.json(users)
}

const show = async (req: Request, res: Response) => {
    let userId : number = parseInt(req.params.id)
   const user = await userInstance.show(userId)
   res.json(user)
}

const create = async (req: Request, res: Response) => {
    try {
        const user: BaseUser = {
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password
        }
        const newUser = await userInstance.create(user)        
        let token = jwt.sign({ user: newUser}, process.env.TOKEN_SECRECT as string);
        res.json(token)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const update = async (req: Request, res: Response) => {
    try {
        const user: User = {
            id: req.body.id,
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password,
        }
        const updateUser = await userInstance.update(user)
        res.json(updateUser)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    const deleted = await userInstance.delete(req.body.id)
    res.json(deleted)
}

const authenticate = async (req: Request, res: Response) => {
    const user = {
      username: req.body.username,
      password: req.body.password
    }
    try {
        const u = await userInstance.authenticate(user.username, user.password)
        if(!u) {
            return res.status(401).send('Wrong password!');
        }
        var token = jwt.sign({ u }, process.env.TOKEN_SECRECT as string);
        
        res.json(token)
    } catch(error) {      
        res.status(401)
        res.json({ error })
    }
}

const userRoutes = (app: express.Application) => {
  app.get('/users', index)
  app.get('/users/:id', show)
  app.post('/users', create)
  app.put('/users', verifyToken, update)
  app.delete('/users/:id', verifyToken, destroy)
  app.post('/users/authenticate', authenticate)
}

export default userRoutes