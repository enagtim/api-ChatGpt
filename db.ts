import { Pool } from "pg";

const pool = new Pool({
    user : 'admin',
    host: 'localhost',
    database: 'api-chatGpt',
    password: 'admin',
    port: 5432
});

export const query = (text: string, params?: any[]) => pool.query(text, params)