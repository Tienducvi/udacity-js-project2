import client from "../database";
import { Pool, PoolClient } from 'pg';
import bcrypt from 'bcrypt';


export interface BaseUser {   
    username: string;
    firstname: string;
    lastname: string;
    password: string;
}

export interface User {
    id: number;
    username: string;
    firstname: string;
    lastname: string;
    password: string;
}

export class UserModel {
    async update(userParam: User): Promise<User> {
        const sql = 'UPDATE users SET username = ($2), firstname = ($3), lastname = ($4), password = ($5) WHERE id=($1) RETURNING *';
        const hash = bcrypt.hashSync(userParam.password + process.env.BCRYPT_PASSWORD, parseInt(process.env.SALT_ROUNDS as string,10))
        const values = [userParam.id, userParam.username, userParam.firstname, userParam.lastname, hash];
        let Client!: PoolClient;
        let user : User;
        try {
            Client = await client.connect();

            const result = await Client.query({
                text: sql,
                values: values,
            });
            user = result.rows[0];
            return user;
        } catch (error) {
            console.error("Error while inserting user:", error);
            throw error;
        } finally {
            if (Client) {
                Client.release();
            }
        }
    }

    async show(id: number): Promise<User> {
        const sql = 'SELECT * FROM users WHERE id=($1)';
        const values = [id];
        let Client!: PoolClient;
        let user : User;
        try {
            Client = await client.connect();

            const result = await Client.query({
                text: sql,
                values: values,
            });
            user = result.rows[0];
            
            return user;
        } catch (error) {
            console.error("Error while inserting user:", error);
            throw error;
        } finally {
            if (Client) {
                Client.release();
            }
        }
    }

    async showAll(): Promise<User[]> {
        const sql = 'SELECT * FROM users';
        let Client!: PoolClient;
        let userList : User[];
        try {
            Client = await client.connect();

            const result = await Client.query({
                text: sql,
            });
            userList = result.rows;
            return userList;
        } catch (error) {
            console.error("Error while inserting user:", error);
            throw error;
        } finally {
            if (Client) {
                Client.release();
            }
        }
    }

    async create(b: BaseUser): Promise<User> {
        const sql = 'INSERT INTO users (username, firstname, lastname, password) VALUES($1, $2, $3, $4) RETURNING *';
        
        const hash = bcrypt.hashSync((b.password).trim(), parseInt(process.env.SALT_ROUNDS as string,10))
        const values = [b.username, b.firstname, b.lastname, hash];
        let Client!: PoolClient;
        try {
            Client = await client.connect();      

            const result = await Client.query({
                text: sql,
                values: values,
            });

            return result.rows[0];
        } catch (error) {
            console.error("Error while inserting user:", error);
            throw error;
        } finally {
            if (Client) {
                Client.release();
            }
        }      
    }

    async delete(id: number): Promise<number> {
        const sql = 'DELETE FROM users WHERE id=($1)';
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
            console.error("Error while inserting user:", error);
            throw error;
        } finally {
            if (Client) {
                Client.release();
            }
        }
    }

    async authenticate(username: string, password: string): Promise<User | null> {
        const sql = 'SELECT password FROM users WHERE username=($1)';
        const values = [username];
        let Client!: PoolClient;
        try {
            Client = await client.connect();           
            const { rows } = await Client.query({
                text: sql,
                values: values,
            });
                    
            if (rows.length > 0) {
                const user = rows[0];
                if (bcrypt.compareSync((password).trim(),user.password)) {
                    return user;
                }
            }
            return null;
        } catch (err) {
            throw new Error(`Could not find user ${username}. ${err}`);
        } finally {
            if (Client) {
                Client.release();
            }
        }
      }
}