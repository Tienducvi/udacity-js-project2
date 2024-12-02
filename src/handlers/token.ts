import jwt, { Secret } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

export const verifyToken = ( req: Request, res: Response, next: NextFunction ) => {
    if (!req.headers.authorization) {
        res.status(401).json({ error: 'Access denied' });
        return false;
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.TOKEN_SECRECT as string);
        next();
    } catch (error) {
        res.status(401);
        res.json('Access denied');
        return;
    }
  };