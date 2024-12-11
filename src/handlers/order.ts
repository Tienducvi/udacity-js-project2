import express, { Request, Response } from 'express';
import { BaseOrder, Order, OrderModel } from '../models/order';
import { verifyToken } from './token'; 

const orderInstance = new OrderModel()

const index = async (_req: Request, res: Response) => {
    try {
        const orders = await orderInstance.showAll()
        res.json(orders)
    } catch (error) {
        console.error('Encoutner fetching issue:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
}

const show = async (req: Request, res: Response) => {
    try {
        let orderId : number = parseInt(req.params.id)
        const order = await orderInstance.show(orderId)
        res.json(order)
    } catch (error) {
        console.error('Encoutner fetching issue:', error);
        res.status(500).json({ error: 'Failed to fetch order' });
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const order: BaseOrder = {
            productId: req.body.productId,
            quantity: req.body.quantity,
            userId: req.body.userId,
            status: req.body.status
        }
        const newOrder = await orderInstance.create(order)
        res.json(newOrder)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const update = async (req: Request, res: Response) => {
    try {
        const order: Order = {
            id: req.body.id,
            productId: req.body.productId,
            quantity: req.body.quantity,
            userId: req.body.userId,
            status: req.body.status
        }
        const updateOrder = await orderInstance.update(order)
        res.json(updateOrder)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    try {
        const deleted = await orderInstance.delete(req.body.id)
        res.json(deleted)
    } catch (error) {
        console.error('Encoutner fetching issue:', error);
        res.status(500).json({ error: 'Failed to delete order' });
    }
}

const orderRoutes = (app: express.Application) => {
  app.get('/orders', index)
  app.get('/orders/:id', show)
  app.post('/orders', verifyToken, create)
  app.put('/orders', verifyToken, update)
  app.delete('/orders/:id', verifyToken, destroy)
}

export default orderRoutes