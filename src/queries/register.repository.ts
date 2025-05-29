import pool from "../db/db.config.js";
import { userInput } from "../models/register.models.js";

export async function createUser(user: userInput){
    try {
       const newUserQuery = `
            INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3) RETURNING *;
       `;
        const {username, email, password} = user;
        const res = await pool.query(newUserQuery, [username, email, password]);
        return res.rows[0].name;
    } catch (err) {
        console.error("Error: ", err);
        throw new Error("Algo salio mal al crear el usuario")
    };
};