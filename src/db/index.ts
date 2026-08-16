import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";

const connection = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "ngs"
});


export const db = drizzle(connection, { casing: "camelCase" });
export type Database = typeof db
export type Transaction =
    Parameters<Parameters<Database["transaction"]>[0]>[0];