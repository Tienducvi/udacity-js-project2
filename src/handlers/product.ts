import express, { Request, Response } from 'express';
import { BaseProduct, Product, OrderProduct } from '../models/product'; 
import { verifyToken } from './token';

const productInstance = new OrderProduct()

const index = async (_req: Request, res: Response) => {
    try {
        const products = await productInstance.showAll()
        res.json(products)
    } catch (error) {
        console.error('Encoutner fetching issue:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
}

const show = async (req: Request, res: Response) => {
    try {
        let productId : number = parseInt(req.params.id)
        const product = await productInstance.show(productId)
        res.json(product)
    } catch (error) {
        console.error('Encoutner fetching issue:', error);
        res.status(500).json({ error: 'Failed to fetch product' });
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const product: BaseProduct = {
            name: req.body.name,
            price: req.body.price,
        }
        const newProduct = await productInstance.create(product)
        res.status(200).json(newProduct)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const update = async (req: Request, res: Response) => {
    try {
        const product: Product = {
            id: req.body.id,
            name: req.body.name,
            price: req.body.price,
        }
        const updateProduct = await productInstance.update(product)
        res.status(200).json(updateProduct)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    try {
        const deleted = await productInstance.delete(req.body.id)
        res.json(deleted)
    } catch (error) {
        console.error('Encoutner fetching issue:', error);
        res.status(500).json({ error: 'Failed to delete product' });
    }
}

const productRoutes = (app: express.Application) => {
  app.get('/products', index)
  app.get('/products/:id', show)
  app.post('/products', verifyToken,  create)
  app.put('/products', verifyToken, update)
  app.delete('/products/:id', verifyToken, destroy)
}

export default productRoutes