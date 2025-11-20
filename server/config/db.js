import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: true,
        trustServerCertificate: true
    },
}


export const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then((pool) => {
        console.log("Connected to SQL server");
        return pool;
    })
    .catch((err)=>{
        console.log("database connection failed - ", err)
    });