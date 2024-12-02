import { log } from "console";
import client from "../database";
import { Pool, PoolClient } from 'pg';

export interface BaseOrder {   
    productId: number;
    quantity: number;
    userId: number;
    status: string;
}

export interface Order {
    id: number;
    productId: number;
    quantity: number;
    userId: number;
    status: string;
}

export class OrderModel {
    async update(orderParam: Order): Promise<Order> {
        const sql = 'UPDATE orders SET product_id = ($2), quantity = ($3), user_id = ($4), status = ($5) WHERE id=($1) RETURNING *';
        const values = [orderParam.id, orderParam.productId, orderParam.quantity, orderParam.userId, orderParam.status];
        let Client!: PoolClient;
        let order : Order;
        try {
            Client = await client.connect();

            const result = await Client.query({
                text: sql,
                values: values,
            });
            order = result.rows[0];
            return order;
        } catch (error) {
            console.error("Error while inserting orders:", error);
            throw error;
        } finally {
            if (Client) {
                Client.release();
            }
        }
    }

    async show(id: number): Promise<Order> {
        const sql = 'SELECT * FROM orders WHERE id=($1)';
        const values = [id];
        let Client!: PoolClient;
        let order : Order;
        try {
            Client = await client.connect();

            const result = await Client.query({
                text: sql,
                values: values,
            });
            
            return Promise.resolve({
                id: result.rows[0].id,
                productId: result.rows[0].product_id,
                quantity: result.rows[0].quantity,
                userId: result.rows[0].user_id,
                status: result.rows[0].status
            });
        } catch (error) {
            console.error("Error while inserting orders:", error);
            throw error;
        } finally {
            if (Client) {
                Client.release();
            }
        }
    }

    async showAll(): Promise<Order[]> {
        const sql = 'SELECT * FROM orders';
        let Client!: PoolClient;
        let orderList : Order[];
        try {
            Client = await client.connect();

            const result = await Client.query({
                text: sql,
            });
            orderList = result.rows;

            return orderList;
        } catch (error) {
            console.error("Error while inserting orders:", error);
            throw error;
        } finally {
            if (Client) {
                Client.release();
            }
        }
    }

    async create(b: BaseOrder): Promise<Order> {
        const sql = 'INSERT INTO orders (product_id, quantity, user_id, status) VALUES($1, $2, $3, $4) RETURNING *';
        const values = [b.productId, b.quantity, b.userId, b.status];
        let Client!: PoolClient;
        try {
            Client = await client.connect();

            const result = await Client.query({
                text: sql,
                values: values,
            });

            return Promise.resolve({
                id: result.rows[0].id,
                productId: result.rows[0].product_id,
                quantity: result.rows[0].quantity,
                userId: result.rows[0].user_id,
                status: result.rows[0].status
            });
        } catch (error) {
            console.error("Error while inserting orders:", error);
            throw error;
        } finally {
            if (Client) {
                Client.release();
            }
        }      
    }

    async delete(id: number): Promise<number> {
        const sql = 'DELETE FROM orders WHERE id=($1)';
        const values = [id];
        let Client!: PoolClient;
        try {
            Client = await client.connect();

            const result = await Client.query<{ id: number }>({
                text: sql,
                values: values,
            });

            return 1;
        } catch (error) {
            console.error("Error while inserting orders:", error);
            throw error;
        } finally {
            if (Client) {
                Client.release();
            }
        }
    }
}