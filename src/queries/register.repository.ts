import pool from "../db/db.config.js";
import { UserInput } from "../models/register.models.js";

// Crear un nuevo usuario.
export async function createUser(user: UserInput){
    try {
       const newUserQuery = `
            INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3) RETURNING *;
       `;
        const {name, email, password} = user;
        const res = await pool.query(newUserQuery, [name, email, password]);
        return res.rows[0];
    } catch (err) {
        console.error("Error al crear el usuario en DB: ", err);
        throw new Error("Algo salio mal al crear el usuario")
    };
};

// Buscar si existe el username o email, para no duplicar usuario.
export async function userExists(name: string, email: string){
    try{
        const findUserQuery = `
            SELECT * FROM users
            WHERE name = $1 OR email = $2; 
        `
        const res = await pool.query(findUserQuery, [name, email]);
        return res.rows.length > 0;
    }catch(err){
        console.error("Error al buscar las credenciales en la DB: ", err);
        throw new Error("Algo salio mal al buscar las credenciales");
    };
};