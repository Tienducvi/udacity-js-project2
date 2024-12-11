import { log } from "console";
import client from "../database";
import { Pool, PoolClient } from 'pg';

export interface BaseProduct {   
    name: string;
    price: number;
}

export interface Product {
    id: number;
    name: string;
    price: number;
}

export class OrderProduct {
    async update(productParam: Product): Promise<Product> {
        const sql = 'UPDATE products SET name = ($2), price = ($3) WHERE id=($1) RETURNING *';
        const values = [productParam.id, productParam.name, productParam.price];
        let Client!: PoolClient;
        let product : Product;
        try {
            Client = await client.connect();

            const result = await Client.query({
                text: sql,
                values: values,
            });
            product = result.rows[0];
            return product;
        } catch (error) {
            console.error("Encounter products issue:", error);
            throw error;
        } finally {
            if (Client) {
                Client.release();
            }
        }
    }

    async show(id: number): Promise<Product> {
        const sql = 'SELECT * FROM products WHERE id=($1)';
        const values = [id];
        let Client!: PoolClient;
        let product : Product;
        try {
            Client = await client.connect();

            const result = await Client.query({
                text: sql,
                values: values,
            });
            product = result.rows[0];
            
            return product;
        } catch (error) {
            console.error("Encounter products issue:", error);
            throw error;
        } finally {
            if (Client) {
                Client.release();
            }
        }
    }

    async showAll(): Promise<Product[]> {
        const sql = 'SELECT * FROM products';
        let Client!: PoolClient;
        let productList : Product[];
        try {
            Client = await client.connect();

            const result = await Client.query({
                text: sql,
            });
            productList = result.rows;
            return productList;
        } catch (error) {
            console.error("Encounter products issue:", error);
            throw error;
        } finally {
            if (Client) {
                Client.release();
            }
        }
    }

    async create(b: BaseProduct): Promise<Product> {
        const sql = 'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *';
        const values = [b.name, b.price];
        let Client!: PoolClient;
        try {
            Client = await client.connect();

            const result = await Client.query({
                text: sql,
                values: values,
            });

            return result.rows[0];
        } catch (error) {
            console.error("Encounter products issue:", error);
            throw error;
        } finally {
            if (Client) {
                Client.release();
            }
        }      
    }

    async delete(id: number): Promise<number> {
        const sql = 'DELETE FROM products WHERE id=($1)';
        const values = [id];
        let Client!: PoolClient;
        try {
            Client = await client.connect();

            const result = await Client.query({
                text: sql,
                values: values,
            });

            return 1;
        } catch (error) {
            console.error("Encounter products issue:", error);
            throw error;
        } finally {
            if (Client) {
                Client.release();
            }
        }
    }
}