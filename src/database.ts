import dotenv from 'dotenv';

import * as pg from 'pg'

const { Pool } = pg

dotenv.config();

let client !: pg.Pool;

const environment = process.env.ENV as string

if(environment.trim() === 'dev') {
    client = new Pool({
       host: process.env.POSTGRES_HOST,
       port: 5432,
       database: process.env.POSTGRES_DB,
       user: process.env.POSTGRES_USER,
       password: process.env.POSTGRES_PASSWORD,
   })
}


if(environment.trim() === 'test') { 
    client = new Pool({
       host: process.env.POSTGRES_HOST,
       port: 5432,
       database: process.env.POSTGRES_TEST_DB,
       user: process.env.POSTGRES_USER,
       password: process.env.POSTGRES_PASSWORD,
   })
}

export default client;