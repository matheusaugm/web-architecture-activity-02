import dotenv from 'dotenv';
import mysql from 'mysql2'
import * as path from "path";
dotenv.config('./.env');

export const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME

})

db.connect(
    function (err) {
        if (err) {
            console.log(process.env.DB_PASS, process.env.DB_USER, process.env.DB_HOST, process.env.DB_NAME)
            console.log("!!! Cannot connect !!! Error:");
            throw err;
        }
        else
        {
            console.log("Connection established.");
        }
    });
