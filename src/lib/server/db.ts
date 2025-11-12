// src/lib/server/db.ts
import { Pool } from 'pg';
import { env } from '$env/dynamic/private';

// Create a new Pool instance
const pool = new Pool({
    host: env.PG_HOST,
    user: env.PG_USER,
    password: env.PG_PASSWORD,
    database: env.PG_DATABASE,
});

// Utility function to execute a SQL query
export async function query(text: string, params: any[] = []) {
    const client = await pool.connect();
    try {
        const result = await client.query(text, params);
        return result;
    } catch (error) {
        console.error('Database Query Error:', error);
        throw error;
    } finally {
        client.release();
    }
}