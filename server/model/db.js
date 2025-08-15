import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

async function createPool() {
  try {
    const pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      connectTimeout: 10000,
    });

    console.log("database connection successfull");

    return pool;
  } catch (error) {
    console.log("An error occured: ", error);
    throw error;
  }
}

export default createPool;
