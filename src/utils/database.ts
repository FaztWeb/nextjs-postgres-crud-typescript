import { Pool } from "pg";

const pool = new Pool({
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_NAME || "tasksdb",
});

export { pool };
