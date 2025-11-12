// src/routes/api/test/+server.ts
import { json } from '@sveltejs/kit';
import { query } from '$lib/server/db';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
    try {
        const result = await query('SELECT NOW()');
        
        return json({ 
            success: true, 
            message: 'Database connection successful!',
            db_time: result.rows[0].now 
        });

    } catch (e) {
        if (e instanceof Error) {
            return json({ 
                success: false, 
                message: 'Database connection failed.', 
                error: e.message 
            }, { status: 500 });
        } else {
            return null;
        }
    }
}