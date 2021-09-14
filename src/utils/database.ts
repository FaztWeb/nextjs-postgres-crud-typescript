import { Pool,Connection } from 'pg'

let conn: Connection;

if (!conn) {
    conn = new Pool({
        user: 'root',
        password: 'root',
        host: 'localhost',
        port: 5432,
        database: 'nextpostgres',
    });
}

export { conn }
